
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatusBadge } from "./order-status-badge";
import { OrderData } from "@/types";

interface OrderTableProps {
  orders: OrderData[];
}

export function OrderTable({ orders: initialOrders }: OrderTableProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [sortField, setSortField] = useState<keyof OrderData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [brandFilter, setBrandFilter] = useState<string>("all");

  const ordersPerPage = 10;

  // Get unique brands for filter
  const brands = Array.from(new Set(initialOrders.map(order => order.brand)));

  // Filter orders by search term, status and brand
  const filteredOrders = initialOrders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesBrand = brandFilter === "all" || order.brand === brandFilter;

    return matchesSearch && matchesStatus && matchesBrand;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortField) return 0;

    let valueA, valueB;

    if (sortField === "createdAt") {
      valueA = new Date(a[sortField]).getTime();
      valueB = new Date(b[sortField]).getTime();
    } else if (sortField === "totalAmount") {
      valueA = parseFloat(a[sortField].replace(/[₹,]/g, ""));
      valueB = parseFloat(b[sortField].replace(/[₹,]/g, ""));
    } else {
      valueA = a[sortField];
      valueB = b[sortField];
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Paginate orders
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Handle sort
  const handleSort = (field: keyof OrderData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select 
            value={statusFilter} 
            onValueChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="picked">Picked</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="returned">Returned</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={brandFilter} 
            onValueChange={(value) => {
              setBrandFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th
                  className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-sm font-semibold"
                  onClick={() => handleSort("orderId")}
                >
                  <div className="flex items-center gap-1">
                    Order ID
                    {sortField === "orderId" && (
                      sortDirection === "asc" ? 
                        <ArrowUpIcon className="h-4 w-4" /> : 
                        <ArrowDownIcon className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                  Customer
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                  Brand
                </th>
                <th
                  className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-sm font-semibold"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {sortField === "status" && (
                      sortDirection === "asc" ? 
                        <ArrowUpIcon className="h-4 w-4" /> : 
                        <ArrowDownIcon className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-semibold">
                  Courier
                </th>
                <th
                  className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-sm font-semibold"
                  onClick={() => handleSort("totalAmount")}
                >
                  <div className="flex items-center gap-1">
                    Amount
                    {sortField === "totalAmount" && (
                      sortDirection === "asc" ? 
                        <ArrowUpIcon className="h-4 w-4" /> : 
                        <ArrowDownIcon className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th
                  className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-sm font-semibold"
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center gap-1">
                    Date
                    {sortField === "createdAt" && (
                      sortDirection === "asc" ? 
                        <ArrowUpIcon className="h-4 w-4" /> : 
                        <ArrowDownIcon className="h-4 w-4" />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <tr key={order.orderId} className="border-t hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">
                      <Link to={`/orders/${order.orderId}`} className="font-medium text-primary hover:underline">
                        #{order.orderId}
                      </Link>
                      {order.isDuplicate && (
                        <span className="ml-2 text-xs text-amber-500 font-medium">Duplicate</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">{order.customer.name}</td>
                    <td className="px-4 py-3 text-sm">{order.brand}</td>
                    <td className="px-4 py-3 text-sm">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-sm">{order.courier || "—"}</td>
                    <td className="px-4 py-3 text-sm">{order.totalAmount}</td>
                    <td className="px-4 py-3 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <p className="text-muted-foreground">No orders found</p>
                      {searchTerm && (
                        <Button 
                          variant="link" 
                          className="h-auto p-0 text-sm"
                          onClick={() => {
                            setSearchTerm("");
                            setStatusFilter("all");
                            setBrandFilter("all");
                          }}
                        >
                          Clear filters
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ordersPerPage + 1} to{" "}
            {Math.min(currentPage * ordersPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRightIcon className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
