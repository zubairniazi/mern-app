import React, { useState } from 'react';
import useRegister from '../hooks/useRegister';

const RegisterForm = () => {
  const { register, loading, error, errors } = useRegister();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(email, password);
  };

  return (
    <div className='bg-white p-5 shadow-sm rounded'>
      <h2 className='font-bold mb-4 text-lg'>Register</h2>

      <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label className='text-sm text-gray-400 mb-1'>Email</label>
          <input
            type='email'
            className={`bg-gray-50 p-2 shadow ${
              errors && errors.email ? 'border border-red-400 rounded' : ''
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className='text-sm text-red-400 mt-1'>
            {errors && errors.email}
          </span>
        </div>

        <div className='flex flex-col'>
          <label className='text-sm text-gray-400 mb-1'>Password</label>
          <input
            type='text'
            className={`bg-gray-50 p-2 shadow ${
              errors && errors.password ? 'border border-red-400 rounded' : ''
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className='text-sm text-red-400 mt-1'>
            {errors && errors.password}
          </span>
        </div>

        <div className='flex flex-col'>
          <input
            type='submit'
            value='Register'
            disabled={loading}
            className='text-sm bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded cursor-pointer'
          />
        </div>

        {error && (
          <div className='text-red-400 bg-red-50 p-2 border border-red-400'>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
