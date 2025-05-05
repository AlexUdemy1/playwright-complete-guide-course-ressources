import Image from 'next/image';
import Link from 'next/link';
import { getCart, postResetCart } from '../api/cart/route';

export default async function PaymentSuccess( {params,
}: {
  params: { itemId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  let orderSummary = await getCart();
  console.log("ici",orderSummary)
  await postResetCart();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Success Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold">Payment Successful!</h1>
          <p className="text-xl mt-4">Thank you for your purchase. Your car is on its way!</p>
        </div>
      </section>

      {/* Order Details Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">Order Details</h2>
          <div className="flex flex-col items-center justify-center bg-gray-200 p-6 rounded-lg shadow-md">
            {/* Car Image */}
            <div className="mb-6">
              <Image
                src="/assets/confirmation.png" // Replace with your image
                alt="Purchased car"
                width={500}
                height={300}
                className="object-cover rounded-md"
              />
            </div>
            {/* Car Info */}
            {orderSummary.map((order: any) => (
              <>
              <h3 className="text-3xl font-semibold text-gray-800 mb-2">{order.name}</h3>
            <p className="text-lg text-gray-600 mb-4">You’ve successfully purchased the {order.name}</p>
            <p className="text-lg text-gray-700">
              <strong>Price:</strong> {order.price} $
            </p>
            </>
            ))}
            
            <p className="text-lg text-gray-700">
              <strong>Order Number:</strong> #12345
            </p>
            <p className="text-lg text-gray-700">
              <strong>Estimated Delivery Date:</strong> April 10, 2035
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <p className="text-xl mb-4">Ready to buy another car? Or want to track your order?</p>
          <div className="space-x-4">
            <Link href="/shop"
                className="bg-yellow-500 text-black px-6 py-2 text-lg rounded-lg"
                aria-label="Go to Shop"
            >
                Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 AutoMart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

