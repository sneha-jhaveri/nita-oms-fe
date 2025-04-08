
import { 
  ArchiveIcon,
  BoxIcon, 
  CreditCardIcon,
  IndianRupeeIcon,
  PackageIcon, 
  RefreshCwIcon,
  TruckIcon 
} from "lucide-react";
import { Layout } from "@/components/layout";
import { StatCard } from "@/components/stat-card";
import { StatusChart } from "@/components/status-chart";
import { RecentOrdersCard } from "@/components/recent-orders-card";
import { getOrdersByStatusData, getOrderStats, mockOrders } from "@/data/mock-data";

const Index = () => {
  const statusData = getOrdersByStatusData();
  const stats = getOrderStats();
  
  // Get only the 5 most recent orders
  const recentOrders = [...mockOrders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your Order Management System dashboard.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Today's Orders"
            value={stats.todaysOrders}
            icon={PackageIcon}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Returns"
            value={stats.returns}
            icon={RefreshCwIcon}
            trend={{ value: 5, isPositive: false }}
          />
          <StatCard
            title="RTO Rate"
            value={`${stats.rtoRate}%`}
            icon={TruckIcon}
            description="Based on last 30 days"
            trend={{ value: 2.1, isPositive: true }}
          />
          <StatCard
            title="Net Sales"
            value={stats.netSales}
            description={`Without GST: ${stats.netSalesWithoutGST}`}
            icon={IndianRupeeIcon}
            trend={{ value: 8.4, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <StatusChart data={statusData} />
          <RecentOrdersCard orders={recentOrders} />
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="col-span-1 dashboard-card rounded-xl border bg-card shadow-sm">
            <div className="dashboard-card-header">
              <h3 className="font-semibold">Quick Actions</h3>
            </div>
            <div className="dashboard-card-content flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <BoxIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">7 orders pending verification</span>
              </div>
              <div className="flex items-center gap-3">
                <TruckIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">12 orders ready for dispatch</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCwIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">3 return requests awaiting processing</span>
              </div>
              <div className="flex items-center gap-3">
                <ArchiveIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">4 reconciliation issues need attention</span>
              </div>
              <div className="flex items-center gap-3">
                <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">9 payments pending confirmation</span>
              </div>
            </div>
          </div>
          <div className="col-span-2 dashboard-card rounded-xl border bg-card shadow-sm">
            <div className="dashboard-card-header">
              <h3 className="font-semibold">Order Volume Trend</h3>
              <span className="text-sm text-muted-foreground">Last 14 days</span>
            </div>
            <div className="dashboard-card-content">
              <div className="flex h-[200px] w-full items-center justify-center text-muted-foreground">
                Chart will be available here
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
