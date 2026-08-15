/**
 * Backend Validation Utility for Booking Enquiries
 */

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates and sanitizes booking payload.
 * Returns { isValid: boolean, errors: string[], sanitizedData: object }
 */
export function validateBookingPayload(data = {}) {
  const errors = [];

  // Check honeypot for spam bots
  if (data.botField || data.website_hp) {
    return {
      isSpam: true,
      isValid: false,
      errors: ['Spam detected'],
      sanitizedData: null
    };
  }

  // Trim all string inputs
  const clientName = (data.clientName || '').toString().trim();
  const email = (data.email || '').toString().trim();
  const organization = (data.organization || '').toString().trim();
  const eventType = (data.eventType || '').toString().trim();
  const eventDate = (data.eventDate || '').toString().trim();
  const city = (data.city || '').toString().trim();
  const audienceSize = (data.audienceSize || '').toString().trim();
  const notes = (data.notes || '').toString().trim();

  // Validate Name (Required, max 100)
  if (!clientName) {
    errors.push('Name is required.');
  } else if (clientName.length > 100) {
    errors.push('Name must not exceed 100 characters.');
  }

  // Validate Email (Required, valid format, max 254)
  if (!email) {
    errors.push('Email address is required.');
  } else if (email.length > 254) {
    errors.push('Email address must not exceed 254 characters.');
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push('Please provide a valid email address.');
  }

  // Validate Event Type (Required, max 150)
  if (!eventType) {
    errors.push('Event format / category is required.');
  } else if (eventType.length > 150) {
    errors.push('Event format must not exceed 150 characters.');
  }

  // Validate optional fields with maximum length limits
  if (organization.length > 200) {
    errors.push('Organization name must not exceed 200 characters.');
  }

  if (eventDate.length > 100) {
    errors.push('Event date must not exceed 100 characters.');
  }

  if (city.length > 150) {
    errors.push('City / location must not exceed 150 characters.');
  }

  if (audienceSize.length > 100) {
    errors.push('Audience size must not exceed 100 characters.');
  }

  if (notes.length > 2000) {
    errors.push('Special requirements notes must not exceed 2000 characters.');
  }

  return {
    isSpam: false,
    isValid: errors.length === 0,
    errors,
    sanitizedData: {
      clientName,
      email,
      organization: organization || 'Not Specified',
      eventType,
      eventDate: eventDate || 'TBD',
      city: city || 'Not Specified',
      audienceSize: audienceSize || 'Not Specified',
      notes: notes || 'None'
    }
  };
}
