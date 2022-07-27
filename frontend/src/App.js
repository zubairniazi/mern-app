import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';

function App() {
  return (
    <div className=''>
      <Router>
        <Navbar />

        <div className='max-w-5xl mx-auto py-5'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
