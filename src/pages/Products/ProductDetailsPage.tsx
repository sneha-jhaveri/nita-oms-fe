import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { getProductById } from "@/api/services/shopify";
import { ProductData } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!user?.storeId || !productId) return;
      setLoading(true);
      try {
        const res = await getProductById(user.storeId, productId);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, user?.storeId]);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              {loading ? <Skeleton className="h-6 w-64" /> : product?.title}
            </h1>
            <p className="text-muted-foreground text-sm">
              Product ID: {product?.id}
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {loading ? (
              <Skeleton className="h-64 w-full rounded-md" />
            ) : (
              <img
                src={product?.image || "https://via.placeholder.com/300"}
                alt={product?.title}
                className="rounded-md max-h-64 object-contain"
              />
            )}
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-muted-foreground">Price</p>
              <p className="text-lg font-medium">
                {loading ? (
                  <Skeleton className="h-5 w-20" />
                ) : (
                  `$${product?.price}`
                )}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Inventory</p>
              <p className="text-lg font-medium">
                {loading ? (
                  <Skeleton className="h-5 w-20" />
                ) : (
                  product?.inventory
                )}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Created At</p>
              <p className="text-sm">
                {loading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  new Date(product?.createdAt || "").toLocaleString()
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
