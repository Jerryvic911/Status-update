import sendOtp from "../utils/sendOtp.js";

export const sendVerifyOtp = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    await sendOtp(user);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in sendVerifyOtp:", error.message);
    return res.status(500).json({ message: error.message || "Failed to send OTP" });
  }
};
