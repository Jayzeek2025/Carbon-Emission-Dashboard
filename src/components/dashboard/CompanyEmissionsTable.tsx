"use client";

import { useMemo, useState } from "react";

import type { Company } from "@/types/emissions";
import { getCompanyTotalEmissions } from "@/utils/emissions";

import "./CompanyEmissionsTable.css";

type CompanyEmissionsTableProps = {
  companies: Company[];
};

type SortKey = "company" | "total" | "latestMonth";
type SortDirection = "asc" | "desc";

function getTrendData(values: number[]) {
  if (values.length < 2) {
    return {
      label: "→ Stable",
      type: "stable",
    };
  }

  const previous = values[values.length - 2];
  const current = values[values.length - 1];

  if (previous === 0) {
    return {
      label: "→ Stable",
      type: "stable",
    };
  }

  const percentage = ((current - previous) / previous) * 100;

  if (percentage > 0) {
    return {
      label: `↑ +${percentage.toFixed(1)}%`,
      type: "up",
    };
  }

  if (percentage < 0) {
    return {
      label: `↓ ${percentage.toFixed(1)}%`,
      type: "down",
    };
  }

  return {
    label: "→ Stable",
    type: "stable",
  };
}

export default function CompanyEmissionsTable({
  companies,
}: CompanyEmissionsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("total");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");

      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  };

  const sortedCompanies = useMemo(() => {
    return [...companies].sort((a, b) => {
      const direction = sortDirection === "asc" ? 1 : -1;

      if (sortKey === "company") {
        return a.name.localeCompare(b.name) * direction;
      }

      if (sortKey === "total") {
        return (
          (getCompanyTotalEmissions(a) - getCompanyTotalEmissions(b)) *
          direction
        );
      }

      const aLatestMonth =
        [...a.emissions].sort((x, y) => x.yearMonth.localeCompare(y.yearMonth))[
          a.emissions.length - 1
        ]?.yearMonth ?? "";

      const bLatestMonth =
        [...b.emissions].sort((x, y) => x.yearMonth.localeCompare(y.yearMonth))[
          b.emissions.length - 1
        ]?.yearMonth ?? "";

      return aLatestMonth.localeCompare(bLatestMonth) * direction;
    });
  }, [companies, sortKey, sortDirection]);

  const getSortLabel = (key: SortKey) => {
    if (sortKey !== key) {
      return "";
    }

    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  if (companies.length === 0) {
    return (
      <section className="company-emissions-table-card">
        <div className="company-emissions-table-empty">No companies found.</div>
      </section>
    );
  }

  return (
    <section className="company-emissions-table-card">
      <div className="company-emissions-table-header">
        <h2>Company Emissions</h2>
      </div>

      <div className="company-emissions-table-wrapper">
        <table className="company-emissions-table">
          <thead>
            <tr>
              <th>
                <button
                  className="company-emissions-sort-button"
                  type="button"
                  onClick={() => handleSort("company")}
                >
                  Company
                  {getSortLabel("company")}
                </button>
              </th>

              <th>Country</th>

              <th>
                <button
                  className="company-emissions-sort-button"
                  type="button"
                  onClick={() => handleSort("total")}
                >
                  Total emissions
                  {getSortLabel("total")}
                </button>
              </th>

              <th>
                <button
                  className="company-emissions-sort-button"
                  type="button"
                  onClick={() => handleSort("latestMonth")}
                >
                  Latest month
                  {getSortLabel("latestMonth")}
                </button>
              </th>

              <th>Main source</th>

              <th>Trend</th>
            </tr>
          </thead>

          <tbody>
            {sortedCompanies.map((company) => {
              const totalEmissions = getCompanyTotalEmissions(company);

              const sortedEmissions = [...company.emissions].sort((a, b) =>
                a.yearMonth.localeCompare(b.yearMonth),
              );

              const latestEmission =
                sortedEmissions[sortedEmissions.length - 1];

              const trendData = getTrendData(
                sortedEmissions.map((emission) => emission.emissions),
              );

              return (
                <tr key={company.id}>
                  <td>{company.name}</td>

                  <td>{company.country}</td>

                  <td>{totalEmissions.toLocaleString()} kg CO₂e</td>

                  <td>{latestEmission?.yearMonth ?? "-"}</td>

                  <td>{latestEmission?.source ?? "-"}</td>

                  <td>
                    <span
                      className={`company-emissions-trend company-emissions-trend--${trendData.type}`}
                    >
                      {trendData.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
