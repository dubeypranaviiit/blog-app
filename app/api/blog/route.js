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

 export async function GET(request){
   const blogs = await Blog.find({});
    return NextResponse.json({
       blogs
    })
}
export async function POST(request){
    const formData = await request.formData();
    const timestamp = Date.now();
    console.log(formData,":formData");
    // const image = formData.get('image');
    const image = formData.getAll('image').find(file => file instanceof File);

    if (!image) {
        return res.status(400).json({ error: 'No image file provided' });
    }
  
    const  imageBiteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageBiteData)
    const path =`./public/${timestamp}_${image.name}`;
     await writeFile(path,buffer);
     const imageUrl = `/${timestamp}_${image.name}`
     console.log(`${imageUrl}`);

    const blogData ={
        title:`${formData.get('title')}`,
        description:`${formData.get('description')}`,
        category:`${formData.get('category')}`,
        author:`${formData.get('author')}`,
        image:`${imageUrl}`,
        authorImg:`${formData.get('authorImg')}`
    }
    
 await Blog.create(blogData);
 console.log(`Blog Saved`);

     return NextResponse.json({
        success:true,
        message:`Saved in Database`
     })
}
export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get('id');
    const blog=   await Blog.findById(id)
    fs.unlink(`./public${blog.image}`,()=>{});
    await Blog.findByIdAndDelete(id);

 return NextResponse.json({
    message:"Blog deleted successfully"
    })

}
