import express from "express"
import {
  createPost,
  getAllPosts,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
  // likePost,
  // unlikePost,
  toggleLikePost
} from "../controllers/postController.js"
import { protect } from "../middleware/authmiddleware.js"


const postRoutes = express.Router()

// All routes are protected - require authentication
postRoutes.use(protect)

// Create a new post
postRoutes.post("/", createPost)

// Get all posts
postRoutes.get("/all", getAllPosts)

// Get logged-in user's posts
postRoutes.get("/my-posts", getUserPosts)

// Get, update, or delete a specific post by ID
postRoutes.get("/:id", getPostById)
postRoutes.patch("/:id", updatePost)
postRoutes.delete("/:id", deletePost)
// router.patch("/posts/:id/like", protect, likePost);
// router.patch("/posts/:id/unlike", protect, unlikePost);
postRoutes.put('/:id/toggle-like', protect, toggleLikePost);




export default postRoutes
