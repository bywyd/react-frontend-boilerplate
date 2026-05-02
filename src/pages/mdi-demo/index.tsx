import { useHead } from "@/hooks/use-head"
import { useMdi } from "@/hooks/use-mdi"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  NotesWindowContent,
  InfoWindowContent,
  StatsWindowContent,
  AlertWindowContent,
} from "@/components/mdi/mdi-sample-windows"
import { StickyNote, BarChart2, Info, AlertTriangle, AppWindowMac, PackageOpen } from "lucide-react"

export default function MdiDemoPage() {
  useHead({ title: "MDI Demo" })
  const { openWindow, windows } = useMdi()

  const openCount = windows.filter((w) => w.state !== "minimized").length
  const minimizedCount = windows.filter((w) => w.state === "minimized").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <AppWindowMac className="size-6" />
          MDI Demo
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Multiple Document Interface - floating, draggable, resizable windows that persist across the entire app.
        </p>
      </div>

      {/* Status badges */}
      <div className="flex items-center gap-2">
        <Badge variant="outline">{windows.length} total windows</Badge>
        {openCount > 0 && <Badge variant="outline">{openCount} open</Badge>}
        {minimizedCount > 0 && <Badge variant="secondary">{minimizedCount} minimized</Badge>}
      </div>

      <Separator />

      {/* Launch buttons */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Open a Window</p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() =>
              openWindow({
                id: "notes",
                title: "Quick Notes",
                component: NotesWindowContent,
                size: { width: 380, height: 280 },
              })
            }
          >
            <StickyNote className="size-4 mr-2" />
            Notes
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              openWindow({
                id: "stats",
                title: "Monthly Bookings",
                component: StatsWindowContent,
                size: { width: 420, height: 260 },
              })
            }
          >
            <BarChart2 className="size-4 mr-2" />
            Stats Chart
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              openWindow({
                title: "Contract Details",
                component: InfoWindowContent,
                props: { label: "TEST CONT - Rate Contract" },
                size: { width: 360, height: 280 },
              })
            }
          >
            <Info className="size-4 mr-2" />
            Info Panel
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              openWindow({
                title: "Expiration Alert",
                component: AlertWindowContent,
                props: { message: "Rate contract expires in 3 days." },
                size: { width: 320, height: 220 },
              })
            }
          >
            <AlertTriangle className="size-4 mr-2" />
            Alert Window
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              for (let i = 1; i <= 3; i++) {
                openWindow({
                  title: `Info Panel #${i}`,
                  component: InfoWindowContent,
                  props: { label: `Contract #${i}` },
                  size: { width: 340, height: 260 },
                })
              }
            }}
          >
            Open 3 at once
          </Button>
        </div>
      </div>

      <Separator />

      {/* Registry-based (lazy) windows */}
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Via Registry (lazy loaded)</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Use a string key instead of a direct import - component chunk is fetched only when the window opens.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={() => openWindow({ id: "notes-lazy", title: "Notes (lazy)", componentKey: "mdi:notes", size: { width: 380, height: 280 } })}
          >
            <PackageOpen className="size-4 mr-2" />
            mdi:notes
          </Button>
          <Button
            variant="secondary"
            onClick={() => openWindow({ id: "stats-lazy", title: "Stats (lazy)", componentKey: "mdi:stats", size: { width: 420, height: 260 } })}
          >
            <PackageOpen className="size-4 mr-2" />
            mdi:stats
          </Button>
          <Button
            variant="secondary"
            onClick={() => openWindow({ title: "Info (lazy)", componentKey: "mdi:info", props: { label: "Lazy-loaded Info Panel" }, size: { width: 360, height: 280 } })}
          >
            <PackageOpen className="size-4 mr-2" />
            mdi:info
          </Button>
          <Button
            variant="secondary"
            onClick={() => openWindow({ title: "Alert (lazy)", componentKey: "mdi:alert", props: { message: "Lazy-loaded alert window." }, size: { width: 320, height: 220 } })}
          >
            <PackageOpen className="size-4 mr-2" />
            mdi:alert
          </Button>
          <Button
            variant="secondary"
            onClick={() => openWindow({ title: "Unknown Key", componentKey: "mdi:does-not-exist", size: { width: 320, height: 160 } })}
          >
            <PackageOpen className="size-4 mr-2" />
            unregistered key
          </Button>
        </div>
      </div>

      <Separator />

      {/* Instructions */}
      <div className="rounded-lg border bg-muted/30 p-4 space-y-2 max-w-lg">
        <p className="text-sm font-medium">How to use MDI windows</p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>Drag</strong> - click and drag the title bar to move</li>
          <li><strong>Resize</strong> - drag any edge or corner handle</li>
          <li><strong>Minimize</strong> - click <strong>-</strong> to collapse to title bar</li>
          <li><strong>Maximize</strong> - click <strong>□</strong> or double-click title bar</li>
          <li><strong>Restore</strong> - click <strong>⊡</strong> again or the title bar buttons</li>
          <li><strong>Close</strong> - click <strong>✕</strong></li>
          <li><strong>Focus</strong> - click any window to bring it to front</li>
          <li>Re-opening a window that is already open focuses it instead of duplicating</li>
        </ul>
      </div>
    </div>
  )
}
