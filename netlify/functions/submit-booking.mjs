/**
 * Netlify Function: POST /api/submit-booking
 * Strictly forwards booking enquiries to Google Apps Script Web App.
 * Returns HTTP 200 success ONLY when Google Apps Script confirms the row was actually saved.
 */

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

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

export const handler = async (event, context) => {
  // Handle HTTP OPTIONS pre-flight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed. Use POST.' })
    };
  }

  console.log('[BOOKING] Request received');

  let rawBody = {};
  try {
    rawBody = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, message: 'Invalid JSON body.' })
    };
  }

  // Honeypot anti-spam check
  if (rawBody.botField || rawBody.website_hp) {
    console.warn('[BOOKING] Bot submission detected via honeypot');
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true, bookingId: generateBookingId() })
    };
  }

  // Sanitize & Validate fields
  const clientName = (rawBody.clientName || '').toString().trim();
  const email = (rawBody.email || '').toString().trim();
  const eventType = (rawBody.eventType || '').toString().trim();
  const organization = (rawBody.organization || '').toString().trim();
  const eventDate = (rawBody.eventDate || '').toString().trim();
  const city = (rawBody.city || '').toString().trim();
  const audienceSize = (rawBody.audienceSize || '').toString().trim();
  const notes = (rawBody.notes || '').toString().trim();

  if (!clientName) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, message: 'Your name is required.' })
    };
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, message: 'A valid email address is required.' })
    };
  }

  if (!eventType) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, message: 'Event category is required.' })
    };
  }

  console.log('[BOOKING] Validation passed');

  const bookingId = rawBody.bookingId || generateBookingId();
  console.log(`[BOOKING] Booking ID: ${bookingId}`);

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!appsScriptUrl || appsScriptUrl.includes('YOUR_APPS_SCRIPT_DEPLOYMENT_ID')) {
    console.error('[BOOKING] CRITICAL ERROR: GOOGLE_APPS_SCRIPT_URL is not configured in environment variables.');
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        bookingId,
        sheetSaved: false,
        ownerEmailSent: false,
        visitorEmailSent: false,
        message: 'Google Apps Script backend URL is not configured. Submission halted.'
      })
    };
  }

  console.log(`[BOOKING] Calling Google Apps Script: ${appsScriptUrl.substring(0, 45)}...`);

  const payload = {
    bookingId,
    clientName,
    email,
    organization,
    eventType,
    eventDate,
    city,
    audienceSize,
    notes
  };

  try {
    const appsScriptResponse = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow'
    });

    if (!appsScriptResponse.ok) {
      console.error(`[BOOKING] Apps Script returned HTTP status ${appsScriptResponse.status}`);
      return {
        statusCode: 502,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          bookingId,
          sheetSaved: false,
          ownerEmailSent: false,
          visitorEmailSent: false,
          message: `Google Apps Script service returned HTTP ${appsScriptResponse.status}.`
        })
      };
    }

    const appsScriptResult = await appsScriptResponse.json().catch(() => ({}));
    console.log('[BOOKING] Google Apps Script response:', JSON.stringify(appsScriptResult));

    console.log(`[BOOKING] Sheet saved: ${appsScriptResult.sheetSaved}`);
    console.log(`[BOOKING] Owner email sent: ${appsScriptResult.ownerEmailSent}`);
    console.log(`[BOOKING] Visitor email sent: ${appsScriptResult.visitorEmailSent}`);

    // STRICT VERIFICATION: ONLY declare success if sheetSaved is true
    if (appsScriptResult.success && appsScriptResult.sheetSaved) {
      console.log('[BOOKING] Completed successfully');
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: true,
          bookingId,
          sheetSaved: true,
          ownerEmailSent: appsScriptResult.ownerEmailSent,
          visitorEmailSent: appsScriptResult.visitorEmailSent
        })
      };
    } else {
      console.error('[BOOKING] Google Apps Script failed to complete workflow:', appsScriptResult.error);
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          bookingId,
          sheetSaved: !!appsScriptResult.sheetSaved,
          ownerEmailSent: !!appsScriptResult.ownerEmailSent,
          visitorEmailSent: !!appsScriptResult.visitorEmailSent,
          message: appsScriptResult.error || 'Failed to record booking in Google Sheet.'
        })
      };
    }

  } catch (fetchErr) {
    console.error('[BOOKING] Error calling Google Apps Script:', fetchErr.message);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        bookingId,
        sheetSaved: false,
        ownerEmailSent: false,
        visitorEmailSent: false,
        message: 'Could not connect to Google Apps Script backend.'
      })
    };
  }
};
