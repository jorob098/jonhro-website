import { FaFacebookF, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import jrLogo from '../assets/myNewLogo.svg';
import ScrollToHeroLink from "./ScrollToHeroLink";

const PHONE_DISPLAY = "0956 362 5507";
const PHONE_LINK = "tel:+639563625507";

const SOCIALS = [
  { href: "https://www.facebook.com/profile.php?id=61577884841560", label: "Facebook", Icon: FaFacebookF },
  { href: "https://www.linkedin.com/in/jonhro-robles-62020417b/", label: "LinkedIn", Icon: FaLinkedinIn },
  { href: "https://www.tiktok.com/@jorobdatu2025", label: "TikTok", Icon: FaTiktok },
];

export default function Footer() {
  const { t } = useTranslation();
  const taglineRef = useRef(null);

  // Replay the tagline animation each time it scrolls into view.
  useEffect(() => {
    const el = taglineRef.current;
    if (!el) return;

    const play = () => {
      el.classList.remove("animate");
      void el.offsetWidth; // force reflow so the CSS animation restarts
      el.classList.add("animate");
    };

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && play()),
      { threshold: 0.5 }
    );
    obs.observe(el);
    play();
    return () => obs.disconnect();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Left: Logo + Site Name */}
        <div className="footer-column logo-section">
          <ScrollToHeroLink className="site-logo" aria-label="Jonhro Robles – Home">
            <div className="logo-name-container">
              <img src={jrLogo} alt="" className="footer-logo" />
              <span className="site-name">Jonhro Robles</span>
            </div>

            <div className="tagline-container" ref={taglineRef}>
              <div className="tagline">
                <span className="word"><span className="first-letter">C</span>lear</span>
                <span className="word"><span className="first-letter">M</span>ove</span>
                <span className="word"><span className="first-letter">D</span>eliver</span>
              </div>
              <div className="subtext">With Confidence.</div>
            </div>
          </ScrollToHeroLink>
        </div>

        {/* Middle: Quick Links & Location */}
        <div className="footer-column mid-section">
          <nav className="quick-links" aria-label={t("footer.Quick Links")}>
            <h4>{t("footer.Quick Links")}</h4>
            <ul>
              <li><ScrollToHeroLink className="footer-link">{t("footer.Home")}</ScrollToHeroLink></li>
              <li><Link to="/services">{t("footer.Services")}</Link></li>
              <li><Link to="/about">{t("footer.About")}</Link></li>
              <li><Link to="/contact">{t("footer.Contact")}</Link></li>
              <li><Link to="/blog">{t("footer.Blog")}</Link></li>
            </ul>
          </nav>
          <div className="location-info">
            <h4>{t("footer.Location")}</h4>
            <p><strong>Cebu, Philippines</strong></p>
          </div>
          <div className="contact-info">
            <h4>{t("footer.Phone")}</h4>
            <p><a href={PHONE_LINK}><strong>{PHONE_DISPLAY}</strong></a></p>
          </div>
        </div>

        {/* Right: Social Icons */}
        <div className="footer-column social-section">
          <h4>{t("footer.Follow Me")}</h4>
          <div className="social-icons">
            {SOCIALS.map(({ href, label, Icon: SocialIcon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <SocialIcon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Jonhro Robles. {t("footer.All rights reserved.")}</p>
      </div>
    </footer>
  );
}
