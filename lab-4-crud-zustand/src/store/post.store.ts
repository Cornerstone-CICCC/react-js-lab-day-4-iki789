import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
}

type PostStoreState = {
  posts: Post[];
  addPost: (post: Omit<Post, "id">) => void;
  getPostById: (id: string) => Post | null;
  updatePost: (id: string, postData: Partial<Post>) => void;
  deletePost: (id: string) => void;
};

export const usePostStore = create<PostStoreState>()(
  persist(
    (set, get) => ({
      posts: [],
      addPost: (post) => {
        const newPost = { ...post, id: uuidv4() };

        set((state) => ({ posts: [...state.posts, newPost] }));
      },
      getPostById: (id) => {
        const found = get().posts.find((p) => p.id === id);
        if (!found) return null;
        return found;
      },
      updatePost: (id, postData) =>
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id ? { ...p, ...postData } : p
          ),
        })),
      deletePost: (id) =>
        set((state) => ({ posts: state.posts.filter((p) => p.id !== id) })),
    }),
    {
      name: "posts-storage",
    }
  )
);
