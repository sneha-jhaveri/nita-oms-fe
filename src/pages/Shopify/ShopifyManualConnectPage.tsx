import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { manualShopifyConnect } from "@/api/services/shopify";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ShopifyManualConnectPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    shopDomain: "",
    accessToken: "",
    manualApiKey: "",
    manualApiSecret: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await manualShopifyConnect(data);
      alert("Manual connection successful!");
      navigate("/integrations");
    } catch (err) {
      console.error(err);
      alert("Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center ">
        <Card className="w-full max-w-5xl space-y-2">
          <CardHeader>
            <CardTitle>Manual Shopify Connect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/integrations")}
            >
              ← Back to Integrations
            </Button>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="shopDomain">Shop Domain</Label>
                <Input
                  id="shopDomain"
                  name="shopDomain"
                  placeholder="yourstore.myshopify.com"
                  value={data.shopDomain}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="accessToken">Access Token</Label>
                <Input
                  id="accessToken"
                  name="accessToken"
                  placeholder="Your private access token"
                  value={data.accessToken}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="manualApiKey">API Key</Label>
                <Input
                  id="manualApiKey"
                  name="manualApiKey"
                  placeholder="Your Shopify API key"
                  value={data.manualApiKey}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="manualApiSecret">API Secret</Label>
                <Input
                  id="manualApiSecret"
                  name="manualApiSecret"
                  placeholder="Your Shopify API secret"
                  value={data.manualApiSecret}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Connecting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ShopifyManualConnectPage;
