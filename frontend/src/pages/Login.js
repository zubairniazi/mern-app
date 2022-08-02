import React from 'react';

import LoginForm from '../components/LoginForm';

const Login = () => {
  const userLoggedIn = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className='md:w-2/4 mx-auto mt-8'>
        <LoginForm handleUserLoggedIn={userLoggedIn} />
      </div>
    </div>
  );
};

export default Login;
