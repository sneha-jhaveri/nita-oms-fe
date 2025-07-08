/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../axiosInstance";

// 1. Connect to Shopify (OAuth)
export const connectShopify = (shop: string) => {
  return axiosInstance.get("/shopify/stores/connect", {
    params: { shop },
  });
};

// 2. Get connect URL (optional alternate for redirect flow)
export const getShopifyConnectUrl = (shopUrl: string) => {
  return axiosInstance.get("/shopify/stores/connect/url", {
    params: { shopUrl },
  });
};

// 3. Shopify auth callback
export const shopifyAuthCallback = () => {
  return axiosInstance.get("/shopify/stores/auth/callback");
};

// 4. Manual connect
export const manualShopifyConnect = (data: {
  shopDomain: string;
  accessToken: string;
  manualApiKey: string;
  manualApiSecret: string;
}) => {
  return axiosInstance.post("/shopify/stores/manual", data);
};

// 5. Create advanced config
export const createAdvancedConfig = (data: any) => {
  return axiosInstance.post("/shopify/stores/advanced-config", data);
};

// 6. Update advanced config by ID
export const updateAdvancedConfig = (configId: string, data: any) => {
  return axiosInstance.put(`/shopify/stores/advanced-config/${configId}`, data);
};

// 7. Get advanced config for a store
export const getAdvancedConfig = (storeId: string) => {
  return axiosInstance.get(`/shopify/stores/${storeId}/advanced-config`);
};

// 8. Get filtered orders
export const getFilteredOrders = (
  storeId: string,
  params: {
    cod?: string; 
    status?: string;
    paymentStatus?: string;
    fulfillmentStatus?: string;
    page?: number;
    limit?: number;
  }
) => {
  return axiosInstance.get(`/shopify/orders/${storeId}`, { params });
};

// 9. Get single order by ID
export const getOrderById = (orderId: string, storeId: string) => {
  return axiosInstance.get(`/shopify/orders/${storeId}/${orderId}`);
};

// 10. Get paginated products for a store
export const getProducts = (storeId: string, page = 1, limit = 20) => {
  console.log("Calling getProducts API with:", { storeId, page, limit });

  return axiosInstance.get(`/shopify/products/${storeId}`, {
    params: { page, limit },
  });
};

// 11. Get single product
export const getProductById = (storeId: string, productId: string) => {
  return axiosInstance.get(`/shopify/products/${storeId}/${productId}`);
};

// 12. Trigger sync config change
export const handleSyncConfigChange = (data: {
  configId: string;
  orgId: string;
}) => {
  return axiosInstance.post("/shopify/sync-config/handle-config-change", data);
};

// 13. Trigger manual sync
export const manualSyncStore = (storeId: string) => {
  return axiosInstance.post(`/shopify/sync-config/manual-sync/${storeId}`);
};

// 14. Get store sync config
export const getStoreSyncConfig = (storeId: string, orgId: string) => {
  return axiosInstance.get(
    `/shopify/sync-config/store-config/${storeId}/${orgId}`
  );
};
