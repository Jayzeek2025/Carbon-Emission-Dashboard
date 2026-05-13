import "./DashboardFilters.css";

type DashboardFiltersProps = {
  companies: {
    id: string;
    name: string;
  }[];

  countries: {
    code: string;
    name: string;
  }[];

  months: string[];
  sources: string[];
  selectedMonth: string;
  selectedSource: string;

  selectedCompany: string;
  selectedCountry: string;

  onCompanyChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onSourceChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
};

export default function DashboardFilters({
  companies,
  countries,
  months,
  sources,
  selectedCompany,
  selectedCountry,
  selectedMonth,
  selectedSource,
  onCompanyChange,
  onCountryChange,
  onMonthChange,
  onSourceChange,
  onClearFilters,
  hasActiveFilters,
}: DashboardFiltersProps) {
  return (
    <div className="dashboard-filters">
      <select
        value={selectedCompany}
        onChange={(event) => onCompanyChange(event.target.value)}
      >
        <option value="all">All Companies</option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>

      <select
        value={selectedCountry}
        onChange={(event) => onCountryChange(event.target.value)}
      >
        <option value="all">All Countries</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      <select
        value={selectedMonth}
        onChange={(event) => onMonthChange(event.target.value)}
      >
        <option value="all">All Months</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <select
        value={selectedSource}
        onChange={(event) => onSourceChange(event.target.value)}
      >
        <option value="all">All Sources</option>
        {sources.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onClearFilters}
        disabled={!hasActiveFilters}
        className="dashboard-filters__clear"
      >
        Clear Filters
      </button>
    </div>
  );
}
