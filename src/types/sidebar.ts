
import { ElementType } from "react";

export interface SidebarItem {
  name: string;
  href: string;
  icon: ElementType;
  roles: string[];
}

export interface SidebarUserProps {
  role: string;
}
