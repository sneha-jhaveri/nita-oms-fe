/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAdvancedConfig,
  updateAdvancedConfig,
  manualSyncStore,
  handleSyncConfigChange,
} from "@/api/services/shopify";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const defaultValues = {
  storeId: "",
  previousDaysToSync: 7,
  syncPreviousOrders: true,
  syncNewOrders: true,
  syncOrderUpdates: true,
  syncOrderStatus: true,
  autoImportProducts: true,
  autoUpdateProductInfo: true,
  autoImportCustomers: true,
  syncCustomerData: true,
  syncPaymentStatus: false,
  syncRefunds: false,
  syncTaxes: false,
  syncDiscounts: false,
  syncMode: "realtime",
  syncCronPattern: "*/15 * * * *",
  batchSize: 50,
};

const toggleFields = [
  "syncPreviousOrders",
  "syncNewOrders",
  "syncOrderUpdates",
  "syncOrderStatus",
  "autoImportProducts",
  "autoUpdateProductInfo",
  "autoImportCustomers",
  "syncCustomerData",
  "syncPaymentStatus",
  "syncRefunds",
  "syncTaxes",
  "syncDiscounts",
];

const ShopifyAdvancedConfigPage = () => {
  const navigate = useNavigate();
  const { configId } = useParams();
  const [form, setForm] = useState<any>(defaultValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!configId) {
      const storeId = localStorage.getItem("storeId");
      const orgId = localStorage.getItem("orgId");
      setForm((prev: any) => ({
        ...prev,
        storeId: storeId || "",
        orgId: orgId || "",
      }));
    }
  }, [configId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm((prev: any) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (configId) {
        await updateAdvancedConfig(configId, form);
        alert("Configuration updated successfully.");
      } else {
        if (!form.storeId) {
          alert("storeId is required for creating config.");
          return;
        }
        const payload = {
          ...form,
          downloadPreviousData: true,
        };
        await createAdvancedConfig(payload);
        alert("Configuration created successfully.");
      }
      navigate("/integrations");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const formatLabel = (key: string) =>
    key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

  return (
    <Layout>
      <div className="flex justify-center">
        <Card className="w-full max-w-6xl">
          <CardHeader>
            <CardTitle>
              {configId
                ? "Edit Shopify Advanced Config"
                : "Create Shopify Advanced Config"}
            </CardTitle>
          </CardHeader>
          <div className="px-6 mb-4">
            <Button
              variant="ghost"
              className="text-sm"
              onClick={() => navigate("/integrations")}
            >
              ← Back to Integrations
            </Button>
          </div>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="previousDaysToSync">
                  Previous Days To Sync
                </Label>
                <Input
                  id="previousDaysToSync"
                  name="previousDaysToSync"
                  type="number"
                  value={form.previousDaysToSync}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {toggleFields.map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <Switch
                      id={key}
                      checked={form[key]}
                      onCheckedChange={(val) =>
                        setForm((prev: any) => ({ ...prev, [key]: val }))
                      }
                    />
                    <Label htmlFor={key}>{formatLabel(key)}</Label>
                  </div>
                ))}
              </div>

              <div>
                <Label htmlFor="syncMode">Sync Mode</Label>
                <Input
                  id="syncMode"
                  name="syncMode"
                  value={form.syncMode}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="syncCronPattern">Sync Cron Pattern</Label>
                <Input
                  id="syncCronPattern"
                  name="syncCronPattern"
                  value={form.syncCronPattern}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="batchSize">Batch Size</Label>
                <Input
                  id="batchSize"
                  name="batchSize"
                  type="number"
                  value={form.batchSize}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading
                    ? "Saving..."
                    : configId
                    ? "Update Config"
                    : "Create Config"}
                </Button>
              </div>

              {configId && (
                <div className="space-y-4 pt-6 border-t mt-6">
                  <h3 className="text-lg font-medium">Sync Actions</h3>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={async () => {
                        try {
                          await manualSyncStore(form.storeId);
                          alert("Manual sync triggered successfully.");
                        } catch (err) {
                          console.error(err);
                          alert("Manual sync failed.");
                        }
                      }}
                    >
                      Trigger Manual Sync
                    </Button>

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={async () => {
                        try {
                          await handleSyncConfigChange({
                            configId,
                            orgId: form.orgId,
                          });
                          alert("Sync config change handled.");
                        } catch (err) {
                          console.error(err);
                          alert("Failed to update sync config.");
                        }
                      }}
                    >
                      Trigger Sync Config Change
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ShopifyAdvancedConfigPage;
