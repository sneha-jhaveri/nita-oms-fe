
import {
  ArchiveIcon,
  BarChart3Icon,
  BoxIcon,
  ClipboardCheckIcon,
  HomeIcon,
  Package2Icon,
  ReceiptIcon,
  RefreshCwIcon,
  Settings2Icon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
}

const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: HomeIcon,
    roles: ["admin", "dispatcher", "finance", "cs_agent", "rto_agent", "brand_user", "label_printer"],
  },
  {
    name: "Orders",
    href: "/orders",
    icon: ClipboardCheckIcon,
    roles: ["admin", "dispatcher", "finance", "cs_agent", "rto_agent", "brand_user"],
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

interface AppSidebarProps {
  user: {
    role: string;
  };
}

export function AppSidebar({ user }: AppSidebarProps) {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filter sidebar items based on user role
  const filteredSidebarItems = sidebarItems.filter(item => 
    item.roles.includes(user.role) || user.role === "admin"
  );

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    localStorage.setItem("oms-sidebar-open", JSON.stringify(!isSidebarOpen));
  };

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("oms-sidebar-open");
    if (savedState !== null) {
      setIsSidebarOpen(JSON.parse(savedState));
    }
  }, []);

  return (
    <div
      className={cn(
        "h-screen fixed left-0 top-0 z-20 flex flex-col border-r bg-card transition-all",
        isSidebarOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {isSidebarOpen ? (
          <Link to="/" className="flex items-center">
            <BoxIcon className="h-6 w-6 text-primary mr-2" />
            <span className="text-lg font-semibold">Nita KitchenMart</span>
          </Link>
        ) : (
          <Link to="/" className="flex items-center justify-center w-full">
            <BoxIcon className="h-6 w-6 text-primary" />
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn("h-8 w-8", !isSidebarOpen && "mx-auto")}
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {filteredSidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                location.pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
                !isSidebarOpen && "justify-center px-0"
              )}
            >
              <item.icon className={cn("h-5 w-5", !isSidebarOpen && "h-6 w-6")} />
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-medium text-primary">
              {user.role === "admin" ? "A" : user.role.charAt(0).toUpperCase()}
            </span>
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {user.role === "admin" ? "Admin" : 
                 user.role === "dispatcher" ? "Dispatcher" :
                 user.role === "finance" ? "Finance" : 
                 user.role === "cs_agent" ? "Customer Service" :
                 user.role === "rto_agent" ? "RTO Agent" :
                 user.role === "label_printer" ? "Label Printer" : 
                 user.role === "brand_user" ? "Brand User" : "User"}
              </span>
              <span className="text-xs text-muted-foreground">View profile</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
