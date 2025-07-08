/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { OrderTable } from "@/components/orders/order-table";
import { FilterIcon, PlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getFilteredOrders } from "@/api/services/shopify";
import { OrderData } from "@/types";
import { Label } from "@/components/ui/label";

const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("all");
  const [paymentStatus, setPaymentStatus] = useState("all");
  const [fulfillmentStatus, setFulfillmentStatus] = useState("all");
  const [cod, setCod] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const storeId = localStorage.getItem("storeId");
      if (!storeId) throw new Error("Missing storeId");

      const res = await getFilteredOrders(storeId, {
        cod: cod !== "all" ? cod : undefined,
        status: status !== "all" ? status : undefined,
        paymentStatus: paymentStatus !== "all" ? paymentStatus : undefined,
        fulfillmentStatus:
          fulfillmentStatus !== "all" ? fulfillmentStatus : undefined,
        page,
        limit: 20,
      });

      const rawOrders = res.data.data || [];

      const mapped: OrderData[] = rawOrders.map((order: any) => ({
        id: order._id,
        orderId: order.orderNumber,
        customer: {
          name: `${order.customer?.firstName || ""} ${
            order.customer?.lastName || ""
          }`.trim(),
          phone: order.customer?.phone || "",
          email: order.customer?.email || "",
        },
        items:
          order.lineItems?.map((item: any) => ({
            id: item.id,
            name: item.title,
            quantity: item.quantity,
            price: item.price,
            total: (Number(item.price) * item.quantity).toFixed(2),
          })) || [],
        status: order.status,
        totalAmount: order.financialSummary?.totalPrice?.toString() || "0",
        totalGST: order.financialSummary?.totalTax?.toString() || "0",
        shippingCost: order.financialSummary?.totalShipping?.toString() || "0",
        paymentMethod: order.isCod ? "COD" : "Prepaid",
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        courier: order.courier || "",
        trackingId: order.trackingId || "",
        brand: order.shopDomain || "—",
        isDuplicate: order.isDuplicate,
        notes: order.notes,
        isCod: order.isCod,
        paymentStatus: order.paymentStatus,
        fulfillmentStatus: order.fulfillmentStatus,
      }));

      setOrders(mapped);
      setTotalPages(res.data?.meta?.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const clearFilters = () => {
    setStatus("all");
    setPaymentStatus("all");
    setFulfillmentStatus("all");
    setCod("all");
    setPage(1);
    fetchOrders();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">
              View and manage your orders from all channels.
            </p>
          </div>
          <Button size="sm">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </div>
        {/* Table */}
        <OrderTable orders={orders} loading={loading} />

        {/* Pagination */}
        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OrdersPage;
