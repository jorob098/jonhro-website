import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function GetToKnow() {
  const { t } = useTranslation();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        // REVERSED ORDER (bottom to top)
        staggerDirection: -1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
      },
    },
  };

  return (
    <motion.section
      className="intro-section section-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
    >
      <div className="intro-content">
        <div className="intro-left">
          {/* 🟩 Headline (last to animate, top of layout) */}
          <motion.h2 variants={item}>
            {t("get-to-know.Get to Know Me")}
          </motion.h2>

          {/* 🟨 Paragraph (middle in layout and animation) */}
          <motion.p className="tagline" variants={item}>
            {t("get-to-know.Your Trusted Licensed Customs Broker")}
          </motion.p>

          {/* 🟥 CTA Button (first to animate, bottom of layout) */}
          <motion.div variants={item}>
            <Link to="/about" className="about-btn">
              {t("get-to-know.About Me")}
            </Link>
          </motion.div>
        </div>

        <div className="intro-right">
          <p>
            {t("get-to-know.When you choose me as your freelance customs broker, you get more than clearance —")}
            {t("get-to-know.you gain speed, reliability, and peace of mind. I specialize in hassle-free documentation,")}
            {t("get-to-know.proactive coordination, and full compliance to help you avoid costly delays.")}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
