import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Reservation from '@/pages/Reservation';
import Payment from '@/pages/Payment';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#0B0F1C] relative">
          {/* Grain Overlay */}
          <div className="grain-overlay" />
          
          {/* Vignette Overlay */}
          <div className="vignette-overlay" />
          
          {/* Navigation */}
          <Navbar />
          
          {/* Main Content */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
          
          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
