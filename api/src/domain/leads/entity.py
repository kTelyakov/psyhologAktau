from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Optional

from .value_objects import PhoneKZ


class LeadStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    CLOSED = "closed"


@dataclass
class Lead:
    name: str
    phone: PhoneKZ
    message: Optional[str] = None
    source_page: Optional[str] = None
    status: LeadStatus = LeadStatus.NEW
    created_at: Optional[datetime] = None
    id: Optional[int] = None
