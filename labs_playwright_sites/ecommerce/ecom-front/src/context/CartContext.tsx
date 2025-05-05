"use client";

import { Product } from "@/src/types/Product";
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

// Cart context type interface
interface CartContextType {
  items: Product[];
  totalAmount: number;
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
  updateItemQuantity: (itemId: number, newQuantity: number) => void;
  clearCart: () => void;
}

// Default values for the context
const defaultCartContext: CartContextType = {
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {},
};

interface CartProviderProps {
  children: ReactNode;
}

// Cart context creation
export const CartContext = createContext<CartContextType>(defaultCartContext);

// Custom hook to use the Cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  // Set client flag after the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load cart data from localStorage on the client side
  useEffect(() => {
    if (isClient) {
      const savedCart = localStorage.getItem("cart");
      const savedTotal = localStorage.getItem("totalAmount");
      if (savedCart) setItems(JSON.parse(savedCart));
      if (savedTotal) setTotalAmount(parseFloat(savedTotal));
    }
  }, [isClient]);

  // Recalculate total amount whenever items change
  const recalculateTotalAmount = useCallback(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  useEffect(() => {
    setTotalAmount(recalculateTotalAmount());
  }, [items, recalculateTotalAmount]);

  // Debounced localStorage sync to reduce frequent writes
  useEffect(() => {
    if (isClient) {
      const saveToLocalStorage = () => {
        localStorage.setItem("cart", JSON.stringify(items));
        localStorage.setItem("totalAmount", totalAmount.toString());
      };

      // Delay saving to localStorage by 300ms
      const timer = setTimeout(saveToLocalStorage, 300);
      return () => clearTimeout(timer); // Clean up on component unmount or change
    }
  }, [items, totalAmount, isClient]);

  // Add item to the cart
  const addItem = (newItem: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };
  

  // Remove item from the cart by ID
  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update the quantity of an item in the cart
  const updateItemQuantity = (itemId: number, newQuantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear the cart and remove data from localStorage
  const clearCart = () => {
    setItems([]);
    setTotalAmount(0);
    localStorage.removeItem("cart");
    localStorage.removeItem("totalAmount");
  };

  // Context value to provide to the components
  const value: CartContextType = {
    items,
    totalAmount,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
