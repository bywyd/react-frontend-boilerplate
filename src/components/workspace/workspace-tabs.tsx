import { X, PanelsTopLeft, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
import type { WorkspaceNavGroup } from "./workspace-types"

interface WorkspaceTabsProps {
  groups: WorkspaceNavGroup[]
  openIds: string[]
  activeId: string | null
  onActivate: (id: string) => void
  onClose: (id: string) => void
}

export function WorkspaceTabs({ groups, openIds, activeId, onActivate, onClose }: WorkspaceTabsProps) {
  const allItems = groups.flatMap((g) => g.items)
  const openItems = openIds.map((id) => allItems.find((item) => item.id === id)).filter(Boolean) as typeof allItems
  const activeItem = allItems.find((item) => item.id === activeId) ?? null

  if (openItems.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
        <PanelsTopLeft className="size-10 opacity-20" />
        <p className="text-sm">Select an item from the left panel to open it</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col min-h-0">
      {/* Top bar: panels open counter + layout icon */}
      {/* <div className="flex items-center justify-between px-4 pt-2.5 shrink-0">
        <span className="text-xs text-muted-foreground">
          {openItems.length} {openItems.length === 1 ? "panel" : "panels"} open
        </span>
        <button className="flex items-center justify-center size-6 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <LayoutGrid className="size-3.5" />
        </button>
      </div> */}

      {/* Tab strip */}
      <div className="flex items-end border-b px-3 shrink-0 overflow-x-auto mt-1">
        {openItems.map((item) => {
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              onClick={() => onActivate(item.id)}
              className={cn(
                "group relative flex items-center gap-1.5 px-3 py-2 text-sm whitespace-nowrap transition-colors focus-visible:outline-none",
                isActive
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon && <item.icon className="size-3.5 shrink-0" />}
              <span>{item.title}</span>
              <span
                role="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onClose(item.id)
                }}
                className="ml-1 flex size-5 items-center justify-center rounded opacity-0 group-hover:opacity-100 hover:bg-destructive text-muted-foreground hover:text-white transition-opacity"
                title="Close"
              >
                <X className="size-3" />
              </span>
              {isActive && (
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-primary rounded-t-sm" />
              )}
            </button>
          )
        })}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto p-5">
        {activeItem ? activeItem.content : null}
      </div>
    </div>
  )
}
