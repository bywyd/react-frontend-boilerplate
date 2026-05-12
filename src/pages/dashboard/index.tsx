import {
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  TrendingUpIcon,
} from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { useAuthStore } from "@/stores/auth.store"
import { useHead } from "@/hooks/use-head"
import { useTranslation } from "react-i18next"

export default function DashboardPage() {
  const { t } = useTranslation()
  useHead({ title: t("dashboard.title") })

  const user = useAuthStore((s) => s.user)

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("dashboard.title")}</h1>
        <p className="text-sm text-muted-foreground">
          {t("dashboard.welcome", { name: user?.name ?? "User" })}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title={t("dashboard.totalBookings")}
          icon={CalendarIcon}
          status="empty"
        />
        <StatCard
          title={t("dashboard.revenue")}
          icon={TrendingUpIcon}
          status="empty"
        />
        <StatCard
          title={t("dashboard.activeHotels")}
          icon={BuildingIcon}
          status="empty"
        />
        <StatCard
          title={t("dashboard.pendingOps")}
          icon={ClockIcon}
          status="empty"
        />
      </div>
    </div>
  )
}
