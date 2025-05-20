'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoChevronBackCircle } from "react-icons/io5"

type Post = {
  _id: string;
  text: string;
  createdAt: string;
};

const Profile = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    const name = localStorage.getItem("userName")

    if (!userId) {
      window.location.href = '/'
      return
    }

    if (name) {
      setUserName(name)
    }

    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/my-posts`, {
          credentials: "include",
        })

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            window.location.href = '/'
            return
          }
          throw new Error("Failed to load posts")
        }

        const data = await res.json()
        setPosts(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Failed to load posts")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserPosts()
  }, [])

  const handleDelete = async (postId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (!res.ok) throw new Error("Failed to delete post")

      setPosts(posts.filter(post => post._id !== postId))
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to delete post")
      }
    }
  
  }

  // --- Logout function added here ---
  const handleLogout = async () => {
  // Remove client-side data
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("token"); // ⬅️ Remove JWT token

  // OPTIONAL: If token is stored in a cookie, hit backend logout API
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {
    if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Backend logout (if any) failed, proceeding with client logout");
  }
  }
  // Redirect to home page
  window.location.href = "/";
};


  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <Link href="/Feed">
          <IoChevronBackCircle className='size-7 cursor-pointer' />
        </Link>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-red-600 hover:text-red-800 font-semibold"
        >
          Logout
        </button>
      </div>

      <h1 className='text-2xl font-bold mb-1'>My Profile</h1>
      {userName && <p className="text-lg text-gray-700 mb-4">Welcome, {userName}!</p>}

      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map(post => (
            <div key={post._id} className='border p-3 rounded-lg mb-4'>
              <p>{post.text}</p>
              <div className='text-xs text-gray-500'>
                Posted on {new Date(post.createdAt).toLocaleString()}
              </div>
              <div className='flex gap-3 mt-2'>
                <button
                  onClick={() => handleDelete(post._id)}
                  className='text-red-500 hover:underline'
                >
                  Delete
                </button>
                <Link href={`/edit/${post._id}`} className='text-blue-500 hover:underline'>
                  Edit
                </Link>
              </div>
            </div>
          ))
        )
      )}
      <div>
        <Link href="/CreatePost">
          <button className="fixed bottom-6 right-6 bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-full shadow-lg transition">
            +
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Profile
