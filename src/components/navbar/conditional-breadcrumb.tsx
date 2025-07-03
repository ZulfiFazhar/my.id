"use client";

import { usePathname } from "next/navigation";
import { BreadcrumbNav } from "./breadcrumbNav";

export function ConditionalBreadcrumb({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-[960px] mx-auto px-4 pt-8 pb-28">
      <BreadcrumbNav autoGenerate className="mb-7" />
      {children}
    </div>
  );
}
