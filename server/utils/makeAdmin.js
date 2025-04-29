import User from "../models/userModel.js";

// Make a user an admin (only existing admins can do this)
export const makeUserAdmin = async (req, res, next) => {
  try {
    // Check if the requesting user is an admin
    const admin = await User.findById(req.user.id);
    if (!admin || !admin.isAdmin) {
      return res.status(403).json({ message: "Not authorized. Admin access required." });
    }

    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isAdmin) {
      return res.status(400).json({ message: "User is already an admin" });
    }

    user.isAdmin = true;
    await user.save();

    res.status(200).json({ 
      message: "User has been made an admin successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    next(error);
  }
};

// Remove admin privileges from a user (only existing admins can do this)
export const removeAdminPrivileges = async (req, res, next) => {
  try {
    // Check if the requesting user is an admin
    const admin = await User.findById(req.user.id);
    if (!admin || !admin.isAdmin) {
      return res.status(403).json({ message: "Not authorized. Admin access required." });
    }

    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Don't allow admin to remove their own privileges
    if (userId === req.user.id) {
      return res.status(400).json({ message: "You cannot remove your own admin privileges" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(400).json({ message: "User is not an admin" });
    }

    user.isAdmin = false;
    await user.save();

    res.status(200).json({ 
      message: "Admin privileges removed successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    next(error);
  }
};

console.log("Admin management functions created successfully!");