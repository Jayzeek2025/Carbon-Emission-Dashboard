import type { Post } from "@/types/emissions";

type CreateOrUpdatePostPayload = {
  id?: string;
  title: string;
  companyId: string;
  month: string;
  content: string;
};

export const createOrUpdatePost = async ({
  id,
  title,
  companyId,
  month,
  content,
}: CreateOrUpdatePostPayload): Promise<Post> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const shouldFail = Math.random() < 0.2;

  if (shouldFail) {
    throw new Error("Failed to save post. Please try again.");
  }

  const storedPosts = JSON.parse(
    localStorage.getItem("createdPosts") ?? "[]",
  ) as Post[];

  const savedPost: Post = {
    id: id ?? crypto.randomUUID(),
    title,
    resourceUid: companyId,
    dateTime: month,
    content,
  };

  const postExists = storedPosts.some((post) => post.id === savedPost.id);

  const updatedPosts = postExists
    ? storedPosts.map((post) => (post.id === savedPost.id ? savedPost : post))
    : [savedPost, ...storedPosts];

  localStorage.setItem("createdPosts", JSON.stringify(updatedPosts));

  return savedPost;
};

export const getCreatedPosts = (): Post[] => {
  if (typeof window === "undefined") {
    return [];
  }

  return JSON.parse(localStorage.getItem("createdPosts") ?? "[]") as Post[];
};
