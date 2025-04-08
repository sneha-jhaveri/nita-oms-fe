
import { CourierOption, OrderData } from "@/types";

// Mock data for orders
export const mockOrders: OrderData[] = [
  {
    id: "ord_001",
    orderId: "OMS10001",
    customer: {
      id: "cus_001",
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "+91-9876543210",
      address: {
        street: "123 Main Street, Apartment 4B",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001"
      }
    },
    items: [
      {
        id: "itm_001",
        name: "Premium T-Shirt",
        sku: "TS-PRE-M-BLK",
        price: "₹899",
        quantity: 2,
        total: "₹1,798"
      },
      {
        id: "itm_002",
        name: "Casual Jeans",
        sku: "JN-CAS-32-BLU",
        price: "₹1,499",
        quantity: 1,
        total: "₹1,499"
      }
    ],
    status: "pending",
    totalAmount: "₹3,597",
    totalGST: "₹647.46",
    shippingCost: "₹99",
    paymentMethod: "COD",
    createdAt: "2023-04-07T10:30:00Z",
    updatedAt: "2023-04-07T10:30:00Z",
    brand: "FashionFirst",
    isDuplicate: false
  },
  {
    id: "ord_002",
    orderId: "OMS10002",
    customer: {
      id: "cus_002",
      name: "Priya Patel",
      email: "priya.patel@example.com",
      phone: "+91-8765432109",
      address: {
        street: "456 Park Avenue",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001"
      }
    },
    items: [
      {
        id: "itm_003",
        name: "Wireless Earbuds",
        sku: "EB-WL-BLK",
        price: "₹2,499",
        quantity: 1,
        total: "₹2,499"
      }
    ],
    status: "picked",
    totalAmount: "₹2,499",
    totalGST: "₹449.82",
    shippingCost: "₹0",
    paymentMethod: "Credit Card",
    createdAt: "2023-04-06T15:45:00Z",
    updatedAt: "2023-04-07T09:20:00Z",
    courier: "BlueDart",
    trackingId: "BD1234567890",
    brand: "TechGadgets",
    isDuplicate: false
  },
  {
    id: "ord_003",
    orderId: "OMS10003",
    customer: {
      id: "cus_003",
      name: "Amit Kumar",
      email: "amit.kumar@example.com",
      phone: "+91-7654321098",
      address: {
        street: "789 Gandhi Road",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001"
      }
    },
    items: [
      {
        id: "itm_004",
        name: "Smart Watch",
        sku: "SW-PRO-SLV",
        price: "₹5,999",
        quantity: 1,
        total: "₹5,999"
      }
    ],
    status: "paid",
    totalAmount: "₹5,999",
    totalGST: "₹1,079.82",
    shippingCost: "₹149",
    paymentMethod: "UPI",
    createdAt: "2023-04-06T09:15:00Z",
    updatedAt: "2023-04-07T14:30:00Z",
    courier: "DTDC",
    trackingId: "DT9876543210",
    brand: "TechGadgets",
    isDuplicate: false
  },
  {
    id: "ord_004",
    orderId: "OMS10004",
    customer: {
      id: "cus_004",
      name: "Meera Singh",
      email: "meera.singh@example.com",
      phone: "+91-6543210987",
      address: {
        street: "234 Lake View Road",
        city: "Chennai",
        state: "Tamil Nadu",
        pincode: "600001"
      }
    },
    items: [
      {
        id: "itm_005",
        name: "Yoga Mat",
        sku: "YM-PRO-PRP",
        price: "₹1,299",
        quantity: 1,
        total: "₹1,299"
      },
      {
        id: "itm_006",
        name: "Resistance Bands Set",
        sku: "RB-SET-5",
        price: "₹899",
        quantity: 1,
        total: "₹899"
      }
    ],
    status: "cancelled",
    totalAmount: "₹2,198",
    totalGST: "₹395.64",
    shippingCost: "₹99",
    paymentMethod: "Debit Card",
    createdAt: "2023-04-05T18:20:00Z",
    updatedAt: "2023-04-06T10:15:00Z",
    brand: "FitLife",
    isDuplicate: false,
    notes: "Customer requested cancellation due to ordering mistake"
  },
  {
    id: "ord_005",
    orderId: "OMS10005",
    customer: {
      id: "cus_005",
      name: "Vikram Desai",
      email: "vikram.desai@example.com",
      phone: "+91-5432109876",
      address: {
        street: "567 River Front",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "380001"
      }
    },
    items: [
      {
        id: "itm_007",
        name: "Designer Kurta",
        sku: "KT-DS-L-RED",
        price: "₹2,499",
        quantity: 1,
        total: "₹2,499"
      }
    ],
    status: "returned",
    totalAmount: "₹2,499",
    totalGST: "₹449.82",
    shippingCost: "₹120",
    paymentMethod: "NetBanking",
    createdAt: "2023-04-04T12:10:00Z",
    updatedAt: "2023-04-08T11:30:00Z",
    courier: "Ecom Express",
    trackingId: "EE5678901234",
    brand: "EthnicWear",
    isDuplicate: false,
    notes: "Item returned - size too small"
  },
  {
    id: "ord_006",
    orderId: "OMS10006",
    customer: {
      id: "cus_001",
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "+91-9876543210",
      address: {
        street: "123 Main Street, Apartment 4B",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001"
      }
    },
    items: [
      {
        id: "itm_002",
        name: "Casual Jeans",
        sku: "JN-CAS-32-BLU",
        price: "₹1,499",
        quantity: 1,
        total: "₹1,499"
      }
    ],
    status: "pending",
    totalAmount: "₹1,499",
    totalGST: "₹269.82",
    shippingCost: "₹99",
    paymentMethod: "COD",
    createdAt: "2023-04-07T11:45:00Z",
    updatedAt: "2023-04-07T11:45:00Z",
    brand: "FashionFirst",
    isDuplicate: true
  },
];

// Mock data for courier options
export const mockCourierOptions: CourierOption[] = [
  {
    id: "co_001",
    name: "BlueDart",
    fee: "₹120",
    eta: "2-3 days",
    rtoRate: "3.2%",
  },
  {
    id: "co_002",
    name: "DTDC",
    fee: "₹105",
    eta: "3-4 days",
    rtoRate: "4.5%",
  },
  {
    id: "co_003",
    name: "Ecom Express",
    fee: "₹95",
    eta: "3-5 days",
    rtoRate: "5.1%",
  },
  {
    id: "co_004",
    name: "Delhivery",
    fee: "₹110",
    eta: "2-4 days",
    rtoRate: "3.8%",
  },
];

// Get orders for chart data
export const getOrdersByStatusData = () => {
  const statusCounts = mockOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return [
    { name: "Pending", value: statusCounts.pending || 0, color: "#F59E0B" },
    { name: "Picked", value: statusCounts.picked || 0, color: "#3B82F6" },
    { name: "Paid", value: statusCounts.paid || 0, color: "#10B981" },
    { name: "Cancelled", value: statusCounts.cancelled || 0, color: "#EF4444" },
    { name: "Returned", value: statusCounts.returned || 0, color: "#8B5CF6" },
  ];
};

// Calculate basic stats
export const getOrderStats = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Count today's orders
  const todaysOrders = mockOrders.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= today;
  }).length;

  // Count returns
  const returns = mockOrders.filter(order => order.status === "returned").length;

  // Calculate RTO rate
  const rtoRate = ((returns / mockOrders.length) * 100).toFixed(1);

  // Calculate net sales (mock)
  const netSales = "₹16,792";
  const netSalesWithoutGST = "₹14,212";

  return {
    todaysOrders,
    returns,
    rtoRate,
    netSales,
    netSalesWithoutGST,
  };
};
