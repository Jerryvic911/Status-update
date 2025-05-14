"use client"
import { IoChevronBackCircle } from "react-icons/io5";
import Link from "next/link"

const Feed = () => {
  const posts = [
    { id: 1, content: "First post here!", author: "User1" },
    { id: 2, content: "Loving this platform!", author: "User2" },
    // Sample data – replace with dynamic fetching
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2b2b2b] to-[#1a1a1a] text-white py-7">
      <div className="">
        <Link href="/">
         <IoChevronBackCircle className='size-7' />
        </Link>
      </div>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Feed</h1>

        {/* Posts */}
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md"
          >
            <p className="text-lg">{post.content}</p>
            <p className="text-sm text-white/50 mt-2">— {post.author}</p>
          </div>
        ))}

        {/* Floating Create Post Button */}
        <Link href="/create-post">
          <button className="fixed bottom-6 right-6 bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-full shadow-lg transition">
            +
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Feed
