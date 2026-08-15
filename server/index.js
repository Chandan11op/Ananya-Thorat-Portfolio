import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function generateBookingId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AT-${dateStr}-${randomChars}`;
}

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Ananya Thorat Booking Backend' });
});

app.get('/', (req, res) => {
  res.send('Ananya Thorat Booking Backend API is running.');
});

app.post('/api/submit-booking', async (req, res) => {
  console.log('[BOOKING] Request received on Express backend');

  const rawBody = req.body || {};

  if (rawBody.botField || rawBody.website_hp) {
    console.warn('[BOOKING] Bot detected via honeypot');
    return res.status(200).json({ success: true, bookingId: generateBookingId() });
  }

  const clientName = (rawBody.clientName || '').toString().trim();
  const email = (rawBody.email || '').toString().trim();
  const eventType = (rawBody.eventType || '').toString().trim();
  const organization = (rawBody.organization || '').toString().trim();
  const eventDate = (rawBody.eventDate || '').toString().trim();
  const city = (rawBody.city || '').toString().trim();
  const audienceSize = (rawBody.audienceSize || '').toString().trim();
  const notes = (rawBody.notes || '').toString().trim();

  if (!clientName) {
    return res.status(400).json({ success: false, message: 'Your name is required.' });
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ success: false, message: 'A valid email address is required.' });
  }

  if (!eventType) {
    return res.status(400).json({ success: false, message: 'Event category is required.' });
  }

  const bookingId = rawBody.bookingId || generateBookingId();
  console.log(`[BOOKING] Booking ID: ${bookingId}`);

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!appsScriptUrl || appsScriptUrl.includes('YOUR_APPS_SCRIPT_DEPLOYMENT_ID')) {
    console.error('[BOOKING] GOOGLE_APPS_SCRIPT_URL is not configured.');
    return res.status(500).json({
      success: false,
      bookingId,
      sheetSaved: false,
      ownerEmailSent: false,
      visitorEmailSent: false,
      message: 'Google Apps Script backend URL is not configured on Render server environment.'
    });
  }

  console.log(`[BOOKING] Forwarding to Google Apps Script: ${appsScriptUrl.substring(0, 45)}...`);

  try {
    const appsScriptResponse = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        bookingId,
        clientName,
        email,
        organization,
        eventType,
        eventDate,
        city,
        audienceSize,
        notes
      }),
      redirect: 'follow'
    });

    const resText = await appsScriptResponse.text();
    console.log('[BOOKING] Google Apps Script raw response text:', resText);

    let appsScriptResult = {};
    try {
      appsScriptResult = JSON.parse(resText);
    } catch {
      console.error('[BOOKING] Could not parse Apps Script response as JSON. Raw response:', resText);
      if (resText.includes('Script function not found: doPost')) {
        return res.status(500).json({
          success: false,
          bookingId,
          sheetSaved: false,
          ownerEmailSent: false,
          visitorEmailSent: false,
          message: 'Google Apps Script missing doPost function. Please deploy a New Version in Apps Script.'
        });
      }
      return res.status(500).json({
        success: false,
        bookingId,
        sheetSaved: false,
        ownerEmailSent: false,
        visitorEmailSent: false,
        message: 'Google Apps Script returned invalid non-JSON response.'
      });
    }

    if (appsScriptResult.success && appsScriptResult.sheetSaved) {
      console.log('[BOOKING] Completed successfully');
      return res.status(200).json({
        success: true,
        bookingId,
        sheetSaved: true,
        ownerEmailSent: !!appsScriptResult.ownerEmailSent,
        visitorEmailSent: !!appsScriptResult.visitorEmailSent
      });
    } else {
      console.error('[BOOKING] Google Apps Script error:', appsScriptResult.error);
      return res.status(500).json({
        success: false,
        bookingId,
        sheetSaved: !!appsScriptResult.sheetSaved,
        ownerEmailSent: !!appsScriptResult.ownerEmailSent,
        visitorEmailSent: !!appsScriptResult.visitorEmailSent,
        message: appsScriptResult.error || 'Failed to record booking in Google Sheet.'
      });
    }

  } catch (err) {
    console.error('[BOOKING] Exception forwarding to Apps Script:', err.message);
    return res.status(500).json({
      success: false,
      bookingId,
      sheetSaved: false,
      ownerEmailSent: false,
      visitorEmailSent: false,
      message: 'Could not connect to Google Apps Script backend.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Render Express Server running on port ${PORT}`);
});
