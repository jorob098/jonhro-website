import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // ✅ Import Link

export default function GetToKnow() {
  const { t } = useTranslation();

  return (
    <section className="intro-section section-container">
      <div className="intro-content">
        <div className="intro-left">
          <h2>{t("get-to-know.Get to Know Me")}</h2>
          <p className="tagline">{t("get-to-know.Your Trusted Licensed Customs Broker")}</p>
          
          {/* ✅ Use Link instead of window.location.href */}
          <Link to="/about" className="about-btn">
            {t("get-to-know.About Me")}
          </Link>
        </div>
        
        <div className="intro-right">
          <p>
            {t("get-to-know.When you choose me as your freelance customs broker, you get more than clearance —")}
            {t("get-to-know.you gain speed, reliability, and peace of mind. I specialize in hassle-free documentation,")}
            {t("get-to-know.proactive coordination, and full compliance to help you avoid costly delays.")}
          </p>
        </div>
      </div>
    </section>
  );
}
