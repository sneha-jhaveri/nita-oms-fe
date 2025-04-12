
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowUpDown, 
  CalendarIcon, 
  CheckCircleIcon, 
  AlertCircleIcon 
} from "lucide-react";

interface ReconciliationSummary {
  totalRecords: number;
  pendingRecords: number;
  disputedRecords: number;
  totalDifferential: string;
  lastSync: string;
}

interface SummaryCardsProps {
  summary: ReconciliationSummary;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Records</CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalRecords}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Records</CardTitle>
          <AlertCircleIcon className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-500">{summary.pendingRecords}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Disputed Records</CardTitle>
          <AlertCircleIcon className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">{summary.disputedRecords}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Differential</CardTitle>
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{summary.totalDifferential}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
          <CheckCircleIcon className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-sm font-medium">{summary.lastSync}</div>
        </CardContent>
      </Card>
    </div>
  );
}
