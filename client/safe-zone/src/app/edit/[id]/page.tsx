'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { IoChevronBackCircle } from 'react-icons/io5'

const EditPost = () => {
  const router = useRouter()
  const { id } = useParams()

  const [text, setText] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${id}`, {
          credentials: "include",
        })

        if (!res.ok) throw new Error("Failed to fetch post")

        const data = await res.json()
        setText(data.text)
      } catch (err) {
        if (err instanceof Error) setError(err.message)
        else setError("Failed to fetch post")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text }),
      })

      if (!res.ok) throw new Error("Failed to update post")

      router.push("/Feed")
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      else setError("Failed to update post")
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/Dashboard">
          <IoChevronBackCircle className="size-7 cursor-pointer" />
        </Link>
        <h1 className="text-xl font-semibold">Edit Post</h1>
      </div>

      {loading ? (
        <p>Loading post...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <textarea
            className="border p-2 rounded w-full min-h-[120px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Update Post
          </button>
        </form>
      )}
    </div>
  )
}

export default EditPost
