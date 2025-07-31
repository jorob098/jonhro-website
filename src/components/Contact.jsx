import { useState } from "react";
import { motion } from "framer-motion";
import Toast from "../components/Toast";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState(null);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('contact', contact);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('formType', 'contactPage');

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
        setToast({ message: "✅ Message sent successfully!", type: "success" });
        setFirstName(''); setLastName(''); setContact(''); setEmail(''); setMessage('');
      } else {
        setToast({ message: result.error || "❌ Something went wrong.", type: "error" });
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setToast({ message: "⚠️ Network error. Please try again.", type: "error" });
    }
  };

  return (
    <main className="contact-page">
      <motion.section
        className="contact-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {/* LEFT SIDE */}
        <motion.div
          className="contact-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="contact-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>{t("contact-page.Let’s Talk")}</h2>
            <p>{t("contact-page.Reach out with your inquiry. Whether it's a simple question or a complex logistics challenge — I’m here to help.")}</p>
          </motion.div>

          <motion.div
            className="map-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d502437.36563812924!2d123.49549902788435!3d10.31850663329054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4f2f6935cf3cf485%3A0xac27fa54d3feefbd!2sJonhro%20Robles%2C%20Lcb!5e0!3m2!1sen!2sph!4v1753007268830!5m2!1sen!2sph"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jonhro Robles Location"
            ></iframe>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="form-row">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <label htmlFor="firstName">{t("contact-page.First Name")} <span className="error">*</span></label>
              <input id="firstName" name="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <label htmlFor="lastName">{t("contact-page.Last Name")} <span className="error">*</span></label>
              <input id="lastName" name="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </motion.div>
          </div>

          <div className="form-row">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <label htmlFor="contact">{t("contact-page.Contact No.")} <span className="error">*</span></label>
              <input id="contact" name="contact" placeholder="e.g. 09123456789" value={contact} onChange={(e) => setContact(e.target.value)} required />
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
            <textarea id="message" name="message" placeholder="Type your message..." rows="6" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
          </motion.div>

          <motion.button
            type="submit"
            className="send-inquiry-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {t("contact-page.Send Inquiry")}
          </motion.button>
        </motion.form>
      </motion.section>

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
