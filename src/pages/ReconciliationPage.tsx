
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { 
  ArrowDownUp, 
  ArrowUpDown, 
  FileDown, 
  FileUp, 
  FilterIcon, 
  PlusIcon, 
  SearchIcon,
  CalculatorIcon,
  CalendarIcon,
  CheckCircleIcon,
  AlertCircleIcon
} from "lucide-react";
import { useState } from "react";

// Mock reconciliation data
const mockReconciliationData = [
  { 
    id: "REC-24001",
    courier: "Delhivery",
    period: "Apr 1-15, 2025",
    totalShipments: 342,
    totalAmount: "₹78,450",
    courierCharge: "₹69,890",
    differential: "₹8,560",
    status: "pending",
    lastUpdated: "2025-04-08"
  },
  { 
    id: "REC-24002",
    courier: "BlueDart",
    period: "Apr 1-15, 2025",
    totalShipments: 156,
    totalAmount: "₹37,240",
    courierCharge: "₹35,880",
    differential: "₹1,360",
    status: "completed",
    lastUpdated: "2025-04-10"
  },
  { 
    id: "REC-23996",
    courier: "DTDC",
    period: "Mar 15-31, 2025",
    totalShipments: 98,
    totalAmount: "₹22,670",
    courierCharge: "₹21,340",
    differential: "₹1,330",
    status: "disputed",
    lastUpdated: "2025-04-05"
  },
  { 
    id: "REC-23990",
    courier: "Delhivery",
    period: "Mar 15-31, 2025",
    totalShipments: 278,
    totalAmount: "₹64,230",
    courierCharge: "₹60,120",
    differential: "₹4,110",
    status: "completed",
    lastUpdated: "2025-04-02"
  },
  { 
    id: "REC-23985",
    courier: "Xpressbees",
    period: "Mar 15-31, 2025",
    totalShipments: 143,
    totalAmount: "₹30,890",
    courierCharge: "₹29,450",
    differential: "₹1,440",
    status: "completed",
    lastUpdated: "2025-03-31"
  }
];

// Mock summary data
const reconciliationSummary = {
  totalRecords: 5,
  pendingRecords: 1,
  disputedRecords: 1,
  totalDifferential: "₹16,800",
  lastSync: "2025-04-11 09:30 AM"
};

const ReconciliationPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [courierFilter, setCourierFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter reconciliation data
  const filteredReconciliation = mockReconciliationData.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.courier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPeriod = periodFilter === "all" || item.period.includes(periodFilter);
    const matchesCourier = courierFilter === "all" || item.courier === courierFilter;
    
    const matchesStatus = 
      statusFilter === "all" || 
      item.status === statusFilter;
    
    const matchesTab =
      activeTab === "all" || 
      (activeTab === "pending" && item.status === "pending") ||
      (activeTab === "disputed" && item.status === "disputed");
    
    return matchesSearch && matchesPeriod && matchesCourier && matchesStatus && matchesTab;
  });

  // Get unique couriers and periods for filters
  const couriers = Array.from(new Set(mockReconciliationData.map(item => item.courier)));
  const periods = Array.from(new Set(mockReconciliationData.map(item => item.period)));

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Reconciliation</h1>
            <p className="text-muted-foreground">
              Reconcile courier bills and track financial discrepancies
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline">
              <FileUp className="mr-2 h-4 w-4" />
              Import Bills
            </Button>
            <Button>
              <CalculatorIcon className="mr-2 h-4 w-4" />
              Start Reconciliation
            </Button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reconciliationSummary.totalRecords}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Records</CardTitle>
              <AlertCircleIcon className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{reconciliationSummary.pendingRecords}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disputed Records</CardTitle>
              <AlertCircleIcon className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{reconciliationSummary.disputedRecords}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Differential</CardTitle>
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{reconciliationSummary.totalDifferential}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
              <CheckCircleIcon className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">{reconciliationSummary.lastSync}</div>
            </CardContent>
          </Card>
        </div>

        {/* Reconciliation table with tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <TabsList>
              <TabsTrigger value="all" className="relative">
                All Records
              </TabsTrigger>
              <TabsTrigger value="pending" className="relative">
                Pending
                <span className="ml-2 rounded-full bg-amber-500 px-2 py-0.5 text-xs text-white">
                  {reconciliationSummary.pendingRecords}
                </span>
              </TabsTrigger>
              <TabsTrigger value="disputed" className="relative">
                Disputed
                <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                  {reconciliationSummary.disputedRecords}
                </span>
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by ID or courier..."
                  className="pl-8 min-w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select 
                value={periodFilter} 
                onValueChange={setPeriodFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Periods</SelectItem>
                  {periods.map(period => (
                    <SelectItem key={period} value={period}>{period}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
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

          <TabsContent value={activeTab} className="space-y-4">
            <Card>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">ID</TableHead>
                        <TableHead>Courier</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Shipments</TableHead>
                        <TableHead>Our Amount</TableHead>
                        <TableHead>Courier Charge</TableHead>
                        <TableHead>Differential</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReconciliation.map((item) => (
                        <TableRow key={item.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{item.id}</TableCell>
                          <TableCell>{item.courier}</TableCell>
                          <TableCell>{item.period}</TableCell>
                          <TableCell>{item.totalShipments}</TableCell>
                          <TableCell>{item.totalAmount}</TableCell>
                          <TableCell>{item.courierCharge}</TableCell>
                          <TableCell className="font-medium text-primary">{item.differential}</TableCell>
                          <TableCell>
                            {item.status === "completed" ? (
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-800 border-green-600">
                                Completed
                              </span>
                            ) : item.status === "disputed" ? (
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-50 text-red-800 border-red-600">
                                Disputed
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-amber-50 text-amber-800 border-amber-600">
                                Pending
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{item.lastUpdated}</TableCell>
                        </TableRow>
                      ))}
                      
                      {filteredReconciliation.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={9} className="h-24 text-center">
                            No records found matching your filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ReconciliationPage;
