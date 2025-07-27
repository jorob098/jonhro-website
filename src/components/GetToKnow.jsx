// components/GetToKnow.jsx

export default function GetToKnow() {
  return (
    <section className="intro-section section-container">
      <div className="intro-content">
        <div className="intro-left">
          <h2>Get to Know Me</h2>
          <p className="tagline">Your Trusted Licensed Customs Broker</p>
          <button
            className="about-btn"
            onClick={() => window.location.href = "/about"}
          >
            About Me
          </button>
        </div>
        <div className="intro-right">
          <p>
            When you choose me as your freelance customs broker, you get more than clearance —
            you gain speed, reliability, and peace of mind. I specialize in hassle-free documentation,
            proactive coordination, and full compliance to help you avoid costly delays.
          </p>
        </div>
      </div>
    </section>
  );
}
