'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { getTotalPrice } from '../api/cart/route';
import TotalPrice from './TotalPrice';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  shippingAddress: string;
  billingAddress: string;
  country: string;
  postalCode: string;
}

// Create a validation schema with Yup
const formSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  shippingAddress: yup.string().required('Shipping address is required'),
  billingAddress: yup.string().required('Billing address is required'),
  country: yup.string().required('Country is required'),
  postalCode: yup.string().required('Postal code is required'),
});

export default function CheckoutPage() {
  // Set up useForm hook with validation schema
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  });

  // Submit handler for form data
  const onSubmit = (data: FormValues) => {
    window.location.href = '/confirmation';
  };

  const totalPrice = getTotalPrice();
  async function getSum() {
    const sum = await totalPrice + 20 + 15
    return sum
  }

  const sum = getSum();
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Section: Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Checkout Form</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="firstname"
              className={`mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
              {...register('name')}
            />
            {errors.name && <span className="text-sm text-red-500 mt-1">{errors.name.message}</span>}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
              {...register('email')}
            />
            {errors.email && <span className="text-sm text-red-500 mt-1">{errors.email.message}</span>}
          </div>

          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              id="phone"
              className={`mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : ''}`}
              {...register('phone')}
            />
            {errors.phone && <span className="text-sm text-red-500 mt-1">{errors.phone.message}</span>}
          </div>

          {/* Shipping Address Input */}
          <div>
            <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">Shipping Address</label>
            <input
              type="text"
              id="shippingAddress"
              className={`mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.shippingAddress ? 'border-red-500' : ''}`}
              {...register('shippingAddress')}
            />
            {errors.shippingAddress && <span className="text-sm text-red-500 mt-1">{errors.shippingAddress.message}</span>}
          </div>

          {/* Billing Address Input */}
          <div>
            <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">Billing Address</label>
            <input
              type="text"
              id="billingAddress"
              className={`mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.billingAddress ? 'border-red-500' : ''}`}
              {...register('billingAddress')}
            />
            {errors.billingAddress && <span className="text-sm text-red-500 mt-1">{errors.billingAddress.message}</span>}
          </div>

          {/* Country Input */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              id="country"
              className={`mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.country ? 'border-red-500' : ''}`}
              {...register('country')}
            />
            {errors.country && <span className="text-sm text-red-500 mt-1">{errors.country.message}</span>}
          </div>

          {/* Postal Code Input */}
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              className={`mt-1 block w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.postalCode ? 'border-red-500' : ''}`}
              {...register('postalCode')}
            />
            {errors.postalCode && <span className="text-sm text-red-500 mt-1">{errors.postalCode.message}</span>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
              // onClick={() => postResetCart()}
            >
              {isSubmitting ? 'Submitting...' : 'Pay'}
            </button>
          </div>
        </form>
      </div>

      {/* Right Section: Payment Summary */}
      <TotalPrice />
    </div>
  );
}
