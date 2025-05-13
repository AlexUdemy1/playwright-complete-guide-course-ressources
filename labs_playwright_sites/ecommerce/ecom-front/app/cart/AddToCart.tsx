"use client";

import { AddToCartButtonProps } from '@/src/types/Product';
import React from 'react';
import toast from 'react-hot-toast';
import { addToCart } from '../api/cart/route';

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {

  const addToCartHandler = () => {
    addToCart(product, 1);    
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <button className={`w-full mt-4 p-4 py-2 px-4 text-white font-semibold rounded-md ${
      product.stock > 0
        ? "bg-blue-500 hover:bg-blue-400"
        : "bg-gray-400 cursor-not-allowed"
    }`}
    disabled={product.stock === 0} onClick={() => addToCartHandler()}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
