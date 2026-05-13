import Card from "@/components/ui/Card";
import type { Company } from "@/types/emissions";
import {
  getCompanyTotalEmissions,
  getHighestEmittingCompany,
  getTotalEmissions,
} from "@/utils/emissions";

import "./SummaryCards.css";

type SummaryCardsProps = {
  companies: Company[];
};

export default function SummaryCards({ companies }: SummaryCardsProps) {
  const totalEmissions = getTotalEmissions(companies);
  const highestEmittingCompany = getHighestEmittingCompany(companies);

  return (
    <div className="summary-cards">
      <Card className="summary-card">
        <div className="summary-card__label">Total Emissions</div>

        <div className="summary-card__value">
          {totalEmissions.toLocaleString()}
        </div>

        <div className="summary-card__unit">tonnes CO2e</div>
      </Card>

      <Card className="summary-card">
        <div className="summary-card__label">
          Highest Emitting Company
        </div>

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
      </Card>
    </div>
  );
}