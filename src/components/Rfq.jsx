import { useState } from "react";
import Toast from "../components/Toast"; // Ensure Toast.jsx exists
import ReCAPTCHA from "react-google-recaptcha";

export default function Rfq() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [details, setDetails] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setToast({ message: "Please verify you're human 🤖", type: "error" });
      return;
    }

    const formData = new URLSearchParams();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('company', company);
    formData.append('details', details);
    formData.append('recaptchaToken', recaptchaToken);
    formData.append('formType', 'rfqPage');

    try {
      const response = await fetch(import.meta.env.VITE_REACT_APP_GAS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const result = await response.json();

      if (result.success) {
        setToast({ message: "📨 RFQ submitted successfully!", type: "success" });
        setFullName('');
        setEmail('');
        setCompany('');
        setDetails('');
        setRecaptchaToken('');
      } else {
        setToast({ message: result.error || "❌ Something went wrong.", type: "error" });
      }
    } catch (err) {
      console.error("RFQ Error:", err);
      setToast({ message: "⚠️ Network error. Please try again.", type: "error" });
    }
  };

  return (
  <main className="rfq-page">
    <section className="rfq-container">
      <div className="rfq-header">
        <h2>Request for Quotation</h2>
        <p>
          Need a quote for your import/export needs? Submit the form and I’ll get back to you with a custom brokerage solution tailored for your shipment.
        </p>
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
          From customs clearance to logistics — let’s make your cargo move.
        </p>
      </div>

      <form className="rfq-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name <span className="error">*</span></label>
          <input
            id="fullName"
            name="fullName"
            placeholder="Your Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email Address <span className="error">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="company">Company Name</label>
          <input
            id="company"
            name="company"
            placeholder="(Optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="details">Cargo & Shipment Details <span className="error">*</span></label>
          <textarea
            id="details"
            name="details"
            placeholder="Describe your shipment, commodity, volume, etc."
            rows="6"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>
        </div>

        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={token => setRecaptchaToken(token)}
          theme="dark"
        />

        <button type="submit" className="send-inquiry-btn">
          📩 Request Quote
        </button>
      </form>
    </section>

    {toast && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(null)}
      />
    )}
  </main>
);
}
