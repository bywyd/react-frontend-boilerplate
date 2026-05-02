// Sample window content components used in the MDI demo

export function NotesWindowContent() {
  return (
    <div className="flex flex-col gap-2 p-4 h-full">
      <p className="text-sm font-medium">Quick Notes</p>
      <textarea
        className="flex-1 resize-none rounded-md border bg-muted/30 p-2 text-sm outline-none focus:ring-1 focus:ring-ring"
        placeholder="Type your notes here…"
        defaultValue="Remember to check hotel allotments for Q3."
      />
    </div>
  )
}

export function InfoWindowContent({ label }: { label: string }) {
  const rows = [
    { key: "Status", value: "Active" },
    { key: "Created", value: "2025-04-14" },
    { key: "Currency", value: "GBP" },
    { key: "Contract Type", value: "Intranet Contract" },
    { key: "Market", value: "Corporate" },
  ]
  return (
    <div className="p-4 space-y-3">
      <p className="text-sm font-semibold">{label}</p>
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-b last:border-0">
              <td className="py-1.5 pr-3 text-muted-foreground w-1/2">{r.key}</td>
              <td className="py-1.5 font-medium">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function StatsWindowContent() {
  const bars = [
    { label: "Jan", value: 65 },
    { label: "Feb", value: 80 },
    { label: "Mar", value: 55 },
    { label: "Apr", value: 90 },
    { label: "May", value: 70 },
    { label: "Jun", value: 85 },
  ]
  return (
    <div className="p-4 space-y-3 h-full">
      <p className="text-sm font-semibold">Monthly Bookings</p>
      <div className="flex items-end gap-2 h-28">
        {bars.map((b) => (
          <div key={b.label} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-t bg-primary/70"
              style={{ height: `${b.value}%` }}
            />
            <span className="text-[10px] text-muted-foreground">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AlertWindowContent({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 h-full text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-2xl dark:bg-yellow-900/30 dark:text-yellow-400">
        ⚠
      </div>
      <p className="text-sm font-medium">{message ?? "Rate contract expires in 3 days."}</p>
      <p className="text-xs text-muted-foreground">Please review and renew before expiration.</p>
    </div>
  )
}
