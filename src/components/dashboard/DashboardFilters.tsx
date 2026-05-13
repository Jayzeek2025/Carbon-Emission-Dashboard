type DashboardFiltersProps = {
  companies: {
    id: string;
    name: string;
  }[];

  countries: {
    code: string;
    name: string;
  }[];

  selectedCompany: string;
  selectedCountry: string;

  onCompanyChange: (value: string) => void;
  onCountryChange: (value: string) => void;
};

export default function DashboardFilters({
  companies,
  countries,
  selectedCompany,
  selectedCountry,
  onCompanyChange,
  onCountryChange,
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
    </div>
  );
}
