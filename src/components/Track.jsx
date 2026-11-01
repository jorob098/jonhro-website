import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2, Search, Phone, MessageCircle } from 'lucide-react';
import Seo from './Seo';
import './Track.css';

// Web app URL of scripts/track-lookup.gs. It returns one shipment at a time,
// so the Google Sheet stays private. See scripts/TRACKER-SETUP.md.
const LOOKUP_URL =
  'https://script.google.com/macros/s/AKfycbwu7yKdp_ay3LCzSIvvfbMpVcHg6al8-rrezTDkV9EMluJbBHF1PV371I4JbjqbUQQ/exec';

const STAGES = ['Booked', 'Customs Processing', 'Released', 'In Transit', 'Delivered'];

const STAGE_ICONS = {
  Booked: <><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 14l2 2 4-4" /></>,
  'Customs Processing': <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  Released: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 7.5-2" /></>,
  'In Transit': <><path d="M3 7h11v9H3z" /><path d="M14 10h4l3 3v3h-7z" /><circle cx="7.5" cy="18" r="1.8" /><circle cx="17.5" cy="18" r="1.8" /></>,
  Delivered: <><path d="M21 8l-9-5-9 5v8l9 5 9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /></>,
};

const DETAIL_FIELDS = ['current_location', 'last_update', 'origin', 'destination', 'eta', 'description'];

const normTn = (s) => s.trim().toUpperCase().replace(/\s+/g, '');

// Returns { shipment } or { error: "not_found" | "pin_required" | "wrong_pin" | "too_many_attempts" }
async function lookup(tn, pin) {
  const params = new URLSearchParams({ tn });
  if (pin) params.set('pin', pin);
  const res = await fetch(`${LOOKUP_URL}?${params}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Lookup failed');
  const data = await res.json();
  return data.ok ? { shipment: data.shipment } : { error: data.error || 'not_found' };
}

export default function Track() {
  const { t } = useTranslation();
  const k = (key) => t(`track.${key}`);
  const [searchParams, setSearchParams] = useSearchParams();

  const [tn, setTn] = useState(searchParams.get('tn') || '');
  const [pin, setPin] = useState('');
  const [needPin, setNeedPin] = useState(false);
  const [state, setState] = useState({ status: 'idle' });

  async function search(rawTn = tn, rawPin = pin) {
    const number = normTn(rawTn);
    if (!number) {
      setState({ status: 'message', tone: 'error', key: 'enterNumber' });
      return;
    }
    setState({ status: 'searching' });
    try {
      const { shipment, error } = await lookup(number, rawPin.trim());
      if (shipment) {
        setState({ status: 'found', shipment });
        setSearchParams({ tn: number }, { replace: true });
      } else if (error === 'pin_required' || error === 'wrong_pin') {
        setNeedPin(true);
        setState({ status: 'message', tone: 'info', key: error === 'wrong_pin' ? 'wrongPin' : 'pinRequired' });
        setTimeout(() => document.getElementById('track-pin')?.focus(), 0);
      } else if (error === 'too_many_attempts') {
        setState({ status: 'message', tone: 'error', key: 'tooMany' });
      } else {
        setState({ status: 'message', tone: 'error', key: 'notFound', contact: true });
      }
    } catch {
      setState({ status: 'message', tone: 'error', key: 'loadError' });
    }
  }

  // Open a shared link like /track?tn=JR101-ABCD and search right away
  useEffect(() => {
    const preset = searchParams.get('tn');
    if (preset) search(preset, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    search();
  };

  const shipment = state.status === 'found' ? state.shipment : null;
  const status = shipment?.status || '';
  const stageIndex = STAGES.findIndex((s) => s.toLowerCase() === status.toLowerCase());
  const isFinal = stageIndex === STAGES.length - 1;
  const stageLabel = (s) => (STAGES.includes(s) ? k(s) : s);

  return (
    <>
      <Seo path="/track" />
      <main className="trk-wrap">
        <section className="trk-inner">
          <div className="trk-head">
            <span className="trk-eyebrow">{k('eyebrow')}</span>
            <h1>{k('title')}</h1>
            <p>{k('intro')}</p>
          </div>

          <div className="trk-card">
            <form className="trk-form" onSubmit={onSubmit} noValidate>
              <div className="trk-field">
                <label htmlFor="track-tn">{k('number')}</label>
                <input
                  id="track-tn"
                  type="text"
                  value={tn}
                  onChange={(e) => setTn(e.target.value)}
                  placeholder={k('placeholder')}
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck="false"
                  maxLength={40}
                />
              </div>
              {needPin && (
                <div className="trk-field trk-pin">
                  <label htmlFor="track-pin">{k('pin')}</label>
                  <input
                    id="track-pin"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder={k('pinPlaceholder')}
                    maxLength={20}
                  />
                </div>
              )}
              <button type="submit" className="trk-btn" disabled={state.status === 'searching'}>
                {state.status === 'searching'
                  ? <Loader2 size={18} className="trk-spin" aria-hidden="true" />
                  : <Search size={18} aria-hidden="true" />}
                {state.status === 'searching' ? k('searching') : k('track')}
              </button>
            </form>

            <div aria-live="polite">
              {state.status === 'message' && (
                <p className={`trk-msg ${state.tone}`} role={state.tone === 'error' ? 'alert' : undefined}>
                  {k(state.key)}
                  {state.contact && <> <Link to="/contact">{k('contactMe')}</Link>.</>}
                </p>
              )}

              {shipment && (
                <div className="trk-result">
                  <div className="trk-result-head">
                    <div>
                      <span className="trk-label">{k('number')}</span>
                      <strong className="trk-tn">{shipment.tracking_number}</strong>
                    </div>
                    <span className={`trk-badge${isFinal ? ' delivered' : ''}`}>
                      {status ? stageLabel(STAGES[stageIndex] || status) : k('statusUnknown')}
                    </span>
                  </div>

                  {stageIndex >= 0 && (
                    <ol className="trk-steps">
                      {STAGES.map((name, i) => (
                        <li
                          key={name}
                          className={`trk-step${i < stageIndex ? ' done' : ''}${i === stageIndex ? ' current' : ''}${i === stageIndex && isFinal ? ' final' : ''}`}
                          aria-current={i === stageIndex ? 'step' : undefined}
                        >
                          <span className="trk-dot">
                            <svg viewBox="0 0 24 24" aria-hidden="true">{STAGE_ICONS[name]}</svg>
                          </span>
                          <span className="trk-step-label">{k(name)}</span>
                        </li>
                      ))}
                    </ol>
                  )}

                  <dl className="trk-details">
                    {DETAIL_FIELDS.filter((f) => shipment[f]).map((f) => (
                      <div key={f} className="trk-detail">
                        <dt>{k(f)}</dt>
                        <dd>{shipment[f]}</dd>
                      </div>
                    ))}
                    {shipment.notes && (
                      <div className="trk-detail full note">
                        <dt>{k('notes')}</dt>
                        <dd>{shipment.notes}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>
          </div>

          <div className="trk-help">
            <strong>{k('help')}</strong>
            <a href="tel:+639563625507"><Phone size={16} aria-hidden="true" /> 0956 362 5507</a>
            <Link to="/contact"><MessageCircle size={16} aria-hidden="true" /> {k('contactMe')}</Link>
          </div>
        </section>
      </main>
    </>
  );
}
