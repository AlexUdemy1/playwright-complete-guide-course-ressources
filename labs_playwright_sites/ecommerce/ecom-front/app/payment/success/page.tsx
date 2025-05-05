"use client";

import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CartContext, useCart } from "@/src/context/CartContext";

const SuccessPage = () => {
  const { clearCart } = useCart();
  const [cartCleared, setCartCleared] = useState(false);

  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionDetails, setSessionDetails] = useState<any>(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (sessionId) {
        try {
          const res = await fetch(`/api/checkout_sessions/${sessionId}`);
          const data = await res.json();
          setSessionDetails(data);
        } catch (error) {
          console.error("Failed to fetch session details:", error);
        }
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  useEffect(() => {
    if (!cartCleared) {
      // Clear the cart only if it hasn't been cleared yet
      clearCart();
      setCartCleared(true); // Mark cart as cleared
    }
  }, [cartCleared, clearCart]);


  if (!sessionDetails) {
    return <div className="text-center mt-10 text-lg">Loading session details...</div>;
  }

  const { amount_total, currency, shipping_details } = sessionDetails;
  const { name, address } = shipping_details || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            {/* Success Message */}
            <h1 className="text-3xl font-bold text-green-600 text-center mb-6">🎉 Payment Successful!</h1>
            
            {/* Thank You Message */}
            <p className="text-gray-700 text-center mb-6">
            Thank you, <span className="font-semibold">{name}</span>, for your purchase!
            </p>

            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            <ul className="space-y-2">
                <li className="flex justify-between text-gray-600">
                <span>Total Amount:</span>
                <span className="font-semibold">
                    {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency,
                    }).format(amount_total / 100)}
                </span>
                </li>
            </ul>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h2>
            <p className="text-gray-600">
                {address.line1}
                {address.line2 && <>, {address.line2}</>}
                <br />
                {address.city}, {address.postal_code}
                <br />
                {address.country}
            </p>
            </div>

            {/* Back to Home Button */}
            <div className="text-center mt-8">
            <a
                href="/"
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
            >
                Back to Home
            </a>
            </div>
        </div>
    </div>

  );
};

export default SuccessPage;
