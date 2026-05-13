import Card from "@/components/ui/Card";
import type { Company } from "@/types/emissions";
import {
  getCompanyTotalEmissions,
  getHighestEmittingCompany,
  getLowestEmittingCompany,
  getMonthlyChangePercentage,
  getMonthlyTotals,
  getTotalEmissions,
} from "@/utils/emissions";

import "./SummaryCards.css";

type SummaryCardsProps = {
  companies: Company[];
};

export default function SummaryCards({ companies }: SummaryCardsProps) {
  const totalEmissions = getTotalEmissions(companies);
  const highestEmittingCompany = getHighestEmittingCompany(companies);
  const lowestEmittingCompany = getLowestEmittingCompany(companies);

  const allEmissions = companies.flatMap((company) => company.emissions);
  const monthlyTotals = getMonthlyTotals(allEmissions);
  const sortedMonths = Object.keys(monthlyTotals).sort();

  const previousMonthTotal =
    monthlyTotals[sortedMonths[sortedMonths.length - 2]] ?? 0;

  const currentMonthTotal =
    monthlyTotals[sortedMonths[sortedMonths.length - 1]] ?? 0;

  const monthlyChange = getMonthlyChangePercentage(
    currentMonthTotal,
    previousMonthTotal,
  );

  return (
    <div className="summary-cards">
      <Card className="summary-card summary-card--primary">
        <div className="summary-card__label">Total Emissions</div>

        <div className="summary-card__value">
          {totalEmissions.toLocaleString()}
        </div>

        <div className="summary-card__unit">tonnes CO2e</div>
        <div className="summary-card__meta">Overall carbon footprint</div>
      </Card>

      <Card className="summary-card">
        <div className="summary-card__label">Highest Emitting Company</div>

        <div className="summary-card__value summary-card__value--company">
          {highestEmittingCompany?.name ?? "-"}
        </div>

        <div className="summary-card__unit">
          {highestEmittingCompany
            ? `${getCompanyTotalEmissions(
                highestEmittingCompany,
              ).toLocaleString()} tonnes CO2e`
            : "No emissions data"}
        </div>

        <div className="summary-card__meta">Primary risk contributor</div>
      </Card>

      <Card className="summary-card">
        <div className="summary-card__label">Lowest Emitting Company</div>

        <div className="summary-card__value summary-card__value--company">
          {lowestEmittingCompany?.name ?? "-"}
        </div>

        <div className="summary-card__unit">
          {lowestEmittingCompany
            ? `${getCompanyTotalEmissions(
                lowestEmittingCompany,
              ).toLocaleString()} tonnes CO2e`
            : "No emissions data"}
        </div>

        <div className="summary-card__meta">Best current performer</div>
      </Card>

      <Card className="summary-card">
        <div className="summary-card__label">Monthly Change</div>

        <div className="summary-card__value">
          {monthlyChange > 0 ? "+" : ""}
          {monthlyChange.toFixed(1)}%
        </div>

        <div className="summary-card__unit">vs previous month</div>
        <div className="summary-card__meta">
          {monthlyChange > 0
            ? "Emissions increased"
            : monthlyChange < 0
              ? "Emissions decreased"
              : "No monthly change"}
        </div>
      </Card>
    </div>
  );
}
