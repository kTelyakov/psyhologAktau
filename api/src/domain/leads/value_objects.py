"""Телефон в формате РК. Валидация — часть домена, а не схемы запроса."""
from __future__ import annotations

import re
from dataclasses import dataclass

_DIGITS = re.compile(r"\D+")


class InvalidPhone(ValueError):
    pass


@dataclass(frozen=True)
class PhoneKZ:
    value: str

    @classmethod
    def parse(cls, raw: str) -> "PhoneKZ":
        digits = _DIGITS.sub("", raw or "")
        if digits.startswith("8") and len(digits) == 11:
            digits = "7" + digits[1:]
        if len(digits) == 10:
            digits = "7" + digits
        if len(digits) != 11 or not digits.startswith("7"):
            raise InvalidPhone(
                "Телефон должен быть в формате +7 7XX XXX XX XX"
            )
        return cls("+" + digits)

    def __str__(self) -> str:
        return self.value
