import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useLocation } from "react-router-dom"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  profile: "Profile",
  accommodation: "Accommodation",
  activities: "Activities",
  cruise: "Cruise",
  operations: "Operations",
  accounts: "Accounts",
  settings: "Settings",
  new: "New",
  calendar: "Calendar",
  reports: "Reports",
  transfers: "Transfers",
  customers: "Customers",
  agencies: "Agencies",
  suppliers: "Suppliers",
  destinations: "Destinations",
  categories: "Categories",
  rooms: "Rooms",
  "meal-plans": "Meal Plans",
  users: "Users",
  roles: "Roles",
  integrations: "Integrations",
  daily: "Daily Ops",
  manifests: "Manifests",
}

function labelFor(segment: string): string {
  return routeLabels[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1)
}

export function AppHeader() {
  const { theme, setTheme } = useTheme()
  const location = useLocation()

  const segments = location.pathname.split("/").filter(Boolean)

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4!" />

      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1
            return (
              <BreadcrumbItem key={segment}>
                {isLast ? (
                  <BreadcrumbPage>{labelFor(segment)}</BreadcrumbPage>
                ) : (
                  <>
                    <span className="text-muted-foreground">{labelFor(segment)}</span>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <SunIcon className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </header>
  )
}
