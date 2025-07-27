import { Link } from 'react-router-dom';
export default function Hero() {
  return (
    <section id="hero">
      <h1>Clear Customs, Clear Mind</h1>
      <p>Your trusted Licensed Customs Broker in Cebu for hassle-free importing & exporting.</p>
      <Link to="/rfq" className="cta-button">Get Started</Link>
    </section>
    
  );
  
}
