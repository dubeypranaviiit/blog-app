import { NextResponse } from "next/server";
import dbConnect from "@/lib/config/db";
import Like from "@/lib/modals/like.modal";

export async function GET(req, context) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
 const { params } = context; 
  const blogId = params.id;


  if (!userId) {
    return NextResponse.json({ isLiked: false });
  }

  try {
    const liked = await Like.findOne({ blogId, userId });
    return NextResponse.json({ isLiked: !!liked });
  } catch (err) {
    console.error(" Error checking like status:", err);
    return NextResponse.json({ isLiked: false, error: "Failed to check status" }, { status: 500 });
  }
}
