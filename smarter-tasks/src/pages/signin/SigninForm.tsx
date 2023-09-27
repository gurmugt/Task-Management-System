import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Sign-in failed');
      }

      console.log('Sign-in successful');

      const responseData = await response.json();

      localStorage.setItem('authToken', responseData.token);
      localStorage.setItem('userData', JSON.stringify(responseData.user));

      navigate('/account');
    } catch (error) {
      console.error('Sign-in failed:', error);
      setError('Sign-in failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.password ? 'border-red-500' : ''
          }`}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign In
      </button>
      {error && (
        <p className="text-red-500 mt-2">{error}</p>
      )}
    </form>
  );
};
export default SigninForm;