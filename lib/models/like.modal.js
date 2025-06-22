// models/Like.js
import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);
export default Like;
