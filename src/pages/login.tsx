import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"

import { loginApi } from "@/api/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useAuthStore } from "@/stores/auth.store"
import AppLogoIcon from "@/components/app-logo-icon"
import { siteConfig } from "@/config/site"
import { useHead } from "@/hooks/use-head"

export default function LoginPage() {
  const { t } = useTranslation()
  useHead({ title: t("login.welcomeBack") })

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
            <h1 className="text-2xl font-bold tracking-tight">{t("login.welcomeBack")}</h1>
            <p className="text-sm text-muted-foreground text-balance">
              {t("login.subtitle")}
            </p>
          </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">{t("common.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("login.emailPlaceholder")}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isPending}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">{t("common.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("login.passwordPlaceholder")}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isPending}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Spinner className="mr-1" />}
                {t("common.signIn")}
              </Button>
            </form>
        </div>
      </div>
    </div>
  )
}
