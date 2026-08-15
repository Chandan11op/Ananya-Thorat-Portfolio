/**
 * Booking Reference ID Generator
 * Generates human-readable, collision-safe IDs formatted as AT-YYYYMMDD-XXXX
 * Example: AT-20260815-7F3K
 */

import crypto from 'crypto';

export function generateBookingId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  // Generate 4-character uppercase alphanumeric random hash
  const randomBytes = crypto.randomBytes(2).toString('hex').toUpperCase();

  return `AT-${dateStr}-${randomBytes}`;
}
