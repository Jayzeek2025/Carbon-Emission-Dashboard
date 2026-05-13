"use client";

import AppShell from "@/components/layout/AppShell";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function Home() {
  const { countries, companies, posts, loading, error, refetch } =
    useDashboardData();

  return (
    <AppShell>
      {loading && <LoadingState />}

      {error && !loading && (
        <ErrorState message={error} onRetry={refetch} />
      )}

      {!loading && !error && (
        <div>
          <h2>Dashboard Overview</h2>
          <p>Countries: {countries.length}</p>
          <p>Companies: {companies.length}</p>
          <p>Posts: {posts.length}</p>
        </div>
      )}
    </AppShell>
  );
}