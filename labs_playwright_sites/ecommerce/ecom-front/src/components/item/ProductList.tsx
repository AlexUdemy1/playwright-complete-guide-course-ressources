"use client"; // Now we can use useState

import AddToCartButton from "@/app/cart/AddToCart";
import { Product } from "@/src/types/Product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductList({ products }: { products: Product[] }) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product, key) => (
        <div key={key} className="flex flex-col justify-between h-full border border-gray-200 rounded-lg overflow-hidden">
          <Link href={`/item/${product.id}`} className="block">
            <div className="w-54 h-72">
              <Image src={product.image} width={500} height={500} alt={product.name} className="object-contain w-full h-full" />
            </div>
            <div className="p-4 text-center">
              <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
              <p className="text-lg text-gray-700 mt-2">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600 mt-1">{product.stock > 0 ? `Stock: ${product.stock}` : ""}</p>
            </div>
          </Link>
          {product.stock > 0 ? (
            <div className="p-4">
              <AddToCartButton product={product} />
            </div>
          ) : (
            <div className="p-4 text-blue-500 text-center">Out of Stock</div>
          )}
        </div>
      ))}
    </div>
  );
}
