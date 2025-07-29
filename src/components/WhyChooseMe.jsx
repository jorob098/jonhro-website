import whyImg from '../assets/services-photo.jpg'; // or use external image
import { useTranslation } from 'react-i18next';

export default function WhyChooseMe() {
const { t } = useTranslation();
  return (
    <section className="why-choose-section section-container">
      <div className="why-grid">
        {/* LEFT: IMAGE + TEXT OVERLAY */}
        <div className="why-image-container">
          <img src={whyImg} alt="Why Choose Me" className="why-bg-img" />
          <div className="why-text-overlay">
            <h2>{t("why-choose.Why Choose Me")}</h2>
            <p>{t("why-choose.10+ Years as Licensed Customs Broker")}</p>
          </div>
        </div>

        {/* RIGHT: 4 CARDS */}
        <div className="why-cards-grid">
          <div className="why-card card-orange">
            <h3>{t("why-choose.Proven Expertise")}</h3>
            <p>{t("why-choose.Licensed and seasoned in BOC processes, I guide your imports with confidence.")}</p>
          </div>
          <div className="why-card card-dark">
            <h3>{t("why-choose.Responsive & Reliable")}</h3>
            <p>{t("why-choose.Quick turnarounds, clear updates — always available when you need answers.")}</p>
          </div>
          <div className="why-card card-light">
            <h3>{t("why-choose.Tailored Approach")}</h3>
            <p>{t("why-choose.Solutions matched to your business goals, not a one-size-fits-all service.")}</p>
          </div>
          <div className="why-card card-accent">
            <h3>{t("why-choose.Client-First Focus")}</h3>
            <p>{t("why-choose.I value your time, compliance, and business success as if it were my own.")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
