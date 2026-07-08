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

    <div className="hero-content">

        <div className="hero-left">

            <motion.h1 variants={container}>
                {waveWords.map((word, i) => (
                    <motion.span
                        key={i}
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

    <div className="feature-card">
        <div className="feature-icon">📦</div>

        <h3>Air • Sea • Land</h3>

        <p>Freight Solutions</p>
    </div>

    <div className="feature-card">
        <div className="feature-icon">🌍</div>

        <h3>Global</h3>

        <p>Logistics Network</p>
    </div>

    <div className="feature-card">
        <div className="feature-icon">🛃</div>

        <h3>Licensed</h3>

        <p>Customs Broker</p>
    </div>

    </motion.div>

        </div>

        <div className="hero-right">

            <div className="hero-glass">

                {/* Globe illustration goes here later */}

            </div>

        </div>

    </div>

</motion.section>
  );
}
