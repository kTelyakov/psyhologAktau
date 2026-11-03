"""Заливка нормализованного контента в БД. Идемпотентно (upsert по category+slug).

Запуск:  .venv/bin/python -m scripts.seed
Вход:    ../content/posts/<category>/<slug>.json  (готовит scripts/clean-posts.mjs)
"""
from __future__ import annotations

import asyncio
import json
import re
import sys
from datetime import datetime
from pathlib import Path

import nh3
from sqlalchemy import select

from src.infrastructure.db.models import AuthorModel, CategoryModel, PostModel
from src.infrastructure.db.session import SessionFactory

CONTENT = Path(__file__).resolve().parents[2] / "content"

# Контент пришёл из скрейпа WordPress — санитизация обязательна
ALLOWED_TAGS = {
    "p", "br", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li",
    "h2", "h3", "h4", "blockquote", "a", "img", "figure", "figcaption",
    "table", "thead", "tbody", "tr", "th", "td", "hr", "code", "pre", "span",
}
ALLOWED_ATTRS = {
    "a": {"href", "title", "target"},
    "img": {"src", "alt", "title", "width", "height", "loading"},
}


def slugify(name: str) -> str:
    table = str.maketrans({
        "а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ё":"e","ж":"zh","з":"z",
        "и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r",
        "с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"shh",
        "ъ":"","ы":"y","ь":"","э":"e","ю":"ju","я":"ja"," ":"-",
    })
    return re.sub(r"-+", "-", name.lower().translate(table)).strip("-")


async def main() -> int:
    index_path = CONTENT / "index.json"
    if not index_path.exists():
        print(f"нет {index_path} — сначала: node scripts/clean-posts.mjs", file=sys.stderr)
        return 1

    index = json.loads(index_path.read_text(encoding="utf-8"))
    created = updated = 0

    async with SessionFactory() as s:
        # авторы
        authors = {}
        for name in index["authors"]:
            slug = slugify(name)
            m = (await s.execute(select(AuthorModel).where(AuthorModel.slug == slug))).scalar_one_or_none()
            if m is None:
                m = AuthorModel(slug=slug, name=name)
                s.add(m)
                await s.flush()
            authors[name] = m

        # категории
        categories = {}
        for i, c in enumerate(index["categories"]):
            m = (await s.execute(
                select(CategoryModel).where(CategoryModel.slug == c["slug"])
            )).scalar_one_or_none()
            if m is None:
                m = CategoryModel(slug=c["slug"], title=c["title"], sort_order=i)
                s.add(m)
                await s.flush()
            else:
                m.title, m.sort_order = c["title"], i
            categories[c["slug"]] = m

        # статьи
        for meta in index["posts"]:
            path = CONTENT / "posts" / meta["category"] / f"{meta['slug']}.json"
            data = json.loads(path.read_text(encoding="utf-8"))
            cat = categories[data["category"]]

            clean_html = nh3.clean(
                data["content"], tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRS
            )
            published = (
                datetime.fromisoformat(data["publishedAt"]) if data.get("publishedAt") else None
            )

            m = (await s.execute(
                select(PostModel).where(
                    PostModel.category_id == cat.id, PostModel.slug == data["slug"]
                )
            )).scalar_one_or_none()

            fields = dict(
                title=data["title"],
                content=clean_html,
                excerpt=data.get("excerpt") or "",
                image=data.get("image"),
                status="published",
                published_at=published,
                author_id=authors[data["author"]].id if data.get("author") in authors else None,
            )
            if m is None:
                s.add(PostModel(slug=data["slug"], category_id=cat.id, **fields))
                created += 1
            else:
                for k, v in fields.items():
                    setattr(m, k, v)
                updated += 1

        # Удаляем то, чего больше нет в контенте: статьи переносят между
        # рубриками, рубрики расформировывают. Без этого в БД копятся
        # осиротевшие записи и счётчики расходятся с источником.
        wanted = {(p["category"], p["slug"]) for p in index["posts"]}
        stale_posts = 0
        rows = (await s.execute(
            select(PostModel, CategoryModel.slug).join(CategoryModel)
        )).all()
        for post, cat_slug in rows:
            if (cat_slug, post.slug) not in wanted:
                await s.delete(post)
                stale_posts += 1

        await s.flush()

        wanted_cats = {c["slug"] for c in index["categories"]}
        stale_cats = 0
        for cat in (await s.execute(select(CategoryModel))).scalars().all():
            if cat.slug not in wanted_cats:
                await s.delete(cat)
                stale_cats += 1

        wanted_authors = {slugify(a) for a in index["authors"]}
        stale_authors = 0
        for author in (await s.execute(select(AuthorModel))).scalars().all():
            if author.slug not in wanted_authors:
                await s.delete(author)
                stale_authors += 1

        await s.commit()

    if stale_posts or stale_cats or stale_authors:
        print(f"удалено    : статей {stale_posts}, рубрик {stale_cats}, авторов {stale_authors}")
    print(f"авторов    : {len(index['authors'])}")
    print(f"категорий  : {len(index['categories'])}")
    print(f"статей     : создано {created}, обновлено {updated}")
    return 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
