"use client"; // ✅ This makes the component interactive

import { Product } from "@/src/types/Product";
import { useState } from "react";
import { deleteItem, updateQuantity } from "../api/cart/route";

const CartActions = ({ item }: { item: Product }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncreaseQuantity = async () => {
    if (quantity < item.stock) {
      await updateQuantity(item.id, 1);
      setQuantity(quantity + 1); // Update local state
    }
  };

  const handleDecreaseQuantity = async () => {
    if (quantity > 1) {
      await updateQuantity(item.id, -1);
      setQuantity(quantity - 1);
    } else {
      await deleteItem(item.id);
    }
  };

  return (
    <div className="flex items-center space-x-1 border-b-2 border-black p-0.5">
      <button onClick={handleDecreaseQuantity} className="text-gray-600">-</button>
      <span className="px-4">{quantity}</span>
      <button onClick={handleIncreaseQuantity} className="text-gray-600">+</button>
    </div>
  );
};

export default CartActions;
