import { FaRegFileAlt, FaBalanceScale, FaShippingFast, FaUserTie } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ServicesIntro() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewServices = () => {
    navigate("/services");
  };

  // === Motion Variants (Softened) ===
  const riseVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 20 }
    }
  };

  const cardContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 60, damping: 18 },
    },
  };

  return (
    <motion.section
      className="services-intro-section section-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* Title */}
      <motion.div className="services-intro-header" variants={riseVariant}>
        <motion.h5 className="services-intro-title" variants={riseVariant}>
          {t("servicesIntro.Services")}
        </motion.h5>
      </motion.div>

      {/* Heading, Subheading, Button */}
      <motion.div className="services-intro-heading-row" variants={riseVariant}>
        <motion.h2 className="services-intro-heading" variants={riseVariant}>
          {t("servicesIntro.Freight, Clearance & Compliance")}<br />
          <motion.span className="services-intro-subheading" variants={riseVariant}>
            {t("servicesIntro.Seamlessly Delivered")}
          </motion.span>
        </motion.h2>

        <motion.button
          className="view-services-intro-btn"
          onClick={handleViewServices}
          variants={riseVariant}
        >
          {t("servicesIntro.View Services")}
        </motion.button>
      </motion.div>

      {/* Summary */}
      <motion.p
        className="services-intro-summary"
        variants={riseVariant}
      >
        {t("servicesIntro.Get reliable and timely customs brokerage and logistics support that adapts to your business needs.")}
        {t("servicesIntro.Whether it's one-time shipment or long-term assistance, you're covered with expert service.")}
      </motion.p>

      {/* Cards (slide from right) */}
      <motion.div
        className="services-intro-cards"
        variants={cardContainer}
      >
        <motion.div className="service-intro-card" variants={cardItem}>
          <h3>{t("servicesIntro.Import Documentation")}</h3>
          <p>{t("servicesIntro.Ensure every shipment meets all regulatory requirements, right from the start.")}</p>
          <FaRegFileAlt className="service-intro-icon" />
        </motion.div>

        <motion.div className="service-intro-card" variants={cardItem}>
          <h3>{t("servicesIntro.Customs Compliance")}</h3>
          <p>{t("servicesIntro.Stay audit-ready and penalty-free with my in-depth knowledge of BOC regulations.")}</p>
          <FaBalanceScale className="service-intro-icon" />
        </motion.div>

        <motion.div className="service-intro-card" variants={cardItem}>
          <h3>{t("servicesIntro.Freight Coordination")}</h3>
          <p>{t("servicesIntro.Simplify your logistics by letting me manage freight timelines and port communication.")}</p>
          <FaShippingFast className="service-intro-icon" />
        </motion.div>

        <motion.div className="service-intro-card" variants={cardItem}>
          <h3>{t("servicesIntro.Brokerage Consultancy")}</h3>
          <p>{t("servicesIntro.Get expert advice on tariff classifications, duties, and optimizing your import process.")}</p>
          <FaUserTie className="service-intro-icon" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
