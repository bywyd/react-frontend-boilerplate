import { useAuthStore } from "@/stores/auth.store"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = useAuthStore.getState().token

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (response.status === 401) {
    useAuthStore.getState().clearAuth()
    window.location.href = "/login"
    throw new Error("Unauthorized")
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`
    try {
      const body = await response.json()
      if (body?.message) message = body.message
    } catch {
      // ignore parse errors
    }
    throw new Error(message)
  }

  return response.json() as Promise<T>
}
