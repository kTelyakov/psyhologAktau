import { API_URL_PUBLIC } from '@/shared/config'

export interface LeadPayload {
  name: string
  phone: string
  message?: string
  sourcePage?: string
  website?: string // honeypot
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch(`${API_URL_PUBLIC}/api/v1/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    const detail = body?.detail
    throw new Error(
      typeof detail === 'string' ? detail : 'Не удалось отправить заявку. Попробуйте позвонить.',
    )
  }
}
