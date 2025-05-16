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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const emailFromQuery = searchParams.get("email") || ""
    setEmail(emailFromQuery)
  }, [searchParams])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")
    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""
      const res = await fetch(`${apiUrl}api/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Verification failed")

      setMessage(data.message || "Email verified successfully!")
      setTimeout(() => {
        router.push("/Feed")
      }, 1500)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred during verification")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setMessage("")
    setError("")
    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ""
      const res = await fetch(`${apiUrl}api/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Failed to resend OTP")

      setMessage(data.message || "OTP sent successfully!")
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred while resending OTP")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Verify Your Email</h1>
          <p className="text-sm text-gray-600">Enter the verification code sent to your email address</p>
        </div>

        {error && (
          <div className="mb-4 p-3 border border-red-400 text-red-700 bg-red-100 rounded">
            <p>{error}</p>
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 border border-green-400 text-green-700 bg-green-100 rounded">
            <p>{message}</p>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              readOnly={!!email}
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="otp" className="block text-sm font-medium mb-1">Verification Code</label>
            <input
              id="otp"
              type="text"
              placeholder="Enter your verification code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <button
          onClick={handleResendOtp}
          className="mt-4 w-full border text-gray-800 py-2 rounded hover:bg-gray-100 transition"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Resend Verification Code"}
        </button>
      </div>
    </div>
  )
}
