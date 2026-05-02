import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { SquareTerminalIcon } from "lucide-react"

import { loginApi } from "@/api/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useAuthStore } from "@/stores/auth.store"

const APP_NAME = import.meta.env.VITE_APP_NAME ?? "My App"
const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? "1.0.0"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      setAuth(data.token, data.user)
      navigate("/dashboard", { replace: true })
    },
    onError: (error: Error) => {
      toast.error(error.message ?? "Login failed. Please check your credentials.")
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) return
    mutate({ email, password })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <SquareTerminalIcon className="size-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{APP_NAME}</h1>
            <p className="text-xs text-muted-foreground">v{APP_VERSION}</p>
          </div>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader className="pb-2">
            <p className="text-center text-base font-semibold">Sign in</p>
            <p className="text-center text-sm text-muted-foreground">
              Enter your credentials to continue
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isPending}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isPending}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Spinner className="mr-1" />}
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account? Contact your administrator.
        </p>
      </div>
    </div>
  )
}
