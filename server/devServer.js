/**
 * Local Standalone Backend Development Server
 * Runs Netlify serverless functions locally on http://localhost:8888
 * Routes /api/submit-booking directly to submit-booking.mjs handler
 */

import http from 'http';
import dotenv from 'dotenv';
import { handler as submitBookingHandler } from '../netlify/functions/submit-booking.mjs';

dotenv.config();

const PORT = process.env.PORT || 8888;

const server = http.createServer(async (req, res) => {
  console.log(`[DevServer] ${req.method} ${req.url}`);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // Route /api/submit-booking or /api/booking or /.netlify/functions/submit-booking
  if (
    url.pathname === '/api/submit-booking' ||
    url.pathname === '/api/booking' ||
    url.pathname === '/.netlify/functions/submit-booking'
  ) {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      const event = {
        httpMethod: req.method,
        path: url.pathname,
        headers: req.headers,
        queryStringParameters: Object.fromEntries(url.searchParams),
        body
      };

      try {
        const result = await submitBookingHandler(event, {});

        res.statusCode = result.statusCode || 200;
        if (result.headers) {
          Object.entries(result.headers).forEach(([key, value]) => {
            res.setHeader(key, value);
          });
        }
        res.end(result.body || '');
      } catch (err) {
        console.error('[DevServer Error]:', err);
        res.statusCode = 500;
        res.end(JSON.stringify({ success: false, message: 'Local dev server error' }));
      }
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found on local dev server' }));
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 Local Backend Server running on http://localhost:${PORT}`);
  console.log(`   Mapped route: POST http://localhost:${PORT}/api/submit-booking\n`);
});
