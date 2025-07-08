import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface OrderFiltersProps {
  statusFilter: string;
  paymentStatusFilter: string;
  fulfillmentStatusFilter: string;
  codFilter: string;
  onStatusChange: (value: string) => void;
  onPaymentStatusChange: (value: string) => void;
  onFulfillmentStatusChange: (value: string) => void;
  onCodChange: (value: string) => void;
}

export function OrderFilters({
  statusFilter,
  paymentStatusFilter,
  fulfillmentStatusFilter,
  codFilter,
  onStatusChange,
  onPaymentStatusChange,
  onFulfillmentStatusChange,
  onCodChange,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Order Status */}
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Order Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
        </SelectContent>
      </Select>

      {/* Payment Status */}
      <Select value={paymentStatusFilter} onValueChange={onPaymentStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Payment Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Payments</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="unpaid">Unpaid</SelectItem>
          <SelectItem value="refunded">Refunded</SelectItem>
        </SelectContent>
      </Select>

      {/* Fulfillment Status */}
      <Select
        value={fulfillmentStatusFilter}
        onValueChange={onFulfillmentStatusChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Fulfillment Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Fulfillments</SelectItem>
          <SelectItem value="fulfilled">Fulfilled</SelectItem>
          <SelectItem value="unfulfilled">Unfulfilled</SelectItem>
          <SelectItem value="partial">Partially Fulfilled</SelectItem>
        </SelectContent>
      </Select>

      {/* COD */}
      <Select value={codFilter} onValueChange={onCodChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="COD Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="true">COD</SelectItem>
          <SelectItem value="false">Prepaid</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
