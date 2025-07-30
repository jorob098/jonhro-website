import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jrLogo from '../assets/jrlogo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const { t } = useTranslation();

  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 50) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div className="utility-bar">
        <LanguageSwitcher />
      </div>

      <header className={`header ${hidden ? 'hidden-header' : ''}`}>
        <div className="logo-title" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={jrLogo} alt="Jonhro Logo" />
          <Link to="/" className="site-name">
            Jonhro<span> Robles, LCB</span>
          </Link>
        </div>

        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><Link to="/">{t("nav-links.Home")}</Link></li>
            <li><Link to="/about">{t("nav-links.About")}</Link></li>
            <li><Link to="/services">{t("nav-links.Services")}</Link></li>
            <li><Link to="/contact">{t("nav-links.Contact")}</Link></li>
            <li><Link to="/blog">{t("nav-links.Blog")}</Link></li>
            <li><Link to="/rfq">{t("nav-links.RFQ")}</Link></li>
          </ul>
        </nav>

        <button className="hamburger" aria-label="Menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`mobile-nav ${isOpen ? 'show' : ''}`}>
          <button className="close-menu" onClick={closeMenu} aria-label="Close Menu">
            &times;
          </button>
          <ul>
            <li><Link to="/" onClick={closeMenu}>{t("Home")}</Link></li>
            <li><Link to="/about" onClick={closeMenu}>{t("About")}</Link></li>
            <li><Link to="/services" onClick={closeMenu}>{t("Services")}</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>{t("Contact")}</Link></li>
            <li><Link to="/blog" onClick={closeMenu}>{t("Blog")}</Link></li>
            <li><Link to="/rfq" onClick={closeMenu}>{t("RFQ")}</Link></li>
          </ul>
        </div>
      </header>
    </>
  );
}
