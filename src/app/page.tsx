"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import SummaryCards from "@/components/dashboard/SummaryCards";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import MonthlyEmissionsChart from "@/components/dashboard/MonthlyEmissionsChart";
import EmissionsBySourceChart from "@/components/dashboard/EmissionsBySourceChart";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import InsightsPanel from "@/components/dashboard/InsightsPanel";
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

  const handleCompanyChange = (value: string) => {
    setSelectedCompany(value);

    if (value === "all") {
      setSelectedCountry("all");
      return;
    }

    const selected = companies.find((company) => company.id === value);

    if (selected) {
      setSelectedCountry(selected.country);
    }
  };

  const handleClearFilters = () => {
    setSelectedCompany("all");
    setSelectedCountry("all");
    setSelectedMonth("all");
    setSelectedSource("all");
  };

  const hasActiveFilters =
    selectedCompany !== "all" ||
    selectedCountry !== "all" ||
    selectedMonth !== "all" ||
    selectedSource !== "all";

  const filteredCompanies = companies
    .filter(
      (company) => selectedCompany === "all" || company.id === selectedCompany,
    )
    .filter(
      (company) =>
        selectedCountry === "all" || company.country === selectedCountry,
    )
    .map((company) => ({
      ...company,
      emissions: company.emissions
        .filter(
          (emission) =>
            selectedMonth === "all" || emission.yearMonth === selectedMonth,
        )
        .filter(
          (emission) =>
            selectedSource === "all" || emission.source === selectedSource,
        ),
    }))
    .filter((company) => company.emissions.length > 0);

  return (
    <AppShell
      headerContent={
        !loading && !error ? (
          <DashboardFilters
            companies={companies}
            countries={countries}
            months={months}
            sources={sources}
            selectedCompany={selectedCompany}
            selectedCountry={selectedCountry}
            selectedMonth={selectedMonth}
            selectedSource={selectedSource}
            onCompanyChange={handleCompanyChange}
            onCountryChange={setSelectedCountry}
            onMonthChange={setSelectedMonth}
            onSourceChange={setSelectedSource}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        ) : null
      }
    >
      {loading && <LoadingState />}

      {error && !loading && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <DashboardOverview
            selectedCompany={
              companies.find((company) => company.id === selectedCompany)
                ?.name ?? "All Companies"
            }
            selectedCountry={
              countries.find((country) => country.code === selectedCountry)
                ?.name ?? "All Countries"
            }
            selectedMonth={selectedMonth}
            selectedSource={selectedSource}
            totalCompanies={filteredCompanies.length}
          />
          <SummaryCards companies={filteredCompanies} />
          <MonthlyEmissionsChart companies={filteredCompanies} />
          <EmissionsBySourceChart companies={filteredCompanies} />
          <InsightsPanel companies={filteredCompanies} />
        </>
      )}
    </AppShell>
  );
}
