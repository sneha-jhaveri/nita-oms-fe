
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OrderData } from "@/types";
import { StatusBadge } from "@/components/ui/status-badge";

interface OrderTableBodyProps {
  orders: OrderData[];
  searchTerm: string;
  onClearFilters: () => void;
}

export function OrderTableBody({ orders, searchTerm, onClearFilters }: OrderTableBodyProps) {
  return (
    <tbody>
      {orders.length > 0 ? (
        orders.map((order) => (
          <tr key={order.orderId} className="border-t hover:bg-muted/50">
            <td className="px-4 py-3 text-sm">
              <Link to={`/orders/${order.orderId}`} className="font-medium text-primary hover:underline">
                #{order.orderId}
              </Link>
              {order.isDuplicate && (
                <span className="ml-2 text-xs text-amber-500 font-medium">Duplicate</span>
              )}
            </td>
            <td className="px-4 py-3 text-sm">{order.customer.name}</td>
            <td className="px-4 py-3 text-sm">{order.brand}</td>
            <td className="px-4 py-3 text-sm">
              <StatusBadge status={order.status} />
            </td>
            <td className="px-4 py-3 text-sm">{order.courier || "—"}</td>
            <td className="px-4 py-3 text-sm">{order.totalAmount}</td>
            <td className="px-4 py-3 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={7} className="px-4 py-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-muted-foreground">No orders found</p>
              {searchTerm && (
                <Button 
                  variant="link" 
                  className="h-auto p-0 text-sm"
                  onClick={onClearFilters}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
}
