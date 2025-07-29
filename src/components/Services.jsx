
import { useTranslation } from 'react-i18next';

const cardGradients = [
  "linear-gradient(135deg, #ff6b00, #ff944d)",
  "linear-gradient(135deg, #292929, #1f1f1f)",
  "linear-gradient(135deg, #333333, #666666)",
  "linear-gradient(135deg, #1a1a1a, #000000)",
  "linear-gradient(135deg, #444, #222)",
  "linear-gradient(135deg, #111111, #333333)",
];

const Services = () => {
const { t } = useTranslation();


const services = [
  {
    title: t("servicesPage.Automated Customs Declarations"),
    description:
      t("servicesPage.Seamlessly generate and submit compliant customs declarations using smart form inputs and pre-filled data pipelines."),
    icon: "📄",
  },
  {
    title: t("servicesPage.Tariff & Duty Optimization"),
    description:
      t("servicesPage.Minimize costs with AI-assisted HS code classification and duty recovery strategies tailored for your goods."),
    icon: "📊",
  },
  {
    title: t("servicesPage.Real-Time Shipment Monitoring"),
    description:
      t("servicesPage.Stay in control with live shipment tracking and predictive alerts integrated directly with customs milestones."),
    icon: "📦",
  },
  {
    title: t("servicesPage.Compliance Risk Audits"),
    description:
      t("servicesPage.Run fast, automated audits of your shipping records to identify red flags before customs does."),
    icon: "🛡️",
  },
  {
    title: t("servicesPage.Importer Self-Assessment Support"),
    description:
      t("servicesPage.Streamline your ISA process with templates, dashboards, and expert guidance built-in."),
    icon: "📝",
  },
  {
    title: t("servicesPage.Brokerage-as-a-Service (BaaS)"),
    description:
      t("servicesPage.Plug-and-play customs brokerage for startups and SMEs needing rapid, compliant scale."),
    icon: "⚙️",
  },
];

  return (
    <section className="services-page">
      <div className="services-container">
        <header className="services-header">
          <h2>{t("servicesPage.Services Built for the Future")}</h2>
          <p>
            {t("servicesPage.Modern customs solutions designed to automate workflows, reduce costs, and ensure compliance—so you can focus on growing your business.")}
          </p>
        </header>

        <div className="services-grid">
          {services.map((service, idx) => (
            <div className="service-card" key={idx} style={{ background: cardGradients[idx] }}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-icon">{service.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
