
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { mockCourierOptions, mockOrders } from "@/data/mock-data";
import { useParams, Link } from "react-router-dom";
import { OrderData } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircleIcon, 
  ArrowLeftIcon, 
  CheckCircleIcon, 
  ClipboardCheckIcon, 
  CopyIcon, 
  PrinterIcon, 
  RefreshCwIcon, 
  Trash2Icon, 
  TruckIcon, 
  XCircleIcon 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to get order details
    setTimeout(() => {
      const foundOrder = mockOrders.find(
        (o) => o.orderId === orderId
      );
      setOrder(foundOrder || null);
      setLoading(false);
    }, 300);
  }, [orderId]);

  const handleCopyOrderId = () => {
    if (order) {
      navigator.clipboard.writeText(order.orderId);
      toast({
        title: "Order ID copied",
        description: `Order ${order.orderId} copied to clipboard`,
      });
    }
  };

  const handleVerify = () => {
    toast({
      title: "Order verified",
      description: `Order ${order?.orderId} has been manually verified`,
    });
  };

  const handleDispatch = () => {
    toast({
      title: "Dispatch initiated",
      description: `Order ${order?.orderId} marked for dispatch`,
    });
  };

  const handleCancel = () => {
    toast({
      title: "Order cancelled",
      description: `Order ${order?.orderId} has been cancelled`,
      variant: "destructive",
    });
  };

  const handleGenerateLabel = () => {
    toast({
      title: "Label generated",
      description: `Shipping label for order ${order?.orderId} has been generated`,
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading order details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <AlertCircleIcon className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Order Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The order you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/orders">
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Link
                to="/orders"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeftIcon className="mr-1 h-4 w-4" />
                Back to orders
              </Link>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <h1 className="text-2xl font-semibold">
                Order #{order.orderId}
              </h1>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleCopyOrderId}
              >
                <CopyIcon className="h-4 w-4" />
                <span className="sr-only">Copy order ID</span>
              </Button>
              {order.isDuplicate && (
                <div className="rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-600 dark:bg-amber-900/30 dark:text-amber-500">
                  Duplicate Order
                </div>
              )}
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Created on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>•</span>
              <OrderStatusBadge status={order.status} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center gap-1"
              onClick={handleVerify}
            >
              <CheckCircleIcon className="mr-1 h-4 w-4" />
              Verify
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center gap-1"
              onClick={handleDispatch}
            >
              <TruckIcon className="mr-1 h-4 w-4" />
              Dispatch
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center gap-1"
              onClick={handleGenerateLabel}
            >
              <PrinterIcon className="mr-1 h-4 w-4" />
              Print Label
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="inline-flex items-center gap-1"
              onClick={handleCancel}
            >
              <XCircleIcon className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Order Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Courier</TabsTrigger>
            <TabsTrigger value="payment">Payment & Billing</TabsTrigger>
            <TabsTrigger value="history">History & Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Customer Information */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Customer Information</h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Shipping Address</p>
                      <p className="text-sm text-muted-foreground">{order.customer.address.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer.address.city}, {order.customer.address.state} {order.customer.address.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Order Summary */}
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Order Summary</h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <p className="text-sm">Payment Method</p>
                      <p className="text-sm font-medium">{order.paymentMethod}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Brand</p>
                      <p className="text-sm font-medium">{order.brand}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Sub Total</p>
                      <p className="text-sm font-medium">
                        {order.totalAmount}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">GST</p>
                      <p className="text-sm font-medium">{order.totalGST}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Shipping</p>
                      <p className="text-sm font-medium">{order.shippingCost}</p>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Total</p>
                        <p className="text-sm font-medium">{order.totalAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Order Items */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold">Order Items</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="whitespace-nowrap px-2 py-3 text-left text-sm font-medium">
                          Item
                        </th>
                        <th className="whitespace-nowrap px-2 py-3 text-left text-sm font-medium">
                          SKU
                        </th>
                        <th className="whitespace-nowrap px-2 py-3 text-left text-sm font-medium">
                          Price
                        </th>
                        <th className="whitespace-nowrap px-2 py-3 text-left text-sm font-medium">
                          Quantity
                        </th>
                        <th className="whitespace-nowrap px-2 py-3 text-right text-sm font-medium">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="whitespace-nowrap px-2 py-3 text-sm">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm">
                            {item.sku}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm">
                            {item.price}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm">
                            {item.quantity}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-right text-sm">
                            {item.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Shipping Details</h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium">Delivery Address</p>
                      <p className="text-sm text-muted-foreground">{order.customer.address.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer.address.city}, {order.customer.address.state} {order.customer.address.pincode}
                      </p>
                    </div>
                    {order.courier ? (
                      <>
                        <div className="flex justify-between">
                          <p className="text-sm">Courier</p>
                          <p className="text-sm font-medium">{order.courier}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm">Tracking ID</p>
                          <p className="text-sm font-medium">{order.trackingId}</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <AlertCircleIcon className="h-4 w-4" />
                        <span>Courier not yet assigned</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Label Settings</h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <p className="text-sm">Label Format</p>
                      <p className="text-sm font-medium">A4</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Next Scheduled Print</p>
                      <p className="text-sm font-medium">9:00 AM Tomorrow</p>
                    </div>
                    <Button variant="outline" className="w-full mt-2" onClick={handleGenerateLabel}>
                      <PrinterIcon className="mr-2 h-4 w-4" />
                      Generate & Print Label Now
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Courier Selection</h3>
                  <Button variant="outline" size="sm">
                    <RefreshCwIcon className="mr-2 h-4 w-4" />
                    Refresh Options
                  </Button>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="whitespace-nowrap px-2 py-3 text-left text-sm font-medium">
                          Courier Partner
                        </th>
                        <th className="whitespace-nowrap px-2 py-3 text-left text-sm font-medium">
                          Fee
                        </th>
                        <th className="whitespace-nowrap px-2 py-3 text-left text-sm font-medium">
                          ETA
                        </th>
                        <th className="whitespace-nowrap px-2 py-3 text-left text-sm font-medium">
                          RTO Rate
                        </th>
                        <th className="whitespace-nowrap px-2 py-3 text-left text-sm font-medium">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCourierOptions.map((option) => (
                        <tr key={option.id} className="border-b">
                          <td className="whitespace-nowrap px-2 py-3 text-sm">
                            {option.name}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm">
                            {option.fee}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm">
                            {option.eta}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm">
                            {option.rtoRate}
                          </td>
                          <td className="whitespace-nowrap px-2 py-3 text-sm">
                            <Button variant="outline" size="sm">
                              <TruckIcon className="mr-2 h-4 w-4" />
                              Select
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="pt-4">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold">Payment Information</h3>
                <div className="mt-4 space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <CreditCardIcon className="h-5 w-5" />
                      <h4 className="font-medium">
                        {order.paymentMethod === "COD" 
                          ? "Cash on Delivery" 
                          : order.paymentMethod}
                      </h4>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm">Status</p>
                        <p className="text-sm font-medium">
                          {order.status === "paid" 
                            ? "Paid" 
                            : order.status === "cancelled" 
                            ? "Cancelled"
                            : "Pending"}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm">Sub Total</p>
                        <p className="text-sm">{order.totalAmount}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm">GST (18%)</p>
                        <p className="text-sm">{order.totalGST}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm">Shipping</p>
                        <p className="text-sm">{order.shippingCost}</p>
                      </div>
                      {order.paymentMethod === "COD" && (
                        <div className="flex justify-between">
                          <p className="text-sm">COD Charges</p>
                          <p className="text-sm">₹40.00</p>
                        </div>
                      )}
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">Total</p>
                          <p className="text-sm font-medium">{order.totalAmount}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Billing Address</h4>
                    <div className="mt-2">
                      <p className="text-sm">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.address.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer.address.city}, {order.customer.address.state} {order.customer.address.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Tax Information</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm">GST Number</p>
                        <p className="text-sm font-medium">GSTIN123456789</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm">Invoice Number</p>
                        <p className="text-sm font-medium">INV-{order.orderId}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm">Place of Supply</p>
                        <p className="text-sm font-medium">{order.customer.address.state}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="pt-4">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold">Order History</h3>
                <div className="mt-4 space-y-4">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="relative">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                          <ClipboardCheckIcon className="h-4 w-4" />
                        </div>
                        <div className="absolute bottom-0 left-1/2 top-10 -translate-x-1/2 border-l-2"></div>
                      </div>
                      <div className="pb-8">
                        <p className="text-sm font-medium">Order Created</p>
                        <time className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleString()}
                        </time>
                        <p className="mt-2 text-sm">
                          Order {order.orderId} was created with {order.items.length} items.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                        <CheckCircleIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Order Verified</p>
                        <time className="text-xs text-muted-foreground">
                          {new Date(new Date(order.createdAt).getTime() + 2 * 60 * 60 * 1000).toLocaleString()}
                        </time>
                        <p className="mt-2 text-sm">
                          Order was verified and approved for processing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {order.notes && (
              <Card className="mt-4">
                <div className="p-6">
                  <h3 className="text-lg font-semibold">Order Notes</h3>
                  <div className="mt-4">
                    <p className="text-sm">{order.notes}</p>
                  </div>
                </div>
              </Card>
            )}

            <Card className="mt-4">
              <div className="p-6">
                <h3 className="text-lg font-semibold">Add Note</h3>
                <div className="mt-4">
                  <textarea
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Add a note about this order..."
                  ></textarea>
                  <Button className="mt-2">Save Note</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
