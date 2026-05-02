import { cn } from "@/lib/utils"
import type { WorkspaceNavGroup } from "./workspace-types"

interface WorkspaceNavProps {
  groups: WorkspaceNavGroup[]
  openIds: string[]
  activeId: string | null
  onOpen: (id: string) => void
}

export function WorkspaceNav({ groups, openIds, activeId, onOpen }: WorkspaceNavProps) {
  return (
    <nav className="flex flex-col pb-4">
      {groups.map((group, gi) => (
        <div key={gi}>
          {group.label && (
            <p className="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 select-none">
              {group.label}
            </p>
          )}
          {group.items.map((item) => {
            const isOpen = openIds.includes(item.id)
            const isActive = activeId === item.id

            return (
              <button
                key={item.id}
                onClick={() => onOpen(item.id)}
                className={cn(
                  "group flex w-full items-center gap-2 px-3 py-[7px] text-sm text-left transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-foreground/75"
                )}
              >
                {item.icon && (
                  <item.icon
                    className={cn(
                      "size-[15px] shrink-0 transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                )}
                <span className="flex-1 truncate">{item.title}</span>
                {isOpen && (
                  <span
                    className={cn(
                      "size-[7px] rounded-full shrink-0",
                      isActive ? "bg-primary" : "bg-primary/50"
                    )}
                    title="Open"
                  />
                )}
              </button>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
