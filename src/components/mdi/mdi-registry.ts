import { lazy, type ComponentType } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = ComponentType<any>
type Loader = () => Promise<{ default: AnyComponent }>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registry = new Map<string, React.LazyExoticComponent<AnyComponent>>()

/** Register a component under a string key with a lazy loader. */
export function registerMdiComponent(key: string, loader: Loader): void {
  registry.set(key, lazy(loader))
}

/** Retrieve a registered lazy component by key, or null if not found. */
export function getMdiLazyComponent(key: string) {
  return registry.get(key) ?? null
}

// Built-in sample window registrations
// These are lazily imported - the chunk is only fetched when the window opens.

registerMdiComponent("mdi:notes", () =>
  import("./mdi-sample-windows").then((m) => ({ default: m.NotesWindowContent }))
)

registerMdiComponent("mdi:stats", () =>
  import("./mdi-sample-windows").then((m) => ({ default: m.StatsWindowContent }))
)

registerMdiComponent("mdi:info", () =>
  import("./mdi-sample-windows").then((m) => ({ default: m.InfoWindowContent }))
)

registerMdiComponent("mdi:alert", () =>
  import("./mdi-sample-windows").then((m) => ({ default: m.AlertWindowContent }))
)
