import { createPortal } from "react-dom"
import { useMdiStore } from "@/stores/mdi.store"
import { MdiWindowComponent } from "./mdi-window"

export function MdiContainer() {
  const windows = useMdiStore((s) => s.windows)

  if (windows.length === 0) return null

  return createPortal(
    <>
      {windows.map((win) => (
        <MdiWindowComponent key={win.id} window={win} />
      ))}
    </>,
    document.body
  )
}
