"""Pydantic-схемы транспорта. Намеренно отделены от доменных сущностей."""
from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class CategoryOut(BaseModel):
    slug: str
    title: str
    url: str
    postCount: int
    description: Optional[str] = None


class PostListItemOut(BaseModel):
    slug: str
    category: str
    categoryTitle: Optional[str] = None
    title: str
    excerpt: str
    image: Optional[str] = None
    author: Optional[str] = None
    publishedAt: Optional[datetime] = None
    url: str


class PostOut(PostListItemOut):
    content: str
    metaTitle: Optional[str] = None
    metaDescription: Optional[str] = None


class PostPageOut(BaseModel):
    items: List[PostListItemOut]
    total: int
    limit: int
    offset: int


class PostRefOut(BaseModel):
    category: str
    slug: str


class LeadIn(BaseModel):
    name: str = Field(min_length=2, max_length=200)
    phone: str = Field(min_length=5, max_length=32)
    message: Optional[str] = Field(default=None, max_length=2000)
    sourcePage: Optional[str] = Field(default=None, max_length=300)
    # honeypot: боты заполняют скрытые поля, люди — нет
    website: Optional[str] = Field(default=None, max_length=200)


class LeadOut(BaseModel):
    id: int
    status: str
    createdAt: Optional[datetime] = None
