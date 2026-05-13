"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Card from "@/components/ui/Card";
import type { Company } from "@/types/emissions";
import { getEmissionsBySource } from "@/utils/emissions";

type EmissionsBySourceChartProps = {
  companies: Company[];
};

export default function EmissionsBySourceChart({
  companies,
}: EmissionsBySourceChartProps) {
  const allEmissions = companies.flatMap((company) => company.emissions);

  const sourceTotals = getEmissionsBySource(allEmissions);

  const chartData = Object.entries(sourceTotals).map(([source, total]) => ({
    source,
    total,
  }));

  return (
    <Card title="Emissions by Source">
      <div style={{ width: "100%", height: 360 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />

            <XAxis dataKey="source" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />

            <Tooltip
              contentStyle={{
                background: "#07111f",
                border: "1px solid #39ff14",
                borderRadius: "12px",
                color: "white",
              }}
            />

            <Bar dataKey="total" fill="#39ff14" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
