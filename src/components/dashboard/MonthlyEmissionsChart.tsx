"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Card from "@/components/ui/Card";
import type { Company } from "@/types/emissions";
import { getMonthlyTotals } from "@/utils/emissions";

import "./ChartCard.css";

type MonthlyEmissionsChartProps = {
  companies: Company[];
};

export default function MonthlyEmissionsChart({
  companies,
}: MonthlyEmissionsChartProps) {
  const allEmissions = companies.flatMap((company) => company.emissions);

  const monthlyTotals = getMonthlyTotals(allEmissions);

  const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <Card>
      <div className="chart-card__header">
        <h3 className="chart-card__title">Monthly Emissions Trend</h3>

        <p className="chart-card__description">
          Total emissions across all companies by month.
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="chart-card__empty">No emissions data available.</div>
      ) : (
        <div className="chart-card__body">
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="emissionsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#39ff14" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#39ff14" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />

              <Tooltip
                formatter={(value) => [
                  `${Number(value).toLocaleString()} kg CO₂e`,
                  "Total emissions",
                ]}
                labelFormatter={(label) => `Month: ${label}`}
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

              <Area
                type="monotone"
                dataKey="total"
                stroke="#39ff14"
                strokeWidth={3}
                fill="url(#emissionsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}