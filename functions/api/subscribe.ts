/**
 * POST /api/subscribe — stores a launch-list email in Cloudflare D1 (free tier).
 *
 * Runs as a Cloudflare Pages Function alongside the static site.
 * Requires a D1 binding named `DB` (see README → "Signup database").
 */

interface Env {
  DB?: D1Database;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY_BYTES = 2_048;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) return json({ ok: false, error: "signup_unavailable" }, 503);

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ ok: false, error: "too_large" }, 413);

  let payload: { email?: unknown; company?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot filled → a bot. Pretend success so it does not retry.
  if (typeof payload.company === "string" && payload.company.trim() !== "") {
    return json({ ok: true });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return json({ ok: false, error: "invalid_email" }, 422);
  }

  const cf = (request as Request & { cf?: { country?: string; city?: string } }).cf;

  await env.DB.prepare(
    `INSERT INTO subscribers (email, country, city, source)
     VALUES (?1, ?2, ?3, 'coming-soon')
     ON CONFLICT(email) DO NOTHING`,
  )
    .bind(email, cf?.country ?? null, cf?.city ?? null)
    .run();

  // Same response whether new or already subscribed: never reveal who is on the list.
  return json({ ok: true });
};

export const onRequest: PagesFunction<Env> = async () =>
  json({ ok: false, error: "method_not_allowed" }, 405);
