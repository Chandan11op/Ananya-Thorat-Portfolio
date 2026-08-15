/**
 * Visitor Confirmation Email Template (sent to {{visitorEmail}})
 */

export function getVisitorEmailTemplate({ bookingId, data }) {
  const subject = `Your Anchor Booking Brief Has Been Received — Ananya Thorat`;

  const textContent = `
Hello ${data.clientName},

Thank you for reaching out to Ananya regarding your upcoming event.

Your anchor booking brief has been successfully received!

HERE ARE THE DETAILS SUBMITTED:
----------------------------------------
Event Format: ${data.eventType}
Organization: ${data.organization}
Tentative Date: ${data.eventDate}
Location: ${data.city}
Audience Size: ${data.audienceSize}
Special Requirements: ${data.notes}

Reference ID: ${bookingId}

Ananya will review the details and get back to you shortly regarding availability and the next steps.

Please note: This enquiry serves as an initial brief and does not confirm the event date until availability is formally confirmed.

Warm regards,

Ananya Thorat
Professional Event Anchor • Host • MC • Public Speaker
ananyathorat26@gmail.com
  `.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f5f2; color: #241A1D; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2d9d0; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { border-bottom: 2px solid #7A1736; padding-bottom: 16px; margin-bottom: 24px; text-align: center; }
    .title { color: #7A1736; font-size: 24px; font-weight: bold; margin: 0 0 6px 0; font-style: italic; }
    .subtitle { color: #665c5f; font-size: 14px; margin: 0; }
    .greeting { font-size: 16px; color: #241A1D; margin-bottom: 16px; font-weight: 500; }
    .details-card { background: #faf7f8; border-radius: 12px; border: 1px solid #f0e6e8; padding: 20px; margin: 20px 0; }
    .details-title { font-size: 12px; font-weight: bold; text-transform: uppercase; color: #7A1736; letter-spacing: 1px; margin-bottom: 12px; }
    .field { margin-bottom: 8px; font-size: 13px; color: #4a3e42; }
    .field strong { color: #241A1D; display: inline-block; min-width: 140px; }
    .ref-badge { display: inline-block; background: #7A1736; color: #ffffff; padding: 6px 14px; border-radius: 9999px; font-size: 13px; font-weight: bold; letter-spacing: 0.5px; }
    .note { font-size: 12px; color: #776a6e; line-height: 1.5; background: #fff8eb; border: 1px solid #fce8c5; padding: 12px; border-radius: 8px; margin-top: 16px; }
    .signoff { margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2d9d0; font-size: 14px; color: #241A1D; }
    .signoff-name { font-weight: bold; color: #7A1736; font-size: 16px; }
    .signoff-title { font-size: 12px; color: #665c5f; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">Ananya Thorat</h1>
      <p class="subtitle">Professional Event Anchor • Host • MC • Public Speaker</p>
    </div>

    <div class="greeting">Hello ${data.clientName},</div>
    <p style="font-size: 14px; line-height: 1.6; color: #4a3e42;">
      Thank you for reaching out regarding your upcoming event! Your anchor booking brief has been successfully received.
    </p>

    <div class="details-card">
      <div class="details-title">Submitted Event Brief Summary</div>
      <div class="field"><strong>Event Format:</strong> ${data.eventType}</div>
      <div class="field"><strong>Organization:</strong> ${data.organization}</div>
      <div class="field"><strong>Tentative Date:</strong> ${data.eventDate}</div>
      <div class="field"><strong>Location:</strong> ${data.city}</div>
      <div class="field"><strong>Audience Size:</strong> ${data.audienceSize}</div>
      <div class="field"><strong>Special Notes:</strong> ${data.notes}</div>
      <div style="margin-top: 16px;">
        <span style="font-size: 12px; text-transform: uppercase; color: #665c5f; display: block; margin-bottom: 4px;">Reference ID</span>
        <span class="ref-badge">${bookingId}</span>
      </div>
    </div>

    <p style="font-size: 14px; line-height: 1.6; color: #4a3e42;">
      Ananya will review your event details and get back to you shortly regarding date availability and next steps.
    </p>

    <div class="note">
      📌 <strong>Note:</strong> This enquiry serves as an initial brief and does not confirm the event date until availability and scope are discussed and agreed upon.
    </div>

    <div class="signoff">
      <div class="signoff-name">Warm regards,</div>
      <div style="margin-top: 6px; font-weight: bold; color: #7A1736;">Ananya Thorat</div>
      <div class="signoff-title">Professional Event Anchor • Host • MC • Public Speaker</div>
      <div style="font-size: 12px; color: #7A1736; margin-top: 4px;">ananyathorat26@gmail.com</div>
    </div>
  </div>
</body>
</html>
  `.trim();

  return { subject, textContent, htmlContent };
}
