"""Доменная сущность статьи. Чистый Python: ни FastAPI, ни SQLAlchemy."""
from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Optional


class PublicationStatus(str, Enum):
    DRAFT = "draft"
    PUBLISHED = "published"


@dataclass(frozen=True)
class Post:
    slug: str
    category_slug: str
    title: str
    content: str
    excerpt: str
    status: PublicationStatus
    published_at: Optional[datetime] = None
    author_name: Optional[str] = None
    image: Optional[str] = None
    category_title: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

    @property
    def url(self) -> str:
        """Старый URL из WordPress — сохраняем побайтово, вместе с хвостовым слешем."""
        return f"/blog/{self.category_slug}/{self.slug}/"

    @property
    def is_visible(self) -> bool:
        return self.status is PublicationStatus.PUBLISHED
