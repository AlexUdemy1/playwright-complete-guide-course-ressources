"use client";

import { Product } from "@/src/types/Product";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr"; // Import SWR
import { deleteItem, getCart, postTotalPrice, updateQuantity } from "../api/cart/route";

export default function CartClient() {
  const fetcher = async () => await getCart(); // Define fetcher function

  // Use SWR to automatically fetch and update cart data
  const { data: cart = [], mutate, error } = useSWR("/api/cart", fetcher);

  if (error) return <p>Error loading cart</p>;
  if (!cart) return <p>Loading...</p>;

  // Increase quantity
  const handleIncrease = async (item: Product) => {
    if (item.quantity < item.stock) {
      await updateQuantity(item.id, 1);
      mutate(); // Trigger SWR re-fetch
    }
  };

  // Decrease quantity
  const handleDecrease = async (item: { quantity: number; id: number }) => {
    // Optimistically update the cart
    mutate(
      async (currentCart: any[]) => {
        if (item.quantity > 1) {
          await updateQuantity(item.id, -1);
          return currentCart.map((i: { id: number; quantity: number; }) =>
            i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
          );
        } else {
          await deleteItem(item.id);
          return currentCart.filter((i: { id: number; }) => i.id !== item.id);
        }
      },
      { revalidate: false } // Avoids an extra fetch immediately
    );
  
    // Revalidate to ensure cart is in sync with backend
    mutate();
  };

  // Calculate total price
  const totalPrice = cart
    .reduce((acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Order Summary</h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-center">Your order is empty.</p>
          <Link href="/shop" className="w-full max-w-44">
            <p className="text-center bg-blue-600 p-4 rounded-lg hover:bg-blue-500 mt-12">Continue Shopping</p>
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {cart.map((item: Product, key: number) => (
            <li key={key} className="flex border-b pb-4">
              <div className="flex flex-shrink-0 w-18 h-18 mr-4">
                <Image
                  src={item.image}
                  alt="car image"
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex justify-between flex-1 flex-col w-full">
                <div>
                  <p className="text-lg">{item.name}</p>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-1 border-b-2 border-black p-0.5">
                    <button onClick={() => handleDecrease(item)} className="text-gray-600">
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button onClick={() => handleIncrease(item)} className="text-gray-600">
                      +
                    </button>
                  </div>
                  <div className="text-sm pt-1">€{item.price}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 text-right">
        {cart.length !== 0 && (
          <>
            <p className="text-xl font-semibold">Subtotal: €{totalPrice}</p>
            <Link href="/checkout" onClick={() => postTotalPrice(totalPrice)}>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Checkout</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
