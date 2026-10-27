# Sand & Silk

*Luxury in every drop.* The website for Sand & Silk, a luxury fragrance house for Zimbabwe.

This first release is the **Coming Soon** page: the launch poster turned into a fast, mobile-first web page with an email signup and a WhatsApp button. It is built on the same foundation the full store will use (Next.js), and runs entirely on free services.

| Part | Tool | Cost |
| --- | --- | --- |
| Site | Next.js 15 (static export) | Free, open-source |
| Hosting + CDN | Cloudflare Pages | Free plan (commercial use allowed) |
| Signup API | Cloudflare Pages Functions (`functions/api/subscribe.ts`) | Free plan |
| Signup database | Cloudflare D1 (SQLite) | Free plan |
| Fonts | Cinzel, Cormorant Garamond, Montserrat, self-hosted via Fontsource | Free (OFL) |

## Run it locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # writes the static site to out/
```

Requires Node 20 or newer.

## Settings

Set these in Cloudflare Pages → **Settings → Variables and Secrets** (or in `.env.local` for local runs). All are optional; anything left empty is simply hidden.

| Variable | Example | Effect |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `263771234567` | Shows the "Join on WhatsApp" button |
| `NEXT_PUBLIC_INSTAGRAM` | `sand_and_silk_perfume` (default) | Instagram link in the footer |
| `NEXT_PUBLIC_FACEBOOK` | `sandandsilk` | Shows the Facebook link |
| `NEXT_PUBLIC_SITE_URL` | `https://sandandsilk.co.zw` | Canonical URL for link previews |

## Deploy to Cloudflare Pages (free)

1. Sign up at [dash.cloudflare.com](https://dash.cloudflare.com) (free).
2. **Workers & Pages → Create → Pages → Connect to Git**, then choose this GitHub repository.
3. Build settings:
   - Build command: `npm run build` (the output folder `out` and Node 22 come from `wrangler.toml` and `.nvmrc`)
   - Environment variables: the settings above
4. **Save and Deploy.** Every push to `main` now redeploys automatically, and pull requests get preview links.
5. Optional: **Custom domains → Set up a domain** to attach your own domain.

### Signup database

The D1 database `sand-silk` and its `subscribers` table already exist, and `wrangler.toml` binds it to the site as `DB`, so no dashboard step is needed. To recreate the table elsewhere, run [`db/schema.sql`](db/schema.sql) in the D1 console.

See signups in D1's console:

```sql
SELECT email, country, city, created_at FROM subscribers ORDER BY created_at DESC;
```

## Project layout

```
app/                 Next.js pages, layout and global styles (brand tokens live in globals.css)
components/          Monogram (SS mark) and SignupForm
functions/api/       Cloudflare Pages Function for POST /api/subscribe
db/schema.sql        D1 table for signups
lib/site.ts          Site name, tagline and social settings
public/              Favicon
```

## Brand tokens

| Token | Hex | Use |
| --- | --- | --- |
| Sand | `#F4E8DC` | Page background |
| Linen | `#EEE2D6` | Cards, inputs |
| Dune | `#E2CCB5` | Shadow, image backdrops |
| Chocolate | `#48290C` | Logo, headings, text, primary button |
| Taupe | `#776652` | Taglines, captions |
| Olive Deep | `#3D4A2B` | Secondary accent |
| Dark Honey | `#B8862B` | Decorative only, never text on Sand |
| Ink | `#121110` | Black accents |
