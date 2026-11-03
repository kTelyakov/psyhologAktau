from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Optional, Sequence

from .entity import Category


class CategoryRepository(ABC):
    @abstractmethod
    async def list(self) -> Sequence[Category]: ...

    @abstractmethod
    async def get(self, slug: str) -> Optional[Category]: ...
