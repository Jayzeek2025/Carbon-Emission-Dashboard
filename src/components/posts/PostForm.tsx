"use client";

import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";

import type { Company } from "@/types/emissions";

import "react-datepicker/dist/react-datepicker.css";
import "./PostForm.css";

type PostFormProps = {
  companies: Company[];
};

type PostFormErrors = {
  title?: string;
  company?: string;
  month?: string;
  content?: string;
};

export default function PostForm({ companies }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [month, setMonth] = useState<Date | null>(null);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<PostFormErrors>({});

  const validateForm = () => {
    const nextErrors: PostFormErrors = {};

    if (!title.trim()) {
      nextErrors.title = "Title is required.";
    }

    if (!company) {
      nextErrors.company = "Company is required.";
    }

    if (!month) {
      nextErrors.month = "Month is required.";
    }

    if (!content.trim()) {
      nextErrors.content = "Content is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm() || !month) {
      return;
    }

    const selectedMonth = `${month.getFullYear()}-${String(
      month.getMonth() + 1,
    ).padStart(2, "0")}`;

    console.log({
      title,
      company,
      month: selectedMonth,
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
              onChange={(event) => {
                setTitle(event.target.value);
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  title: undefined,
                }));
              }}
            />

            {errors.title && <p className="post-form-error">{errors.title}</p>}
          </div>

          <div className="post-form-field">
            <label htmlFor="company">Company</label>

            <select
              id="company"
              value={company}
              onChange={(event) => {
                setCompany(event.target.value);
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  company: undefined,
                }));
              }}
            >
              <option value="">Select company</option>

              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>

            {errors.company && (
              <p className="post-form-error">{errors.company}</p>
            )}
          </div>

          <div className="post-form-field">
            <label htmlFor="month">Month</label>

            <DatePicker
              id="month"
              selected={month}
              onChange={(date: Date | null) => {
                setMonth(date);
                setErrors((currentErrors) => ({
                  ...currentErrors,
                  month: undefined,
                }));
              }}
              dateFormat="yyyy-MM"
              showMonthYearPicker
              placeholderText="Select month"
              className="post-datepicker"
            />

            {errors.month && <p className="post-form-error">{errors.month}</p>}
          </div>
        </div>

        <div className="post-form-field">
          <label htmlFor="content">Post Content</label>

          <textarea
            id="content"
            placeholder="Write sustainability update..."
            rows={6}
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
              setErrors((currentErrors) => ({
                ...currentErrors,
                content: undefined,
              }));
            }}
          />

          {errors.content && (
            <p className="post-form-error">{errors.content}</p>
          )}
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
