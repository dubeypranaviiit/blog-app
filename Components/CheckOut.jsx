'use client';

import { useState } from 'react';
import axios from 'axios';

const CheckOut = () => {
  const [amount, setAmount] = useState('');

  const handleDonate = async () => {
    const res = await fetch('/api/stripe', {
      method: 'POST',
      body: JSON.stringify({ amount: Number(amount) }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Error creating Stripe session.');
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
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Contribute 
      </button>
    </div>
  );
};

export default CheckOut;
