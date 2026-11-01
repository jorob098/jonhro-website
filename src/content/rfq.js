// Options and validation for the Request for Quotation form.

export const RFQ_OPTIONS = {
  services: [
    'Customs clearance – import',
    'Customs clearance – export',
    'Tariff classification / duty estimate',
    'Freight arrangement',
    'Cross docking',
    'Other / not sure',
  ],
  shipmentTypes: ['Import', 'Export'],
  ports: ['Port of Cebu', 'Manila', 'Subic', 'Iloilo', 'Cagayan de Oro', 'Davao', 'Other / not sure'],
  cargoTypes: [
    'FCL – full container',
    'LCL – consolidated / shared container',
    'Air cargo',
    'Break bulk / heavy equipment',
    'Not sure',
  ],
  documents: [
    'Commercial invoice',
    'Packing list',
    'Bill of lading / airway bill',
    'Certificate of origin',
    'Permits (BPS, FDA, etc.)',
    'Mill test certificate',
  ],
};

export const RFQ_LIMITS = {
  fullName: 100,
  company: 120,
  email: 150,
  phone: 30,
  cargoDescription: 2000,
  notes: 1000,
};

export const EMPTY_RFQ = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  shipmentType: '',
  port: '',
  cargoType: '',
  cargoDescription: '',
  shipDate: '',
  documents: [],
  notes: '',
  website: '', // honeypot
};

// Order used to focus the first invalid field
export const FIELD_ORDER = [
  'fullName', 'email', 'phone', 'service', 'shipmentType', 'port', 'cargoType', 'cargoDescription',
];

// Returns { key: translationKey } for each invalid field
export function validateRfq(v) {
  const errors = {};
  if (!v.fullName.trim()) errors.fullName = 'errRequired';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = 'errEmail';
  if ((v.phone.match(/\d/g) || []).length < 7) errors.phone = 'errPhone';
  for (const k of ['service', 'shipmentType', 'port', 'cargoType']) {
    if (!v[k]) errors[k] = 'errChoose';
  }
  if (v.cargoDescription.trim().length < 10) errors.cargoDescription = 'errShort';
  return errors;
}

// One readable text block, so the existing Google Apps Script (which saves
// "details") receives everything even if it doesn't know the new fields.
export function rfqSummary(v) {
  return [
    `Phone / Viber / WhatsApp: ${v.phone}`,
    `Service: ${v.service}`,
    `Import or export: ${v.shipmentType}`,
    `Port: ${v.port}`,
    `Cargo type: ${v.cargoType}`,
    `Expected date: ${v.shipDate || '—'}`,
    `Documents on hand: ${v.documents.length ? v.documents.join(', ') : '—'}`,
    '',
    'What are you shipping:',
    v.cargoDescription.trim(),
    '',
    `Notes: ${v.notes.trim() || '—'}`,
  ].join('\n');
}
