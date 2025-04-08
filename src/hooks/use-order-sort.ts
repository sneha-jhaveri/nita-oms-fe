
import { useState } from "react";
import { OrderData } from "@/types";

export function useOrderSort(initialOrders: OrderData[]) {
  const [sortField, setSortField] = useState<keyof OrderData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof OrderData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortOrders = (orders: OrderData[]) => {
    if (!sortField) return orders;
    
    return [...orders].sort((a, b) => {
      let valueA, valueB;
  
      if (sortField === "createdAt") {
        valueA = new Date(a[sortField]).getTime();
        valueB = new Date(b[sortField]).getTime();
      } else if (sortField === "totalAmount") {
        valueA = parseFloat(a[sortField].replace(/[₹,]/g, ""));
        valueB = parseFloat(b[sortField].replace(/[₹,]/g, ""));
      } else {
        valueA = a[sortField];
        valueB = b[sortField];
      }
  
      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  return {
    sortField,
    sortDirection,
    handleSort,
    sortOrders
  };
}
