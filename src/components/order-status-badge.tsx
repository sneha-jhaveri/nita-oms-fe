
import { cn } from "@/lib/utils";

type OrderStatus = "pending" | "picked" | "paid" | "cancelled" | "returned";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  return (
    <span className={cn("status-badge", status, className)}>
      {status === "pending" && "Pending"}
      {status === "picked" && "Picked"}
      {status === "paid" && "Paid"}
      {status === "cancelled" && "Cancelled"}
      {status === "returned" && "Returned"}
    </span>
  );
}
