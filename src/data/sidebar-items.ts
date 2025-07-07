import {
  ArchiveIcon,
  BarChart3Icon,
  BoxIcon,
  ClipboardCheckIcon,
  HomeIcon,
  Package2Icon,
  PlugIcon,
  ReceiptIcon,
  RefreshCwIcon,
  Settings2Icon,
  ShoppingCartIcon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";
import { SidebarItem } from "@/types/sidebar";

export const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
    roles: [
      "admin",
      "dispatcher",
      "finance",
      "cs_agent",
      "rto_agent",
      "brand_user",
      "label_printer",
    ],
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ClipboardCheckIcon,
    roles: [
      "admin",
      "dispatcher",
      "finance",
      "cs_agent",
      "rto_agent",
      "brand_user",
    ],
  },
  {
    name: "Products",
    href: "/products",
    icon: ShoppingCartIcon,
    roles: ["admin", "brand_user"],
  },
  {
    name: "Returns & RTO",
    href: "/returns",
    icon: RefreshCwIcon,
    roles: ["admin", "cs_agent", "rto_agent", "brand_user"],
  },
  {
    name: "Shipping",
    href: "/shipping",
    icon: TruckIcon,
    roles: ["admin", "dispatcher", "label_printer"],
  },
  {
    name: "Label Printing",
    href: "/labels",
    icon: ReceiptIcon,
    roles: ["admin", "label_printer"],
  },
  {
    name: "Inventory",
    href: "/inventory",
    icon: BoxIcon,
    roles: ["admin", "dispatcher", "brand_user"],
  },
  {
    name: "Reconciliation",
    href: "/reconciliation",
    icon: ArchiveIcon,
    roles: ["admin", "finance"],
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3Icon,
    roles: ["admin", "finance", "brand_user"],
  },
  {
    name: "Integrations",
    href: "/integrations",
    icon: PlugIcon, // Optional: import from lucide-react
    roles: ["admin"], // adjust as needed
  },
  {
    name: "Brands",
    href: "/brands",
    icon: Package2Icon,
    roles: ["admin"],
  },
  {
    name: "Users",
    href: "/users",
    icon: UsersIcon,
    roles: ["admin"],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings2Icon,
    roles: ["admin"],
  },
];
