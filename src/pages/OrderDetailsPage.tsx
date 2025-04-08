
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout";
import { mockOrders } from "@/data/mock-data";
import { OrderData, CourierOption } from "@/types";
import { CustomerInfoCard } from "@/components/orders/customer-info-card";
import { ShippingInfoCard } from "@/components/orders/shipping-info-card";
import { OrderItemsTable } from "@/components/orders/order-items-table";
import { AdditionalInfoCard } from "@/components/orders/additional-info-card";

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderData | undefined>(undefined);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [notes, setNotes] = useState("");
  const [courierOptions, setCourierOptions] = useState<CourierOption[]>([
    {
      id: "1",
      name: "Delhivery",
      fee: "50",
      eta: "3-5 days",
      rtoRate: "2%",
    },
    {
      id: "2",
      name: "Blue Dart",
      fee: "75",
      eta: "2-4 days",
      rtoRate: "1.5%",
    },
    {
      id: "3",
      name: "Xpressbees",
      fee: "60",
      eta: "4-6 days",
      rtoRate: "2.5%",
    },
  ]);
  const [selectedCourier, setSelectedCourier] = useState<string | undefined>(
    undefined
  );
  const [trackingId, setTrackingId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (orderId) {
      const foundOrder = mockOrders.find((order) => order.orderId === orderId);
      setOrder(foundOrder);
      setIsDuplicate(foundOrder?.isDuplicate || false);
      setNotes(foundOrder?.notes || "");
      setSelectedCourier(foundOrder?.courier);
      setTrackingId(foundOrder?.trackingId);
    }
  }, [orderId]);

  if (!order) {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center">
          <Card>
            <CardHeader>
              <CardTitle>Order Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The order you are looking for does not exist.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const handleDuplicateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDuplicate(e.target.checked);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleCourierChange = (value: string) => {
    setSelectedCourier(value);
  };

  const handleTrackingIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingId(e.target.value);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <Link
            to="/orders"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Order Details
          </h1>
          <p className="text-muted-foreground">
            View and manage details for order #{orderId}.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CustomerInfoCard order={order} />
          
          <ShippingInfoCard
            courier={order.courier}
            trackingId={order.trackingId}
            selectedCourier={selectedCourier}
            courierOptions={courierOptions}
            onCourierChange={handleCourierChange}
            onTrackingIdChange={handleTrackingIdChange}
          />
          
          <OrderItemsTable 
            items={order.items} 
            totalAmount={order.totalAmount} 
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AdditionalInfoCard
            isDuplicate={isDuplicate}
            notes={notes}
            onDuplicateChange={handleDuplicateChange}
            onNotesChange={handleNotesChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
