import { NextResponse } from "next/server";
import dbConnect from "@/lib/config/db";
import Blog from "@/lib/modals/Blog.modal";
import Comment from "@/lib/modals/comment.modal";
export async function GET(req, { params }) {
  await dbConnect();
  const blogId = params.blogId;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 5;
  const skip = (page - 1) * limit;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const comments = await Comment.find({ blogId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Comment.countDocuments({ blogId });

    return NextResponse.json({ comments, total });
  } catch (error) {
    console.error(" Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}
export async function POST(req, { params }) {
  await dbConnect();
  const blogId = params.blogId;

  try {
    const { user, message } = await req.json();

    if (!user?.userId || !message?.trim()) {
      return NextResponse.json(
        { error: "Missing user info or message" },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const comment = await Comment.create({
      blogId,
      userId: user.userId,
      username: user.username || "Guest",
      message,
    });

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.error(" Error posting comment:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
export async function DELETE(req, context) {
  await dbConnect();
  const { params } = context;
  const blogId = params.blogId;

  try {
    const { commentId } = await req.json();
    const userRole = req.headers.get("x-user-role");
    const userId = req.headers.get("x-user-id");

    if (!commentId || !userId) {
      return NextResponse.json({ error: "Missing commentId or userId" }, { status: 400 });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    const isAdmin = userRole === "admin";
    if (comment.userId !== userId && !isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await comment.deleteOne();

    return NextResponse.json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.log("Error deleting comment:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
