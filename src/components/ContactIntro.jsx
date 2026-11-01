import { useTranslation } from "react-i18next"
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Honeypot from "./Honeypot";
import PrivacyNote from "./PrivacyNote";
import { submitForm } from "../services/submitForm";

export default function ContactIntro() {
  // State for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { t } = useTranslation();
  

  const [website, setWebsite] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    setSuccess(false);
    try {
      const result = await submitForm({
        firstName, lastName, contact, email, message, website,
        formType: 'contactIntro',
      });
      if (result.success) {
        setSuccess(true);
        setFirstName(''); setLastName(''); setContact(''); setEmail(''); setMessage('');
      } else {
        setError(result.error || t("form.error"));
      }
    } catch (err) {
      console.error('Inquiry form error:', err);
      setError(t("form.networkError"));
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact-intro-section">
      <div className="contact-grid">
        <div className="contact-form">
          <h2>{t("contactIntro.Send an Inquiry")}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div>
                <label htmlFor="firstName">
                  {t("contactIntro.First Name")} <span className="error">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  placeholder={t("form.First Name")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">
                  {t("contactIntro.Last Name")} <span className="error">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  placeholder={t("form.Last Name")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div>
                <label htmlFor="contact-phone">
                  {t("contactIntro.Contact No.")} <span className="error">*</span>
                </label>
                <input
                  id="contact-phone"
                  name="contact"
                  type="tel"
                  autoComplete="tel"
                  placeholder="e.g. 09123456789"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">
                  {t("contactIntro.Email")} <span className="error">*</span>
                </label>
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
            </div>

            <div className="message-row">
              <label htmlFor="message">
                {t("contactIntro.Message")} <span className="error">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder={t("form.messagePlaceholder")}
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <Honeypot value={website} onChange={(e) => setWebsite(e.target.value)} />

            <PrivacyNote />

            <button type="submit" className="send-inquiry-btn" disabled={sending}>
              {sending ? t("form.Sending...") : t("contactIntro.Send Inquiry")}
            </button>

            <div aria-live="polite">
              {success && <p className="success-message">✅ {t("form.sent")}</p>}
              {error && <p className="error">{error}</p>}
            </div>
          </form>
        </div>

       <motion.div
  className="contact-copy"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.4 }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      }
    }
  }}
>
  <motion.div
    className="contact-sub"
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }}
  >
    {t("contactIntro.Contact Me")}
  </motion.div>

  <motion.h2
    className="contact-heading"
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }}
  >
    {t("contactIntro.Let’s Bring Your Vision to Life")}
  </motion.h2>

  <motion.p
    className="contact-subheading"
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }}
  >
    {t("contactIntro.Support Message Full")}
  </motion.p>

  <motion.div
    className="contact-call"
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }}
  >
    <span className="contact-call-label">{t("contactIntro.Prefer to talk?")}</span>
    <a href="tel:+639563625507" className="contact-call-link">
      <Phone size={18} aria-hidden="true" />
      <span>
        <small>{t("contactIntro.Call or text")}</small>
        0956 362 5507
      </span>
    </a>
    <span className="contact-call-note">{t("contactIntro.Chat on this page")}</span>
  </motion.div>
</motion.div>
        </div>
    </section>
  );
}
