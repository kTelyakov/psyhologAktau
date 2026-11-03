# План реализации: Sapper → Next.js + Mantine + FastAPI

Статус: черновик на согласование. Код ещё не писался.
Дата: 2026-11-03

---

## 1. Согласованные решения

| Вопрос | Решение |
|---|---|
| Фронтенд | Next.js, App Router, TypeScript, архитектура **FSD** (§7.1) |
| Рендеринг | ISR — `generateStaticParams()` + `revalidateTag()` по вебхуку |
| UI-kit | Mantine v7+, новый дизайн (не пиксель-порт) |
| Бэкенд | Python 3.12 + FastAPI, архитектура **DDD** (§5.1) |
| БД | PostgreSQL |
| Деплой | **один VPS**, нативно: systemd + nginx, без Docker (§2) |
| Сборка | GitHub Actions → `output: 'standalone'` → rsync на VPS (§2.2) |
| Админка | **позже, пишешь сам руками** — в этом плане только задел (§8) |
| Ветка | `next-migration`, `main` с Sapper остаётся рабочим |

---

## 2. Топология

Один VPS, нативно, без Docker. Процессы под systemd.

```
VPS
┌────────────────────────────────────────────────────────┐
│  nginx :443                                            │
│    ├─ /          → 127.0.0.1:3000   Next.js            │
│    ├─ /api/*     → 127.0.0.1:8000   FastAPI            │
│    └─ /media/*   → /srv/psyholog/media/   (отдаёт сам) │
│                                                        │
│  postgresql :5432  — слушает только localhost          │
│                                                        │
│  systemd: psyholog-web.service, psyholog-api.service   │
└────────────────────────────────────────────────────────┘
```

На VPS ничего не собирается — сборка в CI (§2.2).

### Структура репозитория

```
/
  web/                  Next.js        (внутри — FSD, §7.1)
  api/                  FastAPI        (внутри — DDD, §5.1)
  deploy/               nginx.conf, systemd-юниты, deploy.sh
  .github/workflows/    CI (§2.2)
  content/              промежуточные JSON после чистки (артефакт, в git)
  scripts/              clean-posts.mjs
  MIGRATION_PLAN.md
```

Файлы Sapper (`rollup.config.js`, `src/`, `__sapper__/`, `index.js`,
`bundle.css`, `static/`) пока лежат в корне и удаляются на этапе 9.

### Раскладка на диске

```
/srv/psyholog/
  releases/<git-sha>/
      web/            standalone-сборка Next, приехала из CI
      api/            код + .venv (uv sync на месте)
  current -> releases/<git-sha>     симлинк; откат = переставить его
  media/                            картинки постов, вне релизов
  backups/                          pg_dump по cron
```

Медиа и бэкапы лежат **вне** `releases/`, иначе деплой их снесёт.

### Переменные окружения

Адрес API нужен в двух видах — частая ошибка:

```env
# web
API_URL_INTERNAL=http://127.0.0.1:8000     # серверный рендеринг, в браузер не попадает
NEXT_PUBLIC_API_URL=/api                   # браузер (форма заявки), через nginx
REVALIDATE_SECRET=<общий секрет>

# api
DATABASE_URL=postgresql+asyncpg://psyholog@localhost/psyholog
REVALIDATE_URL=http://127.0.0.1:3000/api/revalidate
REVALIDATE_SECRET=<тот же секрет>
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

### Почему не Docker

Рассматривали. Его сильные стороны — воспроизводимость между средами,
оркестрация, горизонтальное масштабирование — здесь не используются:
один VPS, по одному инстансу каждого сервиса, один разработчик.
Платить при этом пришлось бы ~100 МБ RAM на демон, ~8 ГБ диска под образы
и слои, плюс лишний слой в отладке.

Со сборкой в CI главный довод за Docker (готовый образ вместо сборки
на сервере) закрывается симлинком на релиз — откат такой же мгновенный.

Вернуться к Docker осмысленно, когда появится третий сервис (Redis, воркер)
или понадобится второй инстанс. Переезд несложный: `Dockerfile` пишется
поверх уже работающих команд сборки.

### Почему всё на одной машине

Разнос API на отдельный сервер рассматривали и **отклонили** —
технических оснований нет:

- **задержка на критическом пути.** Next зовёт API серверно при рендеринге.
  Loopback — ~0,1 мс, между двумя провайдерами — десятки миллисекунд на каждый
  запрос, и это на пути фоновой ревалидации
- **хоп пришлось бы защищать:** TLS на API, второй certbot, аллоулист или
  общий секрет, чтобы API не торчал наружу открытым
- **две машины** патчить, мониторить, бэкапить — при суммарном потреблении
  меньше гигабайта
- **нечего разгружать:** оба сервиса вместе не занимают и половины машины

Разносить стоит, когда API начнёт обслуживать второго клиента (мобильное
приложение, второй сайт) или обрастёт тяжёлыми задачами.

**Единственное возможное исключение — не техническое, см. §11 п.8:**
в таблице `leads` будут имена и телефоны граждан РК. Если законодательство
о персональных данных требует их локализации в Казахстане, схема меняется:
`api` + `postgres` на хостинге в KZ, `web` — где угодно.

---

## 2.1 Требования к VPS

Сборка вынесена в CI, поэтому на сервере нужен только рантайм.

| Компонент | RAM в простое |
|---|---|
| PostgreSQL (`shared_buffers=128MB` по умолчанию) | ~200 МБ |
| FastAPI / uvicorn, 2 воркера | ~200 МБ |
| Next.js, `next start` | ~150–250 МБ |
| nginx | ~20 МБ |
| ОС (Ubuntu minimal) | ~250 МБ |
| **Итого** | **~0,8–0,9 ГБ** |

### Итоговая конфигурация

| Параметр | Минимум | **Рекомендую** |
|---|---|---|
| RAM | 1 ГБ (впритык) | **2 ГБ** |
| vCPU | 1 | **2** |
| Диск | 20 ГБ SSD | **25 ГБ NVMe** |
| Трафик | 1 ТБ | 1 ТБ (запас ×100) |
| ОС | Ubuntu 24.04 LTS / Debian 12 | |
| IPv4 | обязательно выделенный | |

Второе ядро нужно не под сборку, а под `sharp`: `next/image` оптимизирует
79 картинок постов на лету при первом обращении.

### Раскладка диска

| Что | Размер |
|---|---|
| ОС + пакеты (nginx, postgres, node, uv) | ~8 ГБ |
| `releases/` — держим 3–5 релизов по ~300 МБ (standalone) | ~2 ГБ |
| `media/` — сейчас 11 МБ / 79 файлов | 5 ГБ с запасом |
| `pgdata` — 58 статей текстом, считанные МБ | 2 ГБ с запасом |
| `.next/cache` — ISR-кэш, 78 страниц | ~50 МБ |
| Логи + `backups/` | 3 ГБ |

Без Docker диск падает с 40 до 25 ГБ: ~8 ГБ из прошлой оценки занимали
образы и кэш сборки.

### Проверить у провайдера

- **выделенный IPv4** — не только IPv6
- **снапшоты** на уровне провайдера (не заменяет `pg_dump` по cron, но спасает
  при сносе машины)
- **открытые 80/443** и управляемый firewall — нужны для certbot
- **NVMe, не HDD**
- SMTP не нужен: уведомления о заявках идут в Telegram, поэтому обычная
  блокировка 25-го порта не мешает

### Локация

Аудитория — Актау. Задержка до origin влияет на LCP, а LCP — фактор
ранжирования, то есть прямо по основной цели сайта.

| Локация | RTT до Актау (порядок) | Цена |
|---|---|---|
| Казахстан (ps.kz, hoster.kz) | минимальная | выше |
| Москва (Timeweb, Selectel) | ~40–60 мс | средняя |
| Германия/Финляндия (Hetzner) | ~80–120 мс | самая низкая |

Дальность origin лечится **Cloudflare перед ним** (бесплатного тарифа хватает):
ISR отдаёт статический HTML, он прекрасно кэшируется на edge.

Рекомендация: Hetzner + Cloudflare если считаем деньги; хостинг в KZ —
если подтвердится требование локализации персональных данных (§11 п.8).
На план влияет значением одной переменной в `nginx.conf`.

---

## 2.2 Сборка и деплой (CI)

`next build` — самая тяжёлая операция проекта: TypeScript, SWC, пререндер
78 страниц, `sharp`. Пик 1,5–2,5 ГБ. На сервере не выполняется вообще.

```
GitHub Actions
  ├─ web:  npm ci → next build (output: 'standalone') → tar
  ├─ rsync → /srv/psyholog/releases/<sha>/web/
  ├─ api:  rsync кода → uv sync на VPS (python-зависимости ставятся на месте,
  │        venv между машинами не переносим)
  ├─ alembic upgrade head
  ├─ ln -sfn releases/<sha> current
  └─ systemctl restart psyholog-web psyholog-api
```

Откат: переставить симлинк `current` на предыдущий релиз и перезапустить.

### Подвох: `generateStaticParams()` теперь выполняется в CI

Он ходит в API за списком постов, а у GitHub Actions нет доступа во внутреннюю
сеть VPS. Значит CI обращается к **публичному прод-API** через `/api/*` —
он там и так публичный, но появляются два следствия:

1. **порядок первого деплоя:** API должен подняться и быть наполнен раньше,
   чем соберётся web. Иначе первая сборка даст ноль пререндеренных страниц
2. **сборка зависит от доступности прода.** Поэтому `generateStaticParams()`
   делаем отказоустойчивым: при ошибке возвращаем `[]` и опираемся на
   `dynamicParams: true` — страницы отрендерятся по первому запросу.
   Лежащий API задержит деплой, но не сломает его

---

## 3. Результаты аудита данных

Прогнал `src/posts_content/index.js` (360 КБ, 61 запись):

| Находка | Деталь | Действие |
|---|---|---|
| **3 записи — не статьи** | WP attachment-страницы: `blog/semja/izmenil-muzh-chto-delat/attachment/izmenil-muzh/` и ещё 2 | выбросить → остаётся **58 статей** |
| **Даты восстановимы** | `data-item_date` в разметке мёртвого виджета LikeBtn; найдено ровно 58 — совпадает с числом реальных статей | извлечь в `published_at` |
| **Полей `date` и `category` нет** | в данных только `title`, `content`, `author`, `img`, `slug` | `category` вывести из слага |
| **Мусор LikeBtn** | 232 вхождения `likebtn` | вырезать |
| **Классы из Instagram** | 6 вхождений `Xl2Pu`, `gElp9`, `P9YgZ`, `C4VMK`, `C7I1f`, `X7jCj` | развернуть обёртки |
| **Абсолютные ссылки** | 207 вхождений `psyholog-aktau.kz` | → относительные |
| **Категории** | 11: `semja` (12), `dlja-devushek` (10), `poleznye-sovety` (10), `strahi` (7), `knigi` (6), `zavisimosti` (5), `kakaja-u-tebja-sudba` (4), `master-klassy` (3), `kak-pravilno-obshhatsja` (2), `stati-gulsary-karajchikovoj` (1), `stati-tatjany-ivahnickoj` (1) | таблица `categories` |
| **Авторы** | 2: Татьяна Ивахницкая, Гульсара Карайчикова | таблица `authors` |
| **Все слаги с хвостовым `/`** | `blog/dlja-devushek/dostatochno-horoshaja-mat/` | `trailingSlash: true` |

Статика: `static/` = 15 МБ, из них `static/postImages/` = 11 МБ (79 файлов)
→ `/srv/psyholog/media/`, отдаётся nginx напрямую.

---

## 4. Баги текущей версии, которые закрываются переездом

Зафиксированы на запущенном dev-сервере:

1. **Конфликт роутов.** `src/routes/blog/[slug].svelte` — заглушка с хардкодом
   `{slug:'SOME SLUG', title:'SOME TITLE'}`. URL `/blog/dlja-devushek` рендерит
   буквально «SOME TITLE». Рабочая логика в `blog/[slug]/[slug].svelte`.
2. **500 без хвостового слеша.** `blog/[slug]/[slug].svelte:16` ищет пост по
   `data.path.slice(1)` без слеша, а слаги в данных со слешем →
   `TypeError: Cannot read properties of undefined (reading 'slug')`.
3. **Битая ссылка в меню.** `Nav.svelte`: «Контакты» → `href="/5"` → 404.
4. **Карточки услуг никуда не ведут.** 6 услуг, у всех `btnText: ''` и нет `href`.
5. **`/about` — болванка Sapper** на английском, в продакшене.
6. **Отладка в проде.** `console.log('@@@ : ')`, `console.log('@finded : ')`,
   `border: 1px solid red` на карточках блога, `background: red` в tablet.
7. **`blog/[slug].json.js` — мёртвый код.**
8. **Форма заявки не отправляет ничего.** `LeadForm.svelte` собирает данные и теряет их.
   Это, по сути, главный аргумент за API прямо сейчас.

---

## 5. Бэкенд: FastAPI

### Стек

```
Python 3.12
fastapi + uvicorn
sqlalchemy 2.0 (async) + asyncpg
alembic                      миграции
pydantic v2 + pydantic-settings
sanitize-html аналог: bleach / nh3   санитизация HTML статей
uv                           менеджер зависимостей
pytest + httpx               тесты
```

### Модель данных

```
authors
  id, name, slug, bio, photo, created_at

categories
  id, slug, title, description, sort_order, created_at

posts
  id
  slug                 только листовая часть: izmenil-muzh-chto-delat
  category_id          FK
  author_id            FK
  title
  content              HTML, уже санитизированный
  excerpt              для карточек в списке
  image                имя файла в media/
  status               draft | published      ← задел под админку
  published_at         из data-item_date
  created_at, updated_at
  meta_title, meta_description                ← задел под SEO-правки
  UNIQUE (category_id, slug)

leads
  id, name, phone, message
  source_page          с какой страницы пришла заявка
  status               new | contacted | closed
  created_at, ip, user_agent
```

Заметка по слагам: в текущих данных `slug` — это **полный путь**
`blog/semja/izmenil-muzh-chto-delat/`. В БД храним только листовую часть,
категория — через FK. Уникальность — составная, `(category_id, slug)`.

### Эндпоинты

```
GET  /api/v1/health
GET  /api/v1/categories
GET  /api/v1/posts?category=&q=&limit=&offset=
GET  /api/v1/posts/{category}/{slug}
GET  /api/v1/authors/{slug}
POST /api/v1/leads                 ← форма заявки
```

Только чтение + приём заявок. Запись (POST/PUT/DELETE по постам) —
на твоей стороне вместе с админкой, см. §8.

### Приём заявок

`POST /api/v1/leads` — единственная ручка, которая что-то меняет на этом этапе:

1. валидация телефона (Pydantic-валидатор под формат KZ)
2. honeypot-поле + rate limit по IP (`slowapi`) — иначе спам придёт в первую неделю
3. запись в `leads`
4. уведомление: **Telegram-бот** (дешевле и надёжнее SMTP, особенно в KZ),
   отправка в `BackgroundTasks` — чтобы падение телеграма не ломало ответ формы

### Миграция контента — два шага

Намеренно разделено, чтобы промежуточный результат можно было глазами проверить:

**Шаг 1.** `scripts/clean-posts.mjs` → `content/posts/<category>/<slug>.json`
  1. выбросить 3 attachment-записи
  2. извлечь `published_at` из `data-item_date` **до** вырезания LikeBtn
  3. вырезать блок LikeBtn целиком
  4. развернуть Instagram-обёртки
  5. `https://psyholog-aktau.kz/...` → `/...`
  6. вывести `category` из слага, отделить листовой `slug`
  7. сгенерировать `excerpt` из первого абзаца

**Шаг 2.** `api/scripts/seed.py` → заливка `content/posts/*.json` в Postgres,
идемпотентно (upsert по `(category_id, slug)`), с санитизацией HTML через `nh3`.

Контент идёт в `dangerouslySetInnerHTML` — санитизация обязательна,
источник ненадёжный (скрейп из WordPress).

---

## 5.1 Архитектура бэкенда: DDD

Слоистая схема, зависимости направлены строго внутрь:
`presentation → application → domain`, а `infrastructure` подключается
к `domain` через интерфейсы. Домен не импортирует ни FastAPI, ни SQLAlchemy.

```
api/src/
  domain/                        чистый Python: ни FastAPI, ни SQLAlchemy
    content/                     ← bounded context «Контент»
      post/
        entity.py                Post — доменная модель
        value_objects.py         Slug, PublicationStatus
        repository.py            PostRepository — абстрактный интерфейс (Protocol)
        exceptions.py            PostNotFound, SlugAlreadyTaken
      category/  author/
    leads/                       ← bounded context «Заявки»
      entity.py                  Lead
      value_objects.py           PhoneKZ — валидация формата
      repository.py              LeadRepository
      ports.py                   NotificationPort — интерфейс уведомления

  application/                   сценарии использования
    content/
      get_post.py                GetPostUseCase
      list_posts.py              ListPostsUseCase
      dto.py
    leads/
      submit_lead.py             SubmitLeadUseCase: валидация → запись → уведомление

  infrastructure/                адаптеры, реализуют интерфейсы домена
    db/
      models.py                  SQLAlchemy-модели (таблицы из §5)
      repositories/
        post.py                  SqlAlchemyPostRepository(PostRepository)
        lead.py
      session.py
    notifications/
      telegram.py                TelegramNotifier(NotificationPort)
    revalidate/
      next_client.py             вызов вебхука Next (§6)

  presentation/                  FastAPI
    v1/
      routers/  posts.py  leads.py  categories.py  authors.py
      schemas.py                 Pydantic — отдельно от доменных сущностей
      deps.py                    DI: сборка use-case'ов
    main.py

alembic/
tests/
  unit/                          домен и use-case'ы, без БД и без HTTP
  integration/                   репозитории и роутеры
```

### Два bounded context

`content` (посты, категории, авторы) и `leads` (заявки) — независимые
поддомены. Общего у них нет: заявка ничего не знает о статьях. Держим
раздельно с самого начала, чтобы потом не распутывать.

### Правила, которые это даёт

- **Интерфейсы репозиториев живут в домене, реализации — в инфраструктуре.**
  Use-case принимает `PostRepository`, а не сессию SQLAlchemy
- **Pydantic-схемы ≠ доменные сущности.** Маппинг на границе `presentation`.
  Иначе формат API окажется прибит к структуре таблиц
- **Уведомление о заявке — порт.** `SubmitLeadUseCase` зовёт `NotificationPort`,
  не зная про Telegram. Замена на email или добавление второго канала
  не трогает сценарий
- **Вебхук ревалидации — тоже порт** (§6). Когда появятся пишущие ручки
  вместе с админкой, сброс кэша встанет в use-case, а не в роутер
- **Юнит-тесты без БД.** Домен и сценарии тестируются на фейковых репозиториях,
  `pytest` не поднимает Postgres

### Честно о цене

На read-only этапе доменной логики почти нет: отдать пост по слагу —
это два слоя обёрток вокруг `SELECT`. DDD здесь работает в минус
по строкам кода.

Окупается он на двух вещах, которые придут дальше: **заявки** (там уже есть
правила — валидация телефона, антиспам, уведомление, статусы обработки)
и **админка** (правила публикации, draft→published, ревалидация кэша,
уникальность слагов). Поэтому структуру заводим сейчас, но без церемоний:
пустые `value_objects.py` не плодим, слой появляется, когда в нём есть что
положить. Для `GetPostUseCase` допустимо быть в три строки.

---

## 6. Как работает ISR в этой схеме

### Сборка

`generateStaticParams()` ходит в API, получает 58 постов, Next пререндеривает
58 + 11 категорий + ~9 статических ≈ 78 страниц в HTML + RSC-payload.

```tsx
// web/app/blog/[category]/[slug]/page.tsx
export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ category: p.category, slug: p.slug }))
}
```

### Отдача

Запрос → готовый HTML из кэша, ноль рендеринга. Пока страница моложе
`revalidate` — так всегда.

### stale-while-revalidate

`revalidate = 3600` означает не «через час обновится», а «через час следующий
запрос запустит обновление в фоне». Хронология для одной страницы:

| Время | Событие | Что видит посетитель |
|---|---|---|
| 10:00 | страница сгенерирована | свежее |
| 10:00–11:00 | запросы идут | кэш, свежее |
| 11:00 | окно истекло, запросов нет | — |
| 11:42 | **первый** запрос после истечения | **устаревшее** + фоновый рендер |
| 11:43 | следующий запрос | свежее |

Таймер не тикает сам: нет запросов — нет ревалидации. И один посетитель
всегда получает устаревшую версию, зато без ожидания.

Если фоновый рендер упал — Next оставляет прошлую рабочую версию в кэше.
Лежащий API не положит сайт, это даётся бесплатно.

### Сброс по вебхуку — основной механизм

Таймер здесь страховка. Точный инструмент — сброс из API после правки контента:

```
админка → PUT /api/v1/posts/42 → FastAPI пишет в БД
                                      │
                                      └→ POST http://web:3000/api/revalidate
                                         { secret, tags: ["posts", "post:42"] }
                                              │
                                              └→ revalidateTag() → кэш сброшен
                                                 правка видна сразу
```

Next помечает данные тегами, чтобы сброс был точечным:

```ts
await fetch(`${API_URL_INTERNAL}/api/v1/posts/${cat}/${slug}`, {
  next: { tags: ['posts', `post:${cat}/${slug}`], revalidate: 3600 },
})
```

Ручку `/api/revalidate` закрыть сверкой секрета из env — иначе её задидосят сбросами.

### Три подвоха

**1. `generateStaticParams()` выполняется на сборке, то есть в CI.**
Разобрано в §2.2: CI ходит в публичный прод-API, функция делается
отказоустойчивой (`[]` при ошибке + `dynamicParams: true`).

**2. Деплой сбрасывает ISR-кэш — и это нормально.**
`.next/cache` лежит внутри релиза, новый релиз приезжает с пустым.
Страшного нет: свежая сборка уже содержит актуальный HTML, собранный против
текущего API. Переносить кэш между релизами не стоит — если изменился код
рендеринга, старые записи отдадут устаревшую разметку.
Один инстанс — Redis и `cacheHandler` не нужны, не усложняй заранее.

**3. `next dev` игнорирует ISR.** Проверять только через
`next build && next start`, смотреть заголовок `x-nextjs-cache`:
`HIT` / `STALE` / `MISS`.

---

## 7. Фронтенд: карта маршрутов

```
web/app/
  layout.tsx                              MantineProvider, ColorSchemeScript, Header, Nav
  page.tsx                                /
  individualnye-konsultacii/page.tsx      единственная услуга с реальным контентом
  semeynye-konsultacii/page.tsx
  skype-konsultacii/page.tsx
  detskiy-psiholog/page.tsx
  trudnye-podrostki/page.tsx
  treningi/page.tsx
  kontakty/page.tsx                       НОВАЯ — закрывает битый href="/5"
  blog/
    page.tsx                              /blog/
    [category]/page.tsx                   /blog/semja/ — НОВОЕ
    [category]/[slug]/page.tsx            /blog/semja/izmenil-muzh-chto-delat/
  api/revalidate/route.ts                 ручка сброса кэша
  sitemap.ts  robots.ts  not-found.tsx
```

### Сохранение URL — критично

Сайт живёт на поисковом трафике («психолог Актау»), старые URL проиндексированы.
Схема `[category]/[slug]` + `trailingSlash: true` даёт побайтовое совпадение:

```
psyholog-aktau.kz/blog/dlja-devushek/dostatochno-horoshaja-mat/   ← было и осталось
```

3 выброшенные attachment-страницы → `redirects()` 301 на родительскую статью.

### Маппинг компонентов

| Было (Svelte) | Станет | Примечание |
|---|---|---|
| `Btn.svelte` | `<Button>` | |
| `BaseInput.svelte` | `<TextInput>` / `<Textarea>` | |
| `Heading.svelte` | `<Title order={n}>` | проп `size="l"` уходит |
| `Card` + `CardWrapper` | `<Card>` + `<Paper>` | сливаются в один |
| `Expand.svelte` (101 строка) | `<Accordion>` | минус ~100 строк |
| `Carousel.svelte` | `@mantine/carousel` | на Embla |
| `ModalLayout` + `ModalYoutube` | `<Modal>` | |
| `LeadForm.svelte` | `@mantine/form` → `POST /api/v1/leads` | появляется валидация и адресат |
| `Nav.svelte` | `<Burger>` + `<Drawer>` | |
| `Separator.svelte` | `<Divider>` / `Stack gap` | вероятно не нужен |
| `CardYoutube.svelte` | `<AspectRatio>` + lite-youtube | |
| `src/scss/*` (~900 строк) | `theme.ts` + CSS-модули | |

Mantine v7+ поставляет `'use client'` внутри своего пакета, поэтому страницы
остаются серверными компонентами. `'use client'` нужен только нашим обёрткам
с состоянием: модалка заявки, мобильное меню, YouTube-модалка, фильтр блога.

---

## 7.1 Архитектура фронтенда: FSD

Feature-Sliced Design. Главная сложность — слой `app` есть и в FSD,
и в Next App Router. Разрешаем стандартно: `app/` на верхнем уровне
остаётся **только маршрутизацией**, все слои FSD живут в `src/`.
Слой `pages` переименован в `views`, чтобы не путать с легаси-каталогом
`pages/` из Next.

```
web/
  app/                         ← ТОЛЬКО роутинг Next, файлы в 3–5 строк
    page.tsx                   re-export из src/views/home
    blog/[category]/[slug]/page.tsx
    api/revalidate/route.ts
    layout.tsx  sitemap.ts  robots.ts

  src/
    app/                       ← слой app по FSD
      providers/               MantineProvider, ColorSchemeScript
      styles/                  глобальные стили
      theme.ts                 тема Mantine (§9 этап 6)

    views/                     ← слой pages по FSD
      home/  blog/  post/  category/  service/  contacts/

    widgets/                   композитные блоки страниц
      header/  nav/  footer/
      cta-section/  services-section/  bio-section/  tv-section/
      testimonials/  faq-section/  photo-reports/  contacts-section/

    features/                  пользовательские сценарии
      lead-form/               форма заявки + модалка + POST /api/v1/leads
      blog-filter/             фильтр по категориям
      youtube-modal/

    entities/                  бизнес-сущности
      post/                    тип Post, PostCard, маппинг из API
      category/  author/  lead/

    shared/                    переиспользуемое, ничего не знает о домене
      api/                     fetch-клиент к FastAPI, теги кэша ISR (§6)
      ui/                      тонкие обёртки над Mantine — только если нужны
      lib/                     хелперы (форматирование даты, slugify)
      config/                  env, константы
```

Внутри слайса — стандартная нарезка `ui/`, `model/`, `api/` + `index.ts`
как публичный API. Снаружи импортируем только через `index.ts`, во внутренности
слайса не лазим.

### Правило импортов

Слой может импортировать только из слоёв **строго ниже**:

```
app → views → widgets → features → entities → shared
```

Обратные и горизонтальные импорты (виджет из виджета) запрещены.
Проверять машиной, а не глазами: `steiger` (линтер FSD) либо
`eslint-plugin-boundaries`. Без линтера правило держится неделю.

### Как это сходится с App Router

Файлы маршрутов становятся тонкими — вся сборка страницы в `views`:

```tsx
// app/blog/[category]/[slug]/page.tsx
export { default, generateMetadata, generateStaticParams } from '@/views/post'
export const revalidate = 3600
export const dynamicParams = true
```

Два ограничения Next, о которых надо помнить:

- `generateStaticParams`, `revalidate`, `dynamicParams` и `metadata`
  Next читает **только из файла маршрута**. Реализацию держим в `views`,
  а в `app/` реэкспортируем — сами значения `revalidate`/`dynamicParams`
  должны быть литералами в файле маршрута
- `'use client'` ставим как можно глубже — на слайсы `features/`, а не на
  `views/`. Иначе вся страница уедет в клиент и пропадёт смысл серверного
  рендеринга. Mantine v7+ свои директивы несёт сам, нам это не мешает

### Куда попадают текущие компоненты

| Было | Слой FSD |
|---|---|
| `MainHeader`, `Nav` | `widgets/header`, `widgets/nav` |
| 8 секций из `src/sections/` | `widgets/*-section` |
| `LeadForm` + `BaseInput` + `ModalLayout` | `features/lead-form` |
| `ModalYoutube` + `CardYoutube` | `features/youtube-modal` |
| `Card` (пост) | `entities/post/ui/PostCard` |
| `Card` (услуга) | `widgets/services-section` — это не сущность, а вёрстка блока |
| `Btn`, `Heading`, `Separator`, `Carousel` | не переносим: это `<Button>`, `<Title>`, `<Divider>`, `@mantine/carousel` |
| `_layout.svelte` | `src/app/providers` + `app/layout.tsx` |

Обрати внимание на `Card.svelte`: сейчас он один и обслуживает и посты,
и услуги — отсюда проп-мешок `cardObj`. По FSD это две разные вещи,
и разъехаться они должны при переносе.

---

## 8. Задел под админку (пишешь сам, позже)

Админку не делаем. Но чтобы потом не упираться в миграции и переделку API,
закладываем сейчас:

**В модели данных (§5) уже предусмотрено:**
- `posts.status` (`draft | published`) — публичные ручки отдают только `published`
- `posts.updated_at` — для списка «недавно изменённые»
- `posts.meta_title` / `meta_description` — правка SEO без деплоя
- `categories.sort_order` — порядок в меню
- `leads.status` — заявки нужно будет отрабатывать

**Что оставляю тебе:**
- таблица `users` + аутентификация (рекомендую JWT в httpOnly-cookie)
- пишущие ручки: `POST/PUT/DELETE /api/v1/posts`, загрузка картинок в `media/`
- вызов вебхука ревалидации после каждой записи — **контракт уже готов** (§6),
  твоей админке достаточно его дёрнуть
- сам интерфейс

**Что стоит решить до того, как сядешь писать:** редактор контента.
Сейчас в БД поедет HTML из WordPress. Если админка будет на `@mantine/tiptap` —
он работает с HTML, конфликта нет. Если захочешь Markdown — понадобится
конвертация 58 статей, и лучше сделать её в `clean-posts.mjs` сразу, а не потом.

---

## 9. Этапы

### Этап 0 — подготовка
- ветка `next-migration`
- каркас монорепо по §2; скелет слоёв FSD (§7.1) и DDD (§5.1)
- линтер границ FSD (`steiger`) и правила импортов — **до** первого компонента,
  иначе слои разъедутся

### Этап 1 — инфраструктура
- VPS: пользователь `psyholog`, ssh-ключи, ufw (22/80/443)
- `apt`: nginx, postgresql-16; `uv` для Python, Node 20
- раскладка `/srv/psyholog/` (§2), systemd-юниты `psyholog-web`, `psyholog-api`
- `nginx.conf` с тремя локациями из §2, TLS через certbot
- GitHub Actions по схеме из §2.2, секреты для ssh
- `pg_dump` по cron в `backups/`, ротация логов
- **Критерий:** пуш в ветку проходит деплой целиком, `/api/v1/health`
  отвечает по https, откат симлинком работает

### Этап 2 — чистка контента (независим, можно параллельно с 1 и 3)
- `scripts/clean-posts.mjs` по шагам из §5
- **Критерий:** 58 постов, у всех обязательные поля + `published_at` + `category`;
  `grep -rc likebtn content/` = 0

### Этап 3 — API
- модели SQLAlchemy, Alembic-миграции, Pydantic-схемы
- read-эндпоинты + `POST /leads` + Telegram-уведомление
- `api/scripts/seed.py`
- тесты на эндпоинты
- **Критерий:** `/api/v1/posts` отдаёт 58, `/api/v1/posts/semja/izmenil-muzh-chto-delat`
  отдаёт один; заявка с формы долетает в телеграм

### Этап 4 — каркас Next + Mantine
- `create-next-app`, Mantine, `postcss-preset-mantine` + `postcss-simple-vars`
- `layout.tsx`: `@mantine/core/styles.css`, `<ColorSchemeScript/>`, `mantineHtmlProps`
- `static/` → `web/public/` + `media/` (картинки постов)
- **Критерий:** `next build` зелёный, Mantine-кнопка рендерится

### Этап 5 — слой данных + ISR
- `web/lib/api.ts` — единственная точка доступа к API, с тегами кэша
- `web/app/api/revalidate/route.ts` + сверка секрета
- отказоустойчивый `generateStaticParams()` (§6, подвох 1)
- **Критерий:** `next build && next start`, `x-nextjs-cache: HIT`;
  вебхук сбрасывает нужную страницу

### Этап 6 — тема и общие компоненты
- `theme.ts`: primary из `#4251ca` (10 оттенков), брейкпойнты `sm:768 / md:1024`,
  шрифт, `defaultRadius`
- `Header`, `Nav` (`<Burger>` + `<Drawer>`), `Footer`
- **Критерий:** мобильное меню работает, битых ссылок нет (баг №3)

### Этап 7 — страницы
- лендинг: порядок секций из `src/routes/index.svelte` сохраняем —
  `Cta → Services → Bio → Tv → Testimonials → Faq → PhotoReports → Contacts`
- карточки услуг получают ссылки (баг №4)
- 5 шаблонных страниц услуг + `individualnye-konsultacii` с контентом
- новая `/kontakty`; `/about` — наполнить или удалить (§11)
- блог: список, 11 страниц категорий, 58 постов,
  типографика через `<TypographyStylesProvider>`
- **Критерий:** все 58 URL отдают 200 **и со слешем, и без** (баг №2)

### Этап 8 — SEO
- `generateMetadata` на каждой странице (сейчас `<title>About</title>`, `<title>500</title>`)
- `sitemap.ts` (58 + 11 + ~9), `robots.ts`
- JSON-LD: `LocalBusiness` (адрес, телефон, ИП из `Contacts.svelte`) + `Article`
- OG-картинки, 301 для 3 attachment-URL

### Этап 9 — запуск
- прогнать все URL старого sitemap → ни одного 404/500
- Lighthouse ≥ 90 performance, 100 SEO
- TLS (certbot), бэкап Postgres по cron
- удалить Sapper: `rollup.config.js`, `src/`, `__sapper__/`, `index.js`,
  `bundle.css`, `static/`, sapper-зависимости из `package.json`
- merge в `main`

---

## 10. Оценка и критический путь

| Этап | Объём |
|---|---|
| 0. Подготовка | малый |
| 1. Инфраструктура | средний |
| 2. Чистка контента | средний — возня в регулярках |
| 3. API | средний |
| 4. Каркас Next | малый |
| 5. Данные + ISR | средний |
| 6. Тема + общие | средний |
| 7. Страницы | **крупный** — 8 секций лендинга + блог |
| 8. SEO | средний |
| 9. Запуск | средний |

Критический путь: 1 → 3 → 5 → 7. Этап 2 ведётся параллельно чему угодно,
этап 4 не зависит от бэкенда.

---

## 11. Остались вопросы

1. **`/about`** — наполнить реальным текстом или удалить? Сейчас английская болванка.
2. **Куда уведомлять о заявках** — Telegram-бот (рекомендую) или email? Нужен chat_id.
3. **Карта** — `map.png` картинкой или живой виджет 2GIS/Яндекс?
4. **Тёмная тема** — Mantine даёт почти бесплатно. Нужна?
5. **Страницы авторов** — 2 автора; делать `/blog/author/<slug>`?
6. **Поиск по блогу** — Postgres выбран в том числе под полнотекстовый поиск
   по русскому. Включаем в этот заход или позже?
7. **Домен и текущий хостинг** — куда сейчас смотрит `psyholog-aktau.kz`
   и где лежит прод? Нужно для плана переключения без простоя.
8. **Локализация персональных данных — проверить до выбора провайдера.**
   В `leads` попадут имена и телефоны граждан РК. В Казахстане действует
   закон о персональных данных; деталей текущей редакции я не знаю и не берусь
   утверждать, что именно он требует в этом случае. Если локализация обязательна —
   машину надо брать в KZ, и вариант
   «Hetzner + Cloudflare» отпадает. На топологию это уже не влияет
   (решено: всё на одной машине), только на выбор провайдера —
   но решить нужно **до** него.

---

## 12. Критерии готовности

- [ ] все 58 постов доступны по старым URL, со слешем и без
- [ ] `grep -rc likebtn content/` → 0
- [ ] ни одного `console.log` и отладочного `border: 1px solid red`
- [ ] в меню нет 404 (баг №3)
- [ ] карточки услуг ведут на страницы услуг (баг №4)
- [ ] форма заявки долетает до БД и в уведомления (баг №8)
- [ ] `x-nextjs-cache: HIT` на повторном запросе; вебхук сбрасывает точечно
- [ ] `media/` и `backups/` лежат вне `releases/` — деплой их не сносит
- [ ] откат переключением симлинка `current` проверен на живом сервере
- [ ] линтер границ FSD зелёный; домен в `api/src/domain/` не импортирует
      ни FastAPI, ни SQLAlchemy
- [ ] у каждой страницы осмысленный `<title>` и `description`
- [ ] `sitemap.xml` содержит 58 + 11 + ~9 URL
- [ ] Lighthouse SEO 100, performance ≥ 90
- [ ] `next build` без ворнингов, `pytest` зелёный
- [ ] Sapper удалён из репозитория
