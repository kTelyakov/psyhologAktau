import { CalendarDays } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { cn, formatDate } from '@/shared/lib'
import type { PostListItem } from '@/shared/api'

export function PostCard({
  post,
  showCategory = true,
  className,
}: {
  post: PostListItem
  showCategory?: boolean
  className?: string
}) {
  return (
    <Link
      href={post.url}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-rule bg-white',
        'transition-all duration-300 hover:-translate-y-1 hover:border-clay-200 hover:shadow-[0_18px_40px_-12px_rgba(33,29,26,0.18)]',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-clay-50">
        {post.image ? (
          <Image
            src={`/media/${post.image}`}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="size-full bg-gradient-to-br from-clay-100 to-sage-100" />
        )}
        {showCategory && post.categoryTitle && (
          <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-clay-600 backdrop-blur-sm">
            {post.categoryTitle}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <h2 className="font-display text-xl leading-snug transition-colors group-hover:text-clay-600">
          {post.title}
        </h2>
        <p className="line-clamp-3 flex-1 text-[15px] leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-[13px] text-ink-soft">
          <CalendarDays className="size-3.5" />
          <span>{formatDate(post.publishedAt)}</span>
          {post.author && <span className="truncate">· {post.author}</span>}
        </div>
      </div>
    </Link>
  )
}
