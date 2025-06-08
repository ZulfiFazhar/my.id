"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  BarChart3,
  FolderOpen,
  Trophy,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FolderOpen,
  },
  {
    title: "Competitions",
    url: "/dashboard/competitions",
    icon: Trophy,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.photoURL || ""}
              alt={user?.displayName || ""}
            />
            <AvatarFallback>
              {user?.displayName?.charAt(0)?.toUpperCase() ||
                user?.email?.charAt(0)?.toUpperCase() ||
                "U"}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {user?.displayName || "Dashboard Owner"}
            </span>
            <span className="truncate text-xs">
              {user?.email || "Full-Stack Developer"}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem onClick={handleLogout}>
                <SidebarMenuButton>
                  <LogOut />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <ArrowLeft />
                <span>Back to Portfolio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
