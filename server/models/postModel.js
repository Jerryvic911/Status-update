import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Post text is required"],
      trim: true,
      maxlength: [500, "Post cannot be more than 500 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

const Post = mongoose.model("Post", postSchema)

export default Post
