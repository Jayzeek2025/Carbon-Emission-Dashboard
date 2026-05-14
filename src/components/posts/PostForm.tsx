"use client";

import Link from "next/link";
import { useState } from "react";

import type { Company } from "@/types/emissions";

import "./PostForm.css";

type PostFormProps = {
  companies: Company[];
};

export default function PostForm({ companies }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [month, setMonth] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      title,
      company,
      month,
      content,
    });
  };

  return (
    <section className="post-form-panel">
      <div className="post-form-header">
        <h2>Create Sustainability Post</h2>

        <p>
          Publish company sustainability initiatives and emission reduction
          updates.
        </p>
      </div>

      <form className="post-form" onSubmit={handleSubmit}>
        <div className="post-form-grid">
          <div className="post-form-field">
            <label htmlFor="title">Post Title</label>

            <input
              id="title"
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="post-form-field">
            <label htmlFor="company">Company</label>

            <select
              id="company"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            >
              <option value="">Select company</option>

              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div className="post-form-field">
            <label htmlFor="month">Month</label>

            <input
              id="month"
              type="month"
              value={month}
              onChange={(event) => setMonth(event.target.value)}
            />
          </div>
        </div>

        <div className="post-form-field">
          <label htmlFor="content">Post Content</label>

          <textarea
            id="content"
            placeholder="Write sustainability update..."
            rows={6}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>

        <div className="post-form-actions">
          <Link className="back-posts-button" href="/posts">
            Back
          </Link>

          <button className="post-submit-button" type="submit">
            Publish Post
          </button>
        </div>
      </form>
    </section>
  );
}
