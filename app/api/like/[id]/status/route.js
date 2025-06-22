import { NextResponse } from "next/server";
import dbConnect from "@/lib/config/db";
import Like from "@/lib/models/like.modal";

export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ isLiked: false });
    }

    const existingLike = await Like.findOne({
      blogId: params.blogId,
      userId,
    });

    return NextResponse.json({ isLiked: !!existingLike });
  } catch (error) {
    console.error("Error checking like status:", error);
    return NextResponse.json(
      { error: "Failed to check like status" },
      { status: 500 }
    );
  }
}
