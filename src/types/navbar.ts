export interface MenuItem {
  title: string;
  url: string;
  icon: React.ReactNode;
}

export interface NavbarProps {
  menu?: MenuItem[];
}
