"use client";

import { useState } from "react";

import type { Company, Post } from "@/types/emissions";

import "./PostsPanel.css";

type PostsPanelProps = {
  posts: Post[];
  companies: Company[];
};

const POSTS_PER_PAGE = 3;

export default function PostsPanel({ posts, companies }: PostsPanelProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const visiblePosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const getCompanyName = (resourceUid: string) => {
    const company = companies.find((company) => company.id === resourceUid);

    return company?.name ?? "Unknown Company";
  };

  if (posts.length === 0) {
    return (
      <section className="posts-panel">
        <div className="posts-empty-state">
          <p>No posts available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="posts-panel">
      <div className="posts-list">
        {visiblePosts.map((post) => (
          <article className="post-card" key={post.id}>
            <div className="post-card-header">
              <h3>{post.title}</h3>
              <span>{post.dateTime}</span>
            </div>

            <p className="post-company">{getCompanyName(post.resourceUid)}</p>

            <p className="post-content">{post.content}</p>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="posts-pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
