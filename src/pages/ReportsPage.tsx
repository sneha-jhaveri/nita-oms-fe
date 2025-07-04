import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  CalendarIcon,
  Download,
  FileBarChart,
  FileText,
  LineChart,
  PieChart,
  Share2,
  TrendingUp,
  TrendingDown,
  FileDown,
  RefreshCw,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data for charts
const salesData = [
  { name: "Apr 1", sales: 34000, returns: 2300, refunds: 1200 },
  { name: "Apr 2", sales: 42000, returns: 1800, refunds: 900 },
  { name: "Apr 3", sales: 38000, returns: 2100, refunds: 1100 },
  { name: "Apr 4", sales: 29000, returns: 1500, refunds: 800 },
  { name: "Apr 5", sales: 31000, returns: 1700, refunds: 950 },
  { name: "Apr 6", sales: 45000, returns: 2400, refunds: 1300 },
  { name: "Apr 7", sales: 48000, returns: 2600, refunds: 1400 },
];

const couriersData = [
  { name: "Delhivery", value: 540 },
  { name: "DTDC", value: 320 },
  { name: "BlueDart", value: 280 },
  { name: "Xpressbees", value: 210 },
  { name: "Ecom Express", value: 150 },
];

const productsData = [
  { name: "Pressure Cooker", sales: 180, returns: 12 },
  { name: "Steel Kadhai", sales: 150, returns: 8 },
  { name: "Non-stick Tawa", sales: 130, returns: 10 },
  { name: "Kitchen Knife Set", sales: 100, returns: 5 },
  { name: "Steel Bowl Set", sales: 90, returns: 4 },
];

// Mock available reports
const availableReports = [
  {
    id: "sales_summary",
    name: "Sales Summary Report",
    description: "Daily, weekly and monthly revenue breakdown",
    icon: FileBarChart,
    lastRun: "2025-04-11",
  },
  {
    id: "returns_analysis",
    name: "Returns Analysis",
    description: "Root causes and financial impact of returns",
    icon: TrendingDown,
    lastRun: "2025-04-10",
  },
  {
    id: "inventory_stock",
    name: "Inventory Stock Report",
    description: "Current inventory levels and valuation",
    icon: FileText,
    lastRun: "2025-04-11",
  },
  {
    id: "courier_perf",
    name: "Courier Performance",
    description: "Delivery times and RTO rates by courier",
    icon: TrendingUp,
    lastRun: "2025-04-09",
  },
];

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Analyze your business performance with detailed reports
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4 mt-4">
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹2,45,350</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">
                    +18% from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Returns</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87</div>
                  <p className="text-xs text-muted-foreground">
                    -3% from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Return Rate
                  </CardTitle>
                  <PieChart className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7.1%</div>
                  <p className="text-xs text-muted-foreground">
                    -1.2% from last period
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sales Chart */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-0">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart
                    data={salesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="returns" stroke="#ff7300" />
                    <Line type="monotone" dataKey="refunds" stroke="#ff0000" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Additional Charts */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Couriers Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Courier Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={couriersData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {couriersData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={productsData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="#8884d8" />
                      <Bar dataKey="returns" fill="#ff7300" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableReports.map((report) => (
                <Card key={report.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <report.icon className="mr-2 h-5 w-5" />
                        {report.name}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {report.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last Generated: {report.lastRun}</span>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Button variant="outline" size="sm">
                        <LineChart className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="default" size="sm">
                        <FileDown className="mr-2 h-4 w-4" />
                        Generate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-dashed">
                <CardHeader className="pb-3">
                  <CardTitle>Create Custom Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a new custom report with your selected parameters and
                    filters
                  </p>
                  <Button className="w-full" variant="outline">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Start Building
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Scheduled Reports Tab */}
          <TabsContent value="scheduled" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                  <div className="text-center">
                    <CalendarIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">
                      No scheduled reports
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Schedule reports to be automatically generated and emailed
                    </p>
                    <Button className="mt-4" variant="outline">
                      Schedule a Report
                    </Button>
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

export default ReportsPage;
