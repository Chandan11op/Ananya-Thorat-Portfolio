/**
 * Owner Notification Email Template (sent to ananyathorat26@gmail.com)
 */

export function getOwnerEmailTemplate({ bookingId, data, submittedAt }) {
  const subject = `New Anchor Booking Brief — ${data.clientName}`;

  const textContent = `
NEW ANCHOR BOOKING BRIEF

A new hosting enquiry has been submitted through Ananya Thorat's portfolio website.

CONTACT DETAILS
----------------------------------------
Name: ${data.clientName}
Email: ${data.email}
Organization: ${data.organization}

EVENT DETAILS
----------------------------------------
Event Format: ${data.eventType}
Tentative Date: ${data.eventDate}
City / Location: ${data.city}
Audience Size: ${data.audienceSize}

SPECIAL REQUIREMENTS
----------------------------------------
Notes: ${data.notes}

SUBMISSION DETAILS
----------------------------------------
Booking ID: ${bookingId}
Submitted At: ${submittedAt}
Status: New

Reply directly to this email to contact the requester.
  `.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f5f2; color: #241A1D; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2d9d0; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { border-bottom: 2px solid #7A1736; padding-bottom: 16px; margin-bottom: 24px; }
    .title { color: #7A1736; font-size: 22px; font-weight: bold; margin: 0 0 6px 0; letter-spacing: -0.5px; }
    .subtitle { color: #665c5f; font-size: 13px; margin: 0; }
    .section-title { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #7A1736; letter-spacing: 1px; margin-top: 24px; margin-bottom: 12px; border-bottom: 1px solid #f0e6e8; padding-bottom: 4px; }
    .field { margin-bottom: 10px; font-size: 14px; line-height: 1.5; }
    .field strong { color: #241A1D; display: inline-block; min-width: 140px; }
    .badge { display: inline-block; background: #7A1736; color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; }
    .notes-box { background: #faf7f8; border-left: 4px solid #7A1736; padding: 12px 16px; font-size: 13px; color: #4a3e42; border-radius: 4px; margin-top: 8px; white-space: pre-wrap; }
    .footer { margin-top: 32px; pt: 16px; border-top: 1px solid #e2d9d0; font-size: 12px; color: #887b80; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">NEW ANCHOR BOOKING BRIEF</h1>
      <p class="subtitle">A new hosting enquiry has been submitted through your portfolio website.</p>
    </div>

    <div class="section-title">Contact Details</div>
    <div class="field"><strong>Name:</strong> ${data.clientName}</div>
    <div class="field"><strong>Email:</strong> <a href="mailto:${data.email}" style="color:#7A1736;">${data.email}</a></div>
    <div class="field"><strong>Organization:</strong> ${data.organization}</div>

    <div class="section-title">Event Details</div>
    <div class="field"><strong>Event Format:</strong> ${data.eventType}</div>
    <div class="field"><strong>Tentative Date:</strong> ${data.eventDate}</div>
    <div class="field"><strong>City / Location:</strong> ${data.city}</div>
    <div class="field"><strong>Audience Size:</strong> ${data.audienceSize}</div>

    <div class="section-title">Special Requirements</div>
    <div class="notes-box">${data.notes}</div>

    <div class="section-title">Submission Meta</div>
    <div class="field"><strong>Booking ID:</strong> <span class="badge">${bookingId}</span></div>
    <div class="field"><strong>Submitted At:</strong> ${submittedAt}</div>
    <div class="field"><strong>Status:</strong> New</div>

    <div class="footer">
      💡 Reply directly to this email to get in touch with <strong>${data.clientName}</strong>.
    </div>
  </div>
</body>
</html>
  `.trim();

  return { subject, textContent, htmlContent };
}
