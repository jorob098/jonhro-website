import { FaRegFileAlt, FaBalanceScale, FaShippingFast, FaUserTie } from 'react-icons/fa';


export default function ServicesIntro() {
  return (
    <section className="services-intro-section section-container">
      <div className="services-intro-header">
        <h5 className="services-intro-title">Services</h5>
      </div>

      <div className="services-intro-heading-row">
        <h2 className="services-intro-heading">
          Freight, Clearance & Compliance<br />
          <span className="services-intro-subheading">Seamlessly Delivered</span>
        </h2>
        <button
          className="view-services-intro-btn"
          onClick={() => window.location.href = "/services"}
        >
          View Services
        </button>
      </div>

      <p className="services-intro-summary">
        Get reliable and timely customs brokerage and logistics support that adapts to your business needs.
        Whether it's one-time shipment or long-term assistance, you're covered with expert service.
      </p>

      <div className="services-intro-cards">
        <div className="service-intro-card">
          <h3>Import Documentation</h3>
          <p>Ensure every shipment meets all regulatory requirements, right from the start.</p>
          <FaRegFileAlt className="service-intro-icon" />
        </div>

        <div className="service-intro-card">
          <h3>Customs Compliance</h3>
          <p>Stay audit-ready and penalty-free with my in-depth knowledge of BOC regulations.</p>
          <FaBalanceScale className="service-intro-icon" />
        </div>

        <div className="service-intro-card">
          <h3>Freight Coordination</h3>
          <p>Simplify your logistics by letting me manage freight timelines and port communication.</p>
          <FaShippingFast className="service-intro-icon" />
        </div>

        <div className="service-intro-card">
          <h3>Brokerage Consultancy</h3>
          <p>Get expert advice on tariff classifications, duties, and optimizing your import process.</p>
          <FaUserTie className="service-intro-icon" />
        </div>
      </div>
    </section>
  );
}
