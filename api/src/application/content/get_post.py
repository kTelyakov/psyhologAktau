from __future__ import annotations

from src.domain.content.post.entity import Post
from src.domain.content.post.exceptions import PostNotFound
from src.domain.content.post.repository import PostRepository


class GetPostUseCase:
    def __init__(self, posts: PostRepository):
        self._posts = posts

    async def __call__(self, category_slug: str, slug: str) -> Post:
        post = await self._posts.get(category_slug, slug)
        if post is None or not post.is_visible:
            raise PostNotFound(category_slug, slug)
        return post
