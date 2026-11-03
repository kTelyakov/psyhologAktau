from __future__ import annotations

import logging

import httpx

from src.domain.leads.entity import Lead
from src.domain.leads.ports import NotificationPort

log = logging.getLogger(__name__)


class TelegramNotifier(NotificationPort):
    def __init__(self, token: str, chat_id: str):
        self._token = token
        self._chat_id = chat_id

    async def notify_new_lead(self, lead: Lead) -> None:
        text = (
            "🔔 <b>Новая заявка</b>\n\n"
            f"<b>Имя:</b> {lead.name}\n"
            f"<b>Телефон:</b> {lead.phone}\n"
        )
        if lead.message:
            text += f"<b>Сообщение:</b> {lead.message}\n"
        if lead.source_page:
            text += f"<b>Страница:</b> {lead.source_page}\n"

        async with httpx.AsyncClient(timeout=10) as client:
            await client.post(
                f"https://api.telegram.org/bot{self._token}/sendMessage",
                json={"chat_id": self._chat_id, "text": text, "parse_mode": "HTML"},
            )


class LogNotifier(NotificationPort):
    """Заглушка на время разработки: пока нет токена — пишем в лог."""

    async def notify_new_lead(self, lead: Lead) -> None:
        log.warning(
            "НОВАЯ ЗАЯВКА (telegram не настроен) id=%s %s %s | %s",
            lead.id, lead.name, lead.phone, lead.message or "—",
        )
