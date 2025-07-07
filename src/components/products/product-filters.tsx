import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

const ProductFilters = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <FilterIcon className="w-4 h-4 mr-2" />
        Filter (Coming Soon)
      </Button>
    </div>
  );
};

export default ProductFilters;
