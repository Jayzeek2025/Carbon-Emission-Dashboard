"use client";

import PostsPanel from "@/components/posts/PostsPanel";
import AppShell from "@/components/layout/AppShell";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function PostsPage() {
  const { companies, posts, loading, error } = useDashboardData();

  if (loading) {
    return (
      <AppShell>
        <main className="page-content">Loading posts...</main>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <main className="page-content">{error}</main>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <main className="page-content">
        <PostsPanel posts={posts} companies={companies} />
      </main>
    </AppShell>
  );
}
