import whyImg from '../assets/services-photo.jpg';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function WhyChooseMe() {
  const { t } = useTranslation();

  // === Variants for Cards ===
  const cardContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 16,
      },
    },
  };

  return (
    <motion.section
      className="why-choose-section section-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="why-grid">
        {/* LEFT: IMAGE + TEXT OVERLAY */}
        <div className="why-image-container">
          <img src={whyImg} alt="Why Choose Me" className="why-bg-img" />
          <div className="why-text-overlay">
            <h2>{t("why-choose.Why Choose Me")}</h2>
            <p>{t("why-choose.10+Years")}</p>
          </div>
        </div>

        {/* RIGHT: ANIMATED CARDS */}
        <motion.div
          className="why-cards-grid"
          variants={cardContainer}
        >
          <motion.div className="why-card card-orange" variants={cardItem}>
            <h3>{t("why-choose.Proven Expertise")}</h3>
            <p>{t("why-choose.With years of experience in customs procedures, I ensure your imports are cleared smoothly and on time.")}</p>
          </motion.div>

          <motion.div className="why-card card-dark" variants={cardItem}>
            <h3>{t("why-choose.Responsive & Reliable")}</h3>
            <p>{t("why-choose.Quick turnarounds, clear updates — always available when you need answers.")}</p>
          </motion.div>

          <motion.div className="why-card card-light" variants={cardItem}>
            <h3>{t("why-choose.Tailored Approach")}</h3>
            <p>{t("why-choose.Solutions matched to your business goals, not a one-size-fits-all service.")}</p>
          </motion.div>

          <motion.div className="why-card card-accent" variants={cardItem}>
            <h3>{t("why-choose.Client-First Focus")}</h3>
            <p>{t("why-choose.I value your time, compliance, and business success as if it were my own.")}</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
