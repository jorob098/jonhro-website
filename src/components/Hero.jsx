import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Hero() {
  const { t } = useTranslation();

  const waveWords = t("hero.Clear Customs, Clear Mind").split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
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
      initial="hidden"
      animate="visible"
      variants={container}
    >
      <motion.h1 className="text-4xl font-bold" variants={container}>
        {waveWords.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariant}
            style={{ display: "inline-block", marginRight: "0.5ch" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        className="mt-4 text-lg"
        variants={wordVariant}
      >
        {t("hero.Your trusted Licensed Customs Broker in Cebu for hassle-free importing & exporting.")}
      </motion.p>

      <motion.div
        className="mt-6"
        variants={wordVariant}
      >
        <Link to="/rfq" className="cta-button">
          {t("hero.Get Started")}
        </Link>
      </motion.div>
    </motion.section>
  );
}
