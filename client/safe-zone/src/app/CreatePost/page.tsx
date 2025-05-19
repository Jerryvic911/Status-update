"use client";
import { useState } from "react";
import { createPost } from "@/lib/api";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation"

export default function CreatePostForm() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    router.push("/Feed");
    const result = await createPost(text);
    if ("_id" in result) {
      setMessage("✅ Post created!");
      setText("");
    } else {
      setMessage(`❌ ${result.message}`);
    }
  };

  return (
    <div className="bg-black text-white h-screen w-screen">
      <Navbar/>
      <form onSubmit={handleSubmit} className="pt-[4rem]">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!text.trim()}
      >
        Post
      </button>
      {message && <p>{message}</p>}
    </form>
    </div>
  );
}
