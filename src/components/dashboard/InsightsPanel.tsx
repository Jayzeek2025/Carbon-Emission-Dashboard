import Card from "@/components/ui/Card";
import type { Company } from "@/types/emissions";

import {
  getDecreasingCompanies,
  getIncreasingCompanies,
  getLargestMonthIncrease,
  getTopEmissionSource,
} from "@/utils/emissions";

import "./InsightsPanel.css";

type InsightsPanelProps = {
  companies: Company[];
};

const CARBON_TAX_RATE = 45000;

export default function InsightsPanel({ companies }: InsightsPanelProps) {
  const allEmissions = companies.flatMap((company) => company.emissions);

  const increasingCompanies = getIncreasingCompanies(companies);
  const decreasingCompanies = getDecreasingCompanies(companies);
  const topSource = getTopEmissionSource(allEmissions);
  const largestIncrease = getLargestMonthIncrease(companies);

  const insights: string[] = [];

  if (largestIncrease) {
    insights.push(
      `${largestIncrease.company} has the highest short-term tax risk after adding ${largestIncrease.increase.toLocaleString()} kg CO₂e versus the previous month.`,
    );
  }

  if (topSource) {
    insights.push(
      `${topSource} is the biggest emissions driver, so reducing this source would have the strongest impact on future carbon tax exposure.`,
    );
  }

  if (increasingCompanies.length > 0) {
    insights.push(
      `${increasingCompanies[0].name} should be reviewed first because its emissions trend is moving upward.`,
    );
  }

  if (decreasingCompanies.length > 0) {
    insights.push(
      `${decreasingCompanies[0].name} is currently improving and may be a useful benchmark for other affiliates.`,
    );
  }

  if (allEmissions.length > 0) {
    insights.push(
      `Estimated tax planning uses ₩${CARBON_TAX_RATE.toLocaleString()} per tonne CO₂e as a simple scenario rate.`,
    );
  }

  if (insights.length === 0) {
    insights.push("No executive insights are currently available.");
  }

  return (
    <Card>
      <div className="insights-panel">
        <div className="insights-panel__header">
          <h3 className="insights-panel__title">Executive Tax Insights</h3>

          <p className="insights-panel__description">
            Risk-focused observations for emissions control and carbon tax
            planning.
          </p>
        </div>

        <div className="insights-panel__list">
          {insights.map((insight) => (
            <div key={insight} className="insights-panel__item">
              <span className="insights-panel__dot" />

              <p>{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
