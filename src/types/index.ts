/* eslint-disable @typescript-eslint/no-explicit-any */

export type OrderStatus =
  | "pending"
  | "picked"
  | "paid"
  | "cancelled"
  | "returned";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  price: string;
  quantity: number;
  total: string;
}
export interface OrderData {
  orderId: string;
  _id: string;
  shopifyOrderId: string;
  orderNumber: string;
  orderName: string;
  totalAmount: string;
  orderDate: string;
  brand: string;
  customer: {
    id: string;
    email?: string;
    name: string;
    firstName: string;
    lastName: string;
    phone?: string;
  };
  lineItems: {
    id: string;
    title: string;
    quantity: number;
    price: string;
    sku?: string;
    variantId?: string;
    variantTitle?: string;
    productId?: string;
    fulfillmentStatus?: string | null;
    taxable?: boolean;
    grams?: number;
  }[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone?: string | null;
    countryCode?: string;
    provinceCode?: string;
  } | null;
  billingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone?: string | null;
  };
  financialSummary: {
    subtotal: number;
    totalTax: number;
    totalDiscounts: number;
    totalShipping: number;
    totalPrice: number;
    currency: string;
  };
  status: string;
  paymentStatus: string;
  fulfillmentStatus: string | null;
  isDuplicate: boolean;
  isSynced: boolean;
  createdAt: string;
  updatedAt: string;
  shopifyStoreId: string;
  shopDomain: string;
  tags: string[];
  courier?: string;
  trackingId?: string;
  notes?: string;
}

export interface CourierOption {
  id: string;
  name: string;
  fee: string;
  eta: string;
  rtoRate: string;
}

export interface ProductData {
  id: string;
  title: string;
  price: string;
  inventory: number;
  image?: string;
  createdAt: string;
  vendor: string;
  sku?: string;
  available: boolean;
}
