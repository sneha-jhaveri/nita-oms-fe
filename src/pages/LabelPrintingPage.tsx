
import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PrinterIcon, 
  ArchiveIcon, 
  CheckCircleIcon, 
  DownloadIcon, 
  SettingsIcon, 
  TagIcon,
  CalendarIcon,
  Filter,
  Search,
  BarcodeScannerIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { OrderLabelList } from "@/components/labels/order-label-list";
import { PrintSettings } from "@/components/labels/print-settings";
import { LabelPreview } from "@/components/labels/label-preview";
import { BatchSettings } from "@/components/labels/batch-settings";

// Mock data for orders that need labels
const mockLabelOrders = [
  { 
    id: "OD-1023759",
    customer: "Anita Singh",
    destination: "Mumbai, Maharashtra",
    status: "ready",
    courier: "Delhivery",
    items: 1,
    created: "2025-04-09T10:30:00Z",
    weight: "0.8kg"
  },
  { 
    id: "OD-1023745",
    customer: "Rahul Kumar",
    destination: "Bangalore, Karnataka",
    status: "ready",
    courier: "DTDC",
    items: 1,
    created: "2025-04-09T09:15:00Z",
    weight: "1.3kg"
  },
  { 
    id: "OD-1023721",
    customer: "Priya Mehta",
    destination: "Delhi, Delhi",
    status: "ready",
    courier: "BlueDart",
    items: 2,
    created: "2025-04-09T08:45:00Z",
    weight: "2.1kg"
  },
  { 
    id: "OD-1023715",
    customer: "Vikram Patel",
    destination: "Chennai, Tamil Nadu",
    status: "pending_courier",
    courier: "",
    items: 1,
    created: "2025-04-08T16:20:00Z",
    weight: "0.5kg"
  },
  { 
    id: "OD-1023702",
    customer: "Sheela Reddy",
    destination: "Hyderabad, Telangana",
    status: "pending_courier",
    courier: "",
    items: 3,
    created: "2025-04-08T14:10:00Z",
    weight: "3.2kg"
  }
];

const LabelPrintingPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [labelFormat, setLabelFormat] = useState("a4");
  const [searchQuery, setSearchQuery] = useState("");
  const [courierFilter, setCourierFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const handleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  // Filter orders based on search query, courier, and date
  const filteredOrders = mockLabelOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourier = courierFilter === "all" || 
                          (courierFilter === "assigned" && order.courier) ||
                          (courierFilter === "unassigned" && !order.courier);
    // For simplicity, we're not implementing actual date filtering logic
    const matchesDate = dateFilter === "all" || 
                        (dateFilter === "today" && order.created.includes("2025-04-09"));
    
    return matchesSearch && matchesCourier && matchesDate;
  });

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
              <SettingsIcon className="mr-2 h-4 w-4" />
              Printer Settings
            </Button>
            <Button>
              <PrinterIcon className="mr-2 h-4 w-4" />
              Print Selected ({selectedOrders.length})
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <TabsList>
                  <TabsTrigger value="pending" className="relative">
                    Pending Labels
                    <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                      {mockLabelOrders.filter(o => o.status === "ready" || o.status === "pending_courier").length}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="printed">Printed</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search orders..."
                      className="w-full pl-9 md:w-[200px] lg:w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Select value={courierFilter} onValueChange={setCourierFilter}>
                    <SelectTrigger className="w-auto">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Courier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Couriers</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-auto">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dates</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <TabsContent value="pending" className="space-y-4">
                <OrderLabelList 
                  orders={filteredOrders}
                  selectedOrders={selectedOrders}
                  onSelectOrder={handleSelectOrder}
                  onSelectAll={handleSelectAll}
                  onViewOrder={setSelectedOrder}
                />
              </TabsContent>

              <TabsContent value="printed" className="space-y-4">
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <PrinterIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No printed labels</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Labels that have been printed will appear here
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="scheduled" className="space-y-4">
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <CalendarIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No scheduled labels</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Labels scheduled for printing will appear here
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="archived" className="space-y-4">
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <ArchiveIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No archived labels</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Archived labels will appear here
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            {selectedOrder ? (
              <LabelPreview 
                order={mockLabelOrders.find(o => o.id === selectedOrder)!}
                labelFormat={labelFormat}
                onFormatChange={setLabelFormat}
              />
            ) : selectedOrders.length > 0 ? (
              <BatchSettings 
                selectedCount={selectedOrders.length}
                labelFormat={labelFormat}
                onFormatChange={setLabelFormat}
              />
            ) : (
              <PrintSettings 
                labelFormat={labelFormat}
                onFormatChange={setLabelFormat}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LabelPrintingPage;
