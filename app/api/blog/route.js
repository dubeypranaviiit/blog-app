import { NextResponse } from 'next/server';
import dbConnect from '@/lib/config/db';
import Blog from '@/lib/modals/Blog.modal';
import Email from '@/lib/modals/Email.modal';
import { sendEmail } from '@/lib/config/mail';
import { uploadToCloudinary } from '@/lib/config/cloudinary';

export async function GET() {
   await dbConnect();
try{
  const blogs = await Blog.find({});
  return NextResponse.json({ blogs });
}catch(error){
  return NextResponse.json({ 
    success:false,
    message:`Something went wrong:${error}`
   });
}
}

export async function POST(request) {
  await dbConnect();

  try {
    const formData = await request.formData();
    const image = formData.getAll('image').find((file) => file instanceof File);

    if (!image) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    const imageBytes = await image.arrayBuffer();
    const buffer = Buffer.from(imageBytes);
    const timestamp = Date.now();
    const filename = `${timestamp}_${image.name}`;


    const cloudinaryResult = await uploadToCloudinary(buffer, filename);
    const imageUrl = cloudinaryResult.secure_url;

    const blogData = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      author: formData.get('author'),
      image: imageUrl,
      authorImg: formData.get('authorImg'),
    };

    const newBlog = await Blog.create(blogData);
    console.log(` Blog Saved`);

    const subscribers = await Email.find();

    await Promise.all(
      subscribers.map((sub) =>
        sendEmail(
          sub.email,
          `📰 New Blog Published: ${newBlog.title}`,
          `
            <h2>${newBlog.title}</h2>
            <h3>Category: ${newBlog.category}</h3>
            <p>${newBlog.description.slice(0, 40)}...</p>
            <a href="https://curio-blog-pranav.vercel.app/blog/${newBlog._id}">Read More</a>
          `
        )
      )
    );

    return NextResponse.json({
      success: true,
      message: 'Saved in Database',
    });
  } catch (error) {
    console.error(`Error while saving blog:`, error);
    return NextResponse.json(
      {
        success: false,
        message: 'Server error! Please try again later.',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  await dbConnect();

  try {
    const id = request.nextUrl.searchParams.get('id');
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
