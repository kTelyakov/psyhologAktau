import Link from 'next/link'

import { Button } from '@/shared/ui'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <p className="font-display text-7xl text-clay-200">404</p>
      <h1 className="mt-5 font-display text-3xl">Такой страницы нет</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">
        Возможно, она переехала. Попробуйте начать с главной или посмотрите статьи.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild size="lg"><Link href="/">На главную</Link></Button>
        <Button asChild size="lg" variant="outline"><Link href="/blog/">Статьи</Link></Button>
      </div>
    </div>
  )
}
