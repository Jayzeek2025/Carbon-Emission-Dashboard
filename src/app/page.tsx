"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import SummaryCards from "@/components/dashboard/SummaryCards";

import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import MonthlyEmissionsChart from "@/components/dashboard/MonthlyEmissionsChart";
import EmissionsBySourceChart from "@/components/dashboard/EmissionsBySourceChart";

import { useDashboardData } from "@/hooks/useDashboardData";

export default function Home() {
  const { companies, loading, error, refetch } = useDashboardData();
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");

  return (
    <AppShell>
      {loading && <LoadingState />}

      {error && !loading && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <div>
            <p>Selected Company: {selectedCompany}</p>
            <p>Selected Country: {selectedCountry}</p>
            <p>Selected Month: {selectedMonth}</p>
            <p>Selected Source: {selectedSource}</p>

            <button
              type="button"
              onClick={() => setSelectedCompany("test-company")}
            >
              Test Company Filter
            </button>
          </div>
          <SummaryCards companies={companies} />

          <MonthlyEmissionsChart companies={companies} />
          <EmissionsBySourceChart companies={companies} />
        </>
      )}
    </AppShell>
  );
}
