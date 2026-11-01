import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CalendarCheck,
  Anchor,
} from "lucide-react";

import HeroScene from "./HeroScene";
import "./Hero.css";

export default function Hero() {
  const { t } = useTranslation();

  const waveWords = t("hero.Clear Customs, Clear Mind").split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const wordVariant = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14,
      },
    },
  };

  return (
    <motion.section
      id="hero"
      className="hero"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="hero-content">
        <div className="hero-left">
          <motion.h1 variants={container}>
            {waveWords.map((word, index) => (
              <span key={index}>
                <motion.span variants={wordVariant} style={{ display: "inline-block" }}>
                  {word}
                </motion.span>{" "}
              </span>
            ))}
          </motion.h1>

          <motion.p variants={wordVariant}>
            {t("hero.YoureTrustedHero")}
          </motion.p>

          <motion.div
            className="hero-buttons"
            variants={wordVariant}
          >
            <Link
              to="/rfq"
              className="cta-button"
            >
              {t("aboutPage.ctaQuote")}
            </Link>
            <a href="/track.html" className="text-button">
              {t("servicesPage.trackCta")} →
            </a>
          </motion.div>

          <motion.div
            className="hero-features"
            variants={wordVariant}
          >
            <div className="feature-pill">
              <BadgeCheck size={18} aria-hidden="true" />

              <div>
                <strong>{t("hero.pillFreightTop")}</strong>
                <span>{t("hero.pillFreight")}</span>
              </div>
            </div>

            <div className="feature-pill">
              <CalendarCheck size={18} aria-hidden="true" />

              <div>
                <strong>{t("hero.pillGlobalTop")}</strong>
                <span>{t("hero.pillGlobal")}</span>
              </div>
            </div>

            <div className="feature-pill">
              <Anchor size={18} aria-hidden="true" />

              <div>
                <strong>{t("hero.pillLicensedTop")}</strong>
                <span>{t("hero.pillLicensed")}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hero-right">
          <HeroScene />
        </div>
      </div>
    </motion.section>
  );
}