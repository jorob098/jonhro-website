import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileCheck2,
  Calculator,
  Ship,
  Radar,
  FolderArchive,
  Warehouse,
  Check,
  Factory,
  Truck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Seo from "./Seo";
import "./Services.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function Services() {
  const { t } = useTranslation();
  const s = (key) => t(`servicesPage.${key}`);

  const services = [
    {
      Icon: FileCheck2,
      title: s("Customs Clearance - Import & Export"),
      text: s("Efficient processing of both air and sea shipments to ensure smooth and timely cargo release."),
      items: [s("c1a"), s("c1b"), s("c1c")],
      featured: true,
    },
    {
      Icon: Calculator,
      title: s("Customs Brokerage & Tariff Consultation"),
      text: s("Professional customs brokerage services with guidance on tariff classification and duty calculations."),
      items: [s("c2a"), s("c2b"), s("c2c")],
    },
    {
      Icon: Ship,
      title: s("Freight Consultation"),
      text: s("With trusted freight forwarder partners, I can help arrange your freight requirements with ease."),
      items: [s("c3a"), s("c3b")],
    },
    {
      Icon: Radar,
      title: s("Real-Time Shipment Monitoring"),
      text: s("Stay updated on your shipment’s progress with real-time monitoring and proactive updates."),
      items: [s("c4a"), s("c4b")],
    },
    {
      Icon: FolderArchive,
      title: s("Customs Entry Filing & Records"),
      text: s("Accurate filing of customs entries for future reference and audits to ensure compliance."),
      items: [s("c5a"), s("c5b")],
    },
    {
      Icon: Warehouse,
      title: s("Cross Docking Arrangements"),
      text: s("Seamless coordination for cross docking services to support efficient cargo distribution."),
      items: [s("c6a"), s("c6b")],
    },
  ];

  const cargo = [
    { Icon: Factory, label: t("aboutPage.steelTitle") },
    { Icon: Truck, label: t("aboutPage.equipTitle") },
    { Icon: ShieldCheck, label: t("aboutPage.fdaTitle") },
  ];

  const steps = [1, 2, 3, 4].map((n) => ({ n, title: s(`s${n}t`), text: s(`s${n}d`) }));

  return (
    <>
      <Seo path="/services" />
      <main className="svc-page">
        {/* ---------- Header ---------- */}
        <motion.section className="svc-hero" initial="hidden" animate="visible" variants={stagger}>
          <motion.span className="svc-eyebrow" variants={fadeUp}>{s("eyebrow")}</motion.span>
          <motion.h1 variants={fadeUp}>
            {s("End to End Customs Services from Cebu to Key Ports Nationwide")}
          </motion.h1>
          <motion.p variants={fadeUp}>
            {s("I provide end-to-end customs services based in Cebu, with extended support in key ports including Manila, Cagayan, Davao, Iloilo, and Subic—ensuring smooth customs clearance and reliable trade facilitation nationwide.")}
          </motion.p>
          <motion.div className="svc-buttons" variants={fadeUp}>
            <Link to="/rfq" className="svc-btn-primary">{t("aboutPage.ctaQuote")}</Link>
            <Link to="/track" className="svc-btn-secondary">{s("trackCta")}</Link>
          </motion.div>
        </motion.section>

        {/* ---------- Service cards ---------- */}
        <motion.section
          className="svc-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          {services.map(({ Icon, title, text, items, featured }) => (
            <motion.article key={title} className={`svc-card${featured ? " featured" : ""}`} variants={fadeUp}>
              <span className="svc-card-icon"><Icon size={24} aria-hidden="true" /></span>
              <h2>{title}</h2>
              <p>{text}</p>
              <span className="svc-includes">{s("includes")}</span>
              <ul>
                {items.map((item) => (
                  <li key={item}><Check size={16} aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.section>

        {/* ---------- Specialized cargo ---------- */}
        <section className="svc-cargo">
          <div>
            <h2>{s("specTitle")}</h2>
            <p>{s("specText")}</p>
          </div>
          <ul>
            {cargo.map(({ Icon, label }) => (
              <li key={label}><Icon size={20} aria-hidden="true" />{label}</li>
            ))}
          </ul>
          <Link to="/about" className="svc-more">
            {s("specMore")} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </section>

        {/* ---------- How it works ---------- */}
        <section className="svc-steps-section">
          <h2>{s("howTitle")}</h2>
          <motion.ol
            className="svc-steps"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            {steps.map(({ n, title, text }) => (
              <motion.li key={n} variants={fadeUp}>
                <span className="svc-step-num" aria-hidden="true">{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </section>

        {/* ---------- CTA ---------- */}
        <section className="svc-cta">
          <div>
            <h2>{s("ctaTitle")}</h2>
            <p>{s("ctaText")}</p>
          </div>
          <div className="svc-buttons">
            <Link to="/rfq" className="svc-btn-primary">{t("aboutPage.ctaQuote")}</Link>
            <Link to="/contact" className="svc-btn-light">{t("aboutPage.ctaContact")}</Link>
          </div>
        </section>
      </main>
    </>
  );
}
