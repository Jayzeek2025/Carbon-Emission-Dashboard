type DashboardFiltersProps = {
  companies: {
    id: string;
    name: string;
  }[];

  selectedCompany: string;

  onCompanyChange: (value: string) => void;
};

export default function DashboardFilters({
  companies,
  selectedCompany,
  onCompanyChange,
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
    </div>
  );
}
