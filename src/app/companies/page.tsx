"use client";

import AppShell from "@/components/layout/AppShell";
import CompanyEmissionsTable from "@/components/dashboard/CompanyEmissionsTable";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function CompaniesPage() {
  const { companies, loading, error, refetch } = useDashboardData();

  return (
    <AppShell>
      {loading && <LoadingState />}

      {error && !loading && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && <CompanyEmissionsTable companies={companies} />}
    </AppShell>
  );
}
