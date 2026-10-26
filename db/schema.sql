-- Launch-list signups (Cloudflare D1 / SQLite).
-- Apply with:  npx wrangler d1 execute sand-silk --remote --file=db/schema.sql
CREATE TABLE IF NOT EXISTS subscribers (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  email       TEXT    NOT NULL UNIQUE,
  country     TEXT,
  city        TEXT,
  source      TEXT    NOT NULL DEFAULT 'coming-soon',
  created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers (created_at);
