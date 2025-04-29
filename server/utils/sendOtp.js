import { createHash } from "crypto";
import transporter from "../config/nodemailer.js";

const sendOtp = async (user) => {
  // Throttle OTP requests
  if (user.verifyOtpExpireAt && user.verifyOtpExpireAt > Date.now() - 60000) {
    throw new Error("Please wait a minute before requesting a new OTP");
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const hashedOtp = createHash("sha256").update(otp).digest("hex");

  // Save OTP details
  user.verifyOtp = hashedOtp;
  user.verifyOtpExpireAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  await user.save();

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Verify Your Account - OTP",
    text: `Hello ${user.name},\n\nPlease use the following OTP to verify your account: ${otp}\n\nThis OTP will expire in 5 minutes.\n\nBest regards,\nJAYCORP`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendOtp;
