// utils/api.ts
export interface Post {
  _id: string;
  text: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
}

export interface ApiError {
  message: string;
  status: number;
}

export async function createPost(text: string): Promise<Post | ApiError> {
  if (!text.trim()) {
    return { message: "Post text is required", status: 400 };
  }

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  try {
    const res = await fetch(`${baseURL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Send cookies (needed to access req.user in backend)
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { message: data.message || "Could not create post", status: res.status };
    }

    return data.post as Post;
  } catch (error) {
    console.error("createPost error:", error);
    return { message: "Network error", status: 500 };
  }
}
