// import { Layout } from "@/components/layout";
// import { mockOrders } from "@/data/mock-data";
// import { OrderTable } from "@/components/orders/order-table";
// import { FilterIcon, PlusIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const OrdersPage = () => {
//   return (
//     <Layout>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
//             <p className="text-muted-foreground">
//               View and manage your orders from all channels.
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm">
//               <FilterIcon className="mr-2 h-4 w-4" />
//               Advanced Filter
//             </Button>
//             <Button size="sm">
//               <PlusIcon className="mr-2 h-4 w-4" />
//               New Order
//             </Button>
//           </div>
//         </div>

//         <OrderTable orders={mockOrders} />
//       </div>
//     </Layout>
//   );
// };

// export default OrdersPage;

import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { OrderTable } from "@/components/orders/order-table";
import { FilterIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFilteredOrders } from "@/api/services/shopify";
import { OrderData } from "@/types";

const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await getFilteredOrders({
          orgId: "YOUR_ORG_ID", // 🔁 Replace dynamically
          page: 1,
          limit: 20,
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

        <OrderTable orders={orders} />
      </div>
    </Layout>
  );
};

export default OrdersPage;
