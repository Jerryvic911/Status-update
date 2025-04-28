// This is a sample auth middleware - adjust based on your existing implementation
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get user from the token
    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    // Set user in request object
    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      isAccountVerified: user.isAccountVerified,
    }

    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: "Not authorized, token failed" })
  }
}
