/**
 * Shipment tracking lookup — Google Apps Script web app.
 *
 * Returns ONE shipment by tracking number, so the spreadsheet itself never
 * has to be public. Setup steps are in scripts/TRACKER-SETUP.md.
 *
 * Optional extra protection: add a column named "pin" to the sheet. For any
 * row with a PIN, the visitor must enter it to see the shipment.
 */

// ---- Settings -------------------------------------------------------------
// The spreadsheet ID is the long code in the sheet's URL:
// https://docs.google.com/spreadsheets/d/THIS_PART/edit
// Leave empty if this script was created from the sheet (Extensions → Apps Script).
const SPREADSHEET_ID = '';

// The tab that holds the shipments. Leave empty to use the first tab.
const SHEET_NAME = '';

// Only these columns are ever sent to the website.
const PUBLIC_FIELDS = [
  'tracking_number', 'status', 'current_location', 'last_update', 'eta',
  'origin', 'destination', 'description', 'notes',
];
// ---------------------------------------------------------------------------

function doGet(e) {
  const tn = normTn_((e && e.parameter && e.parameter.tn) || '');
  const pin = String((e && e.parameter && e.parameter.pin) || '').trim();

  if (!tn || tn.length > 40) return json_({ ok: false, error: 'not_found' });

  // Slow down guessing: limits per tracking number and for the whole site,
  // counted in 10-minute windows.
  const cache = CacheService.getScriptCache();
  const window = Math.floor(Date.now() / 600000);
  const perTnKey = 'tries_' + tn + '_' + window;
  const allKey = 'tries_all_' + window;
  const perTn = Number(cache.get(perTnKey) || 0);
  const all = Number(cache.get(allKey) || 0);
  if (perTn >= 30 || all >= 300) return json_({ ok: false, error: 'too_many_attempts' });
  cache.put(perTnKey, String(perTn + 1), 600);
  cache.put(allKey, String(all + 1), 600);

  const sheet = getSheet_();
  const rows = sheet.getDataRange().getDisplayValues();
  if (rows.length < 2) return json_({ ok: false, error: 'not_found' });

  const head = rows[0].map(normKey_);
  const col = (name) => head.indexOf(name);
  const tnCol = [col('tracking_number'), col('tracking_no'), col('tracking')].find((i) => i >= 0);
  if (tnCol === undefined) return json_({ ok: false, error: 'not_found' });

  const row = rows.slice(1).find((r) => normTn_(r[tnCol]) === tn);
  if (!row) return json_({ ok: false, error: 'not_found' });

  const pinCol = col('pin');
  const rowPin = pinCol >= 0 ? String(row[pinCol]).trim() : '';
  if (rowPin) {
    if (!pin) return json_({ ok: false, error: 'pin_required' });
    if (pin !== rowPin) return json_({ ok: false, error: 'wrong_pin' });
  }

  const shipment = {};
  head.forEach((h, i) => {
    if (PUBLIC_FIELDS.indexOf(h) >= 0 && row[i] !== '') shipment[h] = row[i];
  });
  shipment.tracking_number = row[tnCol];
  return json_({ ok: true, shipment: shipment });
}

function getSheet_() {
  const ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  return SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
}

function normKey_(s) {
  return String(s).trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

function normTn_(s) {
  return String(s).trim().toUpperCase().replace(/\s+/g, '');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
