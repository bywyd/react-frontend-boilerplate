import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { loginApi } from "@/api/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useAuthStore } from "@/stores/auth.store"
import AppLogoIcon from "@/components/app-logo-icon"
import { siteConfig } from "@/config/site"

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
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between bg-primary p-10 text-primary-foreground">
        <div className="flex items-center gap-2 text-lg font-semibold">
            <AppLogoIcon className="size-8" />
          {siteConfig.name}
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
            <div className="flex items-center gap-2 lg:hidden">
              <div className="flex size-7 items-center justify-center rounded-sm bg-primary text-primary-foreground text-xs font-bold">
                <AppLogoIcon className="size-4" />
              </div>
              <span className="text-lg font-semibold">{siteConfig.name}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground text-balance">
              Sign in to your account to continue
            </p>
          </div>
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
        </div>
      </div>
    </div>
  )
}
