"""Сборка use-case'ов. Единственное место, где слои знакомятся друг с другом."""
from __future__ import annotations

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.application.content.get_post import GetPostUseCase
from src.application.content.list_categories import ListCategoriesUseCase
from src.application.content.list_posts import ListPostsUseCase
from src.application.leads.submit_lead import SubmitLeadUseCase
from src.config import settings
from src.domain.leads.ports import NotificationPort
from src.infrastructure.db.repositories.category import SqlAlchemyCategoryRepository
from src.infrastructure.db.repositories.lead import SqlAlchemyLeadRepository
from src.infrastructure.db.repositories.post import SqlAlchemyPostRepository
from src.infrastructure.db.session import get_session
from src.infrastructure.notifications.telegram import LogNotifier, TelegramNotifier


def post_repo(s: AsyncSession = Depends(get_session)):
    return SqlAlchemyPostRepository(s)


def category_repo(s: AsyncSession = Depends(get_session)):
    return SqlAlchemyCategoryRepository(s)


def lead_repo(s: AsyncSession = Depends(get_session)):
    return SqlAlchemyLeadRepository(s)


def notifier() -> NotificationPort:
    if settings.telegram_bot_token and settings.telegram_chat_id:
        return TelegramNotifier(settings.telegram_bot_token, settings.telegram_chat_id)
    return LogNotifier()


def get_post_uc(r=Depends(post_repo)) -> GetPostUseCase:
    return GetPostUseCase(r)


def list_posts_uc(r=Depends(post_repo)) -> ListPostsUseCase:
    return ListPostsUseCase(r)


def list_categories_uc(r=Depends(category_repo)) -> ListCategoriesUseCase:
    return ListCategoriesUseCase(r)


def submit_lead_uc(r=Depends(lead_repo), n=Depends(notifier)) -> SubmitLeadUseCase:
    return SubmitLeadUseCase(r, n)
