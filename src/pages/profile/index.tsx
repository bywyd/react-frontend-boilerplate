import { useState } from "react"
import { toast } from "sonner"
import { UserIcon } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuthStore } from "@/stores/auth.store"
import { useHead } from "@/hooks/use-head"

export default function ProfilePage() {
  const { t } = useTranslation()
  useHead({ title: t("profile.title") })

  const user = useAuthStore((s) => s.user)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error(t("profile.passwordsDoNotMatch"))
      return
    }
    // TODO: wire up to change-password API
    toast.success(t("profile.passwordChanged"))
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-"

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("profile.title")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("profile.subtitle")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserIcon className="size-4 text-muted-foreground" />
              <CardTitle>{t("profile.accountInformation")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>{t("profile.fullName")}</Label>
              <Input value={user?.name ?? ""} readOnly disabled />
            </div>

            <div className="space-y-1.5">
              <Label>{t("profile.emailAddress")}</Label>
              <Input
                type="email"
                value={user?.email ?? ""}
                readOnly
                disabled
              />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">{t("profile.memberSince")}</p>
                <p className="font-medium">{createdAt}</p>
              </div>
              <div>
                <p className="text-muted-foreground">{t("profile.accountStatus")}</p>
                <p className="font-medium">
                  {user?.is_active ? (
                    <span className="text-green-600 dark:text-green-400">{t("common.active")}</span>
                  ) : (
                    <span className="text-destructive">{t("common.inactive")}</span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle>{t("profile.changePassword")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="current-password">{t("profile.currentPassword")}</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="new-password">{t("profile.newPassword")}</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm-password">{t("profile.confirmNewPassword")}</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                {t("profile.updatePassword")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
