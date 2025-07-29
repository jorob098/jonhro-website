import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section id="hero">
      <h1>{t("hero.Clear Customs, Clear Mind")}</h1>
      <p>{t("hero.Your trusted Licensed Customs Broker in Cebu for hassle-free importing & exporting.")}</p>
      <Link to="/rfq" className="cta-button">{t("hero.Get Started")}</Link>
    </section>
    
  );
  
}
