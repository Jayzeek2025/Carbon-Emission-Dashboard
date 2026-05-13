import type { Post } from "@/types/emissions";

import { companies } from "@/data/companies";
import { countries } from "@/data/countries";
import { posts } from "@/data/posts";

const _countries = [...countries];
const _companies = [...companies];
let _posts = [...posts];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const jitter = () => 200 + Math.random() * 600;

const maybeFail = () => Math.random() < 0.15;

export async function fetchCountries() {
  await delay(jitter());
  return _countries;
}

export async function fetchCompanies() {
  await delay(jitter());
  return _companies;
}

export async function fetchPosts() {
  await delay(jitter());
  return _posts;
}

export async function createOrUpdatePost(
  post: Omit<Post, "id"> & { id?: string },
) {
  await delay(jitter());

  if (maybeFail()) {
    throw new Error("Save failed");
  }

  if (post.id) {
    _posts = _posts.map((existingPost) =>
      existingPost.id === post.id ? (post as Post) : existingPost,
    );

    return post as Post;
  }

  const createdPost: Post = {
    ...post,
    id: crypto.randomUUID(),
  };

  _posts = [..._posts, createdPost];

  return createdPost;
}
