import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import CreateButton from "@/components/ui/create-button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full p-4">
        <SidebarTrigger />
        {children}
        <CreateButton />
      </main>
    </SidebarProvider>
  );
}
