import dbConnect from "@/lib/config/db";
import  { NextResponse } from "next/server";
import {writeFile} from "fs/promises"
import { title } from "process";
const fs = require('fs')
// import {fs}
// import { arrayBuffer } from "stream/consumers";
import Blog from "@/lib/models/Blog.model";
const LoadDb = async()=>{
    await dbConnect();
}
LoadDb();
export async function GET(req, { params }) {
 
console.log(`request aaya hai by id `);
  try {
    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}