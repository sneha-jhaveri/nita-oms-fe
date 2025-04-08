
import { useState } from "react";
import { OrderData } from "@/types";

export function useOrderFilter(initialOrders: OrderData[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [brandFilter, setBrandFilter] = useState<string>("all");

  const getBrands = () => {
    return Array.from(new Set(initialOrders.map(order => order.brand)));
  };

  const filterOrders = () => {
    return initialOrders.filter(order => {
      const matchesSearch = 
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      const matchesBrand = brandFilter === "all" || order.brand === brandFilter;
  
      return matchesSearch && matchesStatus && matchesBrand;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setBrandFilter("all");
  };

  return {
    searchTerm,
    statusFilter,
    brandFilter,
    brands: getBrands(),
    setSearchTerm,
    setStatusFilter,
    setBrandFilter,
    filterOrders,
    clearFilters
  };
}
