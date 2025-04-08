
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface StatusChartProps {
  data: ChartData[];
}

export function StatusChart({ data }: StatusChartProps) {
  return (
    <Card className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="font-semibold">Order Status Distribution</h3>
      </div>
      <div className="dashboard-card-content">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
