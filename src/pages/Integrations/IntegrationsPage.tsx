/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { connectShopify } from "@/api/services/shopify";
// import { Layout } from "@/components/layout";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { StoreIcon, PlugZapIcon } from "lucide-react";
// import { Link } from "react-router-dom";

// const integrations = [
//   {
//     id: "shopify",
//     name: "Shopify",
//     description:
//       "Sync your products, orders, and customers from your Shopify store.",
//     icon: StoreIcon,
//     connected: false,
//   },
//   // {
//   //   id: "woocommerce",
//   //   name: "WooCommerce",
//   //   description:
//   //     "Connect your WooCommerce store to import orders and manage inventory.",
//   //   icon: PlugZapIcon,
//   //   connected: false,
//   // },
// ];

// const IntegrationsPage = () => {
//   const [connectionState, setConnectionState] = useState<
//     Record<string, boolean>
//   >({});
//   const [shopDomain, setShopDomain] = useState("");

//   const handleConnect = async (id: string) => {
//     if (id === "shopify") {
//       if (!shopDomain) return alert("Please enter your Shopify domain.");

//       try {
//         const res = await connectShopify(shopDomain);
//         if (res.data?.redirectUrl) {
//           window.location.href = res.data.redirectUrl;
//         }
//       } catch (err) {
//         console.error("Failed to connect to Shopify:", err);
//         alert("Failed to connect to Shopify.");
//       }
//     } else {
//       setConnectionState((prev) => ({ ...prev, [id]: true }));
//     }
//   };

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <h1 className="text-3xl font-semibold tracking-tight">Integrations</h1>
//         <p className="text-muted-foreground">
//           Connect your OMS with external platforms like Shopify and WooCommerce.
//         </p>

//         <div className="grid gap-6 md:grid-cols-2">
//           {integrations.map((integration) => {
//             const isConnected =
//               connectionState[integration.id] || integration.connected;
//             const Icon = integration.icon;

//             return (
//               <Card key={integration.id}>
//                 <CardHeader className="flex flex-row items-center justify-between">
//                   <div>
//                     <CardTitle>{integration.name}</CardTitle>
//                     <p className="text-sm text-muted-foreground mt-2">
//                       {integration.description}
//                     </p>
//                   </div>
//                   <Icon className="h-8 w-8 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   {integration.id === "shopify" && (
//                     <>
//                       <Input
//                         placeholder="yourstore.myshopify.com"
//                         value={shopDomain}
//                         onChange={(e) => setShopDomain(e.target.value)}
//                         className="mb-4"
//                       />
//                       <div className="flex items-center gap-2">
//                         <Button
//                           onClick={() => handleConnect(integration.id)}
//                           disabled={isConnected}
//                         >
//                           {isConnected ? "Connected" : "Connect"}
//                         </Button>
//                         <Button variant="outline" asChild>
//                           <Link to="/shopify/manual">Manual Connect</Link>
//                         </Button>
//                       </div>
//                     </>
//                   )}

//                   {integration.id === "woocommerce" && (
//                     <Button disabled={isConnected}>
//                       {isConnected ? "Connected" : "Connect"}
//                     </Button>
//                   )}
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default IntegrationsPage;


import { useEffect, useState } from "react";
import { connectShopify, getAllShopifyStores } from "@/api/services/shopify";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StoreIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const IntegrationsPage = () => {
  const [connectedStores, setConnectedStores] = useState<any[]>([]);
  const [shopDomain, setShopDomain] = useState("");
  const [connectionState, setConnectionState] = useState({});
  const navigate = useNavigate();

  const fetchAndSetStore = async () => {
    try {
      const res = await getAllShopifyStores();
      const stores = res?.data || [];

      setConnectedStores(stores);

      if (stores.length > 0) {
        const store = stores[0];
        localStorage.setItem("storeId", store._id);

        if (!store.isSetupComplete) {
          alert("Please complete advanced configuration.");
          navigate("/shopify/advanced-config");
        }
      }
    } catch (err) {
      console.error("Failed to fetch store details:", err);
    }
  };

  const handleConnect = async () => {
    if (!shopDomain) return alert("Please enter your Shopify domain.");
    try {
      const res = await connectShopify(shopDomain);
      if (res.data?.redirectUrl) {
        window.location.href = res.data.redirectUrl;
      }
    } catch (err) {
      console.error("Failed to connect to Shopify:", err);
      alert("Failed to connect to Shopify.");
    }
  };

  useEffect(() => {
    fetchAndSetStore();
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-semibold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">
          Connect your OMS with external platforms like Shopify and WooCommerce.
        </p>

        {/* Section 1: Existing Stores */}
        {connectedStores.length > 0 && (
          <div>
            <h2 className="text-xl font-medium mb-4">
              Connected Shopify Stores
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {connectedStores.map((store) => (
                <Card key={store._id}>
                  <CardHeader>
                    <CardTitle>{store.shopDomain}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Status:{" "}
                      {store.isSetupComplete ? "Setup Complete" : "Incomplete"}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Store ID:</strong> {store._id}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: New Connection */}
        <div>
          <h2 className="text-xl font-medium mb-4">
            Connect a New Shopify Store
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>New Shopify Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="yourstore.myshopify.com"
                value={shopDomain}
                onChange={(e) => setShopDomain(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <Button onClick={handleConnect}>Connect</Button>
                <Button variant="outline" asChild>
                  <Link to="/shopify/manual">Manual Connect</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default IntegrationsPage;
