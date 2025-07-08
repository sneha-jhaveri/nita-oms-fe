import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllShopifyStores } from "@/api/services/shopify";
import { EditIcon } from "lucide-react";
import { Layout } from "@/components/layout";

interface ShopifyStore {
  _id: string;
  shopDomain: string;
  isSetupComplete: boolean;
  createdAt: string;
  updatedAt: string;
  connectionMode: string;
  connectionStatus: string;
  timezone: string;
  currency: string;
  isActive: boolean;
  shopId: string;
  orgId: string;
  connectedBy: string;
  manualApiKey?: string;
  manualApiSecret?: string;
}

export default function ShopifyIntegrationsList() {
  const [stores, setStores] = useState<ShopifyStore[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await getAllShopifyStores();
        const stores = res?.data?.data || [];
        setStores(stores);

        // ✅ Store first store's ID in localStorage
        if (stores.length > 0) {
          localStorage.setItem("storeId", stores[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch Shopify stores:", error);
      }
    };

    fetchStores();
  }, []);

  const handleEdit = (store: ShopifyStore) => {
    navigate("/shopify/advanced-config", { state: { storeId: store._id } });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Active Shopify Integrations
        </h1>

        {stores.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {stores.map((store) => (
              <div
                key={store._id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {store.shopDomain}
                </h3>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Store ID:</strong> {store._id}
                  </p>
                  <p>
                    <strong>Connection Mode:</strong> {store.connectionMode}
                  </p>
                  <p>
                    <strong>Status:</strong> {store.connectionStatus}
                  </p>
                  <p>
                    <strong>Setup:</strong>{" "}
                    {store.isSetupComplete ? "✅ Complete" : "❌ Incomplete"}
                  </p>
                  <p>
                    <strong>Active:</strong> {store.isActive ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Currency:</strong> {store.currency}
                  </p>
                  <p>
                    <strong>Timezone:</strong> {store.timezone}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(store.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleEdit(store)}
                    className="text-white bg-[#65558F] rounded-3xl px-4 py-2 flex items-center gap-2 hover:bg-[#65558F]/90 transition-colors"
                  >
                    <EditIcon /> Edit Config
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No Shopify integrations found.</p>
        )}
      </div>
    </Layout>
  );
}
