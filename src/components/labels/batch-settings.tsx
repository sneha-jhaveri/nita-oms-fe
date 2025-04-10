
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PrinterIcon, DownloadIcon, TagIcon, CalendarIcon, CheckCircleIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface BatchSettingsProps {
  selectedCount: number;
  labelFormat: string;
  onFormatChange: (format: string) => void;
}

export function BatchSettings({ 
  selectedCount, 
  labelFormat, 
  onFormatChange 
}: BatchSettingsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <TagIcon className="mr-2 h-5 w-5" />
          Batch Print {selectedCount} Labels
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
                <RadioGroupItem value="a4" id="batch-format-a4" />
                <Label htmlFor="batch-format-a4" className="flex-1">
                  A4 Sheet (4x2 labels)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="100x150" id="batch-format-100x150" />
                <Label htmlFor="batch-format-100x150" className="flex-1">
                  100x150 mm (Single Label)
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Print Mode</h4>
            <Select defaultValue="now">
              <SelectTrigger>
                <SelectValue placeholder="Select print mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="now">Print Now</SelectItem>
                <SelectItem value="schedule">Schedule Print</SelectItem>
                <SelectItem value="save">Save as PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-2">
            <div className="space-y-2">
              <Button className="w-full">
                <PrinterIcon className="mr-2 h-4 w-4" />
                Print {selectedCount} Labels Now
              </Button>
              
              <Button variant="outline" className="w-full">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule for 9 AM Batch
              </Button>
              
              <Button variant="outline" className="w-full">
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download as PDF
              </Button>
            </div>
            
            <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800">
              <div className="flex">
                <CheckCircleIcon className="mr-2 h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>
                  <span className="font-medium">Ready to print:</span> {selectedCount} labels are ready for printing. Make sure your printer is connected and loaded with the correct label paper.
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
