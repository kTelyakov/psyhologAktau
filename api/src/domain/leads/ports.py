"""Порт уведомления. Сценарий не знает, что внутри — Telegram, почта или лог."""
from __future__ import annotations

from abc import ABC, abstractmethod

from .entity import Lead


class NotificationPort(ABC):
    @abstractmethod
    async def notify_new_lead(self, lead: Lead) -> None: ...
