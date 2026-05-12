# Agent Instructions — NoTimeMover

Persistent guidance for any AI agent working in this repo (Cursor, Claude Code, Codex, etc.). Read this **before** running shell commands.

## Project at a glance

- Next.js 14 (App Router), Tailwind, Framer Motion, TypeScript
- Single-page landing — `app/page.tsx` renders `<Hero />` + `<Footer />`
- The booking flow modal lives in `components/BookingFlow.tsx`
- Pricing math is in `lib/pricing.ts`; distance is stubbed in `lib/distance.ts`
- Authoritative scope: `PROJECT-BRIEF.md`. Phase-2 plan: `PHASE-2-GEOCODER.md`.
- Image prompts for icon + OG: `IMAGE-PROMPTS.md` (drops at `app/icon.png` and `app/opengraph-image.png`)

## CRITICAL — never run `npm run build` while `npm run dev` is running

The `.next/` folder is shared between dev and prod modes. Running both at once corrupts it and silently breaks the site:

- Symptom: `localhost:3000` returns HTML with HTTP 200 but the page is **blank** because every JS chunk and CSS file 404s.
- Root cause: `next build` overwrites `.next/` with production artifacts, while the running `next dev` keeps serving HTML that references dev-mode chunk paths that no longer exist.

### Before running `npm run build`

1. Check whether a dev server is alive: `lsof -ti:3000` (also check `:3001` — Next.js falls back when 3000 is busy).
2. If anything is listening, kill it: `kill <pid>` then `sleep 1 && lsof -ti:3000` to confirm.
3. Wipe state: `rm -rf .next`
4. Now run `npm run build` (or `npm run dev`, but never both).

### If the page goes blank

```bash
# 1. Kill every next-server process
lsof -ti:3000 -ti:3001 | xargs kill -9 2>/dev/null

# 2. Nuke the build cache
rm -rf .next

# 3. Start one fresh dev server
npm run dev
```

Then confirm with `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/_next/static/chunks/main-app.js` — must be `200`, not `404`.

## Other operational rules

- **Don't kill terminals owned by Cursor itself** (the process named `Cursor Helper` — usually pid in the 80000–90000 range on this machine). Only kill `next-server` processes.
- **Static assets that need Next.js auto-discovery go in `app/`**, not `public/`:
  - `app/icon.png` → favicon + apple-touch-icon
  - `app/opengraph-image.png` → og:image + twitter:image
  - Anything else (raw images, downloads) goes in `public/`.
- **Image resizing on macOS** uses the built-in `sips`:
  - `sips -z 1024 1024 in.png --out app/icon.png` (square)
  - `sips -z 630 1200 in.png --out app/opengraph-image.png` (height first, then width)
- **Address inputs in `BookingFlow.tsx` Step 1 are structured (Street/City/State/ZIP), not autocomplete.** The Nominatim autocomplete was removed because it was inaccurate. Phase 2 swaps in Google Places Autocomplete (New) — full plan in `PHASE-2-GEOCODER.md`.
- **The pricing logic in `lib/pricing.ts` is intentionally hidden from the user**. Never surface the `base`, `equipment`, or `gas` numbers in UI copy — the customer only sees `yourPrice`, `premium`, `save`.

## Style / design constants

- Background `#050505` (Tailwind `ink`), coffee accents `#2A1405` / `#4b2e1e` / `#6B3A1F` / `#8B5230`
- Fonts: Geist Sans (body/UI), Geist Mono (mono), Instrument Serif (editorial accent on "You Set The Price.")
- All animations use the custom easings `ease-spring` / `ease-spring-snap` declared in `tailwind.config.js`
- No orange, no cream, no neon — the warm pre-pivot palette has been deleted; don't reintroduce it.
