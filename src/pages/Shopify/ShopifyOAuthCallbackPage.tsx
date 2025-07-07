// src/pages/ShopifyOAuthCallbackPage.tsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { shopifyAuthCallback } from "@/api/services/shopify";
import qs from "query-string";

const ShopifyOAuthCallbackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
          const query = qs.parse(location.search);
          
        const res = await shopifyAuthCallback(); //  backend reads query from URL
        if (res.status === 200) {
          alert("Shopify store connected successfully!");
          navigate("/integrations");
        } else {
          throw new Error("Auth callback failed");
        }
      } catch (err) {
        console.error("Shopify OAuth callback error:", err);
        alert("Shopify authentication failed.");
        navigate("/integrations");
      }
    };

    handleCallback();
  }, [location.search, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <p className="text-lg font-semibold mb-4">Connecting to Shopify...</p>
      <p className="text-sm text-muted-foreground">
        Please wait while we finalize the integration.
      </p>
    </div>
  );
};

export default ShopifyOAuthCallbackPage;
