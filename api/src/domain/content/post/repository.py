"""Интерфейс репозитория. Реализация живёт в infrastructure."""
from __future__ import annotations

from abc import ABC, abstractmethod
from typing import List, Optional, Sequence

from .entity import Post


class PostRepository(ABC):
    @abstractmethod
    async def get(self, category_slug: str, slug: str) -> Optional[Post]: ...

    @abstractmethod
    async def list(
        self,
        category_slug: Optional[str] = None,
        query: Optional[str] = None,
        limit: int = 50,
        offset: int = 0,
    ) -> Sequence[Post]: ...

    @abstractmethod
    async def count(
        self, category_slug: Optional[str] = None, query: Optional[str] = None
    ) -> int: ...

    @abstractmethod
    async def all_published_refs(self) -> List[tuple]: ...
