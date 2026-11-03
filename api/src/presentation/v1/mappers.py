from __future__ import annotations

from src.domain.content.category.entity import Category
from src.domain.content.post.entity import Post

from .schemas import CategoryOut, PostListItemOut, PostOut


def category_out(c: Category) -> CategoryOut:
    return CategoryOut(
        slug=c.slug, title=c.title, url=c.url,
        postCount=c.post_count, description=c.description,
    )


def _common(p: Post) -> dict:
    return dict(
        slug=p.slug, category=p.category_slug, categoryTitle=p.category_title,
        title=p.title, excerpt=p.excerpt, image=p.image,
        author=p.author_name, publishedAt=p.published_at, url=p.url,
    )


def post_list_item_out(p: Post) -> PostListItemOut:
    return PostListItemOut(**_common(p))


def post_out(p: Post) -> PostOut:
    return PostOut(
        **_common(p), content=p.content,
        metaTitle=p.meta_title, metaDescription=p.meta_description,
    )
