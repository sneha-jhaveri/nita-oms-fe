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
  id: string;
  orderId: string;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: string;
  totalGST: string;
  shippingCost: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  courier?: string;
  trackingId?: string;
  brand: string;
  isDuplicate?: boolean;
  notes?: string;
  isCod?: boolean;
  paymentStatus?: string;
  fulfillmentStatus?: string;
}

export interface CourierOption {
  id: string;
  name: string;
  fee: string;
  eta: string;
  rtoRate: string;
}

export interface ProductData {
  brand: string;
  sku: string;
  available: any;
  id: string;
  title: string;
  image?: string;
  price: string;
  inventory: number;
  createdAt: string;
}
