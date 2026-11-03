from __future__ import annotations

from typing import List, Optional, Sequence

from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.domain.content.post.entity import Post, PublicationStatus
from src.domain.content.post.repository import PostRepository
from src.infrastructure.db.models import CategoryModel, PostModel


def _to_entity(m: PostModel) -> Post:
    return Post(
        slug=m.slug,
        category_slug=m.category.slug,
        category_title=m.category.title,
        title=m.title,
        content=m.content,
        excerpt=m.excerpt or "",
        status=PublicationStatus(m.status),
        published_at=m.published_at,
        author_name=m.author.name if m.author else None,
        image=m.image,
        meta_title=m.meta_title,
        meta_description=m.meta_description,
    )


class SqlAlchemyPostRepository(PostRepository):
    def __init__(self, session: AsyncSession):
        self._s = session

    def _base(self):
        return (
            select(PostModel)
            .options(joinedload(PostModel.category), joinedload(PostModel.author))
            .join(CategoryModel)
        )

    def _filtered(self, stmt, category_slug, query):
        stmt = stmt.where(PostModel.status == PublicationStatus.PUBLISHED.value)
        if category_slug:
            stmt = stmt.where(CategoryModel.slug == category_slug)
        if query:
            like = f"%{query.strip()}%"
            # 58 статей, 220 КБ текста — полный скан быстрее, чем нужен индекс
            stmt = stmt.where(or_(PostModel.title.ilike(like), PostModel.content.ilike(like)))
        return stmt

    async def get(self, category_slug: str, slug: str) -> Optional[Post]:
        stmt = self._base().where(CategoryModel.slug == category_slug, PostModel.slug == slug)
        m = (await self._s.execute(stmt)).unique().scalar_one_or_none()
        return _to_entity(m) if m else None

    async def list(self, category_slug=None, query=None, limit=50, offset=0) -> Sequence[Post]:
        stmt = self._filtered(self._base(), category_slug, query)
        stmt = stmt.order_by(PostModel.published_at.desc().nullslast()).limit(limit).offset(offset)
        rows = (await self._s.execute(stmt)).unique().scalars().all()
        return [_to_entity(m) for m in rows]

    async def count(self, category_slug=None, query=None) -> int:
        stmt = self._filtered(select(func.count(PostModel.id)).join(CategoryModel), category_slug, query)
        return int((await self._s.execute(stmt)).scalar() or 0)

    async def all_published_refs(self) -> List[tuple]:
        stmt = (
            select(CategoryModel.slug, PostModel.slug)
            .join(CategoryModel)
            .where(PostModel.status == PublicationStatus.PUBLISHED.value)
        )
        return [(c, s) for c, s in (await self._s.execute(stmt)).all()]
