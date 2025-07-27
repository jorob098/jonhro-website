const cardGradients = [
  "linear-gradient(135deg, #ff6b00, #ff944d)",
  "linear-gradient(135deg, #292929, #1f1f1f)",
  "linear-gradient(135deg, #333333, #666666)",
  "linear-gradient(135deg, #1a1a1a, #000000)",
  "linear-gradient(135deg, #444, #222)",
  "linear-gradient(135deg, #111111, #333333)",
];

const services = [
  {
    title: "Automated Customs Declarations",
    description:
      "Seamlessly generate and submit compliant customs declarations using smart form inputs and pre-filled data pipelines.",
    icon: "📄",
  },
  {
    title: "Tariff & Duty Optimization",
    description:
      "Minimize costs with AI-assisted HS code classification and duty recovery strategies tailored for your goods.",
    icon: "📊",
  },
  {
    title: "Real-Time Shipment Monitoring",
    description:
      "Stay in control with live shipment tracking and predictive alerts integrated directly with customs milestones.",
    icon: "📦",
  },
  {
    title: "Compliance Risk Audits",
    description:
      "Run fast, automated audits of your shipping records to identify red flags before customs does.",
    icon: "🛡️",
  },
  {
    title: "Importer Self-Assessment Support",
    description:
      "Streamline your ISA process with templates, dashboards, and expert guidance built-in.",
    icon: "📝",
  },
  {
    title: "Brokerage-as-a-Service (BaaS)",
    description:
      "Plug-and-play customs brokerage for startups and SMEs needing rapid, compliant scale.",
    icon: "⚙️",
  },
];

const Services = () => {
  return (
    <section className="services-page">
      <div className="services-container">
        <header className="services-header">
          <h2>Services Built for the Future</h2>
          <p>
            Modern customs solutions designed to automate workflows, reduce costs, and ensure compliance—so you can focus on growing your business.
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
