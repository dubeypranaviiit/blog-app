// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Comment from "@/lib/models/comment.modal";
import Blog from "@/lib/models/Blog.model"
import dbConnect from "@/lib/config/db";
// get
export async function GET(req, { params }) {
  await dbConnect();
  console.log(`get request aaya comment find krne k liye`);
  try {
   const id = params.blogId;

   console.log(id);
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    const comments = await Comment.find({ blogId: id }).sort({ createdAt: -1 });

    return NextResponse.json({ comments });
  } catch (error) {
    console.error(" Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}
// POST Comment
export async function POST(req, { params }) {
  console.log("📩 Request received on comments endpoint");
  await dbConnect();

  try {
    const { user, message ,id} = await req.json();  // ✅ no need to extract `id`
    console.log("🧑‍💻 User:", user);
    console.log("💬 Message:", message);
    console.log("🆔 Blog ID from URL:", params.id);

    if (!user?.userId || !message?.trim()) {
      return NextResponse.json(
        { error: "Missing user info or message" },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      console.log("❌ Blog not found");
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const comment = await Comment.create({
      userId: user.userId,
      username: user.username || "Guest",
      message,
      blogId:id,
    });

    console.log("✅ Comment saved:", comment);

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    console.log("❌ Error adding comment:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
// DELETE Comment
export async function DELETE(req, { params }) {
  await dbConnect();
   // sessionClaims can include roles
  const { commentId } = await req.json();

  if (!userId || !commentId) {
    return NextResponse.json({ error: "Unauthorized or missing data" }, { status: 400 });
  }

  const blog = await Blog.findById(params.blogId);
  if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

  const comment = blog.comments.id(commentId);
  if (!comment) return NextResponse.json({ error: "Comment not found" }, { status: 404 });

  const isAdmin = sessionClaims?.role === "admin";
  if (comment.userId !== userId && !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  comment.remove();
  await blog.save();

  return NextResponse.json({ success: true, message: "Comment deleted" });
}
