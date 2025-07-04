/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../axiosInstance";

// 1. Connect to Shopify (auth redirect)
export const connectShopify = (shop: string) => {
  return axiosInstance.get("/shopify/stores/connect", {
    params: { shop },
  });
};

// 2. Get connect URL (used for redirect, auth flow)
export const getShopifyConnectUrl = (shopUrl: string) => {
  return axiosInstance.get("/shopify/stores/connect/url", {
    params: { shopUrl },
  });
};

// 3. Shopify auth callback (no params)
export const shopifyAuthCallback = () => {
  return axiosInstance.get("/shopify/stores/auth/callback");
};

// 4. Manual connect (POST)
export const manualShopifyConnect = (data: {
  shopDomain: string;
  accessToken: string;
  manualApiKey: string;
  manualApiSecret: string;
}) => {
  return axiosInstance.post("/shopify/stores/manual", data);
};

// 5. Advanced config (POST)
export const createAdvancedConfig = (data: any) => {
  return axiosInstance.post("/shopify/stores/advanced-config", data);
};

// 6. Update advanced config by ID (PUT)
export const updateAdvancedConfig = (configId: string, data: any) => {
  return axiosInstance.put(`/shopify/stores/advanced-config/${configId}`, data);
};
