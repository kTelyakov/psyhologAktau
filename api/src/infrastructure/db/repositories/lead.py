from __future__ import annotations

from sqlalchemy.ext.asyncio import AsyncSession

from src.domain.leads.entity import Lead
from src.domain.leads.repository import LeadRepository
from src.infrastructure.db.models import LeadModel


class SqlAlchemyLeadRepository(LeadRepository):
    def __init__(self, session: AsyncSession):
        self._s = session

    async def add(self, lead: Lead) -> Lead:
        m = LeadModel(
            name=lead.name,
            phone=str(lead.phone),
            message=lead.message,
            source_page=lead.source_page,
            status=lead.status.value,
        )
        self._s.add(m)
        await self._s.commit()
        await self._s.refresh(m)
        lead.id = m.id
        lead.created_at = m.created_at
        return lead
