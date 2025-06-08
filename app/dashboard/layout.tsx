/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AuthGuard } from "@/components/dashboard/auth-guard";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/sonner";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

const getPageTitle = (pathname: string): string => {
  const pageMap: Record<string, string> = {
    "/dashboard": "Overview",
    "/dashboard/analytics": "Analytics",
    "/dashboard/projects": "Projects",
    "/dashboard/competitions": "Competitions",
    "/dashboard/blogs": "Blogs",
    "/dashboard/messages": "Messages",
    "/dashboard/settings": "Settings",
  };

  return pageMap[pathname] || "Dashboard";
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPageTitle = getPageTitle(pathname);

  return (
    <AuthGuard>
      <SidebarProvider>
        <Toaster position="top-center" />
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-10 bg-background">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {pathname !== "/dashboard" && (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{currentPageTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
