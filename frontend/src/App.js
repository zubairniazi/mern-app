import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className='bg-gray-50 min-h-screen text-gray-600'>
      <Router>
        <Navbar />

        <div className='max-w-5xl mx-auto py-5 px-3'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Home />} exact />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
