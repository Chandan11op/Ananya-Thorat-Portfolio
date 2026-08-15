/**
 * Google Sheets Service
 * Responsible for recording booking enquiries into the Google Sheet.
 * Target Sheet ID: 1d1cXPo_BeHc9pcDd6uNaU5ITbSLoELx3ZtuzGSvLh8I
 */

import { google } from 'googleapis';

export async function recordBookingInSheet({ bookingId, data, submittedAt }) {
  const sheetId = process.env.GOOGLE_SHEET_ID || '1d1cXPo_BeHc9pcDd6uNaU5ITbSLoELx3ZtuzGSvLh8I';
  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  const recordRow = [
    submittedAt,
    bookingId,
    data.clientName,
    data.email,
    data.organization,
    data.eventType,
    data.eventDate,
    data.city,
    data.audienceSize,
    data.notes,
    'New'
  ];

  // Strategy 1: Google Apps Script Web App (Preferred & Simplest for Netlify Functions without RSA key management)
  if (appsScriptUrl && !appsScriptUrl.includes('YOUR_APPS_SCRIPT_DEPLOYMENT_ID')) {
    try {
      console.log(`[GoogleSheets] Posting to Apps Script Web App...`);
      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'addBooking',
          sheetId,
          bookingId,
          submittedAt,
          row: recordRow,
          data
        })
      });

      if (!response.ok) {
        throw new Error(`Apps Script responded with status ${response.status}`);
      }

      const resJson = await response.json().catch(() => ({}));
      console.log('[GoogleSheets] Apps Script submission succeeded:', resJson);
      return { success: true, method: 'AppsScript' };
    } catch (err) {
      console.error('[GoogleSheets] Apps Script submission error:', err.message);
      throw new Error(`Failed to save booking to Google Sheet via Apps Script: ${err.message}`);
    }
  }

  // Strategy 2: Google Sheets API v4 using Service Account
  if (serviceAccountEmail && privateKey) {
    try {
      console.log(`[GoogleSheets] Appending row via Google Sheets API...`);
      const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
      const auth = new google.auth.JWT(
        serviceAccountEmail,
        null,
        formattedPrivateKey,
        ['https://www.googleapis.com/auth/spreadsheets']
      );

      const sheets = google.sheets({ version: 'v4', auth });
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [recordRow]
        }
      });

      console.log('[GoogleSheets] Google Sheets API append succeeded');
      return { success: true, method: 'GoogleSheetsAPI' };
    } catch (err) {
      console.error('[GoogleSheets] Google Sheets API error:', err.message);
      throw new Error(`Failed to save booking to Google Sheet via API: ${err.message}`);
    }
  }

  // Fallback mode for local dev when external credentials are not set yet
  console.warn(
    '[GoogleSheets] Warning: No GOOGLE_APPS_SCRIPT_URL or GOOGLE_SERVICE_ACCOUNT_EMAIL configured. ' +
    'Simulating successful sheet recording for testing. Row payload:',
    recordRow
  );

  return { success: true, method: 'Simulated' };
}
