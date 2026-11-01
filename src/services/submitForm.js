// Sends a form to the Google Apps Script endpoint.
// Returns { success: boolean, error?: string }.
export async function submitForm(fields) {
  // Honeypot: real visitors never see or fill the hidden "website" field.
  // Bots usually do, so pretend it worked and drop the submission.
  if (fields.website) return { success: true };

  const body = new URLSearchParams();
  Object.entries(fields).forEach(([key, value]) => {
    if (key !== "website") body.append(key, value ?? "");
  });

  const response = await fetch(import.meta.env.VITE_REACT_APP_GAS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  return response.json();
}
