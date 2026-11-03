from __future__ import annotations

from abc import ABC, abstractmethod

from .entity import Lead


class LeadRepository(ABC):
    @abstractmethod
    async def add(self, lead: Lead) -> Lead: ...
