"use client";
import { useState } from "react";
import { createPost } from "@/lib/api";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { IoChevronBackCircle } from "react-icons/io5";
import Link from "next/link";

export default function CreatePostForm() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await createPost(text);
    if ("_id" in result) {
      setMessage("✅ Post created!");
      setText("");
      setTimeout(() => {
        router.push("/Feed");
      }, 1000);
    } else {
      setMessage(`❌ ${result.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#000000] text-white">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-12 pt-32">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg">
        <div className="flex gap-4 items-center mb-4">
          
         <Link href="/Feed">
          <IoChevronBackCircle className="size-7" />
        </Link>
          <h1 className="text-2xl font-semibold mb-1 text-center">Create a New Post</h1>
        </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full h-32 p-4 bg-black/30 border border-white/20 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
              disabled={!text.trim()}
            >
              Post
            </button>

            {message && (
              <p
                className={`text-center font-medium transition ${
                  message.startsWith("✅")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
