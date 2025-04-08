
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle, 
  ArrowDownUp, 
  ArrowUpDown, 
  BoxIcon, 
  FileDown, 
  FileUp, 
  FilterIcon, 
  PlusIcon, 
  SearchIcon 
} from "lucide-react";
import { useState } from "react";

// Mock inventory data
const mockInventory = [
  {
    id: "SKU-KD-002",
    name: "Steel Kadhai 3L",
    brand: "Nita Essentials",
    category: "Cookware",
    inStock: 45,
    committedStock: 8,
    warehouseStock: 43,
    mismatched: true,
    price: "₹899",
    threshold: 10
  },
  {
    id: "SKU-PC-005",
    name: "Pressure Cooker 5L",
    brand: "Nita Essentials",
    category: "Cookware",
    inStock: 32,
    committedStock: 5,
    warehouseStock: 32,
    mismatched: false,
    price: "₹1499",
    threshold: 5
  },
  {
    id: "SKU-NT-003",
    name: "Non-stick Tawa",
    brand: "Nita Pro",
    category: "Cookware",
    inStock: 28,
    committedStock: 2,
    warehouseStock: 28,
    mismatched: false,
    price: "₹799",
    threshold: 8
  },
  {
    id: "SKU-SB-004",
    name: "Stainless Steel Bowl Set",
    brand: "Nita Home",
    category: "Serveware",
    inStock: 53,
    committedStock: 7,
    warehouseStock: 56,
    mismatched: true,
    price: "₹649",
    threshold: 15
  },
  {
    id: "SKU-EK-007",
    name: "Electric Kettle",
    brand: "Nita Pro",
    category: "Appliances",
    inStock: 12,
    committedStock: 0,
    warehouseStock: 12,
    mismatched: false,
    price: "₹1299",
    threshold: 5
  },
  {
    id: "SKU-KS-009",
    name: "Kitchen Knife Set",
    brand: "Nita Pro",
    category: "Cutlery",
    inStock: 8,
    committedStock: 3,
    warehouseStock: 8,
    mismatched: false,
    price: "₹1099",
    threshold: 10
  },
  {
    id: "SKU-CS-012",
    name: "Ceramic Serving Set",
    brand: "Nita Home",
    category: "Serveware",
    inStock: 6,
    committedStock: 0,
    warehouseStock: 8,
    mismatched: true,
    price: "₹1899",
    threshold: 5
  }
];

// Mock stats
const inventoryStats = {
  totalProducts: 85,
  lowStock: 3,
  outOfStock: 1,
  mismatchedItems: 3,
  totalValue: "₹2,45,350"
};

const InventoryPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Get unique brands and categories for filters
  const brands = Array.from(new Set(mockInventory.map(item => item.brand)));
  const categories = Array.from(new Set(mockInventory.map(item => item.category)));

  // Filter inventory data
  const filteredInventory = mockInventory.filter(item => {
    // Filter by search term
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by brand
    const matchesBrand = brandFilter === "all" || item.brand === brandFilter;
    
    // Filter by category
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    // Tab filters
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "low_stock" && item.inStock <= item.threshold) ||
      (activeTab === "mismatched" && item.mismatched);
    
    return matchesSearch && matchesBrand && matchesCategory && matchesTab;
  });

  // Sort inventory data
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    if (!sortField) return 0;

    let valueA = a[sortField as keyof typeof a];
    let valueB = b[sortField as keyof typeof b];

    if (typeof valueA === 'string' && valueA.startsWith('₹')) {
      valueA = parseFloat(valueA.replace(/[₹,]/g, ""));
      valueB = parseFloat((valueB as string).replace(/[₹,]/g, ""));
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Inventory</h1>
            <p className="text-muted-foreground">
              Manage your product inventory and stock levels
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
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <BoxIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryStats.totalProducts}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{inventoryStats.lowStock}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{inventoryStats.outOfStock}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mismatched Items</CardTitle>
              <ArrowDownUp className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{inventoryStats.mismatchedItems}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
              <BoxIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryStats.totalValue}</div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory table with tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <TabsList>
              <TabsTrigger value="all" className="relative">
                All Items
              </TabsTrigger>
              <TabsTrigger value="low_stock" className="relative">
                Low Stock
                <span className="ml-2 rounded-full bg-amber-500 px-2 py-0.5 text-xs text-white">
                  {inventoryStats.lowStock}
                </span>
              </TabsTrigger>
              <TabsTrigger value="mismatched" className="relative">
                Mismatched
                <span className="ml-2 rounded-full bg-amber-500 px-2 py-0.5 text-xs text-white">
                  {inventoryStats.mismatchedItems}
                </span>
              </TabsTrigger>
            </TabsList>

            <div className="flex flex-wrap gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select 
                value={brandFilter} 
                onValueChange={setBrandFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={categoryFilter} 
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
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
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th 
                          className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-sm font-semibold"
                          onClick={() => handleSort("id")}
                        >
                          <div className="flex items-center gap-1">
                            SKU
                            {sortField === "id" && (
                              sortDirection === "asc" ? 
                                <ArrowUpDown className="h-4 w-4" /> : 
                                <ArrowUpDown className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-sm font-semibold"
                          onClick={() => handleSort("name")}
                        >
                          <div className="flex items-center gap-1">
                            Name
                            {sortField === "name" && (
                              sortDirection === "asc" ? 
                                <ArrowUpDown className="h-4 w-4" /> : 
                                <ArrowUpDown className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Brand
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Category
                        </th>
                        <th 
                          className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-sm font-semibold"
                          onClick={() => handleSort("inStock")}
                        >
                          <div className="flex items-center gap-1">
                            In Stock
                            {sortField === "inStock" && (
                              sortDirection === "asc" ? 
                                <ArrowUpDown className="h-4 w-4" /> : 
                                <ArrowUpDown className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Committed
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Warehouse
                        </th>
                        <th 
                          className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-sm font-semibold"
                          onClick={() => handleSort("price")}
                        >
                          <div className="flex items-center gap-1">
                            Price
                            {sortField === "price" && (
                              sortDirection === "asc" ? 
                                <ArrowUpDown className="h-4 w-4" /> : 
                                <ArrowUpDown className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedInventory.map((item) => (
                        <tr key={item.id} className="border-t hover:bg-muted/50">
                          <td className="px-4 py-3 text-sm font-medium">{item.id}</td>
                          <td className="px-4 py-3 text-sm">{item.name}</td>
                          <td className="px-4 py-3 text-sm">{item.brand}</td>
                          <td className="px-4 py-3 text-sm">{item.category}</td>
                          <td className={`px-4 py-3 text-sm ${
                            item.inStock <= item.threshold
                              ? item.inStock === 0 
                                ? "text-red-600 font-medium" 
                                : "text-amber-600 font-medium"
                              : ""
                          }`}>
                            {item.inStock}
                          </td>
                          <td className="px-4 py-3 text-sm">{item.committedStock}</td>
                          <td className={`px-4 py-3 text-sm ${
                            item.mismatched ? "text-amber-600 font-medium" : ""
                          }`}>
                            {item.warehouseStock}
                          </td>
                          <td className="px-4 py-3 text-sm">{item.price}</td>
                          <td className="px-4 py-3 text-sm">
                            {item.mismatched ? (
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-amber-50 text-amber-800 border-amber-600">
                                Mismatch
                              </span>
                            ) : item.inStock === 0 ? (
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-50 text-red-800 border-red-600">
                                Out of Stock
                              </span>
                            ) : item.inStock <= item.threshold ? (
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-amber-50 text-amber-800 border-amber-600">
                                Low Stock
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-800 border-green-600">
                                In Stock
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}

                      {sortedInventory.length === 0 && (
                        <tr>
                          <td colSpan={9} className="px-4 py-6 text-center text-muted-foreground">
                            No inventory items found matching your filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default InventoryPage;
