import type { Company, Post } from "@/types/emissions";

import "./PostsPanel.css";

type PostsPanelProps = {
  posts: Post[];
  companies: Company[];
};

export default function PostsPanel({ posts, companies }: PostsPanelProps) {
  const getCompanyName = (resourceUid: string) => {
    const company = companies.find((company) => company.id === resourceUid);

    return company?.name ?? "Unknown Company";
  };

  if (posts.length === 0) {
    return (
      <section className="posts-panel">
        <div className="posts-panel-header">
          <h2>Sustainability Posts</h2>
          <p>Latest company sustainability updates.</p>
        </div>

        <div className="posts-empty-state">
          <p>No posts available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="posts-panel">
      <div className="posts-panel-header">
        <h2>Sustainability Posts</h2>
        <p>Latest company sustainability updates.</p>
      </div>

      <div className="posts-list">
        {posts.map((post) => (
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
    </section>
  );
}
