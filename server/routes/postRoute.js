import express from "express"
import {
  createPost,
  getAllPosts,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost
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
postRoutes.put("/:id", updatePost)
postRoutes.delete("/:id", deletePost)
router.patch("/posts/:id/like", protect, likePost);

export default postRoutes
