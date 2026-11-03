import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

/**
 * Точечный сброс ISR-кэша. Вызывается из FastAPI после записи контента —
 * контракт для будущей админки (§8 плана).
 *
 * POST /api/revalidate
 * { "secret": "...", "tags": ["posts"], "paths": ["/blog/semja/..."] }
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) {
    return NextResponse.json({ error: 'REVALIDATE_SECRET не задан' }, { status: 503 })
  }

  let body: { secret?: string; tags?: string[]; paths?: string[] }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Невалидный JSON' }, { status: 400 })
  }

  if (body.secret !== secret) {
    return NextResponse.json({ error: 'Неверный секрет' }, { status: 401 })
  }

  const tags = body.tags ?? ['posts', 'categories']
  const paths = body.paths ?? []

  tags.forEach((t) => revalidateTag(t))
  paths.forEach((p) => revalidatePath(p))

  return NextResponse.json({ revalidated: true, tags, paths, at: Date.now() })
}
