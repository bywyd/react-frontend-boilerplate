import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { WorkspaceNav } from "./workspace-nav"
import { WorkspaceTabs } from "./workspace-tabs"
import type { WorkspaceLayoutProps } from "./workspace-types"

export function WorkspaceLayout({
  groups,
  header,
  defaultOpenIds = [],
  defaultActiveId,
  className,
}: WorkspaceLayoutProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds)
  const [activeId, setActiveId] = useState<string | null>(defaultActiveId ?? defaultOpenIds[0] ?? null)

  function handleOpen(id: string) {
    setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    setActiveId(id)
  }

  function handleClose(id: string) {
    setOpenIds((prev) => {
      const next = prev.filter((x) => x !== id)
      if (activeId === id) {
        setActiveId(next[next.length - 1] ?? null)
      }
      return next
    })
  }

  return (
    <div className={cn("flex flex-1 overflow-hidden rounded-lg border bg-background", className)}>
      <ResizablePanelGroup orientation="horizontal" className="h-full">
        {/* Left nav panel */}
        <ResizablePanel defaultSize={22} minSize={14} maxSize={40} className="flex flex-col overflow-hidden border-r bg-background">
          {header && (
            <div className="shrink-0 overflow-y-auto border-b">
              {header}
            </div>
          )}
          <div className="flex-1 overflow-y-auto">
            <WorkspaceNav
              groups={groups}
              openIds={openIds}
              activeId={activeId}
              onOpen={handleOpen}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right content panel */}
        <ResizablePanel defaultSize={78} className="flex flex-col">
          <WorkspaceTabs
            groups={groups}
            openIds={openIds}
            activeId={activeId}
            onActivate={setActiveId}
            onClose={handleClose}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
