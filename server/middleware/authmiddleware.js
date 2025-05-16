import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check Authorization header: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. Check cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // If no token found
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Get user
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 5. Attach user to request
    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      isAccountVerified: user.isAccountVerified,
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
