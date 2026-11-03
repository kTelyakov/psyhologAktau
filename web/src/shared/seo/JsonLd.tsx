export function JsonLd({ data }: { data: string }) {
  return (
    <script
      type="application/ld+json"
      // данные собираются на сервере из наших же типизированных билдеров
      dangerouslySetInnerHTML={{ __html: data }}
    />
  )
}
