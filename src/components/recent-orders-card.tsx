
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { OrderData } from "@/types";

interface RecentOrdersCardProps {
  orders: OrderData[];
}

export function RecentOrdersCard({ orders }: RecentOrdersCardProps) {
  return (
    <Card className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="font-semibold">Recent Orders</h3>
        <Link to="/orders" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="dashboard-card-content p-0">
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                    ID
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                    Customer
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                    Amount
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId} className="border-t hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">
                      <Link to={`/orders/${order.orderId}`} className="font-medium text-primary hover:underline">
                        #{order.orderId}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm">{order.customer.name}</td>
                    <td className="px-4 py-3 text-sm">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-sm">{order.totalAmount}</td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                      No recent orders
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  );
}
