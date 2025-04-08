import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout";
import { mockOrders } from "@/data/mock-data";
import { 
  ArrowLeft, 
  CalendarIcon, 
  CreditCard as CreditCardIcon, 
  Edit, 
  FileText, 
  Mail, 
  MapPin, 
  Phone, 
  Printer, 
  Truck, 
  User 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { OrderData } from "@/types";

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  // Find the order with the matching orderId
  const order: OrderData | undefined = mockOrders.find(order => order.orderId === orderId);

  if (!order) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-semibold">Order Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn't find an order with that ID.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Order Details: {order.orderId}
            </h1>
            <p className="text-muted-foreground">
              View and manage the details of this order.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit Order
            </Button>
            <Button variant="ghost" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
            <CardDescription>Details about the order</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium">Order ID</div>
              <div className="text-gray-500">{order.orderId}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Order Date</div>
              <div className="text-gray-500">
                <CalendarIcon className="mr-2 inline-block h-4 w-4" />
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Status</div>
              <div>
                <OrderStatusBadge status={order.status} />
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Payment Method</div>
              <div className="text-gray-500">
                <CreditCardIcon className="mr-2 inline-block h-4 w-4" />
                {order.paymentMethod}
              </div>
            </div>
            {order.courier && order.trackingId && (
              <>
                <div>
                  <div className="text-sm font-medium">Courier</div>
                  <div className="text-gray-500">
                    <Truck className="mr-2 inline-block h-4 w-4" />
                    {order.courier}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Tracking ID</div>
                  <div className="text-gray-500">{order.trackingId}</div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Details about the customer</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium">Customer Name</div>
              <div className="text-gray-500">
                <User className="mr-2 inline-block h-4 w-4" />
                {order.customer.name}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Email</div>
              <div className="text-gray-500">
                <Mail className="mr-2 inline-block h-4 w-4" />
                {order.customer.email}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Phone</div>
              <div className="text-gray-500">
                <Phone className="mr-2 inline-block h-4 w-4" />
                {order.customer.phone}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Address</div>
              <div className="text-gray-500">
                <MapPin className="mr-2 inline-block h-4 w-4" />
                {`${order.customer.address.street}, ${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.pincode}`}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>List of items in this order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.sku}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col md:flex-row gap-4 items-center justify-end">
            <div className="text-sm font-medium">Subtotal:</div>
            <div className="text-gray-500">{order.totalAmount}</div>
            <Separator orientation="vertical" className="h-5" />
            <div className="text-sm font-medium">GST:</div>
            <div className="text-gray-500">{order.totalGST}</div>
            <Separator orientation="vertical" className="h-5" />
            <div className="text-sm font-medium">Shipping:</div>
            <div className="text-gray-500">{order.shippingCost}</div>
            <Separator orientation="vertical" className="h-5" />
            <div className="text-sm font-medium">Total:</div>
            <div className="text-gray-900 font-semibold">{order.totalAmount}</div>
          </CardFooter>
        </Card>

        {order.notes && (
          <Card>
            <CardHeader>
              <CardTitle>Order Notes</CardTitle>
              <CardDescription>Additional notes for this order</CardDescription>
            </CardHeader>
            <CardContent>
              <FileText className="mr-2 inline-block h-4 w-4" />
              {order.notes}
            </CardContent>
          </Card>
        )}

        {order.isDuplicate && (
          <Badge variant="destructive">
            Duplicate Order
          </Badge>
        )}
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
