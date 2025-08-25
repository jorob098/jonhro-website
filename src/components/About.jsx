import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("aboutPage.aboutPageHeader")}
        </motion.h2>

        {[1, 2, 3].map((i, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
          >
            {t(`aboutPage.${[
              "Since passing the PRC Customs Broker Licensure Examination in 2011, I’ve dedicated over a decade to helping businesses in Cebu and beyond navigate the complexities of import and export. As a freelance customs broker, I provide not just compliance—but clarity, speed, and strategic value in every transaction.",
              "Whether you’re a small business exploring international markets or a growing enterprise managing complex shipments, I tailor solutions that prioritize efficiency, transparency, and results. My services go beyond processing documents—I become your partner in achieving smooth and cost-effective customs clearance.",
              "ifYoureLooking",
            ][index]}`)}
          </motion.p>
        ))}

        <motion.a
          href="#contact"
          className="cta-button"
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {t("aboutPage.Work With Me")}
        </motion.a>
      </div>
    </section>
  );
}
