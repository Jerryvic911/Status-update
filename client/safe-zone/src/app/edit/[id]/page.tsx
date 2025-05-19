"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { IoChevronBackCircle } from "react-icons/io5"

type Post = {
  _id: string
  text: string
  createdAt: string
  userName: string
}

const Profile = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      window.location.href = "/login"
      return
    }

    const fetchUserPosts = async () => {
      
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/my-posts`,
          {
            credentials: "include",
          }
        )

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            window.location.href = "/login"
            return
          }
          throw new Error("Failed to load posts")
        }

        const data: Post[] = await res.json()
        setPosts(data)

        // Extract userName from the first post if available
        if (data.length > 0) {
          setUserName(data[0].userName)
        }
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )

      if (!res.ok) {
        throw new Error("Failed to delete post")
      }

      setPosts(posts.filter((post) => post._id !== postId))
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to delete post")
      }
    }
  }

  return (
    <div className="p-4">
      <div>
        <Link href="/">
          <IoChevronBackCircle className="size-7" />
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-1">My Profile</h1>
      {userName && <p className="text-gray-600 mb-4">Welcome, {userName}!</p>}

      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="border p-3 rounded-lg mb-4">
            <p>{post.text}</p>
            <div className="text-xs text-gray-500">
              Posted on {new Date(post.createdAt).toLocaleString()}
            </div>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
              <Link
                href={`/edit/${post._id}`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Profile
