import { Outlet } from "react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";


export function AppLayout() {
  return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0 md:p-6 md:pt-0">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
  );
}
