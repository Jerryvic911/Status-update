import express from "express"
import {
  createPost,
  getAllPosts,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLikePost
} from "../controllers/postController.js"
import { protect } from "../middleware/authmiddleware.js"

const postRoutes = express.Router()

// Public route
postRoutes.get("/all", getAllPosts);



// Protected routes
postRoutes.use(protect);
postRoutes.post("/", createPost);
postRoutes.get("/my-posts", getUserPosts);
postRoutes.get("/:id", getPostById);
postRoutes.patch("/:id", updatePost);
postRoutes.delete("/:id", deletePost);
postRoutes.put("/:id/toggle-like", toggleLikePost);

export default postRoutes;
