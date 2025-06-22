import dbConnect from "@/lib/config/db";
import Email from "@/lib/models/Email.modal";
import { NextResponse } from "next/server";


const LoadDb = async()=>{
   await dbConnect();
}
LoadDb();
export async function GET(request) {
    const emailId =await Email.find({})
    console.log(`Emai Id :${emailId}`);
    return NextResponse.json({
        success:true,
        emailId,
        message:'email fetched successfully'
    })
  }
export async function POST(request){
    const formData = await request.formData();
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