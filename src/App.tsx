
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ReturnsPage from "./pages/ReturnsPage";
import ShippingPage from "./pages/ShippingPage";
import InventoryPage from "./pages/InventoryPage";
import LabelPrintingPage from "./pages/LabelPrintingPage";
import ReconciliationPage from "./pages/ReconciliationPage";
import ReportsPage from "./pages/ReportsPage";
import BrandsPage from "./pages/BrandsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/labels" element={<LabelPrintingPage />} />
          <Route path="/reconciliation" element={<ReconciliationPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
