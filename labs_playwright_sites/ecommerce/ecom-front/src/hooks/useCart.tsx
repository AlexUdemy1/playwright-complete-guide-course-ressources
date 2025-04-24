import { useContext } from "react";
import { Product } from "@/src/types/Product";
import { CartContext } from "../context/CartContext";

export const useCartActions = () => {
  const { items, totalAmount } = useContext(CartContext);

  const addItem = (item: Product) => {
    const updatedItems = [...items, item];
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const removeItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const updateItemQuantity = (itemId: number, newQuantity: number) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  return {
    addItem,
    removeItem,
    updateItemQuantity,
  };
};
