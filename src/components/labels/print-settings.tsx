
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PrinterIcon, CheckCircleIcon, FileDownIcon, TagIcon } from "lucide-react";

interface PrintSettingsProps {
  labelFormat: string;
  onFormatChange: (format: string) => void;
}

export function PrintSettings({ labelFormat, onFormatChange }: PrintSettingsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <PrinterIcon className="mr-2 h-5 w-5" />
          Print Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Label Format</h4>
            <RadioGroup 
              value={labelFormat} 
              onValueChange={onFormatChange}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="a4" id="format-a4" />
                <Label htmlFor="format-a4" className="flex-1">
                  A4 Sheet (4x2 labels)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="a5" id="format-a5" />
                <Label htmlFor="format-a5" className="flex-1">
                  A5 Sheet (2x2 labels)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="100x150" id="format-100x150" />
                <Label htmlFor="format-100x150" className="flex-1">
                  100x150 mm (Single Label)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="80x120" id="format-80x120" />
                <Label htmlFor="format-80x120" className="flex-1">
                  80x120 mm (Single Label)
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Label Options</h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="include-barcode" className="cursor-pointer">
                  Include Barcode
                </Label>
                <Switch id="include-barcode" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="include-logo" className="cursor-pointer">
                  Include Brand Logo
                </Label>
                <Switch id="include-logo" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="cursor-pointer">
                  High Contrast Mode
                </Label>
                <Switch id="high-contrast" />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="double-print" className="cursor-pointer">
                  Print Two Copies
                </Label>
                <Switch id="double-print" />
              </div>
            </div>
          </div>
          
          <div className="pt-2">
            <div className="space-y-2">
              <Button 
                className="w-full" 
                disabled={true}
              >
                <PrinterIcon className="mr-2 h-4 w-4" />
                Select Orders to Print
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
              >
                <FileDownIcon className="mr-2 h-4 w-4" />
                Export Label Template
              </Button>
            </div>
            
            <div className="mt-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
              <span className="font-medium">Tip:</span> Select orders from the list to enable bulk printing options.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
