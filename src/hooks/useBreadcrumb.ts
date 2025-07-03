"use client";

import { usePathname } from "next/navigation";
import { projects } from "@/types/projects";
import { competitions } from "@/types/competitions";
import { BreadcrumbItem } from "@/types/breadcrumb";

// Define route mappings for dynamic content
const routeMappings = {
  projects: {
    basePath: "/projects",
    baseTitle: "Projects",
    getItemTitle: (id: string) => {
      const project = projects.find((p) => p.id === id);
      return project ? project.title : id;
    },
  },
  blog: {
    basePath: "/blogs",
    baseTitle: "Blogs",
    getItemTitle: (id: string) => {
      // You can add blog data here when available
      return id.charAt(0).toUpperCase() + id.slice(1);
    },
  },
};

export function useBreadcrumb(): BreadcrumbItem[] {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbItems: BreadcrumbItem[] = [{ title: "Home", href: "/" }];

  let currentPath = "";

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    const isSecondLevel = index === 1;
    const parentSegment = pathSegments[0];

    let title = segment.charAt(0).toUpperCase() + segment.slice(1);

    // Check if this is a mapped route
    const routeMapping =
      routeMappings[parentSegment as keyof typeof routeMappings];

    if (routeMapping && index === 0) {
      // This is the base route (e.g., /projects)
      breadcrumbItems.push({
        title: routeMapping.baseTitle,
        href: isLast ? undefined : routeMapping.basePath,
        isCurrentPage: isLast,
      });
    } else if (isSecondLevel) {
      // This is a detail page, try to get the actual title
      if (parentSegment === "projects") {
        const project = projects.find((p) => p.slug === segment);
        title = project ? project.title : segment;
      } else if (parentSegment === "competitions") {
        const competition = competitions.find((c) => c.id === segment);
        title = competition ? competition.title : segment;
      }

      breadcrumbItems.push({
        title,
        isCurrentPage: true,
      });
    } else {
      // Handle regular segments
      breadcrumbItems.push({
        title,
        href: isLast ? undefined : currentPath,
        isCurrentPage: isLast,
      });
    }
  });

  return breadcrumbItems;
}
