// Human-readable title for your website
const rpName = 'SimpleWebAuthn Example';
// A unique identifier for your website
const rpID = process.env.VERCEL_URL || 'localhost';
// The URL at which registrations and authentications should occur
const origin = process.env.VERCEL_URL || 'http://localhost:3000';

export const rp = {
  rpName,
  rpID,
  origin,
};
