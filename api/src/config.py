from __future__ import annotations

from typing import Optional

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # SQLite локально, Postgres на проде — меняется одной переменной.
    database_url: str = "sqlite+aiosqlite:///./psyholog.db"

    cors_origins: str = "http://localhost:3000"

    telegram_bot_token: Optional[str] = None
    telegram_chat_id: Optional[str] = None

    revalidate_url: Optional[str] = None
    revalidate_secret: Optional[str] = None

    @property
    def cors_list(self) -> list:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
