export default async (req) => {
  const N8N = Deno.env.get("N8N_WEBHOOK_URL"); // setéala en Netlify
  if (!N8N) {
    return new Response(JSON.stringify({ error: "N8N_WEBHOOK_URL missing" }), {
      status: 500, headers: { "content-type": "application/json" }
    });
  }

  // Solo POST con body JSON { names: [...] }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Use POST" }), {
      status: 405, headers: { "content-type": "application/json" }
    });
  }

  const body = await req.json().catch(() => ({}));
  const res = await fetch(N8N, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  // Propaga respuesta de n8n
  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") || "application/json" }
  });
}
