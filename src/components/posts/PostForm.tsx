"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";

import { createOrUpdatePost } from "@/lib/posts";

import type { Company, Post } from "@/types/emissions";

import "react-datepicker/dist/react-datepicker.css";
import "./PostForm.css";

type PostFormProps = {
  companies: Company[];
  editingPost?: Post | null;
  onPostSaved?: (post: Post) => void;
  onCancelEdit?: () => void;
};

type PostFormErrors = {
  title?: string;
  company?: string;
  month?: string;
  content?: string;
};

export default function PostForm({
  companies,
  editingPost,
  onPostSaved,
  onCancelEdit,
}: PostFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(editingPost?.title ?? "");

  const [company, setCompany] = useState(editingPost?.resourceUid ?? "");

  const [month, setMonth] = useState<Date | null>(
    editingPost ? new Date(`${editingPost.dateTime}-01`) : null,
  );

  const [content, setContent] = useState(editingPost?.content ?? "");
  const [errors, setErrors] = useState<PostFormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaveError("");

    try {
      setIsSaving(true);

      const selectedMonth = month?.toISOString().slice(0, 7) ?? "";

      const savedPost = await createOrUpdatePost({
        id: editingPost?.id,
        title,
        companyId: company,
        month: selectedMonth,
        content,
      });

      onPostSaved?.(savedPost);

      setTitle("");
      setCompany("");
      setMonth(null);
      setContent("");
      setErrors({});

      if (editingPost) {
        onCancelEdit?.();
        return;
      }

      router.push("/posts");
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Failed to save post. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="post-form-panel">
      <div className="post-form-header">
        <h2>
          {editingPost
            ? "Edit Sustainability Post"
            : "Create Sustainability Post"}
        </h2>

        <p>
          Publish company sustainability initiatives and emission reduction
          updates.
        </p>
      </div>

      {saveError && <div className="post-form-save-error">{saveError}</div>}

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
          {editingPost ? (
            <button
              className="back-posts-button"
              type="button"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          ) : (
            <Link className="back-posts-button" href="/posts">
              Back
            </Link>
          )}

          <button
            className="post-submit-button"
            type="submit"
            disabled={isSaving}
          >
            {isSaving
              ? editingPost
                ? "Saving..."
                : "Publishing..."
              : editingPost
                ? "Save Changes"
                : "Publish Post"}
          </button>
        </div>
      </form>
    </section>
  );
}
