"use client";
import { useEffect, useState } from "react";
import { IoChevronBackCircle } from "react-icons/io5";
import Link from "next/link";

type Post = {
  _id: string;
  text: string;
  user: string;
  userName: string;
  likes: string[];
  createdAt: string;
  updatedAt: string;
};

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/posts/all`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data: { posts: Post[] } = await res.json();
      setPosts(data.posts);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b2b2b] to-[#1a1a1a] text-white py-7">
      <div>
        <Link href="/">
          <IoChevronBackCircle className="size-7" />
        </Link>
      </div>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Feed</h1>

        {loading && <p className="text-center">Loading posts...</p>}

        {error && (
          <p className="text-center text-red-500">
            Error loading posts: {error}
          </p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-white/60">No posts available yet.</p>
        )}

        {!loading &&
          !error &&
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md"
            >
              <p className="text-lg">{post.text}</p>
              <p className="text-sm text-white/50 mt-2">— {post.userName}</p>
              <p className="text-xs text-white/40 mt-1">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

       
          <button className="fixed bottom-6 right-6 bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-full shadow-lg transition">
            +
          </button>
      
      </div>
    </div>
  );
};

export default Feed;
