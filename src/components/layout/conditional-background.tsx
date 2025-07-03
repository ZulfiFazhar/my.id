"use client";

import { usePathname } from "next/navigation";
import { BackgroundPattern } from "./background-pattern";

export function ConditionalBackground() {
  const pathname = usePathname();

  // Don't show background pattern on dashboard pages
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return <BackgroundPattern />;
}
