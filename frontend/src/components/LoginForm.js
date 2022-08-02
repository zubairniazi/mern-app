import React, { useState } from 'react';

const LoginForm = ({ handleUserLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let user = { email, password };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/login`,
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setErrors(json.errors);
    }

    if (response.ok) {
      handleUserLoggedIn && handleUserLoggedIn(json.data);
      resetForm();
    }
  };

  const resetForm = () => {
    setErrors(null);
    setError(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className='bg-white p-5 shadow-sm rounded'>
      <h2 className='font-bold mb-4 text-lg'>Log in</h2>

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
            value='Log in'
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

export default LoginForm;
