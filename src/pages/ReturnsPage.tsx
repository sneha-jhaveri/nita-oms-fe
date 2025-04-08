import { Layout } from "@/components/layout";
import { OrderStatusBadge } from "@/components/order-status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowUpDown, 
  FileUp, 
  FilterIcon, 
  PhoneOutgoing, 
  RefreshCcw, 
  Search, 
  Truck 
} from "lucide-react";
import { useState } from "react";

// Mock return data
const mockReturns = [
  {
    id: "RTN-10045",
    orderId: "OD-1023759",
    customer: "Anita Singh",
    reason: "Size Issue",
    status: "pending",
    requestDate: "2025-04-05",
    items: [
      { name: "Steel Kadhai 3L", sku: "SKU-KD-002", quantity: 1 }
    ]
  },
  {
    id: "RTN-10044",
    orderId: "OD-1023745",
    customer: "Rahul Kumar",
    reason: "Damaged on arrival",
    status: "approved",
    requestDate: "2025-04-04",
    items: [
      { name: "Pressure Cooker 5L", sku: "SKU-PC-005", quantity: 1 }
    ]
  },
  {
    id: "RTN-10043",
    orderId: "OD-1023721",
    customer: "Priya Mehta",
    reason: "Changed mind",
    status: "rejected",
    requestDate: "2025-04-03",
    items: [
      { name: "Non-stick Tawa", sku: "SKU-NT-003", quantity: 1 },
      { name: "Stainless Steel Bowl Set", sku: "SKU-SB-004", quantity: 1 }
    ]
  },
  {
    id: "RTN-10042",
    orderId: "OD-1023711",
    customer: "Deepak Sharma",
    reason: "Product quality issue",
    status: "processing",
    requestDate: "2025-04-01",
    items: [
      { name: "Electric Kettle", sku: "SKU-EK-007", quantity: 1 }
    ]
  }
];

// Mock RTO data
const mockRtos = [
  {
    id: "RTO-5045",
    orderId: "OD-1023670",
    customer: "Vikram Patel",
    reason: "Customer unavailable",
    courier: "Delhivery",
    status: "in_transit",
    date: "2025-04-06"
  },
  {
    id: "RTO-5044",
    orderId: "OD-1023642",
    customer: "Neha Gupta",
    reason: "Address incorrect",
    courier: "DTDC",
    status: "delivered",
    date: "2025-04-05"
  },
  {
    id: "RTO-5043",
    orderId: "OD-1023621",
    customer: "Rajesh Khanna",
    reason: "Refused to accept",
    courier: "Bluedart",
    status: "delivered",
    date: "2025-04-03"
  }
];

const ReturnsPage = () => {
  const [activeTab, setActiveTab] = useState("return_requests");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReturns = mockReturns.filter(
    (item) => 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRtos = mockRtos.filter(
    (item) => 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Returns & RTO</h1>
            <p className="text-muted-foreground">
              Manage return requests and RTO shipments
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="return_requests" className="relative">
                Return Requests
                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                  {mockReturns.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="rto_shipments" className="relative">
                RTO Shipments
                <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                  {mockRtos.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="relative">
                Reports
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value="return_requests" className="space-y-4">
            <Card>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Return ID
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Order ID
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Customer
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Reason
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Status
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Date
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReturns.map((item) => (
                        <tr key={item.id} className="border-t hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm font-medium">{item.id}</td>
                          <td className="px-4 py-3 text-sm">{item.orderId}</td>
                          <td className="px-4 py-3 text-sm">{item.customer}</td>
                          <td className="px-4 py-3 text-sm">{item.reason}</td>
                          <td className="px-4 py-3 text-sm">
                            <ReturnStatusBadge status={item.status} />
                          </td>
                          <td className="px-4 py-3 text-sm">{item.requestDate}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                title="Log call"
                              >
                                <PhoneOutgoing className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                title="Process return"
                              >
                                <RefreshCcw className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredReturns.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                            No return requests found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rto_shipments" className="space-y-4">
            <Card>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          RTO ID
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Order ID
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Customer
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Courier
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Reason
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Status
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRtos.map((item) => (
                        <tr key={item.id} className="border-t hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm font-medium">{item.id}</td>
                          <td className="px-4 py-3 text-sm">{item.orderId}</td>
                          <td className="px-4 py-3 text-sm">{item.customer}</td>
                          <td className="px-4 py-3 text-sm">{item.courier}</td>
                          <td className="px-4 py-3 text-sm">{item.reason}</td>
                          <td className="px-4 py-3 text-sm">
                            <RTOStatusBadge status={item.status} />
                          </td>
                          <td className="px-4 py-3 text-sm">{item.date}</td>
                        </tr>
                      ))}

                      {filteredRtos.length === 0 && (
                        <tr>
                          <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                            No RTO shipments found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="p-6">
              <div className="flex flex-col space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Weekly RTO Reports</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload or download weekly RTO reports from courier partners
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 border rounded-lg p-4">
                      <h4 className="font-medium">Upload Report</h4>
                      
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="rto-report">RTO Report Excel</Label>
                        <Input id="rto-report" type="file" accept=".xlsx,.xls,.csv" />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="w-full">
                          <FileUp className="mr-2 h-4 w-4" />
                          Upload Report
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4 border rounded-lg p-4">
                      <h4 className="font-medium">Recent Reports</h4>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm">Delhivery RTO Week 15</span>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm">DTDC RTO Week 15</span>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b">
                          <span className="text-sm">Bluedart RTO Week 14</span>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">RTO Analytics</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    View RTO performance metrics by courier and brand
                  </p>
                  
                  <div className="border rounded-lg p-6">
                    <div className="flex justify-center items-center h-[200px] bg-muted/30 rounded-md">
                      <div className="text-muted-foreground">
                        RTO Performance Chart Will Appear Here
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Helper components for status badges
const ReturnStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "pending":
      return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-50 text-yellow-800 border-yellow-600">Pending</span>;
    case "approved":
      return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-800 border-green-600">Approved</span>;
    case "processing":
      return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-800 border-blue-600">Processing</span>;
    case "rejected":
      return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-50 text-red-800 border-red-600">Rejected</span>;
    default:
      return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-50 text-gray-800 border-gray-600">{status}</span>;
  }
};

const RTOStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "in_transit":
      return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-800 border-blue-600">In Transit</span>;
    case "delivered":
      return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-800 border-green-600">Delivered</span>;
    case "processing":
      return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-purple-50 text-purple-800 border-purple-600">Processing</span>;
    default:
      return <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-50 text-gray-800 border-gray-600">{status}</span>;
  }
};

export default ReturnsPage;
