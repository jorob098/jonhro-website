import { FaFacebookF, FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import { MapPin, Phone, Mail, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import jrLogo from '../assets/myNewLogo.svg';
import ScrollToHeroLink from './ScrollToHeroLink';
import './Footer.css';

const PHONE_DISPLAY = '0956 362 5507';
const PHONE_LINK = 'tel:+639563625507';
const EMAIL = 'joroblescb@gmail.com';

const SOCIALS = [
  { href: 'https://www.facebook.com/profile.php?id=61577884841560', label: 'Facebook', Icon: FaFacebookF },
  { href: 'https://www.linkedin.com/in/jonhro-robles-62020417b/', label: 'LinkedIn', Icon: FaLinkedinIn },
  { href: 'https://www.tiktok.com/@jorobdatu2025', label: 'TikTok', Icon: FaTiktok },
];

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const links = [
    { to: '/about', label: t('nav-links.About') },
    { to: '/services', label: t('nav-links.Services') },
    { to: '/contact', label: t('nav-links.Contact') },
    { to: '/blog', label: t('nav-links.Blog') },
    { to: '/rfq', label: t('footer.rfq') },
  ];

  return (
    <footer className="ft">
      <div className="ft-inner">
        <div className="ft-grid">
          {/* Brand */}
          <div className="ft-brand">
            <ScrollToHeroLink className="ft-wordmark" aria-label="Jonhro Robles – Home">
              <img src={jrLogo} alt="" width="44" height="44" />
              <span>Jonhro <em>Robles</em></span>
            </ScrollToHeroLink>
            <p className="ft-about">{t('footer.about')}</p>
            <p className="ft-license">
              <BadgeCheck size={16} aria-hidden="true" />
              {t('footer.license')}
            </p>
            <div className="ft-social">
              {SOCIALS.map(({ href, label, Icon: SocialIcon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <SocialIcon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <nav className="ft-col" aria-label={t('footer.Explore')}>
            <h2>{t('footer.Explore')}</h2>
            <ul>
              <li><ScrollToHeroLink>{t('nav-links.Home')}</ScrollToHeroLink></li>
              {links.map(({ to, label }) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
              <li><a href="/track.html">{t('nav.Track Shipment')}</a></li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="ft-col ft-contact">
            <h2>{t('footer.Contact us')}</h2>
            <address>
              <p>
                <MapPin size={20} aria-hidden="true" />
                <span>
                  {t('footer.area')}
                  <small>{t('footer.areaNote')}</small>
                </span>
              </p>
              <p>
                <Phone size={20} aria-hidden="true" />
                <span>
                  <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>
                  <small>{t('footer.phoneNote')}</small>
                </span>
              </p>
              <p>
                <Mail size={20} aria-hidden="true" />
                <a href={`mailto:${EMAIL}`} className="ft-email">{EMAIL}</a>
              </p>
            </address>
          </div>
        </div>

        <div className="ft-bottom">
          <p>&copy; {year} Jonhro Robles. {t('footer.All rights reserved.')}</p>
          <p className="ft-tagline">Clear · Move · Deliver — With Confidence.</p>
        </div>
      </div>
    </footer>
  );
}
