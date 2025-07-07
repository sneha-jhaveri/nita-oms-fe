import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { ProductData } from "@/types";

interface ProductTableHeaderProps {
  sortField: keyof ProductData | null;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof ProductData) => void;
}

export function ProductTableHeader({
  sortField,
  sortDirection,
  onSort,
}: ProductTableHeaderProps) {
  const SortableHeader = ({
    field,
    children,
  }: {
    field: keyof ProductData;
    children: React.ReactNode;
  }) => (
    <th
      className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-sm font-semibold"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field &&
          (sortDirection === "asc" ? (
            <ArrowUpIcon className="h-4 w-4" />
          ) : (
            <ArrowDownIcon className="h-4 w-4" />
          ))}
      </div>
    </th>
  );

  const NormalHeader = ({ children }: { children: React.ReactNode }) => (
    <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
      {children}
    </th>
  );

  return (
    <thead className="bg-muted/50">
      <tr>
        <SortableHeader field="title">Title</SortableHeader>
        <NormalHeader>Brand</NormalHeader>
        <NormalHeader>SKU</NormalHeader>
        <SortableHeader field="price">Price</SortableHeader>
        <NormalHeader>Available</NormalHeader>
        <SortableHeader field="createdAt">Created At</SortableHeader>
      </tr>
    </thead>
  );
}
