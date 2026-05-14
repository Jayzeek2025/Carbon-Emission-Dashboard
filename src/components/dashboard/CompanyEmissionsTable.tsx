import { useMemo, useState } from "react";

import Card from "@/components/ui/Card";
import type { Company, Country } from "@/types/emissions";

import {
  getCompanyTotalEmissions,
  getEmissionsBySource,
  getEstimatedCarbonTax,
  getMonthlyChangePercentage,
} from "@/utils/emissions";

import "./CompanyEmissionsTable.css";

type CompanyEmissionsTableProps = {
  companies: Company[];
  countries: Country[];
};

const ITEMS_PER_PAGE = 10;

export default function CompanyEmissionsTable({
  companies,
  countries,
}: CompanyEmissionsTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [companies, search]);

  const paginatedCompanies = filteredCompanies.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE),
  );

  return (
    <Card className="company-emissions-table-card">
      <div className="company-emissions-table-header">
        <div>
          <h2>Company Emissions & Tax Exposure</h2>

          <p>
            Showing {paginatedCompanies.length} of {filteredCompanies.length}{" "}
            companies
          </p>
        </div>

        <div className="company-emissions-table-actions">
          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            className="company-emissions-search"
          />
        </div>
      </div>

      <div className="company-emissions-table-wrapper">
        <table className="company-emissions-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Country</th>
              <th>Total Emissions</th>
              <th>Estimated Tax</th>
              <th>Reporting Period</th>
              <th>Months</th>
              <th>Main Source</th>
              <th>Trend</th>
            </tr>
          </thead>

          <tbody>
            {paginatedCompanies.map((company) => {
              const totalEmissions = getCompanyTotalEmissions(company);
              const estimatedTax = getEstimatedCarbonTax(
                totalEmissions,
                company.country,
                countries,
              );

              const sortedEmissions = [...company.emissions].sort((a, b) =>
                a.yearMonth.localeCompare(b.yearMonth),
              );

              const uniqueMonths = Array.from(
                new Set(sortedEmissions.map((emission) => emission.yearMonth)),
              ).sort();

              const firstMonth = uniqueMonths[0] ?? "-";

              const lastMonth = uniqueMonths[uniqueMonths.length - 1] ?? "-";

              const reportingPeriod =
                firstMonth === lastMonth
                  ? firstMonth
                  : `${firstMonth} → ${lastMonth}`;

              const monthsIncluded = new Set(
                sortedEmissions.map((emission) => emission.yearMonth),
              ).size;

              const latestEmission =
                sortedEmissions[sortedEmissions.length - 1];
              const previousEmission =
                sortedEmissions[sortedEmissions.length - 2];

              const monthlyChange =
                previousEmission && latestEmission
                  ? getMonthlyChangePercentage(
                      latestEmission.emissions,
                      previousEmission.emissions,
                    )
                  : 0;

              const sourceTotals = getEmissionsBySource(company.emissions);

              const mainSource =
                Object.entries(sourceTotals).sort(
                  (a, b) => b[1] - a[1],
                )[0]?.[0] ?? "-";

              const trendClass =
                monthlyChange > 0
                  ? "company-emissions-trend--up"
                  : monthlyChange < 0
                    ? "company-emissions-trend--down"
                    : "company-emissions-trend--stable";

              return (
                <tr key={company.id}>
                  <td>
                    <div className="company-emissions-company">
                      <span className="company-emissions-company-name">
                        {company.name}
                      </span>

                      <span className="company-emissions-company-risk">
                        Carbon exposure monitored
                      </span>
                    </div>
                  </td>

                  <td>{company.country}</td>

                  <td>{totalEmissions.toLocaleString()} kg CO₂e</td>

                  <td>
                    <div className="company-emissions-tax">
                      ₩{estimatedTax.toLocaleString()}
                    </div>

                    <span className="company-emissions-tax-subtext">
                      projected liability
                    </span>
                  </td>

                  <td>{reportingPeriod}</td>

                  <td>{monthsIncluded}</td>

                  <td>
                    <span className="company-emissions-source">
                      {mainSource}
                    </span>
                  </td>

                  <td>
                    <span className={`company-emissions-trend ${trendClass}`}>
                      {monthlyChange > 0 ? "+" : ""}
                      {monthlyChange.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="company-emissions-pagination">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage((current) => current - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage((current) => current + 1)}
        >
          Next
        </button>
      </div>
    </Card>
  );
}
