from __future__ import annotations

from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class Category:
    slug: str
    title: str
    post_count: int = 0
    description: Optional[str] = None
    sort_order: int = 0

    @property
    def url(self) -> str:
        return f"/blog/{self.slug}/"
