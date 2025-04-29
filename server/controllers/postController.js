import Post from "../models/postModel.js";
import User from "../models/userModel.js";

// Create a new post
export const createPost = async (req, res, next) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: "Post text is required" });
  }
  try {
    // Get the user to include their name in the post
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

      // Find user's last post
      const lastPost = await Post.findOne({ user: req.user.id }).sort({ createdAt: -1 });

      if (lastPost) {
        const now = new Date();
        const lastPostTime = new Date(lastPost.createdAt);
        const diffInSeconds = (now - lastPostTime) / 1000;
  
        if (diffInSeconds < 60) {  // e.g., only allow 1 post every 60 seconds
          return res.status(429).json({ message: "Please wait before posting again." });
        }
      }

      //create post
    const post = new Post({
      text,
      user: req.user.id,
      userName: user.name, // Store the user's name directly in the post
    });
    await post.save();

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// Get all posts (could be paginated in a real app)
export const getAllPosts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("text userName createdAt updatedAt");

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      posts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};


// Get posts by the logged-in user
export const getUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select("text userName createdAt updatedAt");

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Get a single post by ID
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).select(
      "text userName createdAt updatedAt user"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the requesting user is the owner of the post
    // If yes, include isOwner flag in the response
    const response = {
      ...post.toObject(),
      isOwner: post.user.toString() === req.user.id,
    };

    // Remove the user ID from the response for security
    delete response.user;

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

// Update a post
export const updatePost = async (req, res, next) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Post text is required" });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the post belongs to the logged-in user
    if (post.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });
    }

    post.text = text;
    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post: {
        _id: post._id,
        text: post.text,
        userName: post.userName,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the post belongs to the logged-in user
    if (post.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully",
      postId: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

// Like a post
// export const likePost = async (req, res, next) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     // Check if user already liked
//     if (post.likes.includes(req.user.id)) {
//       return res.status(400).json({ message: "You already liked this post" });
//     }

//     // Add user to likes array
//     post.likes.push(req.user.id);
//     await post.save();

//     res.status(200).json({
//       message: "Post liked successfully",
//       likes: post.likes.length,  // return number of likes
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// Unlike a post
// export const unlikePost = async (req, res, next) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     // Check if user has already liked
//     const likeIndex = post.likes.indexOf(req.user.id);

//     if (likeIndex === -1) {
//       return res.status(400).json({ message: "You have not liked this post yet" });
//     }

//     // Remove user's ID from the likes array
//     post.likes.splice(likeIndex, 1);
//     await post.save();

//     res.status(200).json({
//       message: "Post unliked successfully",
//       likes: post.likes.length, // now fewer likes
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// Toggle Like/Unlike a Post
// Toggle Like / Unlike Post
export const toggleLikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.id;

    // Check if the user has already liked the post
    const liked = post.likes.includes(userId);

    if (liked) {
      // Unlike
      post.likes = post.likes.filter(id => id.toString() !== userId);
      await post.save();
      res.status(200).json({ message: "Post unliked", liked: false, likesCount: post.likes.length });
    } else {
      // Like
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "Post liked", liked: true, likesCount: post.likes.length });
    }
  } catch (error) {
    next(error);
  }
};

