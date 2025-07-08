import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { OrderData } from "@/types";

interface OrderTableHeaderProps {
  sortField: keyof OrderData | null;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof OrderData) => void;
}

export function OrderTableHeader({
  sortField,
  sortDirection,
  onSort,
}: OrderTableHeaderProps) {
  const SortableHeader = ({
    field,
    children,
  }: {
    field: keyof OrderData;
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
        <SortableHeader field="orderId">Order Number</SortableHeader>
        <NormalHeader>Customer</NormalHeader>
        <NormalHeader>Brand</NormalHeader>
        <SortableHeader field="status">Status</SortableHeader>
        <NormalHeader>Courier</NormalHeader>
        <SortableHeader field="totalAmount">Amount</SortableHeader>
        <SortableHeader field="createdAt">Date</SortableHeader>
      </tr>
    </thead>
  );
}
