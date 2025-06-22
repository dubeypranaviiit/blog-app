// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    author: String,
    image: String,
    authorImg: String,
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
