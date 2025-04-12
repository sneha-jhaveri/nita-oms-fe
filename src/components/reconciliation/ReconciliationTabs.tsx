
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ReconciliationFilters } from "./ReconciliationFilters";
import { ReconciliationTable } from "./ReconciliationTable";

interface ReconciliationRecord {
  id: string;
  courier: string;
  period: string;
  totalShipments: number;
  totalAmount: string;
  courierCharge: string;
  differential: string;
  status: string;
  lastUpdated: string;
}

interface ReconciliationSummary {
  totalRecords: number;
  pendingRecords: number;
  disputedRecords: number;
  totalDifferential: string;
  lastSync: string;
}

interface ReconciliationTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  summary: ReconciliationSummary;
  filteredRecords: ReconciliationRecord[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  periodFilter: string;
  onPeriodFilterChange: (value: string) => void;
  courierFilter: string;
  onCourierFilterChange: (value: string) => void;
  periods: string[];
  couriers: string[];
}

export function ReconciliationTabs({
  activeTab,
  onTabChange,
  summary,
  filteredRecords,
  searchTerm,
  onSearchChange,
  periodFilter,
  onPeriodFilterChange,
  courierFilter,
  onCourierFilterChange,
  periods,
  couriers
}: ReconciliationTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <TabsList>
          <TabsTrigger value="all" className="relative">
            All Records
          </TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pending
            <span className="ml-2 rounded-full bg-amber-500 px-2 py-0.5 text-xs text-white">
              {summary.pendingRecords}
            </span>
          </TabsTrigger>
          <TabsTrigger value="disputed" className="relative">
            Disputed
            <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
              {summary.disputedRecords}
            </span>
          </TabsTrigger>
        </TabsList>

        <ReconciliationFilters 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          periodFilter={periodFilter}
          onPeriodFilterChange={onPeriodFilterChange}
          courierFilter={courierFilter}
          onCourierFilterChange={onCourierFilterChange}
          periods={periods}
          couriers={couriers}
        />
      </div>

      <TabsContent value={activeTab} className="space-y-4">
        <Card>
          <ReconciliationTable records={filteredRecords} />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
