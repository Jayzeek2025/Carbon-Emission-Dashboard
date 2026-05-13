import Card from "@/components/ui/Card";
import type { Company } from "@/types/emissions";
import { getTotalEmissions } from "@/utils/emissions";

import "./SummaryCards.css";

type SummaryCardsProps = {
  companies: Company[];
};

export default function SummaryCards({
  companies,
}: SummaryCardsProps) {
  const totalEmissions =
    getTotalEmissions(companies);

  return (
    <div className="summary-cards">
      <Card className="summary-card">
        <div className="summary-card__label">
          Total Emissions
        </div>

        <div className="summary-card__value">
          {totalEmissions.toLocaleString()}
        </div>

        <div className="summary-card__unit">
          tonnes CO2e
        </div>
      </Card>
    </div>
  );
}