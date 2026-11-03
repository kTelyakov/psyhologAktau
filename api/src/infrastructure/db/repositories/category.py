from __future__ import annotations

from typing import Optional, Sequence

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from src.domain.content.category.entity import Category
from src.domain.content.category.repository import CategoryRepository
from src.domain.content.post.entity import PublicationStatus
from src.infrastructure.db.models import CategoryModel, PostModel


class SqlAlchemyCategoryRepository(CategoryRepository):
    def __init__(self, session: AsyncSession):
        self._s = session

    def _stmt(self, slug: Optional[str] = None):
        stmt = (
            select(
                CategoryModel.slug,
                CategoryModel.title,
                CategoryModel.description,
                CategoryModel.sort_order,
                func.count(PostModel.id),
            )
            .outerjoin(
                PostModel,
                (PostModel.category_id == CategoryModel.id)
                & (PostModel.status == PublicationStatus.PUBLISHED.value),
            )
            .group_by(CategoryModel.id)
        )
        if slug is not None:
            stmt = stmt.where(CategoryModel.slug == slug)
        return stmt

    async def list(self) -> Sequence[Category]:
        rows = (await self._s.execute(self._stmt().order_by(func.count(PostModel.id).desc()))).all()
        return [
            Category(slug=s, title=t, description=d, sort_order=o, post_count=c)
            for s, t, d, o, c in rows
        ]

    async def get(self, slug: str) -> Optional[Category]:
        row = (await self._s.execute(self._stmt(slug))).first()
        if not row:
            return None
        s, t, d, o, c = row
        return Category(slug=s, title=t, description=d, sort_order=o, post_count=c)
