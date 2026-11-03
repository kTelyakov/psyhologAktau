"""Сценарий приёма заявки: валидация → запись → уведомление.

Про Telegram, SQLAlchemy и HTTP не знает ничего.
"""
from __future__ import annotations

import logging
from typing import Optional

from src.domain.leads.entity import Lead
from src.domain.leads.ports import NotificationPort
from src.domain.leads.repository import LeadRepository
from src.domain.leads.value_objects import PhoneKZ

log = logging.getLogger(__name__)


class SubmitLeadUseCase:
    def __init__(self, leads: LeadRepository, notifier: NotificationPort):
        self._leads = leads
        self._notifier = notifier

    async def __call__(
        self,
        name: str,
        phone_raw: str,
        message: Optional[str] = None,
        source_page: Optional[str] = None,
    ) -> Lead:
        lead = Lead(
            name=name.strip(),
            phone=PhoneKZ.parse(phone_raw),   # бросит InvalidPhone
            message=(message or "").strip() or None,
            source_page=source_page,
        )
        saved = await self._leads.add(lead)

        # Падение канала уведомления не должно терять заявку — она уже в БД
        try:
            await self._notifier.notify_new_lead(saved)
        except Exception:
            log.exception("Не удалось отправить уведомление о заявке id=%s", saved.id)

        return saved
