import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Старые URL из WordPress были с хвостовым слешем — сохраняем побайтово
  trailingSlash: true,
  outputFileTracingRoot: __dirname,
  images: { formats: ['image/avif', 'image/webp'] },

  async redirects() {
    return [
      // Рубрика второго автора расформирована, статья переехала
      // в «Полезные советы». Старые адреса проиндексированы — отдаём 301.
      {
        source: '/blog/stati-tatjany-ivahnickoj/:slug*',
        destination: '/blog/poleznye-sovety/:slug*',
        permanent: true,
      },
      // Страницы-вложения WordPress: мусор от скрейпа, ведём на родителя
      {
        source: '/blog/:category/:slug/attachment/:file*',
        destination: '/blog/:category/:slug',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
