
import { Layout } from "@/components/layout";
import { mockOrders } from "@/data/mock-data";
import { OrderTable } from "@/components/order-table";
import { FilterIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrdersPage = () => {
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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FilterIcon className="mr-2 h-4 w-4" />
              Advanced Filter
            </Button>
            <Button size="sm">
              <PlusIcon className="mr-2 h-4 w-4" />
              New Order
            </Button>
          </div>
        </div>
        
        <OrderTable orders={mockOrders} />
      </div>
    </Layout>
  );
};

export default OrdersPage;
