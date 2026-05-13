"use client";

import AppShell from "@/components/layout/AppShell";

import { useDashboardData } from "@/hooks/useDashboardData";

export default function Home() {
  const {
    countries,
    companies,
    posts,
    loading,
    error,
  } = useDashboardData();

  return (
    <AppShell>
      <div>
        <h2>Dashboard Overview</h2>

        {loading && <p>Loading dashboard data...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <>
            <p>Countries: {countries.length}</p>
            <p>Companies: {companies.length}</p>
            <p>Posts: {posts.length}</p>
          </>
        )}
      </div>
    </AppShell>
  );
}