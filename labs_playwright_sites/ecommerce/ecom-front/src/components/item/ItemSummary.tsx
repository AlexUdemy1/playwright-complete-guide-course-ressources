import AddToCartButton from "@/app/cart/AddToCart";
import Image from "next/image";

async function getProduct(productId: string) {
  const res = await fetch(`http://localhost:3001/items/${productId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch product ${productId}`);
  const product = res.json()
  return product;
}

async function ItemSummary({productId}: {productId: string} ) {
  const product = await getProduct(productId)

  // If no product is found, show a message or a fallback UI
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center p-8 min-h-screen">
      {/* Image Container */}
      <div className="flex justify-center lg:w-1/2">
        <Image
          src={product?.image}
          width={500}
          height={500}
          alt={product?.name}
          className="object-cover mb-4 md:mb-0 shadow-md"
        />
      </div>

      {/* Text + Add to Cart */}
      <div className="lg:w-1/2 text-center lg:text-left p-6 flex flex-col">
        <h3 className="text-2xl font-semibold mb-2 text-gray-900">{product?.name}</h3>
        <p className="text-xl text-blue-700 mb-2">${product?.price}</p>
        <p className="text-sm text-gray-500 mb-2">Stock: {product?.stock}</p>
        <p className="text-sm text-gray-700 mb-4">{product?.description}</p>

        {/* Regular button for large screens */}
        <div className="hidden lg:block mt-4">
          <AddToCartButton product={product} />
        </div>
      </div>

      {/* Sticky button for small & medium screens */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white p-4 lg:hidden">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};
export default ItemSummary;
