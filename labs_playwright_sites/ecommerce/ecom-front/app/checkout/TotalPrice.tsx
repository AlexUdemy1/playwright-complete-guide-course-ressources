import { useEffect, useState } from "react";
import { getTotalPrice } from "../api/cart/route";

export default function TotalPriceComponent() {
  const [totalPrice, setTotalPrice] = useState<number | null>();
  const [sum, setSum] = useState<number | string>();


  useEffect(() => {
    async function fetchAndCalculatePrice() {
      try {
        const price = await getTotalPrice(); // Wait for the async function to resolve
        const calculatedSum = (Number(price) + 20 + 15).toFixed(2);

        setTotalPrice(price);
        setSum(calculatedSum);
      } catch (error) {
        console.error("Error fetching total price:", error);
      }
    }

    fetchAndCalculatePrice();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Summary</h2>

    <div className="space-y-4">
      <div className="flex justify-between">
        <span className="text-sm text-gray-700">Items:</span>
        <span className="text-sm font-semibold text-gray-800">${totalPrice}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-700">Shipping:</span>
        <span className="text-sm font-semibold text-gray-800">$20.00</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-700">Tax:</span>
        <span className="text-sm font-semibold text-gray-800">$15.00</span>
      </div>
      <div className="flex justify-between border-t border-gray-200 pt-3">
        <span className="text-lg font-bold text-gray-800">Total:</span>
        <span className="text-lg font-bold text-gray-800">${sum}</span>
      </div>
    </div>

    </div>
  );
}
