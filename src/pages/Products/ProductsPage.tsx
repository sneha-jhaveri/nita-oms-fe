// src/pages/ProductsPage.tsx
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { getProducts } from "@/api/services/shopify";
import { useAuth } from "@/context/AuthContext";
import ProductTable from "@/components/products/product-table";

const ProductsPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (!user?.storeId)
      return console.error("No store ID found in user context");
    setLoading(true);
    try {
      const res = await getProducts(user.storeId, page, limit);
      setProducts(res.data);
      setHasNextPage(res.data.length === limit);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, user?.storeId]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Browse and manage your store's products.
            </p>
          </div>
        </div>
        <ProductTable
          products={products}
          page={page}
          onPageChange={setPage}
          hasNextPage={hasNextPage}
          loading={loading}
        />
      </div>
    </Layout>
  );
};

export default ProductsPage;
