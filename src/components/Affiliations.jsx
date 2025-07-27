import prcLogo from '../assets/prc-logo.png';
import ccbiLogo from '../assets/ccbi-logo.png';
export default function Affiliations() {
  return (
    <section id="affiliations">
      <p>I am affiliated with</p>
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
