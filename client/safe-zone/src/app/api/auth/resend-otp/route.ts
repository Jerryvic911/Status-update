import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate input
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Generate a new OTP
    // 2. Store it in your database associated with the user
    // 3. Send the OTP to the user's email
    // 4. Return a success response

    // This is a placeholder implementation
    // Replace with your actual OTP generation and email sending logic

    return NextResponse.json({ message: "Verification code sent to your email" }, { status: 200 })
  } catch (error) {
    console.error("Error resending OTP:", error)
    return NextResponse.json({ message: "An error occurred while sending verification code" }, { status: 500 })
  }
}
