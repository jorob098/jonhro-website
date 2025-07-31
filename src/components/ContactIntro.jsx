import { useTranslation } from "react-i18next"
import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactIntro() {
  // State for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { t } = useTranslation();
  

  // State for feedback messages
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('contact', contact);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('formType', 'contactIntro');

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
        setSuccess(true);
        setError('');
        setFirstName('');
        setLastName('');
        setContact('');
        setEmail('');
        setMessage('');
      } else {
        setSuccess(false);
        setError(result.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setSuccess(false);
      setError('Network error. Please try again.');
    }
  };

  return (
    <section className="contact-intro-section">
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
                  placeholder="First Name"
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
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div>
                <label htmlFor="contact">
                  {t("contactIntro.Contact No.")} <span className="error">*</span>
                </label>
                <input
                  id="contact"
                  name="contact"
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
                placeholder="Type your message..."
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="send-inquiry-btn">{t("contactIntro.Send Inquiry")}</button>

            {success && <p className="success-message">✅ Message sent successfully!</p>}
            {error && <p className="error">{error}</p>}
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
</motion.div>
        </div>
    </section>
  );
}
