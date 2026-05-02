import { useHead } from "@/hooks/use-head"
import { WorkspaceLayout } from "@/components/workspace"
import type { WorkspaceNavGroup } from "@/components/workspace"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  MapPin,
  Globe2,
  Phone,
  Bell,
  CreditCard,
  Users,
  Wrench,
  BedDouble,
  BedSingle,
  CalendarRange,
  CalendarDays,
  BarChart2,
  TrendingUp,
  FileX,
  Baby,
  Settings2,
} from "lucide-react"

function HotelHeader() {
  return (
    <div>
      <div className="flex items-start gap-3 px-3 py-3 border-b">
        <div className="size-10 rounded-md bg-muted flex items-center justify-center shrink-0">
          <Building2 className="size-5 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate leading-tight">Grand Istanbul Hotel</p>
          <p className="text-xs text-muted-foreground mt-0.5">GRIST · #1</p>
          <div className="flex items-center gap-1 mt-1.5 flex-wrap">
            <Badge className="text-[10px] px-1.5 py-0 h-4">Active</Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">Extranet</Badge>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">CM</Badge>
          </div>
        </div>
      </div>
      <div className="px-3 pt-3 pb-3 space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 select-none">Location</p>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="size-3 shrink-0" />
            <span>City: <span className="text-foreground font-medium">Istanbul</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Globe2 className="size-3 shrink-0" />
            <span>Country: <span className="text-foreground font-medium">Türkiye</span></span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-3 shrink-0 opacity-0" />
            <span>Region: <span className="text-foreground font-medium">consequatur</span></span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-snug pl-5">
          Vişnezade, Acisu Sk. No:19, 34357 Beşiktaş/Istanbul
        </p>
      </div>
    </div>
  )
}

function HotelDetailsContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Hotel Details</h2>
        <p className="text-sm text-muted-foreground">General information about this hotel property.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: "Hotel Name", value: "Grand Istanbul Hotel" },
          { label: "Star Rating", value: "★★★★★" },
          { label: "City", value: "Istanbul" },
          { label: "Country", value: "Türkiye" },
          { label: "Region", value: "consequatur" },
          { label: "Address", value: "Vişnezade, Acisu Sk. No:19, 34357 Beşiktaş/Istanbul" },
          { label: "Category", value: "City Hotel" },
          { label: "Chain", value: "Independent" },
        ].map((row) => (
          <div key={row.label} className="rounded-md border p-3">
            <p className="text-xs text-muted-foreground">{row.label}</p>
            <p className="text-sm font-medium mt-0.5">{row.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChildrenAgesContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Children Ages</h2>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium">Age Group</th>
              <th className="text-left px-4 py-2.5 font-medium">Min Age</th>
              <th className="text-left px-4 py-2.5 font-medium">Max Age</th>
              <th className="text-left px-4 py-2.5 font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { group: "Infant", min: 0, max: 1, desc: "No charge" },
              { group: "Child", min: 2, max: 11, desc: "50% discount" },
              { group: "Teen", min: 12, max: 17, desc: "25% discount" },
            ].map((row) => (
              <tr key={row.group} className="border-t">
                <td className="px-4 py-2">{row.group}</td>
                <td className="px-4 py-2">{row.min}</td>
                <td className="px-4 py-2">{row.max}</td>
                <td className="px-4 py-2 text-muted-foreground">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function DefaultOptionsContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Default Options</h2>
      <div className="space-y-2">
        {[
          { label: "Default Board Type", value: "All Inclusive" },
          { label: "Default Room Type", value: "Standard Double" },
          { label: "Check-in Time", value: "14:00" },
          { label: "Check-out Time", value: "12:00" },
          { label: "Min Stay (nights)", value: "1" },
          { label: "Max Stay (nights)", value: "30" },
        ].map((row) => (
          <div key={row.label} className="flex justify-between border-b pb-2">
            <span className="text-sm text-muted-foreground">{row.label}</span>
            <span className="text-sm font-medium">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactsContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Contacts</h2>
      <div className="space-y-3">
        {[
          { name: "Ahmet Yılmaz", role: "General Manager", phone: "+90 212 555 0101", email: "ahmet@grandistanbul.com" },
          { name: "Fatma Kaya", role: "Reservations Manager", phone: "+90 212 555 0102", email: "fatma@grandistanbul.com" },
        ].map((c) => (
          <div key={c.name} className="rounded-md border p-4 space-y-1">
            <p className="font-medium text-sm">{c.name}</p>
            <p className="text-xs text-muted-foreground">{c.role}</p>
            <p className="text-xs">{c.phone} · {c.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationsContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Notifications</h2>
      <div className="space-y-2">
        {["New booking confirmed", "Rate contract expiring soon", "Allotment release reminder"].map((n) => (
          <div key={n} className="flex items-center gap-3 rounded-md border p-3">
            <Bell className="size-4 text-muted-foreground shrink-0" />
            <p className="text-sm">{n}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function BankAccountsContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Bank Accounts</h2>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium">Bank</th>
              <th className="text-left px-4 py-2.5 font-medium">IBAN</th>
              <th className="text-left px-4 py-2.5 font-medium">Currency</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Ziraat Bank</td>
              <td className="px-4 py-2 font-mono text-xs">TR12 0001 2345 6789 0123</td>
              <td className="px-4 py-2">TRY</td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Garanti BBVA</td>
              <td className="px-4 py-2 font-mono text-xs">TR98 0006 2001 0000 0012</td>
              <td className="px-4 py-2">EUR</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ExtranetUsersContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Extranet Users</h2>
      <div className="space-y-2">
        {["booking@grandistanbul.com", "manager@grandistanbul.com"].map((email) => (
          <div key={email} className="flex items-center gap-3 rounded-md border p-3">
            <Users className="size-4 text-muted-foreground shrink-0" />
            <p className="text-sm">{email}</p>
            <Badge variant="outline" className="ml-auto text-xs">Active</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

function MicroServicesContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Micro Services</h2>
      <div className="space-y-2">
        {[
          { name: "Booking Engine API", status: "Running" },
          { name: "PMS Sync", status: "Running" },
          { name: "Channel Manager Bridge", status: "Idle" },
        ].map((s) => (
          <div key={s.name} className="flex items-center gap-3 rounded-md border p-3">
            <Wrench className="size-4 text-muted-foreground shrink-0" />
            <p className="text-sm flex-1">{s.name}</p>
            <Badge variant={s.status === "Running" ? "default" : "secondary"} className="text-xs">
              {s.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

function RoomsContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Rooms</h2>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium">Room Code</th>
              <th className="text-left px-4 py-2.5 font-medium">Room Type</th>
              <th className="text-left px-4 py-2.5 font-medium">Capacity</th>
              <th className="text-left px-4 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { code: "STD-DBL", type: "Standard Double", cap: 2 },
              { code: "DLX-DBL", type: "Deluxe Double", cap: 2 },
              { code: "STD-SGL", type: "Standard Single", cap: 1 },
              { code: "STE-1BR", type: "Junior Suite", cap: 3 },
            ].map((r) => (
              <tr key={r.code} className="border-t">
                <td className="px-4 py-2 font-mono text-xs">{r.code}</td>
                <td className="px-4 py-2">{r.type}</td>
                <td className="px-4 py-2">{r.cap}</td>
                <td className="px-4 py-2"><Badge variant="outline" className="text-xs">Active</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AllotmentsContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Allotments</h2>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium">Contract</th>
              <th className="text-left px-4 py-2.5 font-medium">Period</th>
              <th className="text-left px-4 py-2.5 font-medium">Rooms</th>
              <th className="text-left px-4 py-2.5 font-medium">Release</th>
            </tr>
          </thead>
          <tbody>
            {[
              { contract: "TEST CONT", period: "2025-04-13 – 2025-04-13", rooms: 10, release: 7 },
              { contract: "5eur", period: "2025-04-14 – 2025-04-14", rooms: 5, release: 3 },
            ].map((a) => (
              <tr key={a.contract} className="border-t">
                <td className="px-4 py-2 font-medium">{a.contract}</td>
                <td className="px-4 py-2 text-muted-foreground text-xs">{a.period}</td>
                <td className="px-4 py-2">{a.rooms}</td>
                <td className="px-4 py-2">{a.release} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function RatesContent() {
  const contracts = [
    { name: "TEST CONT", code: "TEST", currency: "GBP", type: "Intranet Contract" },
    { name: "5eur", code: "test", currency: "GBP", type: "Intranet Contract" },
    { name: "tttt", code: "tttt", currency: "GBP", type: "Intranet Contract" },
    { name: "CHANNEL MANAGER TEST CONTRACT", code: "TSTCM", currency: "USD", type: "Channel Manager Contract" },
    { name: "b2c kontratı", code: "b2ccc", currency: "EUR", type: "Channel Manager Contract" },
  ]
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Rate Contracts <Badge variant="secondary">{contracts.length}</Badge></h2>
      </div>
      <div className="space-y-2">
        {contracts.map((c) => (
          <div key={c.name} className="rounded-md border p-4 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm">{c.name}</span>
              <Badge variant="secondary" className="text-xs font-mono">{c.code}</Badge>
              <Badge variant="outline" className="text-xs">{c.currency}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{c.type}</p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="default" className="text-xs">Active</Badge>
              <Badge variant="outline" className="text-xs">Corporate</Badge>
              <Badge variant="outline" className="text-xs">Non-refundable</Badge>
              <Badge variant="outline" className="text-xs">On Request</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MeetingRoomsContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Meeting Rooms</h2>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium">Room</th>
              <th className="text-left px-4 py-2.5 font-medium">Capacity</th>
              <th className="text-left px-4 py-2.5 font-medium">Area (m²)</th>
            </tr>
          </thead>
          <tbody>
            {[
              { room: "Bosphorus A", cap: 50, area: 80 },
              { room: "Bosphorus B", cap: 30, area: 50 },
              { room: "Golden Horn", cap: 100, area: 150 },
            ].map((r) => (
              <tr key={r.room} className="border-t">
                <td className="px-4 py-2">{r.room}</td>
                <td className="px-4 py-2">{r.cap}</td>
                <td className="px-4 py-2">{r.area}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function MeetingAvailabilitiesContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Meeting Availabilities</h2>
      <div className="space-y-2">
        {[
          { date: "2026-05-10", room: "Bosphorus A", status: "Available" },
          { date: "2026-05-11", room: "Golden Horn", status: "Booked" },
          { date: "2026-05-12", room: "Bosphorus B", status: "Available" },
        ].map((a) => (
          <div key={a.date + a.room} className="flex items-center gap-3 rounded-md border p-3">
            <CalendarDays className="size-4 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">{a.room}</p>
              <p className="text-xs text-muted-foreground">{a.date}</p>
            </div>
            <Badge variant={a.status === "Available" ? "outline" : "secondary"} className="text-xs">
              {a.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

function MarkupsContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Markups</h2>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium">Market</th>
              <th className="text-left px-4 py-2.5 font-medium">Markup %</th>
              <th className="text-left px-4 py-2.5 font-medium">Type</th>
            </tr>
          </thead>
          <tbody>
            {[
              { market: "B2B", markup: "10%", type: "Percentage" },
              { market: "B2C", markup: "15%", type: "Percentage" },
              { market: "Corporate", markup: "5%", type: "Percentage" },
            ].map((m) => (
              <tr key={m.market} className="border-t">
                <td className="px-4 py-2">{m.market}</td>
                <td className="px-4 py-2">{m.markup}</td>
                <td className="px-4 py-2">{m.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CancellationsContent() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Cancellation Policies</h2>
      <div className="space-y-2">
        {[
          { name: "Free Cancel", deadline: "72 hours before check-in", penalty: "None" },
          { name: "Standard", deadline: "48 hours before check-in", penalty: "1 night" },
          { name: "Non-refundable", deadline: "Any time", penalty: "Full amount" },
        ].map((p) => (
          <div key={p.name} className="rounded-md border p-4">
            <p className="font-medium text-sm">{p.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Deadline: {p.deadline}</p>
            <p className="text-xs text-muted-foreground">Penalty: {p.penalty}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const demoGroups: WorkspaceNavGroup[] = [
  {
    label: "Details",
    items: [
      { id: "hotel-details", title: "Hotel Details", icon: Building2, content: <HotelDetailsContent /> },
      { id: "children-ages", title: "Children Ages", icon: Baby, content: <ChildrenAgesContent /> },
      { id: "default-options", title: "Default Options", icon: Settings2, content: <DefaultOptionsContent /> },
      { id: "contacts", title: "Contacts", icon: Phone, content: <ContactsContent /> },
      { id: "notifications", title: "Notifications", icon: Bell, content: <NotificationsContent /> },
      { id: "bank-accounts", title: "Bank Accounts", icon: CreditCard, content: <BankAccountsContent /> },
      { id: "extranet-users", title: "Extranet Users", icon: Users, content: <ExtranetUsersContent /> },
      { id: "micro-services", title: "Micro Services", icon: Wrench, content: <MicroServicesContent /> },
    ],
  },
  {
    label: "Contracts",
    items: [
      { id: "rooms", title: "Rooms", icon: BedDouble, content: <RoomsContent /> },
      { id: "allotments", title: "Allotments", icon: CalendarRange, content: <AllotmentsContent /> },
      { id: "rates", title: "Rates", icon: BarChart2, content: <RatesContent /> },
      { id: "markups", title: "Markups", icon: TrendingUp, content: <MarkupsContent /> },
      { id: "cancellations", title: "Cancellations", icon: FileX, content: <CancellationsContent /> },
    ],
  },
  {
    label: "Meeting",
    items: [
      { id: "meeting-rooms", title: "Rooms", icon: BedSingle, content: <MeetingRoomsContent /> },
      { id: "meeting-availabilities", title: "Availabilities", icon: CalendarDays, content: <MeetingAvailabilitiesContent /> },
    ],
  },
]

export default function WorkspaceDemoPage() {
  useHead({ title: "Workspace Demo" })

  return (
    <div className="flex flex-col h-full min-h-0">
      <WorkspaceLayout
        groups={demoGroups}
        header={<HotelHeader />}
        defaultOpenIds={["hotel-details", "allotments", "rates"]}
        defaultActiveId="rates"
        className="flex-1 min-h-0"
      />
    </div>
  )
}
