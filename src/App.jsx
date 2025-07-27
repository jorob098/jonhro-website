import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Blog from './components/Blog';
import Rfq from './components/Rfq';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';


export default function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/rfq" element={<Rfq />} />
      </Routes>
      {/* 👇 Footer excluded only on /blog */}
      {location.pathname !== '/blog' && <Footer />}
    </div>
  );
}
