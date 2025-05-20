"use client";
import { useEffect, useState } from "react";
import { IoChevronBackCircle } from "react-icons/io5";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaArrowUp } from "react-icons/fa";
import Link from "next/link";
import Navbar from "../components/Navbar";

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
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Get current userId on client side after hydration
  useEffect(() => {
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!token || !id) {
      window.location.href = "/sign-up";
      return;
    }

    setCurrentUserId(id);
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/all`, {
        credentials: "include",
      });
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

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleToggleLike = async (postId: string) => {
    if (!currentUserId) {
      alert("Please log in to like posts.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${postId}/toggle-like`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post._id === postId) {
              const alreadyLiked = post.likes.includes(currentUserId);
              const updatedLikes = alreadyLiked
                ? post.likes.filter((id) => id !== currentUserId)
                : [...post.likes, currentUserId];
              return { ...post, likes: updatedLikes };
            }
            return post;
          })
        );
      } else {
        const data = await res.json();
        console.error("Like toggle failed:", data.message);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  // Scroll event listener for showing "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Show when near bottom of page
      setShowScrollTop(scrollY + windowHeight >= fullHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b2b2b] to-[#1a1a1a] text-white py-7">
      <Navbar />
      <div>
        <Link href="/">
          <IoChevronBackCircle className="size-7" />
        </Link>
      </div>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Feed</h1>

        {loading && <p className="text-center">Loading posts...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-white/60">No posts yet.</p>
        )}

        {posts.map((post) => {
          const likedByUser = currentUserId && post.likes.includes(currentUserId);
          return (
            <div
              key={post._id}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md"
            >
              <p className="text-lg">{post.text}</p>
              <p className="text-sm text-white/50 mt-2">— {post.userName}</p>
              <p className="text-xs text-white/40 mt-1">
                {new Date(post.createdAt).toLocaleString()}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => handleToggleLike(post._id)}
                  className={`transition ${
                    likedByUser ? "text-pink-500" : "text-white/50 hover:text-pink-400"
                  }`}
                >
                  {likedByUser ? (
                    <AiFillLike className="inline text-xl" />
                  ) : (
                    <AiOutlineLike className="inline text-xl" />
                  )}
                </button>
                <span className="text-white/70 text-sm">{post.likes?.length || 0}</span>
              </div>
            </div>
          );
        })}

        <Link href="/CreatePost">
          <button className="fixed bottom-6 right-6 bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-full shadow-lg transition">
            +
          </button>
        </Link>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-6 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200 transition"
          >
            <FaArrowUp className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Feed;
