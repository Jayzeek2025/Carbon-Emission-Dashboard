"use client";

import AppShell from "@/components/layout/AppShell";
import PostForm from "@/components/posts/PostForm";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function CreatePostPage() {
  const { companies, loading, error, refetch } = useDashboardData();

  if (loading) {
    return (
      <AppShell>
        <main className="page-content">
          <LoadingState />
        </main>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <main className="page-content">
          <ErrorState message={error} onRetry={refetch} />
        </main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="page-content">
        <PostForm companies={companies} />
      </main>
    </AppShell>
  );
}
