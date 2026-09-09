"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { SidebarMenuButton } from "./sidebar";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();

    router.push("/");
    router.refresh();
  }
  return (
    <div>
      <SidebarMenuButton onClick={handleLogout}>
        <LogOut />
        <span>Logout</span>
      </SidebarMenuButton>
    </div>
  );
}
