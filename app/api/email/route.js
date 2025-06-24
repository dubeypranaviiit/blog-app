import dbConnect from "@/lib/config/db";
import Email from "@/lib/modals/Email.modal";
import { NextResponse } from "next/server";
import {sendEmail} from "@/lib/config/mail";

const LoadDb = async()=>{
   await dbConnect();
}
LoadDb();
export async function GET(request) {
  try{
      const emailId =await Email.find({});
    console.log(`Email Id :${emailId}`);
    return NextResponse.json({
        success:true,
        emailId,
        message:'email fetched successfully'
    })
  }catch(error){
   return NextResponse.json({
        success:false,
        message:'error while fetching email'
    })
  }
  }
export async function POST(request){
    const formData = await request.formData();
      const emailId = formData.get('email')?.toString();
    const emailData ={
        email:`${formData.get('email')}`,
    }
    console.log(`FormData:${formData}`);
    // const existingEmail=emailData.email
  const existingEmailId = await Email.findOne({ email: emailData.email });
  if(existingEmailId){
    return NextResponse.json({
        success:false,
        message:`Already email subscribed`
     })
  }
    await Email.create(emailData);
     console.log(`Email Saved`);
    const subject = "🎉 You're in! Welcome to CurioBlog";
    const html = `
      <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: auto;">
        <h2 style="color: #1d4ed8;">Welcome to <strong>CurioBlog</strong>!</h2>
        <p>Hey there 👋,</p>
        <p>Thanks for subscribing to our blog. You'll now get updates whenever we post new content on tech, tutorials, trends, and more.</p>
        <a href="https://yourdomain.com/blog" style="display: inline-block; margin-top: 10px; padding: 10px 16px; background-color: #1d4ed8; color: white; text-decoration: none; border-radius: 5px;">Explore Blogs</a>
        <p style="margin-top: 30px;">Glad to have you with us 💙<br />— CurioBlog  Team</p>
      </div>
    `;

    await sendEmail(emailId, subject, html);
     return NextResponse.json({
        success:true,
        message:`Saved in Database`
     })
}
export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get('id');
  const deleteedEmail = await Email.findByIdAndDelete(id);

     return NextResponse.json({
        success:true,
        message:'email unsubscribed'
    })
}