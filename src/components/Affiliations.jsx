import prcLogo from '../assets/prc-logo.webp';
import ccbiLogo from '../assets/ccbi-logo.webp';
import { useTranslation } from 'react-i18next';

export default function Affiliations() {
const { t } = useTranslation();
  return (
    <section id="affiliations">
      <p>{t('Affil.I am affiliated with')}</p>
      <div className="affiliation-logos">
        <div className="affiliation-item">
          <img src={prcLogo} alt="Professional Regulation Commission (PRC) logo" width="80" height="80" />
          <div className="abbr">PRC</div>
        </div>
        <div className="affiliation-item">
          <img src={ccbiLogo} alt="Chamber of Customs Brokers, Inc. (CCBI) logo" width="80" height="80" />
          <div className="abbr">CCBI</div>
        </div>
      </div>
    </section>
  );
}
