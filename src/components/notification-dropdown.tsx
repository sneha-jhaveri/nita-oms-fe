
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "error" | "warning" | "info" | "success";
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Order Received",
    description: "Order #12345 has been placed",
    time: "2 minutes ago",
    read: false,
    type: "info",
  },
  {
    id: "2",
    title: "Inventory Alert",
    description: "SKU AB123 is running low (5 units left)",
    time: "1 hour ago",
    read: false,
    type: "warning",
  },
  {
    id: "3",
    title: "Payment Failed",
    description: "Order #12340 payment was declined",
    time: "3 hours ago",
    read: true,
    type: "error",
  },
  {
    id: "4",
    title: "Return Approved",
    description: "Return request for order #12335 was approved",
    time: "Yesterday",
    read: true,
    type: "success",
  },
];

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-auto">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-2 px-4">
                <div className="flex items-center w-full">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        notification.type === 'error' ? 'bg-red-500' :
                        notification.type === 'warning' ? 'bg-amber-500' :
                        notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></span>
                      <p className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                        {notification.title}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-4 text-center text-muted-foreground">
              No notifications
            </div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          <span className="text-xs text-center w-full text-primary">View all notifications</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
