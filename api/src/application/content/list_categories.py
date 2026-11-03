from __future__ import annotations

from typing import List

from src.domain.content.category.entity import Category
from src.domain.content.category.repository import CategoryRepository


class ListCategoriesUseCase:
    def __init__(self, categories: CategoryRepository):
        self._categories = categories

    async def __call__(self) -> List[Category]:
        return list(await self._categories.list())
