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

type MonthlyEmissionsChartProps = {
  companies: Company[];
};

export default function MonthlyEmissionsChart({
  companies,
}: MonthlyEmissionsChartProps) {
  const allEmissions = companies.flatMap(
    (company) => company.emissions,
  );

  const monthlyTotals =
    getMonthlyTotals(allEmissions);

  const chartData = Object.entries(
    monthlyTotals,
  ).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <Card title="Monthly Emissions Trend">
      <div
        style={{
          width: "100%",
          height: 360,
        }}
      >
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
                <stop
                  offset="0%"
                  stopColor="#39ff14"
                  stopOpacity={0.4}
                />

                <stop
                  offset="100%"
                  stopColor="#39ff14"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip
              contentStyle={{
                background: "#07111f",
                border: "1px solid #39ff14",
                borderRadius: "12px",
                color: "white",
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
    </Card>
  );
}