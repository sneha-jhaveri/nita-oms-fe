
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: string;
  variant?: 
    | "default"
    | "secondary"
    | "outline"
    | "success"
    | "warning" 
    | "danger"
    | "pending";
}

const variantMap: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
  picked: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
  paid: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
  cancelled: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
  returned: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
  default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "text-foreground",
  success: "bg-green-100 text-green-800 border-green-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  danger: "bg-red-100 text-red-800 border-red-200"
};

export function StatusBadge({ 
  status, 
  variant, 
  className, 
  ...props 
}: StatusBadgeProps) {
  const variantClass = variant 
    ? variantMap[variant] 
    : variantMap[status.toLowerCase()] || variantMap.default;

  return (
    <Badge 
      className={cn(variantClass, "font-medium capitalize", className)} 
      {...props}
    >
      {status}
    </Badge>
  );
}
