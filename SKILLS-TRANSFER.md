# SKILLS-TRANSFER.md
## From: notimemover-landing (Next.js) → To: drivn-germany (Astro + Tailwind)

> **Purpose:** Claude Code reference guide for building German small-business client sites
> (barbers, restaurants, cafés, beauty studios, physio practices) in the drivn-germany Astro project.
> This document transfers UI/UX **techniques and patterns** — not colors, not branding.
> Every palette, every accent, every copy reference must be replaced entirely per client niche.

> **IMPORTANT:** The notimemover dark coffee palette (ink, obsidian, coffee-deep, coffee-light, bone)
> is a reference example of HOW to build a token system — not values to copy into client sites.
> German small business clients get their own palette per niche (see Section 11).

---

## 0. Skills — Installation & Auto-Invocation

### What's Installed

Both skill repos are installed in `drivn-germany/.agents/skills/` via `npx skills`.
Before starting any client site build, verify they're present:

```bash
ls .agents/skills/
# Expected output includes:
# design-taste-frontend   high-end-visual-design   ui-ux-pro-max
# minimalist-ui           industrial-brutalist-ui  ckm-design
# ckm-ui-styling          ckm-brand                brandkit
```

If missing, reinstall:
```bash
npx skills add https://github.com/Leonxlnx/taste-skill
npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
```

### Skill Inventory

**From `taste-skill` (12 skills):**

| Skill | When to invoke |
|---|---|
| `design-taste-frontend` | Primary skill — invoke before building any site. Sets DESIGN_VARIANCE/MOTION_INTENSITY/VISUAL_DENSITY |
| `high-end-visual-design` | When building premium-feel sites — enforces Doppelrand, Button-in-Button, spring physics |
| `minimalist-ui` | Cafés, beauty studios, health practices — clean editorial light themes |
| `industrial-brutalist-ui` | Barbers, mechanics, tattoo studios — raw, high-contrast aesthetic |
| `redesign-existing-projects` | Client has an existing Jimdo/Wix site to replace |
| `stitch-design-taste` | Combining multiple components into a coherent page layout |
| `brandkit` | Creating a brand identity alongside the website |
| `full-output-enforcement` | When Claude is truncating output — forces complete code delivery |
| `image-to-code` | Turning a design screenshot or reference image into code |
| `imagegen-frontend-web` | Generating UI from image prompts (web) |
| `imagegen-frontend-mobile` | Mobile-first UI generation |
| `gpt-taste` | GPT-compatible variant of taste-skill |

**From `ui-ux-pro-max` (7 skills):**

| Skill | When to invoke |
|---|---|
| `ui-ux-pro-max` | Comprehensive design database — 67 styles, 161 palettes, 57 font pairings, Astro support |
| `ckm:design` | Brand identity, logo generation, CIP, banner design |
| `ckm:ui-styling` | shadcn/ui + Tailwind component decisions |
| `ckm:brand` | Brand guidelines, consistency checklists |
| `ckm:design-system` | Setting up a full design token system |
| `ckm:banner-design` | Social media and web banners |
| `ckm:slides` | HTML presentations for proposals |

### Mandatory Skill Usage Routine

**Every new client site follows this sequence:**

1. Pick the niche → choose the right skill combination (see table below)
2. Invoke `design-taste-frontend` first — sets the design variance dials
3. Invoke `ui-ux-pro-max` — look up palettes and font pairings for the niche
4. Build with patterns from this document

**Niche → Skill pairing:**

| Niche | Primary skill | Secondary |
|---|---|---|
| Barber | `design-taste-frontend` (DESIGN_VARIANCE 7, MOTION 4) | `industrial-brutalist-ui` |
| Restaurant/Bistro | `design-taste-frontend` (DESIGN_VARIANCE 6, MOTION 4) | `minimalist-ui` |
| Café | `minimalist-ui` | `high-end-visual-design` |
| Beauty studio | `high-end-visual-design` | `minimalist-ui` |
| Physio/health | `minimalist-ui` | `ckm:ui-styling` |
| Premium/agency | `design-taste-frontend` (DESIGN_VARIANCE 8, MOTION 6) | `high-end-visual-design` |

---

## 1. Design System — Token Structure (Technique Reference)

> The token names below come from notimemover as a structural reference.
> **Every hex value must be replaced with niche-appropriate colors per client.**
> See Section 11 for ready-to-use per-niche palettes.
> Never ship a client site with `#050505`, `#0A0606`, `#2A1405`, or `#6B3A1F` — those are NoTimeMover's brand colors.

### Token Structure to Copy into `tailwind.config.mjs`

```js
// _template/tailwind.config.mjs
// REPLACE all hex values per client. Keep the token names — they map to component classes.
theme: {
  extend: {
    colors: {
      // ── RENAME THESE to match the niche — e.g. for a café: "espresso", "cream", "roast"
      // The token structure is what transfers. The values do not.
      bg:            'REPLACE',   // Page background (darkest or lightest tone)
      surface:       'REPLACE',   // Card/panel background
      accent:        'REPLACE',   // Accent surface background (highlighted areas)
      'accent-deep': 'REPLACE',   // Active/selected state fill
      'accent-fg':   'REPLACE',   // Accent foreground: icons, dots, kicker text
      muted:         'REPLACE',   // Body copy / subdued text on dark bg, or label text on light bg
      border:        'REPLACE',   // Hairline borders
    },
    fontFamily: {
      sans:  ['var(--font-sans)', 'SF Pro Display', 'system-ui', 'sans-serif'],
      mono:  ['var(--font-mono)', 'SF Mono', 'monospace'],
      serif: ['var(--font-serif)', 'Georgia', 'serif'],  // Only for editorial accent lines
    },
    fontSize: {
      // Explicit [size, lineHeight] tuples — never rely on Tailwind defaults for headings
      xs:   ['12px', '16px'],
      sm:   ['14px', '20px'],
      base: ['16px', '24px'],
      lg:   ['18px', '28px'],
      xl:   ['20px', '28px'],
      '2xl':['24px', '32px'],
      '3xl':['30px', '36px'],
      '4xl':['36px', '44px'],
      '5xl':['48px', '54px'],
      '6xl':['60px', '64px'],
      '7xl':['72px', '76px'],
    },
    spacing: {
      // Semantic scale — use these names in components, not arbitrary px values
      '4xs': '4px',   // micro gap: icon-to-label
      '3xs': '8px',   // tight gap: tag items
      '2xs': '12px',  // compact gap: label-to-input
      'xs':  '16px',  // standard gap: form fields
      'sm':  '24px',  // section sub-element gap
      'md':  '32px',  // card internal padding
      'lg':  '48px',  // section vertical padding (mobile)
      'xl':  '64px',  // section vertical padding (desktop)
      '2xl': '80px',  // hero top padding
    },
    transitionTimingFunction: {
      'spring':      'cubic-bezier(0.32, 0.72, 0, 1)',    // General spring — quick decelerate
      'spring-snap': 'cubic-bezier(0.22, 1, 0.36, 1)',    // Snappy spring — faster settle
    },
    transitionDuration: {
      700: '700ms',
      900: '900ms',
    },
    boxShadow: {
      // These are technique shadows — tint the rgba values to match the niche accent
      'bezel':        'inset 0 1px 1px rgba(255,255,255,0.08)',
      'bezel-strong': 'inset 0 1px 1.5px rgba(255,255,255,0.12)',
      'glow-accent':  '0 0 60px -10px rgba(ACCENT_RGB, 0.55)',   // replace ACCENT_RGB
    },
    animation: {
      'fade-in':           'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      'sway':              'sway 4.5s cubic-bezier(0.45, 0, 0.55, 1) infinite',
      'orb-a':             'orbA 28s ease-in-out infinite',
      'orb-b':             'orbB 34s ease-in-out infinite',
      'marquee-fast':      'marquee 8s linear infinite',
      'marquee-slow':      'marquee 28s linear infinite',
    },
    keyframes: {
      fadeIn:  { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      sway:    { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-4px)' } },
      orbA:    { '0%, 100%': { transform: 'translate3d(0%,0%,0) scale(1)' }, '50%': { transform: 'translate3d(8%,-6%,0) scale(1.1)' } },
      orbB:    { '0%, 100%': { transform: 'translate3d(0%,0%,0) scale(1.05)' }, '50%': { transform: 'translate3d(-10%,8%,0) scale(0.95)' } },
      marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
    },
  },
},
```

### Typography Scale

| Element | Classes | Notes |
|---|---|---|
| H1 hero | `text-[clamp(48px,11vw,112px)] font-semibold tracking-[-0.04em] leading-[0.95]` | Fluid scaling |
| H1 accent line | `font-serif italic` (editorial font) | Optional — use for creative/lifestyle niches only |
| H2 section | `text-[clamp(30px,6.5vw,46px)] font-semibold tracking-tight leading-[1.08]` | |
| H3 card | `text-lg font-semibold` | |
| Kicker/eyebrow | `text-[10px] sm:text-[12px] uppercase tracking-[0.28em] text-accent-fg font-semibold` | Precedes every section heading |
| Body | `text-[15px] text-muted leading-relaxed` | |
| Caption/micro | `text-[11px] uppercase tracking-[0.22em] font-medium` | Footer, labels |

### Custom Easing — When to Use Each

| Easing | Value | Use case |
|---|---|---|
| `ease-spring` | `cubic-bezier(0.32, 0.72, 0, 1)` | Primary CTA hover, modal entry, button press |
| `ease-spring-snap` | `cubic-bezier(0.22, 1, 0.36, 1)` | Dropdown open, accordion expand, quick micro-interactions |
| `ease-in-out` | (avoid) | Never use for interactive elements — too mechanical |

---

## 2. Premium Pattern Techniques

These are implementation patterns that work regardless of palette. Swap all color values to match the niche.

### Layer Stack (Hero Background)

```
z-0  [grid-bg]            — 64px CSS grid, opacity 0.025, radial-gradient mask
z-0  [.orb-a]             — large radial blur blob, accent color ~40% opacity, animate-orb-a (28s)
z-0  [.orb-b]             — second orb, opposite corner, animate-orb-b (34s)
z-0  [readability vignette] — radial-gradient from bg color at center → transparent
z-0  [bottom fade]        — linear-gradient to bg color at bottom
z-10 [content]
z-40 [floating nav]
z-50 [modal]
z-[1] [GrainOverlay]      — fixed, pointer-events-none (dark sites only)
```

### CSS for Orb + Grid (paste into globals.css, replace ACCENT with niche color)

```css
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  will-change: transform;
}
.orb-a {
  width: 520px; height: 520px;
  left: -10%; top: 10%;
  background: radial-gradient(circle, rgba(ACCENT_RGB, 0.40) 0%, rgba(ACCENT_RGB, 0) 70%);
  animation: orbA 28s cubic-bezier(0.45,0,0.55,1) infinite;
}
.orb-b {
  width: 620px; height: 620px;
  right: -15%; bottom: 0%;
  background: radial-gradient(circle, rgba(ACCENT_RGB, 0.25) 0%, rgba(ACCENT_RGB, 0) 70%);
  animation: orbB 34s cubic-bezier(0.45,0,0.55,1) infinite;
}
.grid-bg {
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse at center, #000 0%, transparent 70%);
}
```

### Bezel Shadow (Material Depth Technique)

Puts a 1px white highlight along the top inner edge of any card, simulating a lit surface.
Works on dark AND light sites — on light sites replace `rgba(255,255,255,...)` with `rgba(255,255,255,0.9)` and add a soft bottom shadow.

```html
<!-- Dark card -->
<div class="rounded-2xl border border-white/[0.08] bg-white/[0.02]"
     style="box-shadow: inset 0 1px 1px rgba(255,255,255,0.05);">

<!-- Light card -->
<div class="rounded-2xl border border-black/[0.06] bg-white"
     style="box-shadow: inset 0 1px 2px rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.06);">
```

### Doppelrand (Double-Bezel) Pattern

Used for modals and featured/recommended cards. Makes surfaces look physically nested.

```html
<!-- Outer shell -->
<div class="rounded-[2rem] p-1.5"
     style="background: rgba(255,255,255,0.04);
            box-shadow: inset 0 1px 1px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.08);">
  <!-- Inner core — slightly smaller radius -->
  <div style="border-radius: calc(2rem - 0.375rem);
              background: var(--color-surface);
              box-shadow: inset 0 1px 1px rgba(255,255,255,0.06);">
    <!-- content -->
  </div>
</div>
```

CSS classes (add to globals.css):
```css
.doppelrand-shell {
  @apply rounded-[2rem] p-1.5;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.08);
}
.doppelrand-core {
  border-radius: calc(2rem - 0.375rem);
  background: var(--color-surface);
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.06);
}
```

### Button-in-Button (CTA Pocket)

Every primary CTA has a trailing circular icon pocket nested inside it:

```html
<button class="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full
               bg-white text-[--color-bg] font-medium
               transition-transform duration-500 ease-spring active:scale-[0.97]">
  <span class="text-[15px] tracking-tight">Jetzt anfragen</span>
  <span class="w-11 h-11 rounded-full bg-black/10 flex items-center justify-center
               transition-transform duration-500 ease-spring
               group-hover:translate-x-[3px] group-hover:-translate-y-[1px]"
        style="box-shadow: inset 0 1px 1px rgba(255,255,255,0.5)">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  </span>
</button>
```

---

## 3. Animation Keyframes — Full Reference

### `fadeIn` → `animate-fade-in`
```css
/* Fade up 10px with opacity — 0.6s */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
**Use case:** Any element entering on page load — cards, nav items, headings.

### `sway` → `animate-sway`
```css
/* Gentle 4px vertical float, infinite — use on icons, decorative SVGs */
@keyframes sway {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-4px); }
}
```

### `orbA` / `orbB` → `animate-orb-a` / `animate-orb-b`
```css
/* Background blob drift — slow, 28–34s, barely perceptible */
@keyframes orbA {
  0%, 100% { transform: translate3d(0%,0%,0) scale(1); }
  50%       { transform: translate3d(8%,-6%,0) scale(1.1); }
}
@keyframes orbB {
  0%, 100% { transform: translate3d(0%,0%,0) scale(1.05); }
  50%       { transform: translate3d(-10%,8%,0) scale(0.95); }
}
```
Always: `position: absolute`, `filter: blur(80px)`, `pointer-events: none`, `will-change: transform`.

### `marquee` → `animate-marquee-fast` / `animate-marquee-slow`
```css
/* Seamless horizontal ticker — duplicate the items array for seamless -50% loop */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

**Astro marquee implementation:**
```astro
<div class="overflow-hidden relative rounded-2xl border border-white/[0.07]">
  <div class="pointer-events-none absolute inset-y-0 left-0 z-[2] w-20
              bg-gradient-to-r from-[--color-bg] to-transparent" aria-hidden="true"></div>
  <div class="pointer-events-none absolute inset-y-0 right-0 z-[2] w-20
              bg-gradient-to-l from-[--color-bg] to-transparent" aria-hidden="true"></div>
  <div class="flex flex-nowrap gap-x-10 py-5 pl-6 animate-marquee-slow will-change-transform"
       style="backface-visibility: hidden;">
    {[...items, ...items].map((item, i) => (
      <span key={i} class="shrink-0 text-[13px] font-medium tracking-tight whitespace-nowrap text-white/45">
        <span class="h-1 w-1 rounded-full bg-accent-fg/90 inline-block mr-3" aria-hidden></span>
        {item}
      </span>
    ))}
  </div>
</div>
```
**Use case:** Service areas, opening hours, dish names, team members, testimonials.

---

## 4. Framer Motion Patterns

> In drivn-germany (Astro), use as React islands with `client:load` or `client:visible`.
> Pure CSS/JS alternatives given where possible — prefer those for static sites.

### Standard Scroll Reveal

```tsx
// React island — wrap any section content
'use client'
import { motion } from 'framer-motion'
const SPRING = [0.32, 0.72, 0, 1] as const

export function ScrollReveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: SPRING, delay }}
    >
      {children}
    </motion.div>
  )
}
```

**Pure CSS + IntersectionObserver (no React needed):**
```css
@keyframes scrollReveal {
  from { opacity: 0; transform: translateY(18px); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0); filter: blur(0); }
}
.reveal { opacity: 0; }
.reveal.visible { animation: scrollReveal 0.65s cubic-bezier(0.32,0.72,0,1) forwards; }
```
```js
// <script> in .astro
const obs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
  { rootMargin: '-80px' }
)
document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
```

### Spring Physics Values

```ts
// Use these — do not invent new ones
{ type: 'spring', stiffness: 250, damping: 22, mass: 0.7 }  // CTA hover, buttons
{ type: 'spring', damping: 28, stiffness: 280, mass: 0.85 } // Modal entry/exit
{ type: 'spring', damping: 26, stiffness: 320, mass: 0.7 }  // Confirm dialogs, snappy
```

### Magnetic Hover Button

```tsx
'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function MagneticButton({ children }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      onMouseMove={e => {
        const rect = ref.current.getBoundingClientRect()
        const max = 14
        setOffset({
          x: Math.max(-max, Math.min(max, (e.clientX - (rect.left + rect.width/2)) * 0.18)),
          y: Math.max(-max, Math.min(max, (e.clientY - (rect.top + rect.height/2)) * 0.22)),
        })
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 22, mass: 0.7 }}
    >
      {children}
    </motion.button>
  )
}
```

### staggerChildren + variants (List/Grid Reveals)

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show:   { opacity: 1, y: 0, filter: 'blur(0px)',
            transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } },
}

<motion.div variants={container} initial="hidden" animate="show">
  {items.map(i => <motion.div key={i.id} variants={item}>{i.content}</motion.div>)}
</motion.div>
```

Stagger delays: form fields `0.06–0.07`, section steps `0.09–0.12`, card grids `0.09`.

### Using Framer Motion in Astro

```astro
---
// astro.config.mjs: integrations: [react()]
// npm install framer-motion @astrojs/react
---
<HeroAnimations client:load />
<SectionReveal client:visible />  <!-- below-fold: lazy -->
```

---

## 5. Component Patterns

### Floating Island Nav

```astro
<nav class="fixed inset-x-0 top-4 sm:top-5 z-40 flex justify-center pointer-events-none">
  <div class="pointer-events-auto inline-flex items-center gap-1 p-1.5 rounded-full backdrop-blur-xl"
       style="background: rgba(255,255,255,0.04);
              box-shadow: inset 0 1px 1px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.08);">
    <!-- logo -->
    <div class="inline-flex items-center h-9 px-4 text-[13px] font-medium tracking-tight">
      {clientName}
    </div>
    <!-- CTA pill -->
    <a href="#contact"
       class="group inline-flex items-center justify-center gap-2 h-9 pl-4 pr-1.5 rounded-full
              bg-white text-[--color-bg] text-[13px] font-medium
              transition-transform duration-500 ease-spring active:scale-[0.97]">
      <span>Anfragen</span>
      <span class="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center
                   transition-transform duration-500 ease-spring
                   group-hover:translate-x-[2px] group-hover:-translate-y-[1px]"
            style="box-shadow: inset 0 1px 1px rgba(255,255,255,0.5)">→</span>
    </a>
  </div>
</nav>
```

### Eyebrow / Kicker Tag

Always precedes H2 sections:
```html
<p class="text-[10px] sm:text-[12px] uppercase tracking-[0.28em] text-[--color-accent-fg] font-semibold mb-3">
  Über uns
</p>
<h2 class="text-[clamp(30px,6.5vw,46px)] font-semibold tracking-tight leading-[1.08]">
  Ihr Friseur im Herzen von Berlin.
</h2>
```

### Form Input Field

```css
/* globals.css — works on both dark and light themes, swap bg/border values per theme */
.input-field {
  @apply w-full rounded-2xl px-5 py-4 text-[15px] placeholder:text-current/30
         transition-all duration-300 ease-spring;
  background: rgba(255, 255, 255, 0.02);  /* dark: swap to rgba(0,0,0,0.03) on light */
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.04);
}
.input-field:focus {
  outline: none;
  border-color: var(--color-accent-fg);
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.06), 0 0 0 4px rgba(ACCENT_RGB, 0.15);
}
```

### FAQ — Native `<details>` (no JS)

```astro
{faqs.map(item => (
  <details class="group rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
    <summary class="cursor-pointer list-none px-5 py-4 flex items-center justify-between
                    gap-4 font-medium text-[15px]">
      {item.q}
      <span class="text-current/35 group-open:rotate-180 transition-transform duration-300 shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </summary>
    <div class="px-5 pb-4 pt-0 text-[14px] text-current/50 leading-relaxed border-t border-white/[0.06]">
      <p class="pt-4">{item.a}</p>
    </div>
  </details>
))}
```

### Netlify Contact Form (replaces multi-step BookingFlow)

```astro
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="space-y-4">
  <input type="hidden" name="form-name" value="contact" />
  <p class="hidden"><label>Bot: <input name="bot-field" /></label></p>

  <div>
    <label class="block text-[10px] uppercase tracking-[0.22em] text-current/40 mb-2 font-medium">Name</label>
    <input type="text" name="name" required class="input-field" placeholder="Max Mustermann" />
  </div>
  <div>
    <label class="block text-[10px] uppercase tracking-[0.22em] text-current/40 mb-2 font-medium">E-Mail</label>
    <input type="email" name="email" required class="input-field" placeholder="max@beispiel.de" />
  </div>
  <div>
    <label class="block text-[10px] uppercase tracking-[0.22em] text-current/40 mb-2 font-medium">Telefon</label>
    <input type="tel" name="phone" class="input-field" placeholder="+49 30 12345678" />
  </div>
  <div>
    <label class="block text-[10px] uppercase tracking-[0.22em] text-current/40 mb-2 font-medium">Nachricht</label>
    <textarea name="message" rows="4" class="input-field resize-none"
              placeholder="Wie können wir Ihnen helfen?"></textarea>
  </div>
  <button type="submit" class="btn-primary w-full justify-between">
    <span class="flex-1 text-center">Anfrage senden</span>
    <span class="btn-pocket" aria-hidden="true">→</span>
  </button>
</form>
```

No API routes, no backend, no env variables. Submissions appear in Netlify dashboard.

---

## 6. taste-skill — How to Use in drivn-germany

### Already Installed

```bash
# Confirm installation in drivn-germany:
ls .agents/skills/design-taste-frontend   # should exist
ls .agents/skills/high-end-visual-design  # should exist
ls .agents/skills/minimalist-ui           # should exist
```

### Invocation in Chat

```
/design-taste-frontend   ← before starting any site build
/high-end-visual-design  ← for premium/featured components
/minimalist-ui           ← for café, beauty, health niches
/industrial-brutalist-ui ← for barbers, mechanics, tattoo studios
/ui-ux-pro-max           ← for palette + font pairing lookup
```

### Dial Settings Per Niche

Paste at start of session after invoking `/design-taste-frontend`:

```
Set DESIGN_VARIANCE: 7, MOTION_INTENSITY: 4, VISUAL_DENSITY: 3
Niche: Friseur, light theme, German copy, Astro + Tailwind
```

| Niche | DESIGN_VARIANCE | MOTION_INTENSITY | VISUAL_DENSITY |
|---|---|---|---|
| Barber | 7 | 4 | 4 |
| Restaurant | 6 | 4 | 4 |
| Café | 5 | 3 | 3 |
| Beauty studio | 7 | 5 | 3 |
| Physio/health | 5 | 3 | 3 |
| Premium/agency | 8 | 6 | 4 |

### Which Skill Variant to Prioritize

- **`design-taste-frontend`** — default for all sites. Sets the design system dials.
- **`high-end-visual-design`** — layer on top when you need Doppelrand, Button-in-Button, or Awwwards-tier polish.
- **`minimalist-ui`** — override for clean light themes (café, beauty, health).
- **`ui-ux-pro-max`** — use for its palette + font pairing database; say `"give me a palette for a Berlin barber shop"`.

---

## 7. GrainOverlay Pattern

### When to Use

- **Use on dark sites only** — premium barber, high-end restaurant, agency
- **Skip on light sites** — café, beauty studio, health practice (grain looks dirty on warm white)
- On light sites: use `mix-blend-mode: multiply, opacity: 0.015` max, or just skip entirely

### Implementation (Astro — no React needed)

```astro
<!-- In BaseLayout.astro, directly in <body> before </body> -->
<div
  aria-hidden="true"
  style="pointer-events:none;position:fixed;inset:0;z-index:1;opacity:0.04;
         mix-blend-mode:overlay;
         background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\");
         background-size:220px 220px;">
</div>
```

**Rules:**
- Always `position: fixed` — never on a scrolling container (causes GPU repaint on scroll)
- Always `pointer-events: none`
- `z-index: 1` — lowest overlay z-index
- `opacity: 0.04` is the sweet spot — above 0.06 looks dirty

---

## 8. cn() Utility

```ts
// _template/src/lib/utils.ts — copy verbatim, works in Astro and React islands
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```bash
npm install clsx tailwind-merge
```

---

## 9. Contact Form vs Booking Flow

The notimemover BookingFlow (5-step modal, address autocomplete, pricing tiers) is
specific to a marketplace moving service. Do not port it.

For German small business sites use Netlify Forms (see Section 5) — zero backend,
submissions in dashboard, optional email notifications, DSGVO-compliant.

For clients who need appointment booking, use a third-party embed:
- **Calendly** — free, clean embed
- **Bookly** — if they have WordPress
- **Simply Book.me** — good German support

---

## 10. Global CSS to Copy

### Base `globals.css` (dark-theme version — adapt values for light)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--font-sans), -apple-system, system-ui, sans-serif;
  min-height: 100dvh;
  overflow-x: hidden;
}

input, button, select, textarea { font-family: inherit; }
input[type="date"], select { color-scheme: dark; }  /* remove on light sites */

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 999px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.16); }

/* Text selection — tint to niche accent */
::selection { background: rgba(ACCENT_RGB, 0.40); color: #ffffff; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

@layer components {
  .btn-primary {
    @apply relative inline-flex items-center gap-3 pl-6 pr-2 py-2
           bg-white font-medium rounded-full
           transition-transform duration-500 ease-spring active:scale-[0.98] cursor-pointer;
    color: var(--color-bg);
  }
  .btn-primary-text { @apply text-base tracking-tight; }
  .btn-pocket {
    @apply w-10 h-10 rounded-full flex items-center justify-center
           transition-transform duration-500 ease-spring;
    background: rgba(0, 0, 0, 0.10);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.5);
  }
  .btn-primary:hover .btn-pocket { transform: translate(2px, -1px); }

  .btn-ghost {
    @apply inline-flex items-center justify-center px-6 py-3 border border-white/10
           hover:border-white/25 font-medium rounded-full
           transition-colors duration-300 ease-spring cursor-pointer;
  }

  .input-field {
    @apply w-full rounded-2xl px-5 py-4 text-[15px] placeholder:text-current/30
           transition-all duration-300 ease-spring;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.04);
  }
  .input-field:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.04);
    border-color: var(--color-accent-fg);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.06), 0 0 0 4px rgba(ACCENT_RGB, 0.15);
  }

  .doppelrand-shell {
    @apply rounded-[2rem] p-1.5;
    background: rgba(255, 255, 255, 0.04);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.06), 0 0 0 1px rgba(255,255,255,0.08);
  }
  .doppelrand-core {
    border-radius: calc(2rem - 0.375rem);
    background: var(--color-surface);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.06);
  }

  .eyebrow {
    @apply inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase font-medium;
    letter-spacing: 0.22em;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.65);
  }

  .container-max { @apply max-w-7xl mx-auto px-5 sm:px-8; }

  .font-editorial {
    font-family: var(--font-serif);
    font-style: italic;
    letter-spacing: -0.02em;
  }
}
```

---

## 11. Per-Niche Palettes (Replace All notimemover Colors With These)

> Never use ink/obsidian/coffee-light in client sites. Use one of these palettes instead.

### Barber — Dark, Masculine

```css
:root {
  --color-bg: #0A0A0A;
  --color-surface: #141414;
  --color-accent: #1C2B3A;
  --color-accent-deep: rgba(28,43,58,0.6);
  --color-accent-fg: #4A7A9B;
  --color-muted: rgba(255,255,255,0.55);
  --color-border: rgba(255,255,255,0.07);
  --accent-rgb: 74,122,155;
}
```
Font pairing: Geist Sans + any geometric grotesque (Outfit, Cabinet Grotesk)

### Restaurant / Bistro — Warm, Appetizing

```css
:root {
  --color-bg: #FDFAF6;
  --color-surface: #F5F0E8;
  --color-accent: rgba(178,34,34,0.08);
  --color-accent-deep: rgba(178,34,34,0.15);
  --color-accent-fg: #B22222;
  --color-muted: rgba(26,10,10,0.5);
  --color-border: rgba(178,34,34,0.10);
  --accent-rgb: 178,34,34;
}
```
Font pairing: Geist Sans body + Instrument Serif (italic) for dish names / hero accent

### Café — Cozy, Artisan

```css
:root {
  --color-bg: #FDF8F2;
  --color-surface: #F4EDE0;
  --color-accent: rgba(107,66,38,0.08);
  --color-accent-deep: rgba(107,66,38,0.15);
  --color-accent-fg: #6B4226;
  --color-muted: rgba(42,26,10,0.5);
  --color-border: rgba(107,66,38,0.12);
  --accent-rgb: 107,66,38;
}
```

### Beauty Studio — Soft, Premium

```css
:root {
  --color-bg: #FDFBFA;
  --color-surface: #F7F2EF;
  --color-accent: rgba(139,58,92,0.07);
  --color-accent-deep: rgba(139,58,92,0.14);
  --color-accent-fg: #8B3A5C;
  --color-muted: rgba(26,10,18,0.5);
  --color-border: rgba(139,58,92,0.10);
  --accent-rgb: 139,58,92;
}
```

### Physio / Health — Clinical, Trustworthy

```css
:root {
  --color-bg: #F8FAFC;
  --color-surface: #EEF4F8;
  --color-accent: rgba(26,90,122,0.07);
  --color-accent-deep: rgba(26,90,122,0.14);
  --color-accent-fg: #1A5A7A;
  --color-muted: rgba(10,26,42,0.5);
  --color-border: rgba(26,90,122,0.10);
  --accent-rgb: 26,90,122;
}
```

Wire CSS variables into Tailwind:
```js
// tailwind.config.mjs
colors: {
  bg:           'var(--color-bg)',
  surface:      'var(--color-surface)',
  accent:       'var(--color-accent)',
  'accent-fg':  'var(--color-accent-fg)',
  muted:        'var(--color-muted)',
  border:       'var(--color-border)',
}
```

---

## 12. Quick Dependency Reference

```json
{
  "framer-motion": "^12.x",         // React islands with motion
  "geist": "^1.7.x",                // Geist Sans + Mono
  "clsx": "*",                      // cn() utility
  "tailwind-merge": "*",            // cn() utility
  "@astrojs/react": "*",            // Framer Motion islands in Astro
  "@phosphor-icons/react": "^2.x"   // Icons (taste-skill preference — no Lucide)
}
```

---

## 13. What NOT to Transfer from notimemover

**Colors — never use these hex values in client sites:**
- `#050505` (ink), `#0A0606` (obsidian), `#2A1405` (coffee), `#4b2e1e` (coffee-deep),
  `#6B3A1F` (coffee-light / mahogany), `#F5F1EB` (bone), `#1F1A17` (line)
- These are NoTimeMover's brand palette. Use the per-niche palettes from Section 11.

**Business logic (moving service specific):**
- `lib/distance.ts`, `lib/routeDistance.ts`, `lib/pricing.ts`, `lib/useAddressAutocomplete.ts`
- `app/api/distance/`, `app/api/lead/`, `app/api/outofstate-lead/`
- `components/MassMapBackground.tsx` — Massachusetts map
- `notimemover-*.json` — Google service account credentials

**Copy / branding:**
- "NoTimeMover", "NoTimeStorage" — any of these strings
- `STORAGE_SITE_URL`, Massachusetts city references, US state data
- `app/movers-*/page.tsx` — US city SEO pages

**Complex flows not needed for small business sites:**
- 5-step booking modal → replace with Netlify Form (Section 5)
- `NumberFlow` animated numbers — only needed for live pricing
- `googleapis` + `resend` dependencies — unless client needs email routing

---

*Generated 2026-05-25 · Updated to reflect skills installed via `npx skills` in drivn-germany*
