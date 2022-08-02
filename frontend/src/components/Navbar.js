import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='bg-white py-5 shadow-sm'>
      <div className='max-w-5xl mx-auto px-3 flex justify-between'>
        <h1 className='text-xl font-bold'>Workout Buddy</h1>

        <nav>
          <ul className='flex space-x-3'>
            <li className='hover:border-b-2'>
              <Link to='/login'>Login</Link>
            </li>
            <li className='hover:border-b-2'>
              <Link to='/register'>Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
