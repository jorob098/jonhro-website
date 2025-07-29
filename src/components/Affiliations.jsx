import prcLogo from '../assets/prc-logo.png';
import ccbiLogo from '../assets/ccbi-logo.png';
import { useTranslation } from 'react-i18next';

export default function Affiliations() {
const { t } = useTranslation();
  return (
    <section id="affiliations">
      <p>{t('Affil.I am affiliated with')}</p>
      <div className="affiliation-logos">
        <div className="affiliation-item">
          <img src={prcLogo} alt="PRC Logo" />
          <div className="abbr">PRC</div>
        </div>
        <div className="affiliation-item">
          <img src={ccbiLogo} alt="CCBI Logo" />
          <div className="abbr">CCBI</div>
        </div>
      </div>
    </section>
  );
}
