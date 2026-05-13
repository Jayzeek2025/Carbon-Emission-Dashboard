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

export default function InsightsPanel({ companies }: InsightsPanelProps) {
  const allEmissions = companies.flatMap((company) => company.emissions);

  const increasingCompanies = getIncreasingCompanies(companies);

  const decreasingCompanies = getDecreasingCompanies(companies);

  const topSource = getTopEmissionSource(allEmissions);

  const largestIncrease = getLargestMonthIncrease(companies);

  const insights: string[] = [];

  if (increasingCompanies.length > 0) {
    insights.push(
      `${increasingCompanies[0].name} increased emissions compared with the previous month.`,
    );
  }

  if (topSource) {
    insights.push(
      `${topSource} is currently the largest emissions source across all companies.`,
    );
  }

  if (decreasingCompanies.length > 0) {
    insights.push(
      `${decreasingCompanies[0].name} reduced emissions compared with the previous month.`,
    );
  }

  if (largestIncrease) {
    insights.push(
      `${largestIncrease.company} recorded the largest monthly increase at ${largestIncrease.increase.toLocaleString()} kg CO₂e.`,
    );
  }

  if (insights.length === 0) {
    insights.push("No emissions insights are currently available.");
  }

  return (
    <Card>
      <div className="insights-panel">
        <div className="insights-panel__header">
          <h3 className="insights-panel__title">Executive Insights</h3>

          <p className="insights-panel__description">
            Automated emissions observations and trends.
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
