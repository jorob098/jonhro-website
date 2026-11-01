import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import { Loader2, CheckCircle2, Send, AlertCircle, Phone, ClipboardCheck } from 'lucide-react';
import Seo from './Seo';
import Honeypot from './Honeypot';
import { submitForm } from '../services/submitForm';
import {
  RFQ_OPTIONS, RFQ_LIMITS, EMPTY_RFQ, FIELD_ORDER, validateRfq, rfqSummary,
} from '../content/rfq';
import './Rfq.css';

function Field({ id, label, required, optional, error, hint, wide, children }) {
  return (
    <div className={`rfq-field${wide ? ' wide' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="rfq-req" aria-hidden="true"> *</span>}
        {optional && <span className="rfq-opt"> ({optional})</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="rfq-hint">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="rfq-error">{error}</p>}
    </div>
  );
}

export default function Rfq() {
  const { t } = useTranslation();
  const r = (key) => t(`rfq2.${key}`);

  const [values, setValues] = useState(EMPTY_RFQ);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle' });
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const recaptchaRef = useRef(null);

  const set = (name) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const toggleDoc = (doc) => (e) => {
    setValues((v) => ({
      ...v,
      documents: e.target.checked ? [...v.documents, doc] : v.documents.filter((x) => x !== doc),
    }));
  };

  // Shared input props: name, error state and accessibility links
  const a11y = (id, hasHint = false) => ({
    id,
    name: id,
    'aria-invalid': errors[id] ? 'true' : undefined,
    'aria-describedby': errors[id] ? `${id}-error` : hasHint ? `${id}-hint` : undefined,
    className: `rfq-input${errors[id] ? ' invalid' : ''}`,
  });

  const errorText = (id) => (errors[id] ? r(errors[id]) : undefined);

  const resetRecaptcha = () => {
    recaptchaRef.current?.reset();
    setRecaptchaToken('');
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (status.state === 'submitting') return;

    const found = validateRfq(values);
    setErrors(found);
    const firstBad = FIELD_ORDER.find((k) => found[k]);
    if (firstBad) {
      setStatus({ state: 'error', message: r('errFix') });
      document.getElementById(firstBad)?.focus();
      return;
    }
    if (!recaptchaToken) {
      setStatus({ state: 'error', message: t('form.verifyHuman') });
      return;
    }

    setStatus({ state: 'submitting' });
    try {
      const result = await submitForm({
        formType: 'rfq',
        recaptchaToken,
        website: values.website,
        // Fields the existing script already reads
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
        details: rfqSummary(values),
        // New fields, sent separately too
        phone: values.phone.trim(),
        service: values.service,
        shipmentType: values.shipmentType,
        port: values.port,
        cargoType: values.cargoType,
        cargoDescription: values.cargoDescription.trim(),
        shipDate: values.shipDate,
        documents: values.documents.join(', '),
        notes: values.notes.trim(),
      });
      if (result.success) {
        setStatus({ state: 'success' });
        setValues(EMPTY_RFQ);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setStatus({ state: 'error', message: result.error || t('form.error') });
      }
    } catch (err) {
      console.error('RFQ Error:', err);
      setStatus({ state: 'error', message: t('form.networkError') });
    } finally {
      // A reCAPTCHA token can only be used once
      resetRecaptcha();
    }
  }

  const submitting = status.state === 'submitting';

  return (
    <>
      <Seo path="/rfq" />
      <main className="rfq-wrap">
        <section className="rfq-layout">
          {/* ---------- Intro ---------- */}
          <aside className="rfq-intro">
            <span className="rfq-eyebrow">{r('eyebrow')}</span>
            <h1>{t('rfq.Request for Quotation')}</h1>
            <p>{r('intro')}</p>

            <div className="rfq-next">
              <h2>{r('nextTitle')}</h2>
              <ol>
                <li>{r('next1')}</li>
                <li>{r('next2')}</li>
                <li>{r('next3')}</li>
              </ol>
            </div>

            <div className="rfq-faster">
              <Phone size={20} aria-hidden="true" />
              <div>
                <strong>{r('faster')}</strong>
                <span>{r('fasterText')}</span>
                <a href="tel:+639563625507">0956 362 5507</a>
              </div>
            </div>
          </aside>

          {/* ---------- Form / success ---------- */}
          {status.state === 'success' ? (
            <div className="rfq-card rfq-success" role="status">
              <span className="rfq-success-icon"><CheckCircle2 size={28} aria-hidden="true" /></span>
              <h2>{r('successTitle')}</h2>
              <p>{r('successText')}</p>
              <p className="rfq-success-faster">
                {r('faster')} {r('fasterText')} <a href="tel:+639563625507">0956 362 5507</a>
              </p>
              <div className="rfq-success-actions">
                <button type="button" className="rfq-btn-secondary" onClick={() => setStatus({ state: 'idle' })}>
                  {r('another')}
                </button>
                <Link to="/" className="rfq-btn-secondary">{r('backHome')}</Link>
              </div>
            </div>
          ) : (
            <form className="rfq-card" onSubmit={onSubmit} noValidate>
              <Honeypot value={values.website} onChange={set('website')} />

              <fieldset>
                <legend>{r('yourDetails')}</legend>
                <div className="rfq-grid">
                  <Field id="fullName" label={r('fullName')} required error={errorText('fullName')}>
                    <input {...a11y('fullName')} type="text" autoComplete="name"
                      maxLength={RFQ_LIMITS.fullName} value={values.fullName} onChange={set('fullName')} />
                  </Field>
                  <Field id="company" label={r('company')} optional={r('optional')}>
                    <input {...a11y('company')} type="text" autoComplete="organization"
                      maxLength={RFQ_LIMITS.company} value={values.company} onChange={set('company')} />
                  </Field>
                  <Field id="email" label={r('email')} required error={errorText('email')}>
                    <input {...a11y('email')} type="email" autoComplete="email" inputMode="email"
                      maxLength={RFQ_LIMITS.email} value={values.email} onChange={set('email')} />
                  </Field>
                  <Field id="phone" label={r('phone')} required error={errorText('phone')} hint={r('phoneHint')}>
                    <input {...a11y('phone', true)} type="tel" autoComplete="tel" inputMode="tel"
                      maxLength={RFQ_LIMITS.phone} value={values.phone} onChange={set('phone')} />
                  </Field>
                </div>
              </fieldset>

              <fieldset>
                <legend>{r('yourShipment')}</legend>
                <div className="rfq-grid">
                  <Field id="service" label={r('service')} required error={errorText('service')}>
                    <select {...a11y('service')} value={values.service} onChange={set('service')}>
                      <option value="">{r('chooseService')}</option>
                      {RFQ_OPTIONS.services.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field id="shipmentType" label={r('shipmentType')} required error={errorText('shipmentType')}>
                    <select {...a11y('shipmentType')} value={values.shipmentType} onChange={set('shipmentType')}>
                      <option value="">{r('chooseOne')}</option>
                      {RFQ_OPTIONS.shipmentTypes.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field id="port" label={r('port')} required error={errorText('port')}>
                    <select {...a11y('port')} value={values.port} onChange={set('port')}>
                      <option value="">{r('choosePort')}</option>
                      {RFQ_OPTIONS.ports.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field id="cargoType" label={r('cargoType')} required error={errorText('cargoType')}>
                    <select {...a11y('cargoType')} value={values.cargoType} onChange={set('cargoType')}>
                      <option value="">{r('chooseCargo')}</option>
                      {RFQ_OPTIONS.cargoTypes.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field id="cargoDescription" label={r('cargoDescription')} required wide
                    error={errorText('cargoDescription')} hint={r('cargoHint')}>
                    <textarea {...a11y('cargoDescription', true)} rows={4}
                      maxLength={RFQ_LIMITS.cargoDescription} value={values.cargoDescription}
                      onChange={set('cargoDescription')} />
                  </Field>
                  <Field id="shipDate" label={r('shipDate')} optional={r('optional')}>
                    <input {...a11y('shipDate')} type="date" value={values.shipDate} onChange={set('shipDate')} />
                  </Field>
                </div>

                <div className="rfq-docs">
                  <p id="docs-label">
                    {r('documents')} <span className="rfq-opt">({r('optional')})</span>
                  </p>
                  <div role="group" aria-labelledby="docs-label" className="rfq-docs-grid">
                    {RFQ_OPTIONS.documents.map((doc) => (
                      <label key={doc} className={values.documents.includes(doc) ? 'checked' : ''}>
                        <input type="checkbox" checked={values.documents.includes(doc)} onChange={toggleDoc(doc)} />
                        {doc}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="rfq-grid">
                  <Field id="notes" label={r('notes')} optional={r('optional')} wide>
                    <textarea {...a11y('notes')} rows={3} maxLength={RFQ_LIMITS.notes}
                      value={values.notes} onChange={set('notes')} />
                  </Field>
                </div>
              </fieldset>

              <div className="rfq-captcha">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(token) => setRecaptchaToken(token || '')}
                  onExpired={() => setRecaptchaToken('')}
                />
              </div>

              {status.state === 'error' && (
                <div role="alert" className="rfq-alert">
                  <AlertCircle size={20} aria-hidden="true" />
                  <p>{status.message}</p>
                </div>
              )}

              <div className="rfq-submit-row">
                <p className="rfq-privacy">
                  <ClipboardCheck size={16} aria-hidden="true" />
                  <span>
                    {t('form.privacyNote')} <Link to="/privacy">{t('footer.privacy')}</Link>.
                  </span>
                </p>
                <button type="submit" className="rfq-btn-primary" disabled={submitting}>
                  {submitting
                    ? <Loader2 size={20} className="rfq-spin" aria-hidden="true" />
                    : <Send size={20} aria-hidden="true" />}
                  {submitting ? t('form.Sending...') : r('send')}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </>
  );
}
