// src/components/products/product-table.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductData } from "@/types";
import { ProductTableHeader } from "./product-table-header";
import { ProductTableBody } from "./product-table-body";
import { useState } from "react";
import { ProductPagination } from "./product-pagination";

interface Props {
  products: ProductData[];
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
}

export const ProductTable = ({
  products,
  loading,
  page,
  onPageChange,
  hasNextPage,
}: Props) => {
  const [sortField, setSortField] = useState<keyof ProductData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (field: keyof ProductData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedProducts = [...products]
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const handleClearFilters = () => setSearchTerm("");

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Table>
          <ProductTableHeader
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          {loading ? (
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={6}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <ProductTableBody
              products={filteredAndSortedProducts}
              searchTerm={searchTerm}
              onClearFilters={handleClearFilters}
            />
          )}
        </Table>
      </div>
      <ProductPagination
        currentPage={page}
        totalPages={hasNextPage ? page + 1 : page}
        onPageChange={onPageChange}
      />
    </div>
  );
};
