import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Activity from './pages/Activity';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activity" element={<Activity />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
