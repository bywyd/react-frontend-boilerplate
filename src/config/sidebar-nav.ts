import {
  LayoutDashboard,
  BarChart2,
  Users,
  FileText,
  Settings2,
  type LucideIcon,
} from "lucide-react";

export interface SidebarNavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  permission?: string;
  items?: { title: string; url: string; permission?: string }[];
}

export interface SidebarNavGroup {
  label: string;
  items: SidebarNavItem[];
}

export const sidebarNav: SidebarNavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard as LucideIcon },
      { title: "Analytics", url: "/analytics", icon: BarChart2 as LucideIcon },
    ],
  },
  {
    label: "Manage",
    items: [
      {
        title: "Users",
        url: "/users",
        icon: Users as LucideIcon,
        items: [
          { title: "All Users", url: "/users" },
          { title: "Roles & Permissions", url: "/users/roles" },
        ],
      },
      {
        title: "Content",
        url: "/content",
        icon: FileText as LucideIcon,
        items: [
          { title: "Posts", url: "/content/posts" },
          { title: "Media", url: "/content/media" },
        ],
      },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Settings", url: "/settings", icon: Settings2 as LucideIcon },
      { title: "Profile", url: "/profile", icon: Users as LucideIcon },
    ],
  },
];
