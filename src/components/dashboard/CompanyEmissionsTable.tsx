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
  const [searchTerm, setSearchTerm] = useState("");
  const companiesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
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

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [companies, searchTerm]);

  const sortedCompanies = useMemo(() => {
    return [...filteredCompanies].sort((a, b) => {
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
  }, [filteredCompanies, sortKey, sortDirection]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedCompanies.length / companiesPerPage),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startRow =
    sortedCompanies.length === 0
      ? 0
      : (safeCurrentPage - 1) * companiesPerPage + 1;

  const endRow = Math.min(
    safeCurrentPage * companiesPerPage,
    sortedCompanies.length,
  );

  const getSortLabel = (key: SortKey) => {
    if (sortKey !== key) {
      return "";
    }

    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const paginatedCompanies = sortedCompanies.slice(
    (safeCurrentPage - 1) * companiesPerPage,
    safeCurrentPage * companiesPerPage,
  );

  return (
    <section className="company-emissions-table-card">
      <div className="company-emissions-table-header">
        <div>
          <h2>Company Emissions</h2>

          <p>
            Showing {startRow}-{endRow} of {sortedCompanies.length} companies
          </p>
        </div>

        <div className="company-emissions-table-actions">
          <input
            className="company-emissions-search"
            type="search"
            placeholder="Search company..."
            value={searchTerm}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
        </div>
      </div>

      {sortedCompanies.length === 0 ? (
        <div className="company-emissions-table-empty">No companies found.</div>
      ) : (
        <>
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
                      Company{getSortLabel("company")}
                    </button>
                  </th>

                  <th>Country</th>

                  <th>
                    <button
                      className="company-emissions-sort-button"
                      type="button"
                      onClick={() => handleSort("total")}
                    >
                      Total emissions{getSortLabel("total")}
                    </button>
                  </th>

                  <th>
                    <button
                      className="company-emissions-sort-button"
                      type="button"
                      onClick={() => handleSort("latestMonth")}
                    >
                      Latest month{getSortLabel("latestMonth")}
                    </button>
                  </th>

                  <th>Main source</th>
                  <th>Trend</th>
                </tr>
              </thead>

              <tbody>
                {paginatedCompanies.map((company) => {
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

          <div className="company-emissions-pagination">
            <button
              type="button"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage(safeCurrentPage - 1)}
            >
              Previous
            </button>

            <span>
              Page {safeCurrentPage} of {totalPages}
            </span>

            <button
              type="button"
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage(safeCurrentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
