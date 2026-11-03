from __future__ import annotations

import logging

from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import settings
from src.presentation.v1.routers import categories, leads, posts

logging.basicConfig(level=logging.INFO)

app = FastAPI(
    title="Психолог Актау — API",
    version="1.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

v1 = APIRouter(prefix="/api/v1")
v1.include_router(posts.router)
v1.include_router(categories.router)
v1.include_router(leads.router)


@v1.get("/health", tags=["health"])
async def health():
    return {"status": "ok"}


app.include_router(v1)
