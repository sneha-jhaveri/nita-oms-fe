
export interface ReconciliationRecord {
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

export interface ReconciliationSummary {
  totalRecords: number;
  pendingRecords: number;
  disputedRecords: number;
  totalDifferential: string;
  lastSync: string;
}

// Mock reconciliation data
export const mockReconciliationData: ReconciliationRecord[] = [
  { 
    id: "REC-24001",
    courier: "Delhivery",
    period: "Apr 1-15, 2025",
    totalShipments: 342,
    totalAmount: "₹78,450",
    courierCharge: "₹69,890",
    differential: "₹8,560",
    status: "pending",
    lastUpdated: "2025-04-08"
  },
  { 
    id: "REC-24002",
    courier: "BlueDart",
    period: "Apr 1-15, 2025",
    totalShipments: 156,
    totalAmount: "₹37,240",
    courierCharge: "₹35,880",
    differential: "₹1,360",
    status: "completed",
    lastUpdated: "2025-04-10"
  },
  { 
    id: "REC-23996",
    courier: "DTDC",
    period: "Mar 15-31, 2025",
    totalShipments: 98,
    totalAmount: "₹22,670",
    courierCharge: "₹21,340",
    differential: "₹1,330",
    status: "disputed",
    lastUpdated: "2025-04-05"
  },
  { 
    id: "REC-23990",
    courier: "Delhivery",
    period: "Mar 15-31, 2025",
    totalShipments: 278,
    totalAmount: "₹64,230",
    courierCharge: "₹60,120",
    differential: "₹4,110",
    status: "completed",
    lastUpdated: "2025-04-02"
  },
  { 
    id: "REC-23985",
    courier: "Xpressbees",
    period: "Mar 15-31, 2025",
    totalShipments: 143,
    totalAmount: "₹30,890",
    courierCharge: "₹29,450",
    differential: "₹1,440",
    status: "completed",
    lastUpdated: "2025-03-31"
  }
];

// Mock summary data
export const reconciliationSummary: ReconciliationSummary = {
  totalRecords: 5,
  pendingRecords: 1,
  disputedRecords: 1,
  totalDifferential: "₹16,800",
  lastSync: "2025-04-11 09:30 AM"
};
