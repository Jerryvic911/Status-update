import rateLimit from "express-rate-limit";

// Limit login attempts: 5 attempts per 10 minutes
export const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: "Too many login attempts. Please try again after 10 minutes.",
  standardHeaders: true, 
  legacyHeaders: false, 
});

// Limit signups: 3 new accounts per IP per hour
export const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 signup attempts per hour
  message: "Too many accounts created from this IP, please try again after an hour.",
  standardHeaders: true,
  legacyHeaders: false,
});
