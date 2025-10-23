import Stripe from 'stripe';
import dbConnect from '@/lib/config/db';
import Donation from '@/lib/modals/Donation.modal'; // Make sure this path is correct

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {
  await dbConnect();

  try {
    const { amount, clerkId = null, blogId = null, email = null } = await req.json();

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid amount' }), { status: 400 });
    }

    // Create pending donation in DB
    const donation = await Donation.create({ clerkId, blogId, amount, email, status: 'pending' });

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required', // Required for India
      customer_email: email || 'anonymous@example.com',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: { name: 'Support Contribution' },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      metadata: { donationId: donation._id.toString() },
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (err) {
    console.error('Stripe error:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
