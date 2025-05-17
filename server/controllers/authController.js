import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import { createHash } from 'crypto'
import sendOtp from "../utils/sendOtp.js";



export const Register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // ✅ Automatically send OTP
    await sendOtp(user);

    res.status(201).json({ message: "User registered successfully. OTP has been sent to your email." });
  } catch (error) {
    console.error("Error in Register:", error);
    next(error);
  }
};

export const Login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔐 Check if account is verified
    if (!user.isAccountVerified) {
      return res.status(401).json({ message: "Please verify your email before logging in" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
};


export const Logout = (req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",    
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

export const resendOtp = async (req, res, next) => {
  try {
    let user;

    // 1. Check if token user exists
    if (req.user && req.user.id) {
      user = await User.findById(req.user.id);
    }

    // 2. If not, try to find user by email from request body
    else if (req.body.email) {
      user = await User.findOne({ email: req.body.email });
    }

    // 3. If user not found
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 4. If user already verified
    if (user.isAccountVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    // 5. Prevent spamming (1 min delay)
    if (user.verifyOtpExpireAt && user.verifyOtpExpireAt > Date.now() - 60000) {
      return res.status(429).json({ message: "Please wait a minute before requesting a new OTP" });
    }

    // 6. Generate and hash OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hashedOtp = createHash('sha256').update(otp).digest('hex');

    user.verifyOtp = hashedOtp;
    user.verifyOtpExpireAt = Date.now() + 5 * 60 * 1000; // 5 mins
    await user.save();

    // 7. Send email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Your OTP Code",
      text: `Hello ${user.name},\n\nYour new OTP is: ${otp}\n\nThis code expires in 5 minutes.\n\nBest regards,\nJAYCORP`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error("Error in resendOtp:", error);
    return res.status(500).json({ message: "Failed to send OTP email, try again later" });
  }
};


export const verifyEmail = async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }
    const hashedOtp = createHash('sha256').update(otp).digest('hex');
    if (user.verifyOtp  !== hashedOtp ) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    
    if (user.verifyOtpExpireAt < Date.now()) { // Corrected typo from veriftOtpExpireAt to verifyOtpExpireAt
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = null;
    await user.save();
    res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    return next(error);
  }
} 