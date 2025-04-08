
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarItem } from "@/types/sidebar";

interface SidebarNavItemsProps {
  items: SidebarItem[];
  isSidebarOpen: boolean;
  userRole: string;
}

export function SidebarNavItems({ items, isSidebarOpen, userRole }: SidebarNavItemsProps) {
  const location = useLocation();
  
  // Filter sidebar items based on user role
  const filteredItems = items.filter(item => 
    item.roles.includes(userRole) || userRole === "admin"
  );

  return (
    <nav className="grid gap-1 px-2">
      {filteredItems.map((item) => (
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
  );
}
