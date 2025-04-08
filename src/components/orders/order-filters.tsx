
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderFiltersProps {
  statusFilter: string;
  brandFilter: string;
  brands: string[];
  onStatusChange: (value: string) => void;
  onBrandChange: (value: string) => void;
}

export function OrderFilters({
  statusFilter,
  brandFilter,
  brands,
  onStatusChange,
  onBrandChange,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Select 
        value={statusFilter} 
        onValueChange={onStatusChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="picked">Picked</SelectItem>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
          <SelectItem value="returned">Returned</SelectItem>
        </SelectContent>
      </Select>
      
      <Select 
        value={brandFilter} 
        onValueChange={onBrandChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Brands</SelectItem>
          {brands.map((brand) => (
            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
