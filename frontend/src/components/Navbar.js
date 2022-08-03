import { Link } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
  const logout = useLogout();
  const { user } = useAuthContext();

  return (
    <div className='bg-white py-5 shadow-sm'>
      <div className='max-w-5xl mx-auto px-3 flex justify-between items-center'>
        <h1 className='text-xl font-bold hover:text-indigo-600'>
          <Link to='/'>Workout Buddy</Link>
        </h1>

        <nav>
          <ul className='flex items-center space-x-3'>
            {user && (
              <>
                <li className='hover:text-indigo-600'>
                  <Link to='#'>{user.email}</Link>
                </li>
                <li className='border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-3 py-1 rounded'>
                  <Link to='#' onClick={logout}>
                    Logout
                  </Link>
                </li>
              </>
            )}

            {!user && (
              <>
                <li className='hover:text-indigo-600'>
                  <Link to='/login'>Login</Link>
                </li>
                <li className='hover:text-indigo-600'>
                  <Link to='/register'>Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
