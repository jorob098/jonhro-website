import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Ship,
  Globe,
  ShieldCheck,
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
      className="hero"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <div className="hero-content">
        <div className="hero-left">
          <motion.h1 variants={container}>
            {waveWords.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariant}
                style={{
                  display: "inline-block",
                  marginRight: "0.5ch",
                }}
              >
                {word}
              </motion.span>
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
              {t("hero.Get Started")}
            </Link>
            
          </motion.div>

          <motion.div
            className="hero-features"
            variants={wordVariant}
          >
            <div className="feature-pill">
              <Ship size={18} />

              <div>
                <strong>Air • Sea • Land</strong>
                <span>Freight</span>
              </div>
            </div>

            <div className="feature-pill">
              <Globe size={18} />

              <div>
                <strong>Global</strong>
                <span>Logistics</span>
              </div>
            </div>

            <div className="feature-pill">
              <ShieldCheck size={18} />

              <div>
                <strong>Licensed</strong>
                <span>Broker</span>
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