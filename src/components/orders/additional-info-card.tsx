
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalInfoCardProps {
  isDuplicate: boolean;
  notes: string;
  onDuplicateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function AdditionalInfoCard({
  isDuplicate,
  notes,
  onDuplicateChange,
  onNotesChange,
}: AdditionalInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="isDuplicate">Duplicate Order</Label>
          <Input
            type="checkbox"
            id="isDuplicate"
            checked={isDuplicate}
            onChange={onDuplicateChange}
          />
        </div>
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Order notes"
            value={notes}
            onChange={onNotesChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
