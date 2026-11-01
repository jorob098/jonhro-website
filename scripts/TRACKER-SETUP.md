# Making the shipment tracker private (about 10 minutes)

**Why:** the old tracker downloaded your whole Google Sheet into every visitor's
browser, so anyone could copy the link and see every client's shipments.
The new tracker asks a small Google script for one shipment at a time, and the
sheet stays private.

## 1. Add the script to your tracking sheet

1. Open the Google Sheet you use for tracking.
2. Click **Extensions → Apps Script**.
3. Delete what's in the editor and paste everything from `scripts/track-lookup.gs`.
4. Leave `SHEET_NAME` empty: the script finds your tracking tab by its ID
   (`SHEET_GID`). If you ever move the data to another tab, change `SHEET_GID`
   to the number after `gid=` in the address bar while that tab is open.
5. Click **Save**.

## 2. Publish it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**.
4. Click **Deploy**, then **Authorize access** and allow it with your Google account.
5. Copy the **Web app URL** (it ends in `/exec`).

"Anyone" only means anyone can *ask* for a tracking number. They get back that
one shipment, never the sheet.

## 3. Connect it to the website

In `public/track.html`, find this line near the bottom and paste your URL:

```js
LOOKUP_URL: "",
```

Commit, push and merge. Test with a real tracking number on the live site.

## 4. Stop publishing the sheet

Once the new tracker works:

1. In the sheet, click **File → Share → Publish to web**.
2. Click **Stop publishing**.
3. Also check **Share** settings: it should be restricted to you (and your staff), not "Anyone with the link".

## Optional: stronger protection

- **Use tracking numbers that can't be guessed**, e.g. `JR-7K3QX9` instead of `JR-1001`.
- **Add a PIN column.** Add a column named `pin` to the sheet. Any shipment with a PIN
  will ask the visitor for it before showing details. Give the PIN to your client
  along with the tracking number.

## Editing the script later

After changing the script, use **Deploy → Manage deployments → Edit (pencil) →
Version: New version → Deploy**. The URL stays the same.
