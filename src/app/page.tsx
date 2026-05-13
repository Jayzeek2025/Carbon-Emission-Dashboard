"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import SummaryCards from "@/components/dashboard/SummaryCards";
import DashboardFilters from "@/components/dashboard/DashboardFilters";

import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import MonthlyEmissionsChart from "@/components/dashboard/MonthlyEmissionsChart";
import EmissionsBySourceChart from "@/components/dashboard/EmissionsBySourceChart";

import { useDashboardData } from "@/hooks/useDashboardData";

export default function Home() {
  const { countries, companies, loading, error, refetch } = useDashboardData();
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");

  const allEmissions = companies.flatMap((company) => company.emissions);

  const months = Array.from(
    new Set(allEmissions.map((emission) => emission.yearMonth)),
  ).sort();

  const sources = Array.from(
    new Set(allEmissions.map((emission) => emission.source)),
  ).sort();

  return (
    <AppShell>
      {loading && <LoadingState />}

      {error && !loading && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <DashboardFilters
            companies={companies}
            countries={countries}
            months={months}
            sources={sources}
            selectedCompany={selectedCompany}
            selectedCountry={selectedCountry}
            selectedMonth={selectedMonth}
            selectedSource={selectedSource}
            onCompanyChange={setSelectedCompany}
            onCountryChange={setSelectedCountry}
            onMonthChange={setSelectedMonth}
            onSourceChange={setSelectedSource}
          />

          <p>
            Selected Company:{" "}
            {companies.find((company) => company.id === selectedCompany)
              ?.name ?? "All Companies"}
          </p>
          <p>Selected Country: {selectedCountry}</p>
          <p>Selected Month: {selectedMonth}</p>
          <p>Selected Source: {selectedSource}</p>

          <SummaryCards companies={companies} />
          <MonthlyEmissionsChart companies={companies} />
          <EmissionsBySourceChart companies={companies} />
        </>
      )}
    </AppShell>
  );
}
