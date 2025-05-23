import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoute.js";

const app = express();

const PORT = process.env.PORT || 3000;
const mongoDBURL = process.env.MONGODB_URI;

app.use(express.json());
app.use(cookieParser());
// app.use(cors({credentials: true}));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://safe-zone-d5xgwdbm6-aceroger791gmailcoms-projects.vercel.app",
      "https://safe-zone-ecru.vercel.app",
      "https://safe-zone-aceroger791gmailcoms-projects.vercel.app",
      "https://safe-zone-bql5nllqq-aceroger791gmailcoms-projects.vercel.app",
    ],
    credentials: true,
  })
);
app.set("trust proxy", 1);

app.get("/", (req, res) => {
  res.send("Hello Server!");
});
app.use("/api/auth", authRouter);
app.use("/api/posts", postRoutes);

if (!mongoDBURL) {
  console.error("MONGODB_URL is not defined in the environment variables");
  process.exit(1);
}

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
