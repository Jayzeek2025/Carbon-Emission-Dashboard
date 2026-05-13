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

import "./ChartCard.css";

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
    <Card>
      <div className="chart-card__header">
        <h3 className="chart-card__title">Emissions by Source</h3>

        <p className="chart-card__description">
          Breakdown of emissions by source type.
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="chart-card__empty">No source data available.</div>
      ) : (
        <div className="chart-card__body">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="source" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />

              <Tooltip
                formatter={(value) => [
                  `${Number(value).toLocaleString()} kg CO₂e`,
                  "Total emissions",
                ]}
                labelFormatter={(label) => `Source: ${label}`}
                contentStyle={{
                  background: "#07111f",
                  border: "1px solid #39ff14",
                  borderRadius: "12px",
                  color: "white",
                }}
                labelStyle={{
                  color: "#ffffff",
                }}
              />

              <Bar dataKey="total" fill="#39ff14" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
