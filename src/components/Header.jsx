import { Link } from 'react-router-dom';
import { useState } from 'react';
import jrLogo from '../assets/jrlogo.svg';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="logo-title">
        <img src={jrLogo} alt="Jonhro Logo" />
        <Link to="/" className="site-name">
          Jonhro<span> Robles, LCB</span>
        </Link>
      </div>

      {/* Desktop Nav */}
      <nav className="desktop-nav">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/rfq">RFQ</Link></li>
        </ul>
      </nav>

      {/* Hamburger */}
      <button className="hamburger" aria-label="Menu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Slide-In Nav */}
      <div className={`mobile-nav ${isOpen ? 'show' : ''}`}>
        <button className="close-menu" onClick={closeMenu} aria-label="Close Menu">
        &times;
        </button>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
          <li><Link to="/rfq" onClick={closeMenu}>RFQ</Link></li>
        </ul>
      </div>
    </header>
  );
}
