"use client";

import AppShell from "@/components/layout/AppShell";
import SummaryCards from "@/components/dashboard/SummaryCards";

import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import MonthlyEmissionsChart from "@/components/dashboard/MonthlyEmissionsChart";
import EmissionsBySourceChart from "@/components/dashboard/EmissionsBySourceChart";

import { useDashboardData } from "@/hooks/useDashboardData";

export default function Home() {
  const { companies, loading, error, refetch } = useDashboardData();

  return (
    <AppShell>
      {loading && <LoadingState />}

      {error && !loading && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <SummaryCards companies={companies} />

          <MonthlyEmissionsChart companies={companies} />
          <EmissionsBySourceChart companies={companies} />
        </>
      )}
    </AppShell>
  );
}
