import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PrinterIcon, EyeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  customer: string;
  destination: string;
  status: string;
  courier: string;
  items: number;
  created: string;
  weight: string;
}

interface OrderLabelListProps {
  orders: Order[];
  selectedOrders: string[];
  onSelectOrder: (orderId: string) => void;
  onSelectAll: () => void;
  onViewOrder: (orderId: string) => void;
}

export function OrderLabelList({
  orders,
  selectedOrders,
  onSelectOrder,
  onSelectAll,
  onViewOrder,
}: OrderLabelListProps) {
  const allSelected =
    orders.length > 0 && selectedOrders.length === orders.length;

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left">
                <div className="flex items-center">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={onSelectAll}
                    aria-label="Select all orders"
                  />
                </div>
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                Order Number
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                Customer
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                Destination
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                Courier
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                Weight
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className={cn(
                    "border-t hover:bg-muted/50",
                    selectedOrders.includes(order.id) ? "bg-muted/50" : ""
                  )}
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => onSelectOrder(order.id)}
                      aria-label={`Select order ${order.id}`}
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-sm">{order.customer}</td>
                  <td className="px-4 py-3 text-sm">{order.destination}</td>
                  <td className="px-4 py-3 text-sm">
                    {order.courier ? (
                      <span className="font-medium">{order.courier}</span>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-yellow-600 bg-yellow-50 border-yellow-200"
                      >
                        Unassigned
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">{order.weight}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onViewOrder(order.id)}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={!order.courier}
                      >
                        <PrinterIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No orders found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
