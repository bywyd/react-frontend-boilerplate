import * as React from "react"
import {
  BedDoubleIcon,
  BookOpenIcon,
  ChevronRightIcon,
  CogIcon,
  ListOrderedIcon,
  LogOutIcon,
  MapIcon,
  ShipIcon,
  SquareTerminalIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/stores/auth.store"

const APP_NAME = import.meta.env.VITE_APP_NAME ?? "My App"
const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? "1.0.0"

interface NavSubItem {
  title: string
  href: string
}

interface NavItem {
  title: string
  icon: React.ElementType
  items: NavSubItem[]
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    label: "Products",
    items: [
      {
        title: "Accommodation",
        icon: BedDoubleIcon,
        items: [
          { title: "List", href: "/accommodation" },
          { title: "New Booking", href: "/accommodation/new" },
          { title: "Settings", href: "/accommodation/settings" },
        ],
      },
      {
        title: "Activities",
        icon: MapIcon,
        items: [
          { title: "List", href: "/activities" },
          { title: "New Activity", href: "/activities/new" },
          { title: "Calendar", href: "/activities/calendar" },
        ],
      },
      {
        title: "Cruise",
        icon: ShipIcon,
        items: [
          { title: "List", href: "/cruise" },
          { title: "New Cruise", href: "/cruise/new" },
          { title: "Manifests", href: "/cruise/manifests" },
        ],
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        title: "Operations",
        icon: ListOrderedIcon,
        items: [
          { title: "Daily Ops", href: "/operations/daily" },
          { title: "Reports", href: "/operations/reports" },
          { title: "Transfers", href: "/operations/transfers" },
        ],
      },
    ],
  },
  {
    label: "Accounts",
    items: [
      {
        title: "Accounts",
        icon: UsersIcon,
        items: [
          { title: "Customers", href: "/accounts/customers" },
          { title: "Agencies", href: "/accounts/agencies" },
          { title: "Suppliers", href: "/accounts/suppliers" },
        ],
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        title: "Master Definitions",
        icon: BookOpenIcon,
        items: [
          { title: "Destinations", href: "/settings/destinations" },
          { title: "Categories", href: "/settings/categories" },
          { title: "Rooms", href: "/settings/rooms" },
          { title: "Meal Plans", href: "/settings/meal-plans" },
        ],
      },
      {
        title: "System Settings",
        icon: CogIcon,
        items: [
          { title: "Users", href: "/settings/users" },
          { title: "Roles", href: "/settings/roles" },
          { title: "Integrations", href: "/settings/integrations" },
        ],
      },
    ],
  },
]

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function AppSidebar() {
  const user = useAuthStore((s) => s.user)
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const navigate = useNavigate()

  function handleLogout() {
    clearAuth()
    navigate("/login", { replace: true })
  }

  const initials = user ? getInitials(user.name) : "??"

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<NavLink to="/dashboard" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <SquareTerminalIcon className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{APP_NAME}</span>
                <span className="text-xs text-muted-foreground">v{APP_VERSION}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <NavGroupItem key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                render={<DropdownMenuTrigger />}
              >
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
                <ChevronRightIcon className="ml-auto size-4" />
              </SidebarMenuButton>
              <DropdownMenuContent
                className="w-56"
                side="right"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="size-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<NavLink to="/profile" />}>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onSelect={handleLogout}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function NavGroupItem({ item }: { item: NavItem }) {
  return (
    <Collapsible defaultOpen={false} className="group/collapsible">
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={item.title}
          render={<CollapsibleTrigger />}
        >
          <item.icon />
          <span>{item.title}</span>
          <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[open]/collapsible:rotate-90" />
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((sub) => (
              <SidebarMenuSubItem key={sub.title}>
                <SidebarMenuSubButton
                  render={
                    <NavLink
                      to={sub.href}
                      className={({ isActive }) =>
                        isActive ? "text-foreground font-medium" : ""
                      }
                    />
                  }
                >
                  <span>{sub.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
