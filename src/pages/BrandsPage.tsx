
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  MoreHorizontal, 
  Package2Icon, 
  PlusIcon, 
  SearchIcon, 
  Settings,
  UserIcon,
  ShoppingBagIcon,
  TruckIcon,
  ArrowUpDown,
  FilterIcon,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Mock brand data
const mockBrands = [
  {
    id: "brand-001",
    name: "Nita Essentials",
    logo: "",
    status: "active",
    products: 24,
    orders: 785,
    revenue: "₹5,46,800",
    contactName: "Rajesh Kumar",
    contactEmail: "rajesh@nitaessentials.com"
  },
  {
    id: "brand-002",
    name: "Nita Pro",
    logo: "",
    status: "active",
    products: 18,
    orders: 543,
    revenue: "₹4,23,500",
    contactName: "Priya Sharma",
    contactEmail: "priya@nitakitchen.com"
  },
  {
    id: "brand-003",
    name: "Nita Home",
    logo: "",
    status: "active",
    products: 31,
    orders: 423,
    revenue: "₹3,87,200",
    contactName: "Amar Patel",
    contactEmail: "amar@nitahome.com"
  },
  {
    id: "brand-004",
    name: "Nita Indigo",
    logo: "",
    status: "pending",
    products: 12,
    orders: 0,
    revenue: "₹0",
    contactName: "Neha Gupta",
    contactEmail: "neha@nitaindigo.com"
  },
  {
    id: "brand-005",
    name: "Nita Classic",
    logo: "",
    status: "inactive",
    products: 8,
    orders: 124,
    revenue: "₹98,700",
    contactName: "Vikram Singh",
    contactEmail: "vikram@nitaclassic.com"
  }
];

// Summary stats
const summaryStats = {
  totalBrands: mockBrands.length,
  activeBrands: mockBrands.filter(b => b.status === "active").length,
  totalProducts: mockBrands.reduce((sum, brand) => sum + brand.products, 0),
  totalRevenue: "₹14,56,200"
};

const BrandsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter brands based on search term
  const filteredBrands = mockBrands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Brands</h1>
            <p className="text-muted-foreground">
              Manage brands and their products in your marketplace
            </p>
          </div>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Brand
          </Button>
        </div>

        {/* Stats overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Brands</CardTitle>
              <Package2Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.totalBrands}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Brands</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.activeBrands}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.totalProducts}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TruckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summaryStats.totalRevenue}</div>
            </CardContent>
          </Card>
        </div>

        {/* Brands table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Brand Management</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search brands..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Brand</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBrands.map((brand) => (
                    <TableRow key={brand.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={brand.logo || ""} alt={brand.name} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {brand.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{brand.name}</div>
                            <div className="text-xs text-muted-foreground">{brand.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {brand.status === "active" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-800 hover:bg-green-50 border-green-600">
                            Active
                          </Badge>
                        ) : brand.status === "pending" ? (
                          <Badge variant="outline" className="bg-amber-50 text-amber-800 hover:bg-amber-50 border-amber-600">
                            Pending
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-800 hover:bg-gray-50 border-gray-500">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{brand.products}</TableCell>
                      <TableCell>{brand.orders}</TableCell>
                      <TableCell>{brand.revenue}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{brand.contactName}</div>
                          <div className="text-xs text-muted-foreground">{brand.contactEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" /> Edit Brand
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShoppingBagIcon className="mr-2 h-4 w-4" /> View Products
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserIcon className="mr-2 h-4 w-4" /> Manage Users
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <AlertCircle className="mr-2 h-4 w-4" /> Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {filteredBrands.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No brands found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BrandsPage;
