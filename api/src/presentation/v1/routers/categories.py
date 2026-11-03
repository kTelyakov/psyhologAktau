from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends

from src.application.content.list_categories import ListCategoriesUseCase
from src.presentation.v1 import mappers
from src.presentation.v1.deps import list_categories_uc
from src.presentation.v1.schemas import CategoryOut

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=List[CategoryOut])
async def list_categories(uc: ListCategoriesUseCase = Depends(list_categories_uc)):
    return [mappers.category_out(c) for c in await uc()]
