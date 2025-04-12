
import { Layout } from "@/components/layout";
import { useState } from "react";
import { ReconciliationHeader } from "@/components/reconciliation/ReconciliationHeader";
import { SummaryCards } from "@/components/reconciliation/SummaryCards";
import { ReconciliationTabs } from "@/components/reconciliation/ReconciliationTabs";
import { mockReconciliationData, reconciliationSummary } from "@/components/reconciliation/mock-data";

const ReconciliationPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [periodFilter, setPeriodFilter] = useState("all");
  const [courierFilter, setCourierFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter reconciliation data
  const filteredReconciliation = mockReconciliationData.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.courier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPeriod = periodFilter === "all" || item.period.includes(periodFilter);
    const matchesCourier = courierFilter === "all" || item.courier === courierFilter;
    
    const matchesStatus = 
      statusFilter === "all" || 
      item.status === statusFilter;
    
    const matchesTab =
      activeTab === "all" || 
      (activeTab === "pending" && item.status === "pending") ||
      (activeTab === "disputed" && item.status === "disputed");
    
    return matchesSearch && matchesPeriod && matchesCourier && matchesStatus && matchesTab;
  });

  // Get unique couriers and periods for filters
  const couriers = Array.from(new Set(mockReconciliationData.map(item => item.courier)));
  const periods = Array.from(new Set(mockReconciliationData.map(item => item.period)));

  return (
    <Layout>
      <div className="space-y-6">
        <ReconciliationHeader 
          title="Reconciliation"
          description="Reconcile courier bills and track financial discrepancies"
        />

        <SummaryCards summary={reconciliationSummary} />

        <ReconciliationTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          summary={reconciliationSummary}
          filteredRecords={filteredReconciliation}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          periodFilter={periodFilter}
          onPeriodFilterChange={setPeriodFilter}
          courierFilter={courierFilter}
          onCourierFilterChange={setCourierFilter}
          periods={periods}
          couriers={couriers}
        />
      </div>
    </Layout>
  );
};

export default ReconciliationPage;
