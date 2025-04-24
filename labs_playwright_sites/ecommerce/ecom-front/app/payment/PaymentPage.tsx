"use client";

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Product } from '@/src/types/Product';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage({ items }: { items: Product[] }) {
  const handleCheckout = async () => {
    try {
      // Update the fetch URL to match the new file structure
      const response = await fetch('api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items, // Send the items as part of the request body
        }),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url; // Redirect to Stripe Checkout
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button 
        onClick={handleCheckout} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
      >
        Order
      </button>
    </div>
  );
}
