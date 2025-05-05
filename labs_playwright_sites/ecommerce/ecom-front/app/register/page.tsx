'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  postalCode: yup.string().required('Postal code is required'),
  address: yup.string().required('Address is required'),
  country: yup.string().required('Country is required'),
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  label: yup.string().optional(),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function RegisterPage() {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (formData: FormData) => {
    const response = await fetch('http://localhost:3001/users/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message || 'Something went wrong.');
    } else {
      setMessage('Account created successfully!');
      reset();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          ['firstname', 'First Name'],
          ['lastname', 'Last Name'],
          ['email', 'Email'],
          ['postalCode', 'Postal Code'],
          ['address', 'Address'],
          ['country', 'Country'],
          ['username', 'Username'],
          ['password', 'Password'],
          ['label', 'Label (optional)'],
        ].map(([name, label]) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium">
              {label}
            </label>
            <input
              type={name === 'password' ? 'password' : 'text'}
              {...register(name as keyof FormData)}
              className="mt-1 w-full border rounded-xl px-3 py-2 text-sm"
            />
            {errors[name as keyof FormData] && (
              <p className="text-xs text-red-500 mt-1">
                {errors[name as keyof FormData]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>

      {message && (
        <div className="mt-4 text-center text-sm text-red-500">{message}</div>
      )}
    </div>
  );
}
