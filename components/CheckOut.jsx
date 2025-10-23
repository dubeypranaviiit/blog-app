'use client';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

const CheckOut = ({ blogId = null }) => {
  const { user } = useUser(); // Get logged-in user
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    if (!amount || Number(amount) <= 0) {
      alert('Enter a valid amount');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(amount),
          clerkId: user?.id || null,
          blogId,
          email: user?.emailAddresses?.[0]?.emailAddress || null,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error creating Stripe session.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-4">
      <input
        type="number"
        placeholder="Enter amount (INR)"
        className="border px-4 py-2 rounded mr-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={handleDonate}
        disabled={loading}
        className={`${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
        } text-white px-4 py-2 rounded`}
      >
        {loading ? 'Processing...' : 'Contribute'}
      </button>
    </div>
  );
};

export default CheckOut;
