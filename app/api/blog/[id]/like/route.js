import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Blog from "@/lib/modals/Blog.modal";
import dbConnect from "@/lib/config/db";
export async function POST(req, { params }) {
  await dbConnect();
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const blog = await Blog.findById(params.id);
  if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

  const hasLiked = blog.likes.includes(userId);

  if (hasLiked) {
    blog.likes = blog.likes.filter(id => id !== userId);
  } else {
    blog.likes.push(userId);
  }
  await blog.save();
  return NextResponse.json({ success: true, liked: !hasLiked, totalLikes: blog.likes.length });
}
