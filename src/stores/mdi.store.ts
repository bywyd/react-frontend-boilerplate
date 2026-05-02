import { create } from "zustand"
import type { ComponentType } from "react"

export type MdiWindowState = "normal" | "minimized" | "maximized"

export interface MdiWindow {
  id: string
  title: string
  /** Direct component reference (rendered immediately). */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: ComponentType<any>
  /** Registry key - component is resolved lazily via mdi-registry. */
  componentKey?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>
  position: { x: number; y: number }
  size: { width: number; height: number }
  state: MdiWindowState
  zIndex: number
}

interface MdiStore {
  windows: MdiWindow[]
  topZ: number
  openWindow: (config: {
    id?: string
    title: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component?: ComponentType<any>
    /** Registry key - mutually exclusive with `component`. */
    componentKey?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props?: Record<string, any>
    position?: { x: number; y: number }
    size?: { width: number; height: number }
  }) => string
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  updatePosition: (id: string, position: { x: number; y: number }) => void
  updateSize: (id: string, size: { width: number; height: number }) => void
}

let idCounter = 0

export const useMdiStore = create<MdiStore>((set, get) => ({
  windows: [],
  topZ: 100,

  openWindow: (config) => {
    const id = config.id ?? `mdi-window-${++idCounter}`
    const { topZ, windows } = get()

    // If already open, just focus it
    const existing = windows.find((w) => w.id === id)
    if (existing) {
      set((s) => ({
        topZ: s.topZ + 1,
        windows: s.windows.map((w) =>
          w.id === id
            ? { ...w, zIndex: s.topZ + 1, state: w.state === "minimized" ? "normal" : w.state }
            : w
        ),
      }))
      return id
    }

    // Cascade new windows slightly
    const offset = (windows.length % 8) * 24
    const newZ = topZ + 1

    set((s) => ({
      topZ: newZ,
      windows: [
        ...s.windows,
        {
          id,
          title: config.title,
          component: config.component,
          props: config.props ?? {},
          position: config.position ?? { x: 80 + offset, y: 80 + offset },
          size: config.size ?? { width: 480, height: 340 },
          state: "normal",
          zIndex: newZ,
        },
      ],
    }))

    return id
  },

  closeWindow: (id) => {
    set((s) => ({ windows: s.windows.filter((w) => w.id !== id) }))
  },

  focusWindow: (id) => {
    set((s) => {
      const newZ = s.topZ + 1
      return {
        topZ: newZ,
        windows: s.windows.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w)),
      }
    })
  },

  minimizeWindow: (id) => {
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, state: "minimized" } : w)),
    }))
  },

  maximizeWindow: (id) => {
    set((s) => {
      const newZ = s.topZ + 1
      return {
        topZ: newZ,
        windows: s.windows.map((w) =>
          w.id === id ? { ...w, state: "maximized", zIndex: newZ } : w
        ),
      }
    })
  },

  restoreWindow: (id) => {
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, state: "normal" } : w)),
    }))
  },

  updatePosition: (id, position) => {
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, position } : w)),
    }))
  },

  updateSize: (id, size) => {
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    }))
  },
}))
