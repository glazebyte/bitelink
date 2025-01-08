import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard-header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div>
          <DashboardHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
