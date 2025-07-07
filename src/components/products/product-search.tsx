import { Input } from "@/components/ui/input";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const ProductSearch = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products by title..."
        className="w-full md:w-1/3"
      />
    </div>
  );
};

export default ProductSearch;
