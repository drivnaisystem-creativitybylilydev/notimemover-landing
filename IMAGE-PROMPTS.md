# Image Generation Prompts — NoTimeMover

All prompts target the current dark Uber/Muvr aesthetic: OLED black `#050505`, coffee browns `#2A1405` / `#4b2e1e` / `#6B3A1F` / `#8B5230`. **No orange, no cream, no neon.**

Use with any image generator (Midjourney, DALL·E, Ideogram, Higgsfield). Drop results into the destinations listed.

---

## 1. Brand mark / app icon

**Save to:** `app/icon.png` (1024×1024) — Next.js App Router auto-derives all favicon + apple-touch sizes and injects the `<link rel="icon">` tags. Do NOT use `public/` — only the `app/` path triggers auto-discovery.

```
A premium minimalist app icon for "NoTimeMover" — a moving marketplace
brand. Square 1024x1024, centered geometric monogram.

Concept: A single brown moving box shown in 3/4 isometric perspective,
constructed from clean geometric strokes. The box has a subtle inner
shadow suggesting the lid flap. Optional micro-detail: a tiny
diagonal-line abstraction of motion lines or directional arrow on the
side of the box.

Color: Background pure black (#050505). Box rendered in two-tone coffee
brown — outer fill #4b2e1e, inner highlight #8B5230, hairline edge
#6B3A1F. No orange, no warm yellow, no cream. Subtle inner-light glow
on top edges only.

Style: Vector-clean, hairline-perfect edges, generous negative space
(at least 18% padding from all sides), no text, no gradients on the
background. Apple iOS app icon proportions. Premium fintech / mobility
brand language (think Linear, Vercel, Uber's lighter marks).

Negative: no logos, no text, no humans, no truck, no photorealism, no
3D shading, no drop shadows, no orange, no cream, no neon, no
multicoloured palette, no emoji-like style.
```

---

## 2. Open Graph share image

**Save to:** `app/opengraph-image.png` (1200×630). Next.js App Router auto-injects `<meta property="og:image">` and `<meta name="twitter:image">` for link previews on iMessage / Twitter / Slack / WhatsApp / LinkedIn. Do NOT use `public/` — only the `app/` path triggers auto-discovery.

```
A cinematic 1200x630 banner for "NoTimeMover" social link previews.
Composition: left half holds bold off-white text "Move Anywhere." on
the first line (geometric grotesque sans, Geist-style, semibold) and
"You Set The Price." on the second line in a fine editorial italic
serif (Instrument Serif style), slightly smaller. Both lines tightly
tracked, generous line height. Right half: a clean isometric brown
moving box illustration (matching the app icon style) floating in
empty space, with two subtle radial-gradient orbs in coffee-brown
glowing softly behind it.

Background: deep OLED black (#050505) with very subtle radial mesh in
coffee tones (#6B3A1F at 12% opacity), slight film-grain texture
overlay. Bottom-left corner: small uppercase mono caption "MASSACHUSETTS
· LICENSED & INSURED" in coffee-light (#8B5230), tracking 0.22em.
Top-right: subtle "NoTimeMover" wordmark in white at 16px.

Style: premium SaaS / mobility brand keyart. Negative space-heavy. No
clutter, no stock photography, no humans, no truck photos.

Negative: no orange, no cream, no busy gradients, no logo lockups, no
photorealistic imagery, no people, no truck photography, no neon, no
overly bright colors.
```

---

## 3. (Optional) Distinct 32×32 favicon

Only needed if you want a super-simplified version at small sizes. Otherwise Next.js will downsize the 1024×1024 brand mark.

**Save to:** `app/icon-32.png` (32×32) — use this filename so it doesn't collide with the 1024 brand mark above.

```
A radically simplified 32x32 favicon glyph for "NoTimeMover". A single
3/4 isometric brown moving box silhouette, no inner detail beyond a
single diagonal lid line. Coffee brown fill (#4b2e1e), no background
(transparent PNG). Edges sharp-pixel-perfect at 32x32, no anti-aliasing
artifacts, no text, no border.

Negative: no text, no padding inside the glyph beyond 1px breathing
room, no extra detail, no gradient.
```

---

## 4. (Optional) Custom SVG wordmark

Right now the floating nav + footer use a text wordmark. If you want a custom SVG with a glyph inline:

**Save to:** `public/wordmark.svg`

```
A premium minimalist wordmark for "NoTimeMover". Two-tone treatment:
"NoTime" in white, "Mover" in coffee-light (#8B5230 to #6B3A1F gradient),
both in a tightly-tracked geometric grotesque sans-serif at 600 weight,
letter-spacing -0.025em. Optional: a tiny inline brown box glyph
inserted between "NoTime" and "Mover" at 40% the height of the text
cap-height, vertically centered.

Format: transparent background, horizontal layout, 800x140px viewbox.
Vector-clean — exportable to SVG without rasterization.

Negative: no decorative flourishes, no shadow, no outline, no orange,
no all-caps treatment, no stretched letters.
```

---

## Drop-in checklist

After generating, place files and rebuild:

```bash
sips -z 1024 1024 ~/Downloads/notimemover-icon.png --out app/icon.png
sips -z 630 1200  ~/Downloads/notimemover-og.png   --out app/opengraph-image.png

cp ~/Downloads/notimemover-favicon-32.png app/icon-32.png
cp ~/Downloads/notimemover-wordmark.svg   public/wordmark.svg

npm run build
```

The `sips` calls resize and re-encode in one step (macOS built-in). Targets must be exactly 1024×1024 and 1200×630 — wrong aspect ratios get cropped or letterboxed by social platforms.

If you swap in `public/wordmark.svg`, swap the text wordmark in [components/Hero.tsx](components/Hero.tsx) and [components/Footer.tsx](components/Footer.tsx) for `<img src="/wordmark.svg" ... />`.
