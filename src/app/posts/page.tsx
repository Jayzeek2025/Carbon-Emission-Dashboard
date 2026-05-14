"use client";

import Link from "next/link";

import AppShell from "@/components/layout/AppShell";
import PostsPanel from "@/components/posts/PostsPanel";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import { useDashboardData } from "@/hooks/useDashboardData";
import { getCreatedPosts } from "@/lib/posts";

export default function PostsPage() {
  const { companies, posts, loading, error, refetch } = useDashboardData();

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

  const createdPosts = getCreatedPosts();
  const allPosts = [...createdPosts, ...posts];

  return (
    <AppShell>
      <div className="posts-header-actions">
        <Link className="create-post-button" href="/posts/create">
          Create Post
        </Link>
      </div>

      <main className="page-content">
        <div className="posts-page-header">
          <h2>Sustainability Posts</h2>

          <p>Latest company sustainability updates.</p>
        </div>

        <PostsPanel posts={allPosts} companies={companies} />
      </main>
    </AppShell>
  );
}
