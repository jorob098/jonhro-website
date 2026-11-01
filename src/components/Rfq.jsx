import { useRef, useState } from "react";
import Toast from "../components/Toast"; // Ensure Toast.jsx exists
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from 'react-i18next';
import Seo from './Seo';
import PrivacyNote from './PrivacyNote';
import Honeypot from './Honeypot';
import { submitForm } from '../services/submitForm';

export default function Rfq() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [details, setDetails] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [toast, setToast] = useState(null);
  const { t } = useTranslation();

  const [website, setWebsite] = useState('');
  const [sending, setSending] = useState(false);
  const recaptchaRef = useRef(null);

  const resetRecaptcha = () => {
    recaptchaRef.current?.reset();
    setRecaptchaToken('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    if (!recaptchaToken) {
      setToast({ message: t("form.verifyHuman"), type: "error" });
      return;
    }

    setSending(true);
    try {
      const result = await submitForm({
        fullName, email, company, details, recaptchaToken, website,
        formType: 'rfq',
      });

      if (result.success) {
        setToast({ message: t("form.rfqSent"), type: "success" });
        setFullName('');
        setEmail('');
        setCompany('');
        setDetails('');
      } else {
        setToast({ message: result.error || t("form.error"), type: "error" });
      }
    } catch (err) {
      console.error("RFQ Error:", err);
      setToast({ message: t("form.networkError"), type: "error" });
    } finally {
      // A reCAPTCHA token can only be used once, so always reset it.
      resetRecaptcha();
      setSending(false);
    }
  };

  return (
    <>
      <Seo path="/rfq" />
  <main className="rfq-page">
    <section className="rfq-container">
      <div className="rfq-header">
        <h1>{t("rfq.Request for Quotation")}</h1>
        <p>
          {t("rfq.Need a quote for your import/export needs? Submit the form and I’ll get back to you with a custom brokerage solution tailored for your shipment.")}
        </p>
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
          {t("rfq.From customs clearance to logistics — let’s make your cargo move.")}
        </p>
      </div>

      <form className="rfq-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">{t("rfq.Full Name")} <span className="error">*</span></label>
          <input
            id="fullName"
            name="fullName"
            placeholder={t("form.Your Name")}
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">{t("rfq.Email Address")} <span className="error">*</span></label>
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
          <label htmlFor="company">{t("rfq.Company Name")}</label>
          <input
            id="company"
            name="company"
            placeholder={t("form.Optional")}
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="details">{t("rfq.Cargo & Shipment Details")} <span className="error">*</span></label>
          <textarea
            id="details"
            name="details"
            placeholder={t("form.detailsPlaceholder")}
            rows="6"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>
        </div>

        <Honeypot value={website} onChange={(e) => setWebsite(e.target.value)} />

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={(token) => setRecaptchaToken(token || '')}
          onExpired={() => setRecaptchaToken('')}
          theme="dark"
        />

        <PrivacyNote />

        <button type="submit" className="send-inquiry-btn" disabled={sending}>
          📩 {sending ? t("form.Sending...") : t("rfq.Request Quote")}
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
  </>
);
}
