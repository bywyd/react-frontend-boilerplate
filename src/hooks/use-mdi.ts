import { useMdiStore } from "@/stores/mdi.store"
export { registerMdiComponent, getMdiLazyComponent } from "@/components/mdi/mdi-registry"

export { useMdiStore }

export function useMdi() {
  const openWindow = useMdiStore((s) => s.openWindow)
  const closeWindow = useMdiStore((s) => s.closeWindow)
  const windows = useMdiStore((s) => s.windows)

  return { openWindow, closeWindow, windows }
}
