import "./DashboardOverview.css";

type DashboardOverviewProps = {
  selectedCompany: string;
  selectedCountry: string;
  selectedMonth: string;
  selectedSource: string;
  totalCompanies: number;
};

export default function DashboardOverview({
  selectedCompany,
  selectedCountry,
  selectedMonth,
  selectedSource,
  totalCompanies,
}: DashboardOverviewProps) {
  return (
    <section className="dashboard-overview">
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
          Month: {selectedMonth === "all" ? "All Months" : selectedMonth}
        </span>

        <span className="dashboard-overview__filter">
          Source: {selectedSource === "all" ? "All Sources" : selectedSource}
        </span>
      </div>
    </section>
  );
}
