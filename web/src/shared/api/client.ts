import { API_URL_INTERNAL, REVALIDATE_SECONDS } from '../config'

interface FetchOptions {
  tags?: string[]
  revalidate?: number | false
}

/**
 * Единственная точка обращения к API. Переезд контента на другой источник
 * правится здесь и больше нигде (см. §5.1 плана — слой данных).
 */
export async function apiFetch<T>(
  path: string,
  { tags = [], revalidate = REVALIDATE_SECONDS }: FetchOptions = {},
): Promise<T> {
  const res = await fetch(`${API_URL_INTERNAL}/api/v1${path}`, {
    next: { tags: ['api', ...tags], revalidate },
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) {
    throw new ApiError(res.status, `${path} → ${res.status}`)
  }
  return res.json() as Promise<T>
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/** Мягкий вариант: при недоступном API возвращает fallback вместо падения. */
export async function apiFetchSafe<T>(
  path: string,
  fallback: T,
  options?: FetchOptions,
): Promise<T> {
  try {
    return await apiFetch<T>(path, options)
  } catch (e) {
    console.warn(`[api] ${path} недоступен, использую fallback:`, (e as Error).message)
    return fallback
  }
}
