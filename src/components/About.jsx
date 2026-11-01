import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BadgeCheck, Factory, Truck, ShieldCheck, MapPin } from 'lucide-react';
import Seo from './Seo';
import portrait from '../assets/jonhro-port.webp';
import prcLogo from '../assets/prc-logo.webp';
import ccbiLogo from '../assets/ccbi-logo.webp';
import './About.css';

const LICENSE_NO = '006038';

// Paragraph keys from the original About text (kept so translations still apply)
const INTRO_KEY =
  "Since passing the PRC Customs Broker Licensure Examination in 2011, I’ve dedicated over a decade to helping businesses in Cebu and beyond navigate the complexities of import and export. As a freelance customs broker, I provide not just compliance—but clarity, speed, and strategic value in every transaction.";
const APPROACH_KEY =
  "Whether you’re a small business exploring international markets or a growing enterprise managing complex shipments, I tailor solutions that prioritize efficiency, transparency, and results. My services go beyond processing documents—I become your partner in achieving smooth and cost-effective customs clearance.";

const PORTS = ['Cebu', 'Manila', 'Subic', 'Iloilo', 'Cagayan de Oro', 'Davao'];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function About() {
  const { t } = useTranslation();
  const a = (key) => t(`aboutPage.${key}`);

  const stats = [
    { value: '2011', label: a('statSince') },
    { value: '15+', label: a('statYears') },
    { value: a('statHomeValue'), label: a('statHome') },
    { value: a('statReachValue'), label: a('statReach') },
  ];

  const specialties = [
    { Icon: Factory, title: a('steelTitle'), text: a('steelText') },
    { Icon: Truck, title: a('equipTitle'), text: a('equipText') },
    { Icon: ShieldCheck, title: a('fdaTitle'), text: a('fdaText') },
  ];

  return (
    <>
      <Seo path="/about" />
      <main className="about-page">
        {/* ---------- Intro ---------- */}
        <section className="about-hero">
          <motion.div
            className="about-photo"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={portrait}
              alt={a('photoAlt')}
              width="800"
              height="1000"
              fetchPriority="high"
            />
            <div className="about-license">
              <BadgeCheck size={22} aria-hidden="true" />
              <div>
                <strong>{a('badgeTitle')}</strong>
                <span>{a('licenseNo')} {LICENSE_NO}</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="about-intro" initial="hidden" animate="visible" variants={stagger}>
            <motion.span className="about-eyebrow" variants={fadeUp}>{a('eyebrow')}</motion.span>
            <motion.h1 variants={fadeUp}>{a('aboutPageHeader')}</motion.h1>
            <motion.p className="about-role" variants={fadeUp}>Jonhro Robles — {a('role')}</motion.p>
            <motion.p variants={fadeUp}>{t(`aboutPage.${INTRO_KEY}`)}</motion.p>
            <motion.p variants={fadeUp}>{t(`aboutPage.${APPROACH_KEY}`)}</motion.p>
          </motion.div>
        </section>

        {/* ---------- Stats ---------- */}
        <motion.section
          className="about-stats"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
        >
          {stats.map(({ value, label }) => (
            <motion.div key={label} className="about-stat" variants={fadeUp}>
              <strong>{value}</strong>
              <span>{label}</span>
            </motion.div>
          ))}
        </motion.section>

        {/* ---------- Specialties ---------- */}
        <section className="about-section">
          <h2>{a('specTitle')}</h2>
          <p className="about-section-intro">{a('specIntro')}</p>
          <motion.div
            className="about-specialties"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            {specialties.map(({ Icon, title, text }) => (
              <motion.article key={title} className="about-card" variants={fadeUp}>
                <span className="about-card-icon"><Icon size={24} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* ---------- Ports ---------- */}
        <section className="about-section">
          <h2>{a('portsTitle')}</h2>
          <p className="about-section-intro">{a('portsIntro')}</p>
          <ul className="about-ports">
            {PORTS.map((port, i) => (
              <li key={port} className={i === 0 ? 'home' : ''}>
                <MapPin size={16} aria-hidden="true" />
                {port}
                {i === 0 && <em>{a('homeBase')}</em>}
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Affiliations + CTA ---------- */}
        <section className="about-cta">
          <div className="about-cta-text">
            <h2>{a('ctaTitle')}</h2>
            <p>{a('ctaText')}</p>
            <div className="about-cta-buttons">
              <Link to="/rfq" className="about-btn-primary">{a('ctaQuote')}</Link>
              <Link to="/contact" className="about-btn-secondary">{a('ctaContact')}</Link>
            </div>
          </div>
          <div className="about-affiliations">
            <span>{t('Affil.I am affiliated with')}</span>
            <div>
              <img src={prcLogo} alt="Professional Regulation Commission (PRC)" width="72" height="72" loading="lazy" />
              <img src={ccbiLogo} alt="Chamber of Customs Brokers, Inc. (CCBI)" width="72" height="72" loading="lazy" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
