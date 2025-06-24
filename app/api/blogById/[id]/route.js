import dbConnect from "@/lib/config/db";
import  { NextResponse } from "next/server";
import Blog from "@/lib/modals/Blog.modal";
export async function GET(req,{ params }) {
 await dbConnect();
 const blogId = params.id;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}