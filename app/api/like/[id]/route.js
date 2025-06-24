import { NextResponse } from "next/server";
import dbConnect from "@/lib/config/db";
import Like from "@/lib/modals/like.modal";

export async function POST(req, context) {
  await dbConnect();

 const { params } = context; 
  const blogId = params.id;

  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const existing = await Like.findOne({ blogId, userId });
    if (existing) {
      return NextResponse.json({ error: "Already liked" }, { status: 409 });
    }

    const like = await Like.create({ blogId, userId });

    return NextResponse.json({ success: true, like });
  } catch (error) {
    console.error(" Like creation error:", error);
    return NextResponse.json({ error: "Failed to like" }, { status: 500 });
  }
}
export async function DELETE(req, context) {
  await dbConnect();
 const { params } = context; 
  const blogId = params.id;

  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const deleted = await Like.findOneAndDelete({ blogId, userId });

    if (!deleted) {
      return NextResponse.json({ error: "Like not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unlike error:", error);
    return NextResponse.json({ error: "Failed to unlike" }, { status: 500 });
  }
}
export async function GET(req, context) {
  await dbConnect();
  const { id: blogId } = context.params;

  try {
    const count = await Like.countDocuments({ blogId });
    return NextResponse.json({ count });
  } catch (err) {
    console.error("Error getting like count:", err);
    return NextResponse.json({ error: "Failed to get like count" }, { status: 500 });
  }
}
