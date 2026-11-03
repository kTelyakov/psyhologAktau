// Нормализация контента, выдранного из WordPress.
// Вход:  src/posts_content/index.js  (61 запись, сырой HTML)
// Выход: content/posts/<category>/<slug>.json + content/index.json
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(root, 'content')

// index.js — ESM-модуль без package type, импортируем через временную копию
const tmp = join(OUT, '.posts.mjs')
mkdirSync(OUT, { recursive: true })
writeFileSync(tmp, readFileSync(join(root, 'src/posts_content/index.js')))
const { posts: raw } = await import(tmp + '?t=' + Date.now())
rmSync(tmp)

const CATEGORY_TITLES = {
  'dlja-devushek': 'Для девушек',
  'semja': 'Семья',
  'poleznye-sovety': 'Полезные советы',
  'strahi': 'Страхи',
  'knigi': 'Книги',
  'zavisimosti': 'Зависимости',
  'kakaja-u-tebja-sudba': 'Какая у тебя судьба',
  'master-klassy': 'Мастер-классы',
  'kak-pravilno-obshhatsja': 'Как правильно общаться',
  'stati-gulsary-karajchikovoj': 'Статьи Гульсары Карайчиковой',
  'stati-tatjany-ivahnickoj': 'Статьи Татьяны Ивахницкой',
}

// Классы-мусор от скрейпа Instagram
const JUNK_CLASSES = /\b(Xl2Pu|gElp9|P9YgZ|C7I1f|X7jCj|C4VMK|_8-yf5|FPmhX|notranslate|_0imsa|Jv7Aj|KL4Bh|FFVAD|eLAPa|RnEpo|Yi5aA|_9AhH0|ZyFrc|_7UhW9|qyrsm|KV-D4|se6yk|T0kll)\b/g

const stats = { dropped: [], noDate: [], total: 0 }

function extractDate(html) {
  const m = html.match(/data-item_date="([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9:+]+)"/)
  return m ? m[1] : null
}

function clean(html) {
  let s = html

  // 1. Виджет LikeBtn целиком (вместе с комментариями-маркерами)
  s = s.replace(/<div class="likebtn_container"[\s\S]*?<\/div>/gi, '')
  s = s.replace(/<!--\s*LikeBtn\.com (BEGIN|END)\s*-->/gi, '')
  s = s.replace(/<span class="likebtn-wrapper"[\s\S]*?<\/span>/gi, '')

  // 2. WP-якорь «читать далее»
  s = s.replace(/<span id="more-\d+"><\/span>/gi, '')

  // 3. Разворачиваем обёртки Instagram: выкидываем теги с мусорными классами,
  //    сохраняя внутренний текст
  for (let i = 0; i < 8; i++) {
    const before = s
    s = s.replace(
      /<(div|ul|li|span)\b[^>]*class="[^"]*(?:Xl2Pu|gElp9|P9YgZ|C7I1f|X7jCj|C4VMK)[^"]*"[^>]*>([\s\S]*?)<\/\1>/gi,
      '$2'
    )
    if (s === before) break
  }
  s = s.replace(JUNK_CLASSES, '')
  s = s.replace(/\sclass="\s*"/g, '')

  // 4. Абсолютные ссылки на свой же домен → относительные
  s = s.replace(/https?:\/\/(?:www\.)?psyholog-aktau\.kz/gi, '')

  // 5. Картинки из wp-content переезжают в /media/
  s = s.replace(/(?:\/)?blog\/wp-content\/uploads\//gi, '/media/')

  // 6. Пустые абзацы и мусорные атрибуты
  s = s.replace(/<p>\s*(?:&nbsp;)?\s*<\/p>/gi, '')
  s = s.replace(/\sstyle="\s*"/g, '')
  s = s.replace(/<(\w+)>\s*<\/\1>/g, '')

  // 7. Пересборка абзацев.
  //    В выгрузке WordPress текст склеен тегами <br>, причём часто лежит
  //    вообще вне <p>. Поэтому: прячем блочные элементы, приводим все
  //    разделители к пустой строке, затем заново раскладываем по абзацам.
  const blocks = []
  const BLOCK_RE = /<(ul|ol|blockquote|h[2-6]|table|figure|pre)\b[\s\S]*?<\/\1>|<(?:hr|img)\b[^>]*\/?>/gi
  s = s.replace(BLOCK_RE, (m) => {
    blocks.push(m)
    return `\n\n@@BLOCK${blocks.length - 1}@@\n\n`
  })

  // Любой <br> и любая граница <p> — это конец абзаца
  s = s.replace(/<br\s*\/?>/gi, '\n\n')
  s = s.replace(/<\/?p\b[^>]*>/gi, '\n\n')
  s = s.replace(/<\/?div\b[^>]*>/gi, '\n\n')

  s = s
    .split(/\n{2,}/)
    .map((chunk) => chunk.replace(/\s+/g, ' ').trim())
    .filter((chunk) => chunk && chunk !== '&nbsp;' && chunk !== '&nbsp')
    .map((chunk) => (/^@@BLOCK\d+@@$/.test(chunk) ? chunk : `<p>${chunk}</p>`))
    .join('\n')

  // 8. Возвращаем блочные элементы на место
  s = s.replace(/@@BLOCK(\d+)@@/g, (_, i) => blocks[Number(i)])

  // 9. Финальная чистка
  s = s.replace(/<p>\s*<\/p>/gi, '')
  s = s.replace(/\n{3,}/g, '\n\n').trim()

  return s
}

function makeExcerpt(html, limit = 180) {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= limit) return text
  const cut = text.slice(0, limit)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).trim() + '…'
}

const out = []

for (const post of raw) {
  if (!post || !post.slug) continue
  stats.total++

  const parts = post.slug.replace(/\/$/, '').split('/')

  // WP attachment-страницы: blog/<cat>/<post>/attachment/<file>/ — это не статьи
  if (parts.includes('attachment')) {
    stats.dropped.push(post.slug)
    continue
  }
  if (parts.length !== 3 || parts[0] !== 'blog') {
    stats.dropped.push(post.slug + ' (неожиданная структура)')
    continue
  }

  const [, category, slug] = parts
  const publishedAt = extractDate(post.content || '')
  if (!publishedAt) stats.noDate.push(`${category}/${slug}`)

  const content = clean(post.content || '')

  out.push({
    slug,
    category,
    categoryTitle: CATEGORY_TITLES[category] || category,
    title: (post.title || '').trim(),
    author: (post.author || '').trim() || null,
    image: post.img || null,
    publishedAt,
    excerpt: makeExcerpt(content),
    content,
    url: `/blog/${category}/${slug}/`,
  })
}

out.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))

rmSync(join(OUT, 'posts'), { recursive: true, force: true })
for (const p of out) {
  const dir = join(OUT, 'posts', p.category)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, p.slug + '.json'), JSON.stringify(p, null, 2))
}

const categories = [...new Set(out.map(p => p.category))].map(c => ({
  slug: c,
  title: CATEGORY_TITLES[c] || c,
  count: out.filter(p => p.category === c).length,
}))
categories.sort((a, b) => b.count - a.count)

const authors = [...new Set(out.map(p => p.author).filter(Boolean))]

writeFileSync(join(OUT, 'index.json'), JSON.stringify({
  generatedAt: new Date().toISOString(),
  posts: out.map(({ content, ...meta }) => meta),
  categories,
  authors,
}, null, 2))

console.log(`статей на выходе : ${out.length}  (на входе ${stats.total})`)
console.log(`выброшено        : ${stats.dropped.length}`)
stats.dropped.forEach(s => console.log('   - ' + s))
console.log(`без даты         : ${stats.noDate.length}${stats.noDate.length ? ' → ' + stats.noDate.join(', ') : ''}`)
console.log(`категорий        : ${categories.length}`)
console.log(`авторов          : ${authors.length} → ${authors.join(', ')}`)
