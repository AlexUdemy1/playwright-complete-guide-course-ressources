'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Lenis from '@studio-freight/lenis'
import { motion } from 'framer-motion'

export default function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/landing-page.png"
          alt="Hero car image"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
          aria-hidden="true"
        />
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold">Welcome to AutoMart</h1>
          <p className="text-xl mt-4">Find your perfect car, with top-notch deals!</p>
          <Link
            href="/shop"
            className="mt-8 inline-block bg-yellow-500 text-black px-6 py-2 text-lg rounded-lg"
            aria-label="Go to Shop"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <motion.div
          className="container mx-auto text-center px-4"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-semibold mb-6">About Us</h2>
          <p className="text-lg text-gray-700">
            At AutoMart, we bring you the best selection of cars available online. Our goal is to make the process
            of buying your dream car easy and stress-free.
          </p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center px-4">
          <motion.h2
            className="text-4xl font-semibold mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Wide Selection',
                desc: 'Choose from a variety of cars, from luxury to economy models.',
              },
              {
                title: 'Quality Assurance',
                desc: 'All our cars undergo rigorous quality checks before sale.',
              },
              {
                title: 'Affordable Prices',
                desc: 'We offer competitive prices and financing options for all budgets.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-6 bg-white rounded-lg shadow-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-blue-600">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-600 text-white">
        <motion.div
          className="container mx-auto text-center px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-semibold mb-6">Contact Us</h2>
          <p className="text-lg mb-4">Have any questions or need assistance? Reach out to us!</p>
          <Link
            href="/contact"
            className="bg-yellow-500 text-black px-6 py-2 text-lg rounded-lg"
            aria-label="Go to Contact Page"
          >
            Contact Us
          </Link>
        </motion.div>
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
