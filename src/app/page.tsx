"use client";

import AppShell from "@/components/layout/AppShell";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import Card from "@/components/ui/Card";
import { useDashboardData } from "@/hooks/useDashboardData";
import { getCountryName } from "@/utils/emission";

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
          <Card title="Test Card">
  <p>Dashboard card component working.</p>
</Card>
          <p>Countries: {countries.length}</p>
          <p>Companies: {companies.length}</p>
          <p>Posts: {posts.length}</p>
          <p>
  First Company Country:{" "}
  {companies[0] ? getCountryName(companies[0].country, countries) : "-"}
</p>
        </div>
      )}
    </AppShell>
  );
}