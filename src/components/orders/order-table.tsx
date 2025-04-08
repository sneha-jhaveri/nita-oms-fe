
import { useMemo } from "react";
import { OrderData } from "@/types";

import { useOrderFilter } from "@/hooks/use-order-filter";
import { useOrderSort } from "@/hooks/use-order-sort";
import { useOrderPagination } from "@/hooks/use-order-pagination";

import { OrderSearch } from "./order-search";
import { OrderFilters } from "./order-filters";
import { OrderTableHeader } from "./order-table-header";
import { OrderTableBody } from "./order-table-body";
import { OrderPagination } from "./order-pagination";

interface OrderTableProps {
  orders: OrderData[];
}

export function OrderTable({ orders }: OrderTableProps) {
  const {
    searchTerm,
    statusFilter,
    brandFilter,
    brands,
    setSearchTerm,
    setStatusFilter,
    setBrandFilter,
    filterOrders,
    clearFilters
  } = useOrderFilter(orders);

  const {
    sortField,
    sortDirection,
    handleSort,
    sortOrders
  } = useOrderSort(orders);

  const {
    currentPage,
    setCurrentPage,
    paginateOrders
  } = useOrderPagination(10);

  // Apply filters first, then sorting, then pagination
  const filteredOrders = useMemo(() => filterOrders(), [
    searchTerm, 
    statusFilter, 
    brandFilter, 
    orders
  ]);
  
  const sortedOrders = useMemo(() => sortOrders(filteredOrders), [
    filteredOrders, 
    sortField, 
    sortDirection
  ]);
  
  const { paginatedItems, totalPages, totalItems } = useMemo(
    () => paginateOrders(sortedOrders),
    [sortedOrders, currentPage]
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleBrandChange = (value: string) => {
    setBrandFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <OrderSearch 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
        </div>
        <OrderFilters
          statusFilter={statusFilter}
          brandFilter={brandFilter}
          brands={brands}
          onStatusChange={handleStatusChange}
          onBrandChange={handleBrandChange}
        />
      </div>
      
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <OrderTableHeader 
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            <OrderTableBody 
              orders={paginatedItems} 
              searchTerm={searchTerm}
              onClearFilters={clearFilters}
            />
          </table>
        </div>
      </div>
      
      <OrderPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
