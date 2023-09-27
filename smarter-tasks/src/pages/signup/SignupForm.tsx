import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { API_ENDPOINT } from '../../config/constants';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  organisationName: string;
  userName: string;
  userEmail: string;
  userPassword: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/organisations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Sign-up failed');
      }
      console.log('Sign-up successful');

      // Extract the response body as JSON data
      const responseData = await response.json();

      localStorage.setItem('authToken', responseData.token);
      // If successful, save the user info in localStorage
      localStorage.setItem('userData', JSON.stringify(responseData.user));
      navigate('/account');
    } catch (error) {
      console.error('Sign-up failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Organisation Name:</label>
        <input
          type="text"
          {...register('organisationName', { required: 'Organisation Name is required' })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.organisationName ? 'border-red-500' : ''
          }`}
        />
        {errors.organisationName && (
          <p className="text-red-500">{errors.organisationName.message}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Your Name:</label>
        <input
          type="text"
          {...register('userName', { required: 'Your Name is required' })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.userName ? 'border-red-500' : ''
          }`}
        />
        {errors.userName && (
          <p className="text-red-500">{errors.userName.message}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input
          type="email"
          {...register('userEmail', { required: 'Email is required' })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.userEmail ? 'border-red-500' : ''
          }`}
        />
        {errors.userEmail && (
          <p className="text-red-500">{errors.userEmail.message}</p>
        )}
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Password:</label>
        <input
          type="password"
          {...register('userPassword', { required: 'Password is required' })}
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.userPassword ? 'border-red-500' : ''
          }`}
        />
        {errors.userPassword && (
          <p className="text-red-500">{errors.userPassword.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;
