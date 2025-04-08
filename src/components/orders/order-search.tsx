
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface OrderSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function OrderSearch({ 
  value, 
  onChange, 
  placeholder = "Search orders..." 
}: OrderSearchProps) {
  return (
    <div className="relative flex-1">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-8"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
