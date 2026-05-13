"use client";

import AppShell from "@/components/layout/AppShell";
import LoadingState from "@/components/ui/LoadingState";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function Home() {
  const { countries, companies, posts, loading, error } = useDashboardData();

  return (
    <AppShell>
      {loading && <LoadingState />}

      {error && <p>{error}</p>}

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