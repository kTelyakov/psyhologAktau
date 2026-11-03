from __future__ import annotations

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query

from src.application.content.get_post import GetPostUseCase
from src.application.content.list_posts import ListPostsUseCase
from src.domain.content.post.exceptions import PostNotFound
from src.presentation.v1 import mappers
from src.presentation.v1.deps import get_post_uc, list_posts_uc, post_repo
from src.presentation.v1.schemas import PostOut, PostPageOut, PostRefOut

router = APIRouter(prefix="/posts", tags=["posts"])


@router.get("", response_model=PostPageOut)
async def list_posts(
    category: Optional[str] = None,
    q: Optional[str] = Query(default=None, max_length=200),
    limit: int = Query(default=50, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    uc: ListPostsUseCase = Depends(list_posts_uc),
):
    page = await uc(category_slug=category, query=q, limit=limit, offset=offset)
    return PostPageOut(
        items=[mappers.post_list_item_out(p) for p in page.items],
        total=page.total, limit=page.limit, offset=page.offset,
    )


@router.get("/refs", response_model=List[PostRefOut])
async def post_refs(repo=Depends(post_repo)):
    """Для generateStaticParams в Next — только пары (category, slug)."""
    return [PostRefOut(category=c, slug=s) for c, s in await repo.all_published_refs()]


@router.get("/{category}/{slug}", response_model=PostOut)
async def get_post(category: str, slug: str, uc: GetPostUseCase = Depends(get_post_uc)):
    try:
        return mappers.post_out(await uc(category, slug))
    except PostNotFound as e:
        raise HTTPException(status_code=404, detail=str(e))
