import type { Company, Country } from "@/types/emissions";

import {
  getDecreasingCompanies,
  getEstimatedCarbonTax,
  getIncreasingCompanies,
  getLargestMonthIncrease,
  getTopEmissionSource,
} from "@/utils/emissions";

import "./DashboardOverview.css";

type DashboardOverviewProps = {
  selectedCompany: string;
  selectedCountry: string;
  selectedFromMonth: string;
  selectedToMonth: string;
  selectedSource: string;
  totalCompanies: number;
  companies: Company[];
  countries: Country[];
};

export default function DashboardOverview({
  selectedCompany,
  selectedCountry,
  selectedFromMonth,
  selectedToMonth,
  selectedSource,
  totalCompanies,
  companies,
  countries,
}: DashboardOverviewProps) {
  const selectedMonthRange =
    selectedFromMonth === "all" && selectedToMonth === "all"
      ? "All Months"
      : `${selectedFromMonth === "all" ? "Start" : selectedFromMonth} - ${
          selectedToMonth === "all" ? "End" : selectedToMonth
        }`;

  const allEmissions = companies.flatMap((company) => company.emissions);
  const increasingCompanies = getIncreasingCompanies(companies);
  const decreasingCompanies = getDecreasingCompanies(companies);
  const topSource = getTopEmissionSource(allEmissions);
  const largestIncrease = getLargestMonthIncrease(companies);

  const estimatedTax = companies.reduce((total, company) => {
    const companyEmissions = company.emissions.reduce(
      (sum, emission) => sum + emission.emissions,
      0,
    );

    return (
      total +
      getEstimatedCarbonTax(companyEmissions, company.country, countries)
    );
  }, 0);

  const insights: string[] = [];

  if (largestIncrease) {
    insights.push(
      `${largestIncrease.company} recorded the sharpest emissions increase, raising short-term carbon tax exposure.`,
    );
  }

  if (topSource) {
    insights.push(
      `${topSource} is the primary emissions driver across the selected companies.`,
    );
  }

  if (increasingCompanies.length > 0) {
    insights.push(
      `${increasingCompanies[0].name} should be prioritized for emissions reduction planning.`,
    );
  }

  if (decreasingCompanies.length > 0) {
    insights.push(
      `${decreasingCompanies[0].name} improved emissions performance and may serve as a benchmark affiliate.`,
    );
  }

  if (allEmissions.length > 0) {
    insights.push(
      `Projected carbon tax exposure is estimated at ₩${estimatedTax.toLocaleString()}.`,
    );
  }

  if (insights.length === 0) {
    insights.push("No executive insights are currently available.");
  }

  return (
    <section className="dashboard-overview">
      <div className="dashboard-overview__top">
        <div className="dashboard-overview__content">
          <h2 className="dashboard-overview__title">
            {selectedCompany === "all"
              ? "Global Emissions Overview"
              : selectedCompany}
          </h2>

          <p className="dashboard-overview__description">
            Showing analytics for{" "}
            {totalCompanies === 1 ? "1 company" : `${totalCompanies} companies`}
          </p>

          <div className="dashboard-overview__filters">
            <span className="dashboard-overview__filter">
              Country:{" "}
              {selectedCountry === "all" ? "All Countries" : selectedCountry}
            </span>

            <span className="dashboard-overview__filter">
              Period: {selectedMonthRange}
            </span>

            <span className="dashboard-overview__filter">
              Source:{" "}
              {selectedSource === "all" ? "All Sources" : selectedSource}
            </span>
          </div>
        </div>

        <div className="dashboard-overview__insights">
          <div className="dashboard-overview__insights-title">
            Executive Insights
          </div>

          {insights.slice(0, 3).map((insight) => (
            <div key={insight} className="dashboard-overview__insight">
              • {insight}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
