// import User from "../models/userModel.js";
// import Post from "../models/postModel.js";

// // Get all users (admin only)
// export const getAllUsers = async (req, res, next) => {
//   try {
//     // Check if the requesting user is an admin
//     const admin = await User.findById(req.user.id);
//     if (!admin || !admin.isAdmin) {
//       return res.status(403).json({ message: "Not authorized. Admin access required." });
//     }

//     const users = await User.find()
//       .select("name email isAccountVerified createdAt")
//       .sort({ createdAt: -1 });

//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// };

// // Get user details by ID (admin only)
// export const getUserById = async (req, res, next) => {
//   try {
//     // Check if the requesting user is an admin
//     const admin = await User.findById(req.user.id);
//     if (!admin || !admin.isAdmin) {
//       return res.status(403).json({ message: "Not authorized. Admin access required." });
//     }

//     const user = await User.findById(req.params.id)
//       .select("-password -verifyOtp");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// // Delete user (admin only)
// export const deleteUser = async (req, res, next) => {
//   try {
//     // Check if the requesting user is an admin
//     const admin = await User.findById(req.user.id);
//     if (!admin || !admin.isAdmin) {
//       return res.status(403).json({ message: "Not authorized. Admin access required." });
//     }

//     // Don't allow admin to delete themselves
//     if (req.params.id === req.user.id) {
//       return res.status(400).json({ message: "You cannot delete your own admin account" });
//     }

//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Delete all posts by this user
//     await Post.deleteMany({ user: req.params.id });
    
//     // Delete the user
//     await user.deleteOne();

//     res.status(200).json({ message: "User and all associated posts deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get all posts for admin dashboard with user details
// export const getAllPostsAdmin = async (req, res, next) => {
//   try {
//     // Check if the requesting user is an admin
//     const admin = await User.findById(req.user.id);
//     if (!admin || !admin.isAdmin) {
//       return res.status(403).json({ message: "Not authorized. Admin access required." });
//     }

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const posts = await Post.find()
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .populate('user', 'name email')
//       .select("text userName createdAt updatedAt likes");

//     const totalPosts = await Post.countDocuments();

//     res.status(200).json({
//       posts,
//       totalPages: Math.ceil(totalPosts / limit),
//       currentPage: page,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Admin delete any post
// export const deletePostAdmin = async (req, res, next) => {
//   try {
//     // Check if the requesting user is an admin
//     const admin = await User.findById(req.user.id);
//     if (!admin || !admin.isAdmin) {
//       return res.status(403).json({ message: "Not authorized. Admin access required." });
//     }

//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     await post.deleteOne();

//     res.status(200).json({
//       message: "Post deleted successfully by admin",
//       postId: req.params.id,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Admin update any post
// export const updatePostAdmin = async (req, res, next) => {
//   const { text } = req.body;

//   if (!text) {
//     return res.status(400).json({ message: "Post text is required" });
//   }

//   try {
//     // Check if the requesting user is an admin
//     const admin = await User.findById(req.user.id);
//     if (!admin || !admin.isAdmin) {
//       return res.status(403).json({ message: "Not authorized. Admin access required." });
//     }

//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     post.text = text;
//     post.isEditedByAdmin = true; // Optional: flag to show the post was edited by an admin
//     await post.save();

//     res.status(200).json({
//       message: "Post updated successfully by admin",
//       post: {
//         _id: post._id,
//         text: post.text,
//         userName: post.userName,
//         createdAt: post.createdAt,
//         updatedAt: post.updatedAt,
//         isEditedByAdmin: post.isEditedByAdmin
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get admin dashboard stats
// export const getDashboardStats = async (req, res, next) => {
//   try {
//     // Check if the requesting user is an admin
//     const admin = await User.findById(req.user.id);
//     if (!admin || !admin.isAdmin) {
//       return res.status(403).json({ message: "Not authorized. Admin access required." });
//     }

//     const totalUsers = await User.countDocuments();
//     const verifiedUsers = await User.countDocuments({ isAccountVerified: true });
//     const totalPosts = await Post.countDocuments();
    
//     // Get posts created in the last 7 days
//     const lastWeekDate = new Date();
//     lastWeekDate.setDate(lastWeekDate.getDate() - 7);
//     const recentPosts = await Post.countDocuments({ createdAt: { $gte: lastWeekDate } });

//     // Get most active users (users with most posts)
//     const mostActiveUsers = await Post.aggregate([
//       { $group: { _id: "$user", postCount: { $sum: 1 } } },
//       { $sort: { postCount: -1 } },
//       { $limit: 5 },
//       { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "userDetails" } },
//       { $unwind: "$userDetails" },
//       { $project: { 
//         _id: 1, 
//         postCount: 1, 
//         userName: "$userDetails.name",
//         email: "$userDetails.email"
//       }}
//     ]);

//     res.status(200).json({
//       totalUsers,
//       verifiedUsers,
//       totalPosts,
//       recentPosts,
//       mostActiveUsers
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// console.log("Admin controller functions created successfully!");

// // Add this to your adminController.js
// export const makeUserAdmin = async (req, res, next) => {
//     try {
//       // Only existing admins can create new admins
//       const adminUser = await User.findById(req.user.id);
//       if (!adminUser || !adminUser.isAdmin) {
//         return res.status(403).json({ message: "Not authorized. Admin access required." });
//       }
      
//       const user = await User.findById(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
      
//       user.isAdmin = true;
//       await user.save();
      
//       res.status(200).json({ 
//         message: "User promoted to admin successfully",
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin
//         }
//       });
//     } catch (error) {
//       next(error);
//     }
//   };