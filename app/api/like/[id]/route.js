import { NextResponse } from "next/server";
import dbConnect from "@/lib/config/db";
import Like from "@/lib/models/like.modal";

export async function GET(req, { params }) {
  await dbConnect();
  console.log(`get request aaya h like k liye`);
  try {
    const count = await Like.countDocuments({ blogId: params.blogId });
    return NextResponse.json({ count });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { userId } = await req.json();
       
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const existing = await Like.findOne({ blogId: params.blogId, userId });
    if (existing) {
      return NextResponse.json({ error: "Already liked" }, { status: 400 });
    }

    const like = await Like.create({ blogId: params.blogId, userId });
    return NextResponse.json({ success: true, like });
  } catch (err) {
    return NextResponse.json({ error: "Failed to like" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const result = await Like.findOneAndDelete({ blogId: params.blogId, userId });
    if (!result) {
      return NextResponse.json({ error: "Like not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to unlike" }, { status: 500 });
  }
}
