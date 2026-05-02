import {
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  TrendingUpIcon,
} from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { useAuthStore } from "@/stores/auth.store"
import { useHead } from "@/hooks/use-head"

export default function DashboardPage() {
  useHead({ title: "Dashboard" })

  const user = useAuthStore((s) => s.user)

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {user?.name ?? "User"}.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Bookings"
          icon={CalendarIcon}
          status="empty"
        />
        <StatCard
          title="Revenue"
          icon={TrendingUpIcon}
          status="empty"
        />
        <StatCard
          title="Active Hotels"
          icon={BuildingIcon}
          status="empty"
        />
        <StatCard
          title="Pending Ops"
          icon={ClockIcon}
          status="empty"
        />
      </div>
    </div>
  )
}
