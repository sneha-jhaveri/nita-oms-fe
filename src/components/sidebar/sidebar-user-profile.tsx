import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SidebarUserProfileProps {
  user: {
    role: string;
  };
  isSidebarOpen: boolean;
}

export function SidebarUserProfile({
  user,
  isSidebarOpen,
}: SidebarUserProfileProps) {
  return (
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
              {user.role === "admin"
                ? "Admin"
                : user.role === "dispatcher"
                ? "Dispatcher"
                : user.role === "finance"
                ? "Finance"
                : user.role === "cs_agent"
                ? "Customer Service"
                : user.role === "rto_agent"
                ? "RTO Agent"
                : user.role === "label_printer"
                ? "Label Printer"
                : user.role === "brand_user"
                ? "Brand User"
                : "User"}
            </span>
            <span className="text-xs text-muted-foreground">
              <Link to="/profile" className="hover:underline">
                View profile
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
