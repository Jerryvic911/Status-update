"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function VerifyEmail() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const emailFromQuery = searchParams.get("email") || ""
    setEmail(emailFromQuery)
  }, [searchParams])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Verification failed")

      setMessage(data.message)

      // Redirect to dashboard on success
      router.push("/Feed")
    } catch (err: unknown) {
      // Type-safe error handling
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred during verification")
      }
    }
  }

  const handleResendOtp = async () => {
    setMessage("")
    setError("")
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Failed to resend OTP")

      setMessage(data.message)
    } catch (err: unknown) {
      // Type-safe error handling
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred while resending OTP")
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}

      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 rounded"
          readOnly={!!email} // prevent user from changing prefilled email
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Verify Email
        </button>
      </form>

      <button
        onClick={handleResendOtp}
        className="mt-4 w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
      >
        Resend OTP
      </button>
    </div>
  )
}
