import type { AuthResponse, LoginPayload } from "@/types/auth"
import { apiFetch } from "./client"

export function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}
