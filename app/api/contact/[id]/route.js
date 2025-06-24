import dbConnect from "@/lib/config/db";
import Contact from "@/lib/modals/contact.modal"
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
  }
}
