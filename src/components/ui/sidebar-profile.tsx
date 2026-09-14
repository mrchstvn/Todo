import { User } from "lucide-react";
import { SidebarMenuButton } from "./sidebar";

export default function SidebarProfile() {
  return (
    <SidebarMenuButton className="cursor-pointer">
      <a href="/dashboard/profile" className="flex flex-row gap-2">
        <User />
        <span>User</span>
      </a>
    </SidebarMenuButton>
  );
}
