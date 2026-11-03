from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from sqlalchemy import DateTime, ForeignKey, Index, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class AuthorModel(Base):
    __tablename__ = "authors"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(160), unique=True)
    name: Mapped[str] = mapped_column(String(200))
    bio: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    photo: Mapped[Optional[str]] = mapped_column(String(300), nullable=True)

    posts: Mapped[List["PostModel"]] = relationship(back_populates="author")


class CategoryModel(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(160), unique=True)
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    posts: Mapped[List["PostModel"]] = relationship(back_populates="category")


class PostModel(Base):
    __tablename__ = "posts"
    __table_args__ = (
        UniqueConstraint("category_id", "slug", name="uq_post_category_slug"),
        Index("ix_posts_published_at", "published_at"),
        Index("ix_posts_status", "status"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(200))
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    author_id: Mapped[Optional[int]] = mapped_column(ForeignKey("authors.id"), nullable=True)

    title: Mapped[str] = mapped_column(String(300))
    content: Mapped[str] = mapped_column(Text)
    excerpt: Mapped[str] = mapped_column(Text, default="")
    image: Mapped[Optional[str]] = mapped_column(String(300), nullable=True)

    # задел под админку
    status: Mapped[str] = mapped_column(String(20), default="published")
    published_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    meta_title: Mapped[Optional[str]] = mapped_column(String(300), nullable=True)
    meta_description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    category: Mapped[CategoryModel] = relationship(back_populates="posts")
    author: Mapped[Optional[AuthorModel]] = relationship(back_populates="posts")


class LeadModel(Base):
    __tablename__ = "leads"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    phone: Mapped[str] = mapped_column(String(32))
    message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    source_page: Mapped[Optional[str]] = mapped_column(String(300), nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="new")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
