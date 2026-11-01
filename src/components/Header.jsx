import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import jrLogo from '../assets/myNewLogo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_ITEMS = [
  { to: "/", key: "nav-links.Home" },
  { to: "/about", key: "nav-links.About" },
  { to: "/services", key: "nav-links.Services" },
  { to: "/contact", key: "nav-links.Contact" },
  { to: "/blog", key: "nav-links.Blog" },
  { to: "/rfq", key: "nav-links.RFQ" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const { t } = useTranslation();

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastScrollY.current && currentY > 50);
      setScrolled(currentY > 10);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = (onClick) => (
    <>
      {NAV_ITEMS.map(({ to, key }) => (
        <li key={to}><Link to={to} onClick={onClick}>{t(key)}</Link></li>
      ))}
      <li><a href="/track.html" onClick={onClick}>{t("nav.Track Shipment")}</a></li>
    </>
  );

  return (
    <>
      <header className={`header${hidden ? ' hidden-header' : ''}${scrolled ? ' is-scrolled' : ''}`}>
        <div className="logo-title">
          <img src={jrLogo} alt="" width="56" height="56" />
          <Link to="/" className="site-name">
            Jonhro<span> Robles</span>
          </Link>
        </div>

        <nav className="desktop-nav" aria-label="Main">
          <ul className="nav-links">{links()}</ul>
        </nav>

        <div className="header-actions">
          <LanguageSwitcher />
          <button
            className="hamburger"
            aria-label={t("nav.Menu")}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Outside <header>: the header moves when hiding on scroll, which would drag this panel with it */}
      <nav id="mobile-nav" className={`mobile-nav ${isOpen ? 'show' : ''}`} aria-label="Mobile">
        <button className="close-menu" onClick={closeMenu} aria-label={t("nav.Close Menu")}>
          &times;
        </button>
        <ul>{links(closeMenu)}</ul>
      </nav>
    </>
  );
}
