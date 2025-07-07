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

import { useNavigate } from "react-router-dom";
import { ProductPagination } from "./product-pagination";

interface Props {
  products: ProductData[];
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
}

const ProductTable = ({
  products,
  loading,
  page,
  onPageChange,
  hasNextPage,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              : products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <TableCell>
                      <img
                        src={product.image || "https://via.placeholder.com/40"}
                        alt={product.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.inventory}</TableCell>
                    <TableCell>
                      {new Date(product.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
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

export default ProductTable;
