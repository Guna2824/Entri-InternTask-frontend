import { Routes, Route } from 'react-router-dom';
import './App.css';
import Fullget from './Fullget';
import Navbar from './Navbar';
import Home from './Home';
import Chart from './Chart';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
    <Navbar />
    <div style={{marginTop:'150px'}}>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/table' element={<Fullget />} />
      <Route path='/chart' element={<Chart />} />
      
    </Routes>
    </div>
    <Footer />
    </div>
  );
}

export default App;
