from __future__ import annotations

from dataclasses import dataclass
from typing import List, Optional

from src.domain.content.post.entity import Post
from src.domain.content.post.repository import PostRepository


@dataclass
class PostPage:
    items: List[Post]
    total: int
    limit: int
    offset: int


class ListPostsUseCase:
    def __init__(self, posts: PostRepository):
        self._posts = posts

    async def __call__(
        self,
        category_slug: Optional[str] = None,
        query: Optional[str] = None,
        limit: int = 50,
        offset: int = 0,
    ) -> PostPage:
        items = await self._posts.list(category_slug, query, limit, offset)
        total = await self._posts.count(category_slug, query)
        return PostPage(items=list(items), total=total, limit=limit, offset=offset)
