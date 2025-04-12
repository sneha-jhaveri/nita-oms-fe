
import { Button } from "@/components/ui/button";
import { CalculatorIcon, FileDown, FileUp } from "lucide-react";

interface ReconciliationHeaderProps {
  title: string;
  description: string;
}

export function ReconciliationHeader({ title, description }: ReconciliationHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline">
          <FileUp className="mr-2 h-4 w-4" />
          Import Bills
        </Button>
        <Button>
          <CalculatorIcon className="mr-2 h-4 w-4" />
          Start Reconciliation
        </Button>
      </div>
    </div>
  );
}
