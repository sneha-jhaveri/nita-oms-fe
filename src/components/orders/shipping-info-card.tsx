
import { TruckIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CourierOption } from "@/types";

interface ShippingInfoCardProps {
  courier?: string;
  trackingId?: string;
  selectedCourier: string | undefined;
  courierOptions: CourierOption[];
  onCourierChange: (value: string) => void;
  onTrackingIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ShippingInfoCard({ 
  courier, 
  trackingId, 
  selectedCourier, 
  courierOptions, 
  onCourierChange, 
  onTrackingIdChange 
}: ShippingInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center space-x-2">
          <TruckIcon className="h-4 w-4 text-muted-foreground" />
          <span>Courier: {courier || "Not assigned"}</span>
        </div>
        <div className="flex items-center space-x-2">
          <TruckIcon className="h-4 w-4 text-muted-foreground" />
          <span>Tracking ID: {trackingId || "Not available"}</span>
        </div>
        <div>
          <Label htmlFor="courier">Courier</Label>
          <Select value={selectedCourier} onValueChange={onCourierChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select courier" />
            </SelectTrigger>
            <SelectContent>
              {courierOptions.map((courier) => (
                <SelectItem key={courier.id} value={courier.name}>
                  {courier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="trackingId">Tracking ID</Label>
          <Input
            type="text"
            id="trackingId"
            value={trackingId || ""}
            onChange={onTrackingIdChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
