"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface HeaderProps {
  onLogout: () => void;
}

export function AdminHeader({ onLogout }: HeaderProps) {
  return (
    <header className="mb-8 flex justify-between items-center">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <Button variant="outline" onClick={onLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </header>
  );
}
