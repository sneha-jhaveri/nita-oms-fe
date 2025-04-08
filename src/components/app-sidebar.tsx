
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SidebarLogo } from "./sidebar/sidebar-logo";
import { SidebarToggle } from "./sidebar/sidebar-toggle";
import { SidebarNavItems } from "./sidebar/sidebar-nav-items";
import { SidebarUserProfile } from "./sidebar/sidebar-user-profile";
import { sidebarItems } from "@/data/sidebar-items";

interface AppSidebarProps {
  user: {
    role: string;
  };
}

export function AppSidebar({ user }: AppSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
        <SidebarLogo isSidebarOpen={isSidebarOpen} />
        <SidebarToggle isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex-1 overflow-auto py-4">
        <SidebarNavItems 
          items={sidebarItems} 
          isSidebarOpen={isSidebarOpen} 
          userRole={user.role} 
        />
      </div>

      <SidebarUserProfile user={user} isSidebarOpen={isSidebarOpen} />
    </div>
  );
}
