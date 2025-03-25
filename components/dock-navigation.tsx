/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { cn } from "@/lib/utils";
import { Home, FileText, Share2, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname, useRouter } from "next/navigation";

interface DockItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

function DockItem({
  icon: Icon,
  label,
  path,
  isActive,
  onClick,
}: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            title={label}
            className={cn(
              "relative flex items-center justify-center transition-all duration-200 ease-in-out",
              "w-12 h-12 rounded-full",
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent",
              isHovered || isActive ? "scale-110" : "scale-100"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
          >
            <Icon className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function DockNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authStatus, setAuthStatus] = useState<string | null>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    setAuthStatus(localStorage.getItem("isAuthenticated"));
  }, []);

  const dockItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "blog", icon: FileText, label: "Blog", path: "/blog" },
    { id: "social", icon: Share2, label: "Social", path: "/social" },
    ...(authStatus === "1"
      ? [{ id: "admin", icon: Settings, label: "Admin", path: "/admin" }]
      : []),
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-4 py-3 rounded-full backdrop-blur-md bg-background/80 border shadow-lg">
        {dockItems.map((item) => (
          <DockItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={
              pathname === item.path ||
              (item.path !== "/" && pathname.startsWith(item.path))
            }
            onClick={() => router.push(item.path)}
          />
        ))}
      </div>
    </div>
  );
}
