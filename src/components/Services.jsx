import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const cardGradients = [
  "linear-gradient(135deg, #ff6b00, #ff944d)",
  "linear-gradient(135deg, #292929, #1f1f1f)",
  "linear-gradient(135deg, #333333, #666666)",
  "linear-gradient(135deg, #1a1a1a, #000000)",
  "linear-gradient(135deg, #444, #222)",
  "linear-gradient(135deg, #111111, #333333)",
];

const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Services = () => {
  const { t, ready } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!ready) return null;

  const services = [
    {
      title: t("servicesPage.Customs Clearance - Import & Export"),
      description: t("servicesPage.Efficient processing of both air and sea shipments to ensure smooth and timely cargo release."),
      icon: "📄",
    },
    {
      title: t("servicesPage.Customs Brokerage & Tariff Consultation"),
      description: t("servicesPage.Professional customs brokerage services with guidance on tariff classification and duty calculations."),
      icon: "📊",
    },
    {
      title: t("servicesPage.Freight Consultation"),
      description: t("servicesPage.With trusted freight forwarder partners, I can help arrange your freight requirements with ease."),
      icon: "🚢",
    },
    {
      title: t("servicesPage.Real-Time Shipment Monitoring"),
      description: t("servicesPage.Stay updated on your shipment’s progress with real-time monitoring and proactive updates."),
      icon: "📦",
    },
    {
      title: t("servicesPage.Customs Entry Filing & Records"),
      description: t("servicesPage.Accurate filing of customs entries for future reference and audits to ensure compliance."),
      icon: "📝",
    },
    {
      title: t("servicesPage.Cross Docking Arrangements"),
      description: t("servicesPage.Seamless coordination for cross docking services to support efficient cargo distribution."),
      icon: "🏭",
    },
  ];

  return (
    <section className="services-page">
      <div className="services-container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>{t("servicesPage.End to End Customs Services from Cebu to Key Ports Nationwide")}</h2>
          <p>{t("servicesPage.I provide end-to-end customs services based in Cebu, with extended support in key ports including Manila, Cagayan, Davao, Iloilo, and Subic—ensuring smooth customs clearance and reliable trade facilitation nationwide.")}</p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="service-card"
              style={{ background: cardGradients[idx] }}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-icon">{service.icon}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
