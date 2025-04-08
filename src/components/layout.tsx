
import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";
import { MainNav } from "./main-nav";
import { AppSidebar } from "./app-sidebar";
import { NotificationDropdown } from "./notification-dropdown";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Mock user data - in a real app this would come from auth context
  const user = {
    name: "Admin User",
    email: "admin@nitakitchen.com",
    role: "admin",
    avatarUrl: "",
  };
  
  return (
    <div className="flex min-h-screen">
      <AppSidebar user={user} />
      
      <div className="flex-1 flex flex-col ml-16 sm:ml-16 lg:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <MainNav user={user} className="hidden md:flex mx-6" />
          <div className="ml-auto flex items-center gap-4">
            <NotificationDropdown />
            <ThemeToggle />
            <UserNav user={user} />
          </div>
        </header>
        
        <main className="flex-1">
          <div className="container py-6 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
