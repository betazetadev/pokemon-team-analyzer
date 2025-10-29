const N8N = process.env.N8N_WEBHOOK_URL;

exports.handler = async (event) => {
  // CORS + preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors() };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: cors(), body: JSON.stringify({ error: 'Use POST' }) };
  }
  if (!N8N) {
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: 'N8N_WEBHOOK_URL missing' }) };
  }

  try {
    const res = await fetch(N8N, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: event.body, // { names: [...] }
    });
    const text = await res.text();
    return {
      statusCode: res.status,
      headers: { ...cors(), 'content-type': res.headers.get('content-type') || 'application/json' },
      body: text,
    };
  } catch (err) {
    return { statusCode: 502, headers: cors(), body: JSON.stringify({ error: 'Upstream error', detail: String(err) }) };
  }
};

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
