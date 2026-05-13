import type { Company } from "@/types/emissions";
import { getCompanyTotalEmissions } from "@/utils/emissions";

import "./CompanyEmissionsTable.css";

type CompanyEmissionsTableProps = {
  companies: Company[];
};

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
  return (
    <section className="company-emissions-table-card">
      <div className="company-emissions-table-header">
        <h2>Company Emissions</h2>
      </div>

      <div className="company-emissions-table-wrapper">
        <table className="company-emissions-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Country</th>
              <th>Total emissions</th>
              <th>Latest month</th>
              <th>Main source</th>
              <th>Trend</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => {
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
