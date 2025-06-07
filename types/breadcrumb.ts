export interface BreadcrumbItem {
  title: string;
  href?: string;
  isCurrentPage?: boolean;
}

export interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
  className?: string;
  autoGenerate?: boolean;
}
