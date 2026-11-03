# Психолог в Актау

Сайт центра практической психологии «Ару-Ана».
Миграция с Sapper на Next.js + Mantine + FastAPI — см. [MIGRATION_PLAN.md](MIGRATION_PLAN.md).

## Структура

```
web/        Next.js 15 (App Router, ISR) + Mantine 7, архитектура FSD
api/        FastAPI + SQLAlchemy 2 + Alembic, архитектура DDD
content/    нормализованные статьи (артефакт scripts/clean-posts.mjs)
scripts/    чистилка контента из WordPress
src/        старый Sapper — удаляется на этапе 9
```

## Запуск локально

### 1. Контент

```bash
node scripts/clean-posts.mjs        # 61 запись → 58 статей в content/
```

### 2. API (порт 8000)

```bash
cd api
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/alembic upgrade head
.venv/bin/python -m scripts.seed    # заливка content/ в БД
.venv/bin/uvicorn src.presentation.main:app --port 8000
```

Документация API: http://localhost:8000/api/docs

### 3. Фронтенд (порт 3000)

```bash
cd web
npm ci
npm run build && npm start          # ISR работает только в проде
```

`npm run dev` игнорирует ISR — для проверки кэша нужен `build && start`.

## Переменные окружения

| Переменная | Где | Назначение |
|---|---|---|
| `DATABASE_URL` | api | `sqlite+aiosqlite:///./psyholog.db` локально, Postgres на проде |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | api | уведомления о заявках; без них пишет в лог |
| `API_URL_INTERNAL` | web | адрес API для серверного рендеринга |
| `NEXT_PUBLIC_API_URL` | web | адрес API для браузера (форма заявки) |
| `REVALIDATE_SECRET` | обе | защита ручки сброса ISR-кэша |

## Проверка ISR

```bash
curl -I http://localhost:3000/blog/strahi/chem-vreden-cheloveku-strah/ | grep x-nextjs-cache
# HIT — отдан кэш, STALE — отдан устаревший + фоновый рендер, MISS — рендер на месте
```

Точечный сброс кэша:

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H 'Content-Type: application/json' \
  -d '{"secret":"...","tags":["posts"]}'
```
