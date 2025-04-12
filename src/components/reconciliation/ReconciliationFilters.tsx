
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterIcon, SearchIcon } from "lucide-react";

interface ReconciliationFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  periodFilter: string;
  onPeriodFilterChange: (value: string) => void;
  courierFilter: string;
  onCourierFilterChange: (value: string) => void;
  periods: string[];
  couriers: string[];
}

export function ReconciliationFilters({
  searchTerm,
  onSearchChange,
  periodFilter,
  onPeriodFilterChange,
  courierFilter,
  onCourierFilterChange,
  periods,
  couriers
}: ReconciliationFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by ID or courier..."
          className="pl-8 min-w-[200px]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <Select 
        value={periodFilter} 
        onValueChange={onPeriodFilterChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Periods</SelectItem>
          {periods.map(period => (
            <SelectItem key={period} value={period}>{period}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select 
        value={courierFilter} 
        onValueChange={onCourierFilterChange}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Courier" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Couriers</SelectItem>
          {couriers.map(courier => (
            <SelectItem key={courier} value={courier}>{courier}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button variant="outline" size="icon">
        <FilterIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
