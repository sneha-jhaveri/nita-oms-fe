// src/components/products/product-table-body.tsx
import { Link } from "react-router-dom";
import { ProductData } from "@/types";
import { Button } from "@/components/ui/button";

interface ProductTableBodyProps {
  products: ProductData[];
  searchTerm: string;
  onClearFilters: () => void;
}

export function ProductTableBody({
  products,
  searchTerm,
  onClearFilters,
}: ProductTableBodyProps) {
  return (
    <tbody>
      {products.length > 0 ? (
        products.map((product) => (
          <tr key={product.id} className="border-t hover:bg-muted/50">
            <td className="px-4 py-3 text-sm">
              {product.images?.length ? (
                <img
                  src={product.images[0].src}
                  alt={product.images[0].altText || product.title}
                  className="h-12 w-12 object-contain rounded"
                />
              ) : (
                <div className="h-12 w-12 bg-gray-200 rounded" />
              )}
            </td>
            <td className="px-4 py-3 text-sm">
              <Link
                to={`/products/${product.id}`}
                className="font-medium text-primary hover:underline"
              >
                {product.title}
              </Link>
            </td>
            <td className="px-4 py-3 text-sm">{product.vendor || "-"}</td>{" "}
            {/* Changed from brand to vendor */}
            <td className="px-4 py-3 text-sm">{product.sku || "-"}</td>
            <td className="px-4 py-3 text-sm">₹{product.price}</td>
            <td className="px-4 py-3 text-sm">
              {product.available ? "Yes" : "No"}
            </td>
            <td className="px-4 py-3 text-sm">
              {new Date(product.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6} className="px-4 py-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-muted-foreground">No products found</p>
              {searchTerm && (
                <Button
                  variant="link"
                  className="h-auto p-0 text-sm"
                  onClick={onClearFilters}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
}
