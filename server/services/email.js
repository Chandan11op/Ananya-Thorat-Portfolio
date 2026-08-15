/**
 * Email Service (Nodemailer / Gmail Architecture)
 * Decoupled provider abstraction for sending owner notifications and visitor confirmations.
 */

import nodemailer from 'nodemailer';
import { getOwnerEmailTemplate } from '../templates/ownerEmail.js';
import { getVisitorEmailTemplate } from '../templates/visitorEmail.js';

/**
 * Creates Nodemailer Transporter based on environment configuration
 */
function createTransporter() {
  const gmailUser = process.env.GMAIL_USER || process.env.BOOKING_FROM_EMAIL || 'ananyathorat26@gmail.com';
  const gmailPass = process.env.GMAIL_PASS;

  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

  // Check Option A: App Password
  if (gmailUser && gmailPass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });
  }

  // Check Option B: OAuth2
  if (gmailUser && clientId && clientSecret && refreshToken) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: gmailUser,
        clientId,
        clientSecret,
        refreshToken
      }
    });
  }

  // Return null if credentials are missing
  return null;
}

/**
 * Send notification email to owner (Ananya)
 */
export async function sendOwnerNotification({ bookingId, data, submittedAt }) {
  const ownerEmail = process.env.BOOKING_NOTIFICATION_EMAIL || 'ananyathorat26@gmail.com';
  const fromEmail = process.env.BOOKING_FROM_EMAIL || 'ananyathorat26@gmail.com';
  const template = getOwnerEmailTemplate({ bookingId, data, submittedAt });

  const transporter = createTransporter();

  if (!transporter) {
    console.warn(
      `[EmailService] Warning: No GMAIL_PASS or OAuth2 credentials set. ` +
      `Simulating owner email notification to ${ownerEmail}. Subject: "${template.subject}"`
    );
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `Ananya Thorat Portfolio <${fromEmail}>`,
      to: ownerEmail,
      replyTo: `${data.clientName} <${data.email}>`,
      subject: template.subject,
      text: template.textContent,
      html: template.htmlContent
    });

    console.log(`[EmailService] Owner notification sent. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('[EmailService] Owner notification email failed:', err.message);
    throw new Error(`Failed to send owner notification email: ${err.message}`);
  }
}

/**
 * Send confirmation email to visitor
 */
export async function sendVisitorConfirmation({ bookingId, data }) {
  const fromEmail = process.env.BOOKING_FROM_EMAIL || 'ananyathorat26@gmail.com';
  const template = getVisitorEmailTemplate({ bookingId, data });

  const transporter = createTransporter();

  if (!transporter) {
    console.warn(
      `[EmailService] Warning: No GMAIL_PASS or OAuth2 credentials set. ` +
      `Simulating visitor confirmation email to ${data.email}. Subject: "${template.subject}"`
    );
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `Ananya Thorat <${fromEmail}>`,
      to: data.email,
      replyTo: fromEmail,
      subject: template.subject,
      text: template.textContent,
      html: template.htmlContent
    });

    console.log(`[EmailService] Visitor confirmation sent. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('[EmailService] Visitor confirmation email failed:', err.message);
    throw new Error(`Failed to send visitor confirmation email: ${err.message}`);
  }
}
