import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  CreditCard as CreditCardIcon,
  PackageIcon,
  ReceiptIcon,
  TruckIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/layout";
import { mockOrders } from "@/data/mock-data";
import { OrderData } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CourierOption } from "@/types";

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

  const handleTrackingIdChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <span>{order.customer.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex items-center space-x-2">
                <PackageIcon className="h-4 w-4 text-muted-foreground" />
                <span>{order.items.length} items</span>
              </div>
              <div className="flex items-center space-x-2">
                <ReceiptIcon className="h-4 w-4 text-muted-foreground" />
                <span>Total: {order.totalAmount}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <TruckIcon className="h-4 w-4 text-muted-foreground" />
                <span>Courier: {order.courier || "Not assigned"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TruckIcon className="h-4 w-4 text-muted-foreground" />
                <span>Tracking ID: {order.trackingId || "Not available"}</span>
              </div>
              <div>
                <Label htmlFor="courier">Courier</Label>
                <Select value={selectedCourier} onValueChange={handleCourierChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select courier" />
                  </SelectTrigger>
                  <SelectContent>
                    {courierOptions.map((courier) => (
                      <SelectItem key={courier.id} value={courier.name}>
                        {courier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="trackingId">Tracking ID</Label>
                <Input
                  type="text"
                  id="trackingId"
                  value={trackingId || ""}
                  onChange={handleTrackingIdChange}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">{item.price}</TableCell>
                      <TableCell className="text-right">{item.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">{order.totalAmount}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="isDuplicate">Duplicate Order</Label>
                <Input
                  type="checkbox"
                  id="isDuplicate"
                  checked={isDuplicate}
                  onChange={handleDuplicateChange}
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Order notes"
                  value={notes}
                  onChange={handleNotesChange}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
