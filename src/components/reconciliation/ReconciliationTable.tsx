
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

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

interface ReconciliationTableProps {
  records: ReconciliationRecord[];
}

export function ReconciliationTable({ records }: ReconciliationTableProps) {
  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">ID</TableHead>
              <TableHead>Courier</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Shipments</TableHead>
              <TableHead>Our Amount</TableHead>
              <TableHead>Courier Charge</TableHead>
              <TableHead>Differential</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length > 0 ? (
              records.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.courier}</TableCell>
                  <TableCell>{item.period}</TableCell>
                  <TableCell>{item.totalShipments}</TableCell>
                  <TableCell>{item.totalAmount}</TableCell>
                  <TableCell>{item.courierCharge}</TableCell>
                  <TableCell className="font-medium text-primary">{item.differential}</TableCell>
                  <TableCell>
                    {item.status === "completed" ? (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-800 border-green-600">
                        Completed
                      </span>
                    ) : item.status === "disputed" ? (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-red-50 text-red-800 border-red-600">
                        Disputed
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-amber-50 text-amber-800 border-amber-600">
                        Pending
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No records found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
