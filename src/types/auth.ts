export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  first_login: boolean
  last_login: string | null
}

export interface AuthResponse {
  success: boolean
  message: string
  token: string
  user: User
}

export interface LoginPayload {
  email: string
  password: string
}
