import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

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

  // Scroll to top once when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!ready) return null;

  const services = [
    {
      title: t("servicesPage.Automated Customs Declarations"),
      description: t("servicesPage.Seamlessly generate and submit compliant customs declarations using smart form inputs and pre-filled data pipelines."),
      icon: "📄",
    },
    {
      title: t("servicesPage.Tariff & Duty Optimization"),
      description: t("servicesPage.Minimize costs with AI-assisted HS code classification and duty recovery strategies tailored for your goods."),
      icon: "📊",
    },
    {
      title: t("servicesPage.Real-Time Shipment Monitoring"),
      description: t("servicesPage.Stay in control with live shipment tracking and predictive alerts integrated directly with customs milestones."),
      icon: "📦",
    },
    {
      title: t("servicesPage.Compliance Risk Audits"),
      description: t("servicesPage.Run fast, automated audits of your shipping records to identify red flags before customs does."),
      icon: "🛡️",
    },
    {
      title: t("servicesPage.Importer Self-Assessment Support"),
      description: t("servicesPage.Streamline your ISA process with templates, dashboards, and expert guidance built-in."),
      icon: "📝",
    },
    {
      title: t("servicesPage.Brokerage-as-a-Service (BaaS)"),
      description: t("servicesPage.Plug-and-play customs brokerage for startups and SMEs needing rapid, compliant scale."),
      icon: "⚙️",
    },
  ];

  return (
    <section className="services-page">
      <div className="services-container">
        <motion.header
          className="services-header"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>{t("servicesPage.Services Built for the Future")}</h2>
          
          <p>
            {t("servicesPage.Modern customs solutions designed to automate workflows, reduce costs, and ensure compliance—so you can focus on growing your business.")}
          </p>
        </motion.header>

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
