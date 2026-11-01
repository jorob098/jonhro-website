import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, MessageSquare, Mail, MapPin } from "lucide-react";
import Toast from "../components/Toast";
import { useTranslation } from "react-i18next";
import Seo from './Seo';
import './Contact.css';
import PrivacyNote from './PrivacyNote';
import Honeypot from './Honeypot';
import { submitForm } from '../services/submitForm';


export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState(null);
  const { t } = useTranslation();

  const [website, setWebsite] = useState('');
  const [sending, setSending] = useState(false);

  const methods = [
    { href: "tel:+639563625507", label: t("contact-page.call"), value: "0956 362 5507", hint: t("contact-page.callHint"), Icon: Phone, tone: "call" },
    { href: "viber://chat?number=%2B639563625507", label: "Viber", value: "0956 362 5507", hint: t("contact-page.viberHint"), Icon: MessageCircle, tone: "viber" },
    { href: "https://wa.me/639563625507", label: "WhatsApp", value: "0956 362 5507", hint: t("contact-page.whatsappHint"), Icon: MessageSquare, tone: "whatsapp", external: true },
    { href: "mailto:joroblescb@gmail.com", label: t("contact-page.email"), value: "joroblescb@gmail.com", hint: t("contact-page.emailHint"), Icon: Mail, tone: "email" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const result = await submitForm({
        firstName, lastName, contact, email, message, website,
        formType: 'contactPage',
      });
      if (result.success) {
        setToast({ message: t("form.sent"), type: "success" });
        setFirstName(''); setLastName(''); setContact(''); setEmail(''); setMessage('');
      } else {
        setToast({ message: result.error || t("form.error"), type: "error" });
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setToast({ message: t("form.networkError"), type: "error" });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Seo path="/contact" />
    <main className="ct-page">
      <section className="ct-head">
        <span className="ct-eyebrow">{t("contact-page.eyebrow")}</span>
        <h1>{t("contact-page.Let’s Talk")}</h1>
        <p>{t("contact-page.Reach out with your inquiry. Whether it's a simple question or a complex logistics challenge — I’m here to help.")}</p>
      </section>

      <section className="ct-grid">
        <div className="ct-left">
          <h2>{t("contact-page.directTitle")}</h2>
          <ul className="ct-methods">
            {methods.map(({ href, label, value, hint, Icon, external, tone }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`ct-method ${tone}`}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="ct-method-icon"><Icon size={22} aria-hidden="true" /></span>
                  <span className="ct-method-text">
                    <small>{label}</small>
                    <strong>{value}</strong>
                    <em>{hint}</em>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="ct-location">
            <h3><MapPin size={18} aria-hidden="true" /> {t("contact-page.locationTitle")}</h3>
            <p>{t("contact-page.locationText")}</p>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d502437.36563812924!2d123.49549902788435!3d10.31850663329054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4f2f6935cf3cf485%3A0xac27fa54d3feefbd!2sJonhro%20Robles%2C%20Lcb!5e0!3m2!1sen!2sph!4v1753007268830!5m2!1sen!2sph"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Jonhro Robles Location"
              ></iframe>
            </div>
          </div>
        </div>

        <form className="contact-form ct-form" onSubmit={handleSubmit}>
          <h2>{t("contact-page.formTitle")}</h2>
          <div className="form-row">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <label htmlFor="firstName">{t("contact-page.First Name")} <span className="error">*</span></label>
              <input id="firstName" name="firstName" placeholder={t("form.First Name")} value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <label htmlFor="lastName">{t("contact-page.Last Name")} <span className="error">*</span></label>
              <input id="lastName" name="lastName" placeholder={t("form.Last Name")} value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </motion.div>
          </div>

          <div className="form-row">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <label htmlFor="contact">{t("contact-page.Contact No.")} <span className="error">*</span></label>
              <input id="contact" name="contact" type="tel" autoComplete="tel" placeholder="e.g. 09123456789" value={contact} onChange={(e) => setContact(e.target.value)} required />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <label htmlFor="email">{t("contact-page.Email")} <span className="error">*</span></label>
              <input type="email" id="email" name="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </motion.div>
          </div>

          <motion.div
            className="message-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="message">{t("contact-page.Message")} <span className="error">*</span></label>
            <textarea id="message" name="message" placeholder={t("form.messagePlaceholder")} rows="6" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
          </motion.div>

          <Honeypot value={website} onChange={(e) => setWebsite(e.target.value)} />

          <PrivacyNote />

          <motion.button
            type="submit"
            className="send-inquiry-btn"
            disabled={sending}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {sending ? t("form.Sending...") : t("contact-page.Send Inquiry")}
          </motion.button>
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
