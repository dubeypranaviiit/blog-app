import Stripe from 'stripe';
import dbConnect from '@/lib/config/db';
import Donation from '@/lib/modals/Donation.modal';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });


export const POST = async (req) => {
  await dbConnect();
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const donationId = session.metadata.donationId;

      await Donation.findByIdAndUpdate(donationId, {
        status: 'succeeded',
        paymentIntentId: session.payment_intent,
      });
    }

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('Webhook Error', { status: 400 });
  }
};
