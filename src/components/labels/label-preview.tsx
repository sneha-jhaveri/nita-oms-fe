
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PrinterIcon, DownloadIcon, RefreshCwIcon } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  destination: string;
  status: string;
  courier: string;
  items: number;
  created: string;
  weight: string;
}

interface LabelPreviewProps {
  order: Order;
  labelFormat: string;
  onFormatChange: (format: string) => void;
}

export function LabelPreview({ order, labelFormat, onFormatChange }: LabelPreviewProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Label Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Order: {order.id}</h4>
          <div className="rounded-md border p-4">
            <div className="flex flex-col items-center space-y-4">
              {/* Label Preview */}
              <div className={`w-full ${labelFormat === "a4" ? "aspect-[1.414/1]" : "aspect-[1.5/1]"} bg-white border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center p-4`}>
                {order.courier ? (
                  <div className="w-full max-w-sm mx-auto">
                    <div className="font-bold text-lg mb-1 text-center">{order.courier}</div>
                    <div className="flex justify-between text-xs mb-2">
                      <span>Order: {order.id}</span>
                      <span>Weight: {order.weight}</span>
                    </div>
                    <div className="border border-black p-2 mb-2">
                      <div className="font-bold">{order.customer}</div>
                      <div>{order.destination}</div>
                    </div>
                    <div className="h-12 bg-gray-800 flex items-center justify-center text-white text-xs">
                      [Barcode Placeholder]
                    </div>
                    <div className="mt-2 text-center text-xs">
                      Items: {order.items} | Date: {new Date(order.created).toLocaleDateString()}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <RefreshCwIcon className="h-8 w-8 mx-auto mb-2" />
                    <p>Please assign a courier to generate label</p>
                  </div>
                )}
              </div>
              
              {/* Format selector */}
              <div className="w-full">
                <h4 className="text-sm font-medium mb-2">Label Format</h4>
                <RadioGroup 
                  value={labelFormat} 
                  onValueChange={onFormatChange}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="a4" id="preview-format-a4" />
                    <Label htmlFor="preview-format-a4">A4</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="100x150" id="preview-format-100x150" />
                    <Label htmlFor="preview-format-100x150">100x150 mm</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 pt-2">
          <Button 
            className="w-full" 
            disabled={!order.courier}
          >
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print Label
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            disabled={!order.courier}
          >
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download Label
          </Button>
          
          {!order.courier && (
            <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800 mt-2">
              Please assign a courier to this order before generating the shipping label.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
