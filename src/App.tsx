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
import IntegrationsPage from "./pages/IntegrationsPage";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignUp";
import ProfilePage from "./pages/Profile";
import ShopifyManualConnectPage from "./pages/Shopify/ShopifyManualConnectPage";
import ShopifyAdvancedConfigPage from "./pages/Shopify/ShopifyAdvancedConfigPage";
import ShopifyOAuthCallbackPage from "./pages/Shopify/ShopifyOAuthCallbackPage";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
            <Route path="/returns" element={<ReturnsPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/labels" element={<LabelPrintingPage />} />
            <Route path="/reconciliation" element={<ReconciliationPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route
              path="/shopify/manual"
              element={<ShopifyManualConnectPage />}
            />
            <Route
              path="/shopify/advanced-config"
              element={<ShopifyAdvancedConfigPage />}
            />
            <Route
              path="/shopify/callback"
              element={<ShopifyOAuthCallbackPage />}
            />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
