import {
  Settings,
  FileText,
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
    label: "Settings",
    items: [
      {
        title: "Master Definitions",
        url: "/intranet/masterdefinitions",
        icon: FileText as LucideIcon,
        items: [
          { title: "Currencies", url: "/intranet/masterdefinitions/currencies" },
          { title: "Destinations", url: "/intranet/masterdefinitions/destinations" },
          { title: "Sale Channels", url: "/intranet/masterdefinitions/salechannels" },
          { title: "Banks", url: "/intranet/masterdefinitions/banks" },
          { title: "Companies", url: "/intranet/masterdefinitions/companies" },
          { title: "Suppliers", url: "/intranet/masterdefinitions/suppliers" },
          { title: "Airports", url: "/intranet/masterdefinitions/airports" },
          { title: "Vehicles", url: "/intranet/masterdefinitions/vehicles" },
          { title: "Vehicle Drivers", url: "/intranet/masterdefinitions/vehicle-drivers" },
          { title: "Local Guides", url: "/intranet/masterdefinitions/local-guides" },
          { title: "Docks", url: "/intranet/masterdefinitions/docks" },

        ],
      },
      {
        title: "System Settings",
        url: "/intranet/systemhandle",
        icon: Settings as LucideIcon,
        items: [
          { title: "Currency Exchange", url: "/intranet/systemhandle/currencyexchange" },
          { title: "Offices", url: "/intranet/systemhandle/offices" },
          { title: "Announcements", url: "/intranet/systemhandle/announcements" },
          { title: "Queues", url: "/intranet/systemhandle/queues" },
        ],
      },
    ],
  },
];
