// import express from 'express';
// import { 
//   getAllUsers, 
//   getUserById, 
//   deleteUser, 
//   getAllPostsAdmin, 
//   deletePostAdmin, 
//   updatePostAdmin,
//   getDashboardStats
// } from '../controllers/adminController.js';
// import { authenticateUser } from '../middleware/authmiddleware.js';

// const router = express.Router();

// // All routes are protected with authentication middleware
// router.use(authenticateUser);

// // User management routes
// router.get('/users', getAllUsers);
// router.get('/users/:id', getUserById);
// router.delete('/users/:id', deleteUser);

// // Post management routes
// router.get('/posts', getAllPostsAdmin);
// router.put('/posts/:id', updatePostAdmin);
// router.delete('/posts/:id', deletePostAdmin);

// // Dashboard stats
// router.get('/dashboard', getDashboardStats);

// console.log("Admin routes created successfully!");

// export default router;