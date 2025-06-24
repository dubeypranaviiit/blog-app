import dbConnect from "@/lib/config/db";
import Contact from "@/lib/modals/contact.modal"

export async function POST(request) {
    console.log('contact ka post req aaya hai');
  try {
    const body = await request.json();
    await dbConnect();

    const contact = new Contact(body);
    await contact.save();

    return new Response(JSON.stringify({ message: 'Message sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error saving contact:', error);

    return new Response(JSON.stringify({
      message: 'Something went wrong',
      errors: error.errors || error.message,
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  await dbConnect();
  const contacts = await Contact.find();
  return new Response(JSON.stringify(contacts), { status: 200 });
}
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
  }
}
