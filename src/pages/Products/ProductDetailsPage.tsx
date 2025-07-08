/* eslint-disable @typescript-eslint/no-explicit-any */

// // src/pages/ProductDetailsPage.tsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Layout } from "@/components/layout";
// import { getProductById } from "@/api/services/shopify";
// import { useAuth } from "@/context/AuthContext";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";

// export interface ProductData {
//   id: string;
//   title: string;
//   price: string;
//   inventory: number;
//   image?: string;
//   createdAt: string;
//   vendor: string;
//   sku?: string;
//   available: boolean;
// }

// const ProductDetailsPage = () => {
//   const { productId } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState<ProductData | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (!user?.storeId || !productId) return;
//       setLoading(true);
//       try {
//         const res = await getProductById(user.storeId, productId);
//         const productData = res.data;
//         setProduct({
//           id: productData.shopifyProductId,
//           title: productData.title,
//           price: productData.variants[0]?.price || "0.00",
//           inventory: productData.variants[0]?.inventoryQuantity || 0,
//           image:
//             productData.images[0]?.src || "https://via.placeholder.com/300",
//           createdAt: productData.createdAt,
//           vendor: productData.vendor,
//           sku: productData.variants[0]?.sku || undefined,
//           available:
//             (productData.variants[0]?.inventoryQuantity || 0) > 0 &&
//             productData.status === "active",
//         });
//       } catch (err) {
//         console.error("Failed to fetch product", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId, user?.storeId]);

//   return (
//     <Layout>
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold">
//               {loading ? <Skeleton className="h-6 w-64" /> : product?.title}
//             </h1>
//             <p className="text-muted-foreground text-sm">
//               Product ID:{" "}
//               {loading ? <Skeleton className="h-4 w-32" /> : product?.id}
//             </p>
//           </div>
//           <Button variant="outline" onClick={() => navigate(-1)}>
//             Back
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             {loading ? (
//               <Skeleton className="h-64 w-full rounded-md" />
//             ) : (
//               <img
//                 src={product?.image || "https://via.placeholder.com/300"}
//                 alt={product?.title}
//                 className="rounded-md max-h-64 object-contain"
//               />
//             )}
//           </div>
//           <div className="space-y-2">
//             <div>
//               <p className="text-muted-foreground">Price</p>
//               <p className="text-lg font-medium">
//                 {loading ? (
//                   <Skeleton className="h-5 w-20" />
//                 ) : (
//                   `$${product?.price}`
//                 )}
//               </p>
//             </div>
//             <div>
//               <p className="text-muted-foreground">Inventory</p>
//               <p className="text-lg font-medium">
//                 {loading ? (
//                   <Skeleton className="h-5 w-20" />
//                 ) : (
//                   product?.inventory
//                 )}
//               </p>
//             </div>
//             <div>
//               <p className="text-muted-foreground">Created At</p>
//               <p className="text-sm">
//                 {loading ? (
//                   <Skeleton className="h-4 w-32" />
//                 ) : (
//                   new Date(product?.createdAt || "").toLocaleString()
//                 )}
//               </p>
//             </div>
//             <div>
//               <p className="text-muted-foreground">Vendor</p>
//               <p className="text-lg font-medium">
//                 {loading ? <Skeleton className="h-5 w-20" /> : product?.vendor}
//               </p>
//             </div>
//             <div>
//               <p className="text-muted-foreground">SKU</p>
//               <p className="text-lg font-medium">
//                 {loading ? (
//                   <Skeleton className="h-5 w-20" />
//                 ) : (
//                   product?.sku || "N/A"
//                 )}
//               </p>
//             </div>
//             <div>
//               <p className="text-muted-foreground">Available</p>
//               <p className="text-lg font-medium">
//                 {loading ? (
//                   <Skeleton className="h-5 w-20" />
//                 ) : product?.available ? (
//                   "Yes"
//                 ) : (
//                   "No"
//                 )}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ProductDetailsPage;

// src/pages/ProductDetailsPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { getProductById } from "@/api/services/shopify";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { set } from "date-fns";

export interface ProductData {
  id: string;
  title: string;
  price: string;
  inventory: number;
  image?: string; // Optional main image URL
  images?: { src: string; altText?: string }[]; // Optional array of images with optional alt text
  createdAt: string;
  vendor: string;
  sku?: string;
  available: boolean;
}

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!user?.storeId) return;
      setLoading(true);
      try {
        const res = await getProductById(user.storeId, productId);
        const productData = res.data;
        console.log("Raw product data:", productData);
        setProduct({
          id: productData.shopifyProductId,
          title: productData.metaData.title,
          price: productData.metaData.variants[0]?.price || "0.00",
          inventory: productData.metaData.variants[0]?.inventory_quantity || 0,
          images:
            Array.isArray(productData.metaData.images) &&
            productData.metaData.images.length > 0
              ? productData.metaData.images.map((img: any) => ({
                  src: img.src,
                  altText: img.alt || "",
                }))
              : [],

          image:
            productData.images?.[0]?.src ||
            productData.metaData.images?.[0]?.src ||
            "https://via.placeholder.com/300",
          createdAt: productData.createdAt,
          vendor: productData.vendor,
          sku: productData.metaData.variants[0]?.sku || undefined,
          available:
            (productData.metaData.variants[0]?.inventory_quantity || 0) > 0 &&
            productData.status === "active",
        });
        console.log("Product data fetched:", setProduct);
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
              Product ID:{" "}
              {loading ? <Skeleton className="h-4 w-32" /> : product?.id}
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
              <>
                {/* Product Title */}
                <h2 className="text-xl font-semibold mb-4">
                  {product?.title || product?.title || "Untitled Product"}
                </h2>

                {/* Images */}
                {product?.images && product.images.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.images.map((img, index) => (
                      <img
                        key={index}
                        src={img.src}
                        alt={
                          img.altText ||
                          `${product.title || product.title} - Image ${
                            index + 1
                          }`
                        }
                        className="rounded-md max-h-64 object-contain"
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src="https://via.placeholder.com/300"
                    alt={product?.title || "No image"}
                    className="rounded-md max-h-64 object-contain"
                  />
                )}
              </>
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
            <div>
              <p className="text-muted-foreground">Vendor</p>
              <p className="text-lg font-medium">
                {loading ? <Skeleton className="h-5 w-20" /> : product?.vendor}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">SKU</p>
              <p className="text-lg font-medium">
                {loading ? (
                  <Skeleton className="h-5 w-20" />
                ) : (
                  product?.sku || "N/A"
                )}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Available</p>
              <p className="text-lg font-medium">
                {loading ? (
                  <Skeleton className="h-5 w-20" />
                ) : product?.available ? (
                  "Yes"
                ) : (
                  "No"
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
