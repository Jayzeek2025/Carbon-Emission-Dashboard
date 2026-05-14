import type { Post } from "@/types/emissions";

type CreatePostPayload = {
  title: string;
  companyId: string;
  month: string;
  content: string;
};

export const createOrUpdatePost = async ({
  title,
  companyId,
  month,
  content,
}: CreatePostPayload): Promise<Post> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newPost: Post = {
    id: crypto.randomUUID(),
    title,
    resourceUid: companyId,
    dateTime: month,
    content,
  };

  const storedPosts = JSON.parse(
    localStorage.getItem("createdPosts") ?? "[]",
  ) as Post[];

  localStorage.setItem(
    "createdPosts",
    JSON.stringify([newPost, ...storedPosts]),
  );

  return newPost;
};

export const getCreatedPosts = (): Post[] => {
  return JSON.parse(localStorage.getItem("createdPosts") ?? "[]") as Post[];
};
