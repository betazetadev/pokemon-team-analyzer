/**
 * Netlify Function: Pokemon Team Analyzer Proxy
 *
 * This function proxies requests to the n8n webhook endpoint.
 *
 * Environment Variables:
 * Set in Netlify UI (Project configuration > Environment variables):
 * - WEBHOOK_URL: The n8n webhook URL to forward requests to (required)
 *
 * For local development with Netlify Dev:
 * - Create a .env file in the project root
 * - Add: WEBHOOK_URL=https://your-n8n-webhook-url
 * - Run: netlify dev
 */

exports.handler = async (event) => {
  const WEBHOOK_URL = process.env.WEBHOOK_URL;

  // CORS + preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors() };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: cors(),
      body: JSON.stringify({ error: 'Method not allowed. Use POST.' })
    };
  }

  // Check for required environment variable
  if (!WEBHOOK_URL) {
    console.error('WEBHOOK_URL environment variable is not set');
    return {
      statusCode: 500,
      headers: cors(),
      body: JSON.stringify({
        error: 'Server configuration error',
        message: 'WEBHOOK_URL environment variable is missing. Please configure it in Netlify UI under Project configuration > Environment variables.'
      })
    };
  }

  try {
    // Forward the request to n8n webhook
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: event.body,
    });

    const text = await res.text();

    return {
      statusCode: res.status,
      headers: {
        ...cors(),
        'content-type': res.headers.get('content-type') || 'application/json'
      },
      body: text,
    };
  } catch (err) {
    console.error('Error forwarding request to n8n:', err);
    return {
      statusCode: 502,
      headers: cors(),
      body: JSON.stringify({
        error: 'Upstream service error',
        message: 'Failed to connect to the analysis service. Please try again later.',
        detail: process.env.NODE_ENV === 'development' ? String(err) : undefined
      })
    };
  }
};

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
