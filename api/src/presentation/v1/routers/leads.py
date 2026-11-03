from __future__ import annotations

import logging

from fastapi import APIRouter, Depends, HTTPException, Request

from src.application.leads.submit_lead import SubmitLeadUseCase
from src.domain.leads.value_objects import InvalidPhone
from src.presentation.v1.deps import submit_lead_uc
from src.presentation.v1.schemas import LeadIn, LeadOut

log = logging.getLogger(__name__)
router = APIRouter(prefix="/leads", tags=["leads"])


@router.post("", response_model=LeadOut, status_code=201)
async def submit_lead(
    payload: LeadIn,
    request: Request,
    uc: SubmitLeadUseCase = Depends(submit_lead_uc),
):
    # honeypot: поле скрыто в вёрстке, заполнить его мог только бот
    if payload.website:
        log.info("Honeypot сработал, ip=%s", request.client.host if request.client else "?")
        raise HTTPException(status_code=400, detail="Заявка не принята")

    try:
        lead = await uc(
            name=payload.name,
            phone_raw=payload.phone,
            message=payload.message,
            source_page=payload.sourcePage,
        )
    except InvalidPhone as e:
        raise HTTPException(status_code=422, detail=str(e))

    return LeadOut(id=lead.id, status=lead.status.value, createdAt=lead.created_at)
