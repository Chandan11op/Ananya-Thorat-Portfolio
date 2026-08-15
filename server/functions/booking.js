/**
 * Netlify Function: POST /api/booking
 * Booking Submission Handler
 */

import dotenv from 'dotenv';
dotenv.config();

import { validateBookingPayload } from '../utils/validation.js';
import { generateBookingId } from '../utils/bookingId.js';
import { recordBookingInSheet } from '../services/googleSheets.js';
import { sendOwnerNotification, sendVisitorConfirmation } from '../services/email.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

export const handler = async (event, context) => {
  // Handle HTTP OPTIONS pre-flight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: ''
    };
  }

  // Enforce POST method
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        message: 'Method Not Allowed. Use POST.'
      })
    };
  }

  try {
    // Parse incoming payload
    let rawBody = {};
    try {
      rawBody = JSON.parse(event.body || '{}');
    } catch {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          message: 'Invalid JSON payload.'
        })
      };
    }

    // Step 1: Validate payload
    const validationResult = validateBookingPayload(rawBody);

    if (validationResult.isSpam) {
      // Return fake success for bot submissions
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: true,
          bookingId: generateBookingId()
        })
      };
    }

    if (!validationResult.isValid) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          message: validationResult.errors[0] || 'Invalid booking details provided.'
        })
      };
    }

    const { sanitizedData } = validationResult;
    const bookingId = generateBookingId();
    const submittedAt = new Date().toISOString();

    // Step 2: Save to Google Sheet
    try {
      await recordBookingInSheet({ bookingId, data: sanitizedData, submittedAt });
    } catch (sheetErr) {
      console.error('[BookingFunction] Failed to save in Google Sheet:', sheetErr);
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          message: 'Unable to process your booking brief right now. Please try again in a moment.'
        })
      };
    }

    // Step 3 & 4: Send Emails (Owner Notification & Visitor Confirmation)
    try {
      await sendOwnerNotification({ bookingId, data: sanitizedData, submittedAt });
      await sendVisitorConfirmation({ bookingId, data: sanitizedData });
    } catch (emailErr) {
      // Log email delivery failure, but if Sheet succeeded, retain record safely
      console.error('[BookingFunction] Email dispatch error:', emailErr.message);
    }

    // Step 5: Return Success Response
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        bookingId
      })
    };

  } catch (err) {
    console.error('[BookingFunction] Unhandled Exception:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        message: 'Unable to process your booking brief right now.'
      })
    };
  }
};
