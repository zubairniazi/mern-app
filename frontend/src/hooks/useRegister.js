import { useState } from 'react';

import { useAuthContext } from './useAuthContext';

const useRegister = () => {
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const register = async (email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/register`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setErrors(json.errors);
      setLoading(false);
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json.data));

      dispatch({ type: 'LOGIN', payload: json.data });

      setLoading(false);
    }
  };

  return { register, loading, error, errors };
};

export default useRegister;
