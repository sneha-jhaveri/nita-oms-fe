
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  user: {
    role: string;
  };
}

interface NavItem {
  name: string;
  href: string;
  roles: string[];
}

export function MainNav({ className, user, ...props }: MainNavProps) {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      roles: ["admin", "dispatcher", "finance", "cs_agent", "rto_agent", "brand_user", "label_printer"],
    },
    {
      name: "Orders",
      href: "/orders",
      roles: ["admin", "dispatcher", "finance", "cs_agent", "rto_agent", "brand_user"],
    },
    {
      name: "Returns & RTO",
      href: "/returns",
      roles: ["admin", "cs_agent", "rto_agent", "brand_user"],
    },
    {
      name: "Shipping",
      href: "/shipping",
      roles: ["admin", "dispatcher", "label_printer"],
    },
    {
      name: "Inventory",
      href: "/inventory",
      roles: ["admin", "dispatcher", "brand_user"],
    },
    {
      name: "Reconciliation",
      href: "/reconciliation",
      roles: ["admin", "finance"],
    },
    {
      name: "Reports",
      href: "/reports",
      roles: ["admin", "finance", "brand_user"],
    },
    {
      name: "Settings",
      href: "/settings",
      roles: ["admin"],
    },
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user.role) || user.role === "admin"
  );
  
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {filteredNavItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            location.pathname === item.href 
              ? "text-primary" 
              : "text-muted-foreground"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
