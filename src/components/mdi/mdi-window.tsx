import React, { Suspense, useRef, useCallback, createElement } from "react"
import { Minus, X, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMdiStore, type MdiWindow } from "@/stores/mdi.store"
import { getMdiLazyComponent } from "./mdi-registry"
import { Spinner } from "@/components/ui/spinner"

const MIN_WIDTH = 280
const MIN_HEIGHT = 120
const TITLE_BAR_HEIGHT = 36

// Content resolver
// Handles both direct component refs and registry-based lazy components.

function WindowContent({ win }: { win: MdiWindow }) {

  if (win.componentKey) {
    const LazyComp = getMdiLazyComponent(win.componentKey)
    if (!LazyComp) {
      return (
        <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
          Component{" "}
          <code className="mx-1 rounded bg-muted px-1 font-mono text-xs">{win.componentKey}</code>
          is not registered.
        </div>
      )
    }
    return (
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <Spinner className="size-5" />
          </div>
        }
      >
        <LazyComp {...(win.props ?? {})} />
      </Suspense>
    )
  }

  if (win.component) {
    return createElement(win.component, win.props ?? {})
  }

  return null
}

type ResizeDir = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw"

const RESIZE_HANDLES: { dir: ResizeDir; className: string }[] = [
  { dir: "n",  className: "top-0 left-1 right-1 h-1 cursor-n-resize" },
  { dir: "ne", className: "top-0 right-0 w-3 h-3 cursor-ne-resize" },
  { dir: "e",  className: "top-1 right-0 bottom-1 w-1 cursor-e-resize" },
  { dir: "se", className: "bottom-0 right-0 w-3 h-3 cursor-se-resize" },
  { dir: "s",  className: "bottom-0 left-1 right-1 h-1 cursor-s-resize" },
  { dir: "sw", className: "bottom-0 left-0 w-3 h-3 cursor-sw-resize" },
  { dir: "w",  className: "top-1 left-0 bottom-1 w-1 cursor-w-resize" },
  { dir: "nw", className: "top-0 left-0 w-3 h-3 cursor-nw-resize" },
]

export function MdiWindowComponent({ window: win }: { window: MdiWindow }) {
  const { focusWindow, closeWindow, minimizeWindow, maximizeWindow, restoreWindow, updatePosition, updateSize } =
    useMdiStore()

  const positionRef = useRef(win.position)
  const sizeRef = useRef(win.size)

  // Keep refs in sync (without triggering re-renders for drag math)
  positionRef.current = win.position
  sizeRef.current = win.size

  const isMinimized = win.state === "minimized"
  const isMaximized = win.state === "maximized"

  // Drag
  const onTitleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return
      e.preventDefault()
      focusWindow(win.id)

      const startX = e.clientX - positionRef.current.x
      const startY = e.clientY - positionRef.current.y

      const onMove = (mv: MouseEvent) => {
        const x = Math.max(0, mv.clientX - startX)
        const y = Math.max(0, mv.clientY - startY)
        updatePosition(win.id, { x, y })
      }
      const onUp = () => {
        document.removeEventListener("mousemove", onMove)
        document.removeEventListener("mouseup", onUp)
      }
      document.addEventListener("mousemove", onMove)
      document.addEventListener("mouseup", onUp)
    },
    [win.id, isMaximized, focusWindow, updatePosition]
  )

  // Resize
  const onResizeMouseDown = useCallback(
    (e: React.MouseEvent, dir: ResizeDir) => {
      e.preventDefault()
      e.stopPropagation()
      focusWindow(win.id)

      const startX = e.clientX
      const startY = e.clientY
      const startPos = { ...positionRef.current }
      const startSize = { ...sizeRef.current }

      const onMove = (mv: MouseEvent) => {
        const dx = mv.clientX - startX
        const dy = mv.clientY - startY

        let { x, y } = startPos
        let { width, height } = startSize

        if (dir.includes("e")) width = Math.max(MIN_WIDTH, startSize.width + dx)
        if (dir.includes("s")) height = Math.max(MIN_HEIGHT, startSize.height + dy)
        if (dir.includes("w")) {
          const newW = Math.max(MIN_WIDTH, startSize.width - dx)
          x = startPos.x + (startSize.width - newW)
          width = newW
        }
        if (dir.includes("n")) {
          const newH = Math.max(MIN_HEIGHT, startSize.height - dy)
          y = startPos.y + (startSize.height - newH)
          height = newH
        }

        updatePosition(win.id, { x, y })
        updateSize(win.id, { width, height })
      }
      const onUp = () => {
        document.removeEventListener("mousemove", onMove)
        document.removeEventListener("mouseup", onUp)
      }
      document.addEventListener("mousemove", onMove)
      document.addEventListener("mouseup", onUp)
    },
    [win.id, focusWindow, updatePosition, updateSize]
  )

  // Layout styles
  const style: React.CSSProperties = isMaximized
    ? { position: "fixed", inset: 0, zIndex: win.zIndex, width: "100vw", height: "100vh" }
    : {
        position: "fixed",
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: isMinimized ? TITLE_BAR_HEIGHT : win.size.height,
        zIndex: win.zIndex,
        minWidth: MIN_WIDTH,
      }

  return (
    <div
      style={style}
      className={cn(
        "flex flex-col rounded-lg border bg-background shadow-2xl overflow-hidden select-none",
        isMaximized && "rounded-none"
      )}
      onMouseDown={() => focusWindow(win.id)}
    >
      {/* Title bar */}
      <div
        className="flex h-9 shrink-0 items-center gap-1 border-b bg-muted/60 px-3 cursor-move"
        onMouseDown={onTitleMouseDown}
        onDoubleClick={() => isMaximized ? restoreWindow(win.id) : maximizeWindow(win.id)}
      >
        <span className="flex-1 truncate text-sm font-medium">{win.title}</span>

        {/* Minimize */}
        <button
          className="flex size-5 items-center justify-center rounded hover:bg-muted text-muted-foreground hover:text-foreground"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => isMinimized ? restoreWindow(win.id) : minimizeWindow(win.id)}
          title={isMinimized ? "Restore" : "Minimize"}
        >
          <Minus className="size-3" />
        </button>

        {/* Maximize / Restore */}
        <button
          className="flex size-5 items-center justify-center rounded hover:bg-muted text-muted-foreground hover:text-foreground"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => isMaximized ? restoreWindow(win.id) : maximizeWindow(win.id)}
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? <Minimize2 className="size-3" /> : <Maximize2 className="size-3" />}
        </button>

        {/* Close */}
        <button
          className="flex size-5 items-center justify-center rounded hover:bg-destructive hover:text-white text-muted-foreground"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => closeWindow(win.id)}
          title="Close"
        >
          <X className="size-3" />
        </button>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div className="flex flex-1 flex-col overflow-auto">
          <WindowContent win={win} />
        </div>
      )}

      {/* Resize handles (not shown when maximized or minimized) */}
      {!isMaximized && !isMinimized &&
        RESIZE_HANDLES.map(({ dir, className }) => (
          <div
            key={dir}
            className={cn("absolute z-10", className)}
            onMouseDown={(e) => onResizeMouseDown(e, dir)}
          />
        ))}
    </div>
  )
}
