import { useState } from "react";
import Toast from "../components/Toast"; // Adjust the path if needed

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState(null);

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
        setFirstName('');
        setLastName('');
        setContact('');
        setEmail('');
        setMessage('');
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
      <section className="contact-container">
        {/* LEFT SIDE */}
        <div className="contact-left">
          <div className="contact-header">
            <h2>Let’s Talk</h2>
            <p>
              Reach out with your inquiry. Whether it's a simple question or a complex logistics challenge — I’m here to help.
            </p>
          </div>

          <div className="map-container">
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
          </div>
        </div>

        {/* RIGHT SIDE */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label htmlFor="firstName">First Name <span className="error">*</span></label>
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
              <label htmlFor="lastName">Last Name <span className="error">*</span></label>
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
              <label htmlFor="contact">Contact No. <span className="error">*</span></label>
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
              <label htmlFor="email">Email <span className="error">*</span></label>
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
            <label htmlFor="message">Message <span className="error">*</span></label>
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

          <button type="submit" className="send-inquiry-btn">Send Inquiry</button>
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
