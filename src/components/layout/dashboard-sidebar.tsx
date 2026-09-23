"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { ClipboardList, ListChecks } from "lucide-react";

import LogoutButton from "@/components/ui/logout-button";
import SideBarLogo from "../ui/sidebar-logo";
import { Separator } from "../ui/separator";
import SidebarProfile from "../ui/sidebar-profile";

const navItems = [
  { title: "My tasks", url: "/tasks", icon: ClipboardList },
  { title: "Completed tasks", url: "/completed", icon: ListChecks },
];

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SideBarLogo />
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tasks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <a href={item.url} className="flex flex-row gap-2 w-full">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarProfile />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <LogoutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
