import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Старые URL из WordPress были с хвостовым слешем — сохраняем побайтово
  trailingSlash: true,
  outputFileTracingRoot: __dirname,
  images: { formats: ['image/avif', 'image/webp'] },
}

export default nextConfig
