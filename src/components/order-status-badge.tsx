
import { cn } from "@/lib/utils";

type OrderStatus = "pending" | "picked" | "paid" | "cancelled" | "returned";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500":
            status === "pending",
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500":
            status === "picked",
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500":
            status === "paid",
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500":
            status === "cancelled",
          "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500":
            status === "returned",
        },
        className
      )}
    >
      {status === "pending" && "Pending"}
      {status === "picked" && "Picked"}
      {status === "paid" && "Paid"}
      {status === "cancelled" && "Cancelled"}
      {status === "returned" && "Returned"}
    </span>
  );
}
