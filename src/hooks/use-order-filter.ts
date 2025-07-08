import { useState } from "react";
import { OrderData } from "@/types";

export function useOrderFilter(initialOrders: OrderData[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all");
  const [fulfillmentStatusFilter, setFulfillmentStatusFilter] =
    useState<string>("all");
  const [codFilter, setCodFilter] = useState<string>("all");
  const [brandFilter, setBrandFilter] = useState<string>("all");

  const getBrands = () => {
    return Array.from(new Set(initialOrders.map((order) => order.brand)));
  };

  const filterOrders = () => {
    return initialOrders.filter((order) => {
      const matchesSearch =
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      const matchesPaymentStatus =
        paymentStatusFilter === "all" ||
        order.paymentStatus === paymentStatusFilter;

      const matchesFulfillmentStatus =
        fulfillmentStatusFilter === "all" ||
        order.fulfillmentStatus === fulfillmentStatusFilter;

      const matchesCod =
        codFilter === "all" || String(order.isCod) === codFilter;

      const matchesBrand = brandFilter === "all" || order.brand === brandFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPaymentStatus &&
        matchesFulfillmentStatus &&
        matchesCod &&
        matchesBrand
      );
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPaymentStatusFilter("all");
    setFulfillmentStatusFilter("all");
    setCodFilter("all");
    setBrandFilter("all");
  };

  return {
    searchTerm,
    statusFilter,
    paymentStatusFilter,
    fulfillmentStatusFilter,
    codFilter,
    brandFilter,
    brands: getBrands(),
    setSearchTerm,
    setStatusFilter,
    setPaymentStatusFilter,
    setFulfillmentStatusFilter,
    setCodFilter,
    setBrandFilter,
    filterOrders,
    clearFilters,
  };
}
