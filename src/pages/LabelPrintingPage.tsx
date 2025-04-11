
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileDown, 
  FileUp, 
  FilterIcon, 
  PlusIcon, 
  PrinterIcon, 
  QrCodeIcon, 
  RefreshCw, 
  SearchIcon,
  CheckCircleIcon,
  CheckSquare,
  Settings2Icon,
  FileCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BatchSettings } from "@/components/labels/batch-settings";
import { PrintSettings } from "@/components/labels/print-settings";
import { LabelPreview } from "@/components/labels/label-preview";
import { OrderLabelList } from "@/components/labels/order-label-list";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for orders awaiting printing
const mockOrdersForLabels = [
  {
    id: "ORD-40321",
    customer: "Rajesh Kumar",
    items: 3,
    weight: "1.2 kg",
    status: "Ready for Shipping",
    courier: "Delhivery",
    created: "2025-04-09",
    destination: "Delhi"
  },
  {
    id: "ORD-40322",
    customer: "Priya Sharma",
    items: 2,
    weight: "0.8 kg",
    status: "Ready for Shipping",
    courier: "BlueDart",
    created: "2025-04-09",
    destination: "Mumbai"
  },
  {
    id: "ORD-40325",
    customer: "Ankit Patel",
    items: 1,
    weight: "0.5 kg",
    status: "Ready for Shipping",
    courier: "DTDC",
    created: "2025-04-10",
    destination: "Ahmedabad"
  },
  {
    id: "ORD-40328",
    customer: "Nisha Mehta",
    items: 4,
    weight: "2.1 kg",
    status: "Ready for Shipping",
    courier: "Delhivery",
    created: "2025-04-10",
    destination: "Bangalore"
  },
  {
    id: "ORD-40331",
    customer: "Vikram Singh",
    items: 2,
    weight: "1.0 kg",
    status: "Ready for Shipping",
    courier: "Ecom Express",
    created: "2025-04-11",
    destination: "Hyderabad"
  }
];

// Mock recent print batches
const recentBatches = [
  { id: "BATCH-2301", date: "2025-04-11 10:30 AM", orders: 12, status: "completed" },
  { id: "BATCH-2300", date: "2025-04-10 03:45 PM", orders: 8, status: "completed" },
  { id: "BATCH-2298", date: "2025-04-09 11:20 AM", orders: 15, status: "completed" },
];

const LabelPrintingPage = () => {
  const [activeTab, setActiveTab] = useState("print");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courierFilter, setCourierFilter] = useState("all");

  // Get unique couriers for filter
  const couriers = Array.from(new Set(mockOrdersForLabels.map(order => order.courier)));
  
  // Filter orders based on search and filters
  const filteredOrders = mockOrdersForLabels.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourier = courierFilter === "all" || order.courier === courierFilter;
    
    return matchesSearch && matchesCourier;
  });

  // Handle order selection
  const toggleOrderSelection = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  // Select all orders
  const selectAllOrders = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Label Printing</h1>
            <p className="text-muted-foreground">
              Generate and print shipping labels for orders
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline">
              <FileUp className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button>
              <PrinterIcon className="mr-2 h-4 w-4" />
              Print Selected
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="print">Print Labels</TabsTrigger>
            <TabsTrigger value="history">Print History</TabsTrigger>
          </TabsList>

          <TabsContent value="print" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <CardTitle>Orders Ready for Shipping</CardTitle>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="relative w-64">
                          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search orders..."
                            className="pl-8 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        
                        <Select 
                          value={courierFilter} 
                          onValueChange={setCourierFilter}
                        >
                          <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Courier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Couriers</SelectItem>
                            {couriers.map(courier => (
                              <SelectItem key={courier} value={courier}>{courier}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Button variant="outline" size="icon">
                          <FilterIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <OrderLabelList 
                        orders={filteredOrders}
                        selectedOrders={selectedOrders}
                        onToggleOrder={toggleOrderSelection}
                        onSelectAll={selectAllOrders}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Batch Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BatchSettings selectedCount={selectedOrders.length} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Print Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PrintSettings />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Label Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LabelPreview />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Recent Print Batches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">Batch ID</th>
                          <th className="h-10 px-4 text-left font-medium">Date & Time</th>
                          <th className="h-10 px-4 text-left font-medium">Orders</th>
                          <th className="h-10 px-4 text-left font-medium">Status</th>
                          <th className="h-10 px-4 text-right font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBatches.map((batch) => (
                          <tr key={batch.id} className="border-b">
                            <td className="p-4 font-medium">{batch.id}</td>
                            <td className="p-4">{batch.date}</td>
                            <td className="p-4">{batch.orders} orders</td>
                            <td className="p-4">
                              <div className="flex items-center">
                                <CheckCircleIcon className="mr-2 h-4 w-4 text-green-500" />
                                <span className="capitalize">{batch.status}</span>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <Button variant="ghost" size="sm">
                                <FileCheck className="mr-2 h-4 w-4" />
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LabelPrintingPage;
