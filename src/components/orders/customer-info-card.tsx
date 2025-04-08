
import { UserIcon } from "lucide-react";
import { CreditCard as CreditCardIcon } from "lucide-react";
import { PackageIcon } from "lucide-react";
import { ReceiptIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderData } from "@/types";

interface CustomerInfoCardProps {
  order: OrderData;
}

export function CustomerInfoCard({ order }: CustomerInfoCardProps) {
  return (
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
  );
}
