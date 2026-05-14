"use client";

import Link from "next/link";
import { useState } from "react";

import AppShell from "@/components/layout/AppShell";
import PostForm from "@/components/posts/PostForm";
import PostsPanel from "@/components/posts/PostsPanel";
import ErrorState from "@/components/ui/ErrorState";
import LoadingState from "@/components/ui/LoadingState";
import { useDashboardData } from "@/hooks/useDashboardData";
import { getCreatedPosts } from "@/lib/posts";
import type { Post } from "@/types/emissions";

export default function PostsPage() {
  const { companies, posts, loading, error, refetch } = useDashboardData();
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [createdPosts, setCreatedPosts] = useState<Post[]>(() =>
    getCreatedPosts(),
  );

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

  const createdPostIds = new Set(createdPosts.map((post) => post.id));

  const allPosts = [
    ...createdPosts,
    ...posts.filter((post) => !createdPostIds.has(post.id)),
  ];

  const handlePostSaved = (savedPost: Post) => {
    setCreatedPosts((currentPosts) => {
      const postExists = currentPosts.some((post) => post.id === savedPost.id);

      if (postExists) {
        return currentPosts.map((post) =>
          post.id === savedPost.id ? savedPost : post,
        );
      }

      return [savedPost, ...currentPosts];
    });

    setEditingPost(null);
  };

  const handleDeletePost = (postId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmed) {
      return;
    }

    const updatedPosts = createdPosts.filter((post) => post.id !== postId);

    localStorage.setItem("createdPosts", JSON.stringify(updatedPosts));
    setCreatedPosts(updatedPosts);
    setEditingPost(null);
  };

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

        {editingPost && (
          <PostForm
            companies={companies}
            editingPost={editingPost}
            onPostSaved={handlePostSaved}
            onCancelEdit={() => setEditingPost(null)}
          />
        )}

        <PostsPanel
          posts={allPosts}
          companies={companies}
          onEditPost={setEditingPost}
          onDeletePost={handleDeletePost}
        />
      </main>
    </AppShell>
  );
}
