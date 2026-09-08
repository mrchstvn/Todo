import LogoutButton from "@/components/ui/logout-button";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

export default function DashBoardPage() {
  return (
    <div className="flex">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "20rem",
            "--sidebar-width-mobile": "20rem",
          } as React.CSSProperties
        }
      >
        <Sidebar />
      </SidebarProvider>

      <div className="p-4">
        <h1>Hello from DashBoardPage</h1>
        <LogoutButton />
      </div>
    </div>
  );
}
