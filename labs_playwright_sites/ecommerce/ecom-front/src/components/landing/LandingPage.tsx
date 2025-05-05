// pages/landing.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/assets/landing-page.png" // Replace with your image
            alt="Hero car image"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
            aria-hidden="true"
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold">Welcome to AutoMart</h1>
          <p className="text-xl mt-4">Find your perfect car, with top-notch deals!</p>
          <Link href="/shop" className="mt-8 inline-block bg-yellow-500 text-black px-6 py-2 text-lg rounded-lg"
              aria-label="Go to Shop">
              Shop Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">About Us</h2>
          <p className="text-lg text-gray-700">
            At AutoMart, we bring you the best selection of cars available online. Our goal is to make the
            process of buying your dream car easy and stress-free. With a wide range of vehicles from top brands,
            we have something for everyone.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600">Wide Selection</h3>
              <p className="text-gray-600 mt-2">Choose from a variety of cars, from luxury to economy models.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600">Quality Assurance</h3>
              <p className="text-gray-600 mt-2">All our cars undergo rigorous quality checks before sale.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-blue-600">Affordable Prices</h3>
              <p className="text-gray-600 mt-2">We offer competitive prices and financing options for all budgets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">Contact Us</h2>
          <p className="text-lg mb-4">Have any questions or need assistance? Reach out to us!</p>
          <Link href="/contact"
            className="bg-yellow-500 text-black px-6 py-2 text-lg rounded-lg"
            aria-label="Go to Contact Page">
              Contact Us
          </Link>
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
