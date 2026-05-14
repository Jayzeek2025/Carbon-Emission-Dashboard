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
import { useDashboardData } from "@/hooks/useDashboardData";
import { getEmissionTheme } from "@/utils/emissionTheme";
import { getTotalEmissions } from "@/utils/emissions";

export default function Home() {
  const { countries, companies, loading, error, refetch } = useDashboardData();

  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedFromMonth, setSelectedFromMonth] = useState("all");
  const [selectedToMonth, setSelectedToMonth] = useState("all");
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
    setSelectedFromMonth("all");
    setSelectedToMonth("all");
    setSelectedSource("all");
  };

  const hasActiveFilters =
    selectedCompany !== "all" ||
    selectedCountry !== "all" ||
    selectedFromMonth !== "all" ||
    selectedToMonth !== "all" ||
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
        .filter((emission) => {
          const isAfterFromMonth =
            selectedFromMonth === "all" ||
            emission.yearMonth >= selectedFromMonth;

          const isBeforeToMonth =
            selectedToMonth === "all" || emission.yearMonth <= selectedToMonth;

          return isAfterFromMonth && isBeforeToMonth;
        })
        .filter(
          (emission) =>
            selectedSource === "all" || emission.source === selectedSource,
        ),
    }))
    .filter((company) => company.emissions.length > 0);

  const totalEmissions = getTotalEmissions(filteredCompanies);

  const emissionTheme = getEmissionTheme(totalEmissions);

  return (
    <AppShell
      emissionTheme={emissionTheme}
      headerContent={
        !loading && !error ? (
          <DashboardFilters
            companies={companies}
            countries={countries}
            months={months}
            sources={sources}
            selectedCompany={selectedCompany}
            selectedCountry={selectedCountry}
            selectedFromMonth={selectedFromMonth}
            selectedToMonth={selectedToMonth}
            selectedSource={selectedSource}
            onCompanyChange={handleCompanyChange}
            onCountryChange={setSelectedCountry}
            onFromMonthChange={setSelectedFromMonth}
            onToMonthChange={setSelectedToMonth}
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
            selectedFromMonth={selectedFromMonth}
            selectedToMonth={selectedToMonth}
            selectedSource={selectedSource}
            totalCompanies={filteredCompanies.length}
            companies={filteredCompanies}
            countries={countries}
          />
          <SummaryCards companies={filteredCompanies} countries={countries} />
          <MonthlyEmissionsChart companies={filteredCompanies} />
          <EmissionsBySourceChart companies={filteredCompanies} />
        </>
      )}
    </AppShell>
  );
}
