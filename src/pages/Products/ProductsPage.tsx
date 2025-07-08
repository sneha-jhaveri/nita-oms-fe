/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/ProductsPage.tsx

import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { getProducts } from "@/api/services/shopify";
import { useAuth } from "@/context/AuthContext";
import { ProductTable } from "@/components/products/product-table";

export interface ProductData {
  id: string;
  title: string;
  price: string;
  inventory: number;
  image?: string;
  images?: { src: string; altText?: string }[]; // ✅ added
  createdAt: string;
  vendor: string;
  sku?: string;
  available: boolean;
}

const ProductsPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<ProductData[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const storeId = user?.storeId || localStorage.getItem("storeId");
    if (!storeId) {
      console.error("Missing storeId");
      return;
    }

    setLoading(true);

    try {
      const res = await getProducts(storeId, page, limit);
      const { success, data } = res.data;

      if (!success || !Array.isArray(data)) {
        setProducts([]);
        setHasNextPage(false);
        return;
      }

      const mappedProducts: ProductData[] = data.map((product: any) => {
        const variants = product.metaData?.variants || [];
        const images = product.metaData?.images || [];

        return {
          id: product.shopifyProductId,
          title: product.metaData.title,
          price: variants[0]?.price || "0.00",
          inventory: variants[0]?.inventory_quantity || 0,
          image:
            product.images?.[0]?.src ||
            product.metaData?.images?.[0]?.src ||
            "https://via.placeholder.com/300",
          images: images.map((img: any) => ({
            src: img.src,
            altText: img.alt || "",
          })),
          createdAt: product.createdAt,
          vendor: product.vendor,
          sku: variants[0]?.sku || undefined,
          available:
            (variants[0]?.inventory_quantity || 0) > 0 &&
            product.status === "active",
        };
      });

      setProducts(mappedProducts);
      setHasNextPage(data.length === limit);
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
