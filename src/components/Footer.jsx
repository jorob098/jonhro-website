import { FaFacebookF, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import jrLogo from '../assets/jrlogo.svg';
import ScrollToHeroLink from "./ScrollToHeroLink"; // adjust path if needed
import { useEffect } from "react";

export default function Footer() {

  useEffect(() => {
    const el = document.querySelector(".tagline-container");
    if (!el) return;

    const play = () => {
      el.classList.remove("animate");
      // force reflow so CSS animations can restart
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth;
      el.classList.add("animate");
    };

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && play()),
      { threshold: 0.5 }
    );

    obs.observe(el);
    // also play once on initial mount
    play();

    return () => obs.disconnect();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Left: Logo + Site Name */}
        <div className="footer-column logo-section">
          <ScrollLink to="hero" smooth duration={500} className="site-logo">
            <div className="logo-name-container">
              <img src={jrLogo} alt="Jonhro Logo" className="footer-logo" />
              <span className="site-name">Jonhro Robles</span>
            </div>

            {/* ✅ Animated Tagline */}
            <div className="tagline-container">
              <div className="tagline">
                <span className="word"><span className="first-letter">C</span>lear</span>
                <span className="word"><span className="first-letter">M</span>ove</span>
                <span className="word"><span className="first-letter">D</span>eliver</span>
              </div>
              <div className="subtext">With Confidence.</div>
            </div>
          </ScrollLink>
        </div>

        {/* Middle: Quick Links & Location */}
        <div className="footer-column mid-section">
          <div className="quick-links">
            <h4>Quick Links</h4>
            <ul>
              <li><ScrollToHeroLink className="footer-link">Home</ScrollToHeroLink></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="location-info">
            <h4>Location</h4>
            <p><strong>CEBU</strong></p>
          </div>
          <div className="contact-info">
            <h5>Contact</h5>
            <p><strong>09563625507</strong></p>
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="footer-column social-section">
          <h6>Follow Me</h6>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61577884841560" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://www.linkedin.com/in/jonhro-robles-62020417b/" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
            <a href="https://www.tiktok.com/@jorobdatu2025" target="_blank" rel="noreferrer"><FaTiktok /></a>
          </div>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Jonhro Robles. All rights reserved.</p>
      </div>
    </footer>
  );
}
