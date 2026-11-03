export interface PostListItem {
  slug: string
  category: string
  categoryTitle: string | null
  title: string
  excerpt: string
  image: string | null
  author: string | null
  publishedAt: string | null
  url: string
}

export interface Post extends PostListItem {
  content: string
  metaTitle: string | null
  metaDescription: string | null
}

export interface PostPage {
  items: PostListItem[]
  total: number
  limit: number
  offset: number
}

export interface Category {
  slug: string
  title: string
  url: string
  postCount: number
  description: string | null
}

export interface PostRef {
  category: string
  slug: string
}
