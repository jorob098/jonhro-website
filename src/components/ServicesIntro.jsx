import { FaRegFileAlt, FaBalanceScale, FaShippingFast, FaUserTie } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function ServicesIntro() {
const { t } = useTranslation();
const navigate = useNavigate();

  const handleViewServices = () => {
    navigate("/services");
}
  return (
    <section className="services-intro-section section-container">
      <div className="services-intro-header">
        <h5 className="services-intro-title">{t("servicesIntro.Services")}</h5>
      </div>

      <div className="services-intro-heading-row">
        <h2 className="services-intro-heading">
          {t("servicesIntro.Freight, Clearance & Compliance")}<br />
          <span className="services-intro-subheading">{t("servicesIntro.Seamlessly Delivered")}</span>
        </h2>
        <button
        className="view-services-intro-btn"
        onClick={handleViewServices}
      >
        {t("servicesIntro.View Services")}
      </button>
      </div>

      <p className="services-intro-summary">
        {t("servicesIntro.Get reliable and timely customs brokerage and logistics support that adapts to your business needs.")}
        {t("servicesIntro.Whether it's one-time shipment or long-term assistance, you're covered with expert service.")}
      </p>

      <div className="services-intro-cards">
        <div className="service-intro-card">
          <h3>{t("servicesIntro.Import Documentation")}</h3>
          <p>{t("servicesIntro.Ensure every shipment meets all regulatory requirements, right from the start.")}</p>
          <FaRegFileAlt className="service-intro-icon" />
        </div>

        <div className="service-intro-card">
          <h3>{t("servicesIntro.Customs Compliance")}</h3>
          <p>{t("servicesIntro.Stay audit-ready and penalty-free with my in-depth knowledge of BOC regulations.")}</p>
          <FaBalanceScale className="service-intro-icon" />
        </div>

        <div className="service-intro-card">
          <h3>{t("servicesIntro.Freight Coordination")}</h3>
          <p>{t("servicesIntro.Simplify your logistics by letting me manage freight timelines and port communication.")}</p>
          <FaShippingFast className="service-intro-icon" />
        </div>

        <div className="service-intro-card">
          <h3>{t("servicesIntro.Brokerage Consultancy")}</h3>
          <p>{t("servicesIntro.Get expert advice on tariff classifications, duties, and optimizing your import process.")}</p>
          <FaUserTie className="service-intro-icon" />
        </div>
      </div>
    </section>
  );
}
