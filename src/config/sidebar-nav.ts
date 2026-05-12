import {
  LayoutDashboard,
  BarChart2,
  Users,
  FileText,
  Settings2,
  AppWindowMac,
  PanelsTopLeft,
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
    label: "nav.group.overview",
    items: [
      { title: "nav.dashboard", url: "/dashboard", icon: LayoutDashboard as LucideIcon },
      { title: "nav.analytics", url: "/analytics", icon: BarChart2 as LucideIcon },
    ],
  },
  {
    label: "nav.group.manage",
    items: [
      {
        title: "nav.users",
        url: "/users",
        icon: Users as LucideIcon,
        items: [
          { title: "nav.allUsers", url: "/users" },
          { title: "nav.rolesPermissions", url: "/users/roles" },
        ],
      },
      {
        title: "nav.content",
        url: "/content",
        icon: FileText as LucideIcon,
        items: [
          { title: "nav.posts", url: "/content/posts" },
          { title: "nav.media", url: "/content/media" },
        ],
      },
    ],
  },
  {
    label: "nav.group.system",
    items: [
      { title: "nav.settings", url: "/settings", icon: Settings2 as LucideIcon },
      { title: "nav.profile", url: "/profile", icon: Users as LucideIcon },
    ],
  },
  {
    label: "nav.group.components",
    items: [
      { title: "nav.mdiDemo", url: "/mdi-demo", icon: AppWindowMac as LucideIcon },
      { title: "nav.workspaceDemo", url: "/workspace-demo", icon: PanelsTopLeft as LucideIcon },
    ],
  },
];
