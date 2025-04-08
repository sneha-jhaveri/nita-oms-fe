
import { useState } from "react";

export function useOrderPagination(itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const paginateOrders = <T>(items: T[]) => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    
    const paginatedItems = items.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    
    return {
      paginatedItems,
      totalPages,
      totalItems: items.length
    };
  };

  return {
    currentPage,
    setCurrentPage,
    paginateOrders
  };
}
