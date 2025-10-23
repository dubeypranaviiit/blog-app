'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Success() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [amount, setAmount] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // You can get session_id from the URL if needed
    const sessionId = searchParams.get('session_id');

    // For a normal page, we just show a thank you message
    // Optionally, you can pass amount and email via query params from Stripe
    const amt = searchParams.get('amount'); // optional
    const em = searchParams.get('email'); // optional

    if (amt) setAmount(amt);
    if (em) setEmail(em);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-4">
          {email ? `Dear ${email},` : 'Dear Supporter,'} your contribution was successful.
        </p>
        {amount && (
          <p className="text-gray-800 font-semibold mb-4">
            Amount Donated: ₹{amount}
          </p>
        )}
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
