import LogoutButton from "@/components/ui/logout-button";
import SideNav from "@/components/layout/side-nav";

export default function DashBoardPage() {
  return (
    <div className="flex">
      <SideNav />
      <div className="p-4">
        <h1>Hello from DashBoardPage</h1>
        <LogoutButton />
      </div>
    </div>
  );
}
