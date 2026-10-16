// Calls Claude for the app's AI features (OKR coach, gym coach, quotes…). The API key never leaves the server.
const KEY = Deno.env.get('ANTHROPIC_API_KEY') ?? '';
const MODEL = Deno.env.get('CLAUDE_MODEL') ?? 'claude-sonnet-5-5';
const QUICK = Deno.env.get('CLAUDE_MODEL_QUICK') ?? 'claude-haiku-4-5-20251001';
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  try {
    const { prompt, tier, json, image } = await req.json();
    const content = image && image.data ? [{ type: 'image', source: { type: 'base64', media_type: image.media_type || 'image/jpeg', data: image.data } }, { type: 'text', text: prompt }] : prompt;
    if (!prompt || typeof prompt !== 'string') return new Response(JSON.stringify({ error: 'no prompt' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } });
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: tier === 'quick' ? QUICK : MODEL, max_tokens: 2048, system: json ? 'Reply with only valid JSON. No prose, no code fences.' : undefined, messages: [{ role: 'user', content }] }),
    });
    const j = await r.json();
    if (!r.ok) return new Response(JSON.stringify({ error: j?.error?.message || 'claude error' }), { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } });
    const text = (j.content || []).filter((c: any) => c.type === 'text').map((c: any) => c.text).join('');
    let out: unknown = { text };
    if (json) { const m = text.match(/[\[{][\s\S]*[\]}]/); try { out = { json: JSON.parse(m ? m[0] : text) }; } catch { out = { json: null, text }; } }
    return new Response(JSON.stringify(out), { headers: { ...cors, 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
});
