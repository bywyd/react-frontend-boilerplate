import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  icon: LucideIcon
  value?: string | number
  description?: string
  status?: "empty" | "loading" | "value"
  className?: string
}

export function StatCard({
  title,
  icon: Icon,
  value,
  description,
  status = "empty",
  className,
}: StatCardProps) {
  return (
    <Card className={cn("@container/stat-card", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className="size-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {status === "loading" ? (
          <>
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-4 w-32" />
          </>
        ) : status === "value" && value !== undefined ? (
          <>
            <p className="text-2xl font-semibold">{value}</p>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </>
        ) : (
          <>
            <p className="text-2xl font-semibold">—</p>
            <p className="text-sm text-amber-500 dark:text-amber-400">No data yet</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
