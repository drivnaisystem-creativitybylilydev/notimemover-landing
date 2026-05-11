# Design Requirements - NoTimeMoving

## Brand Identity (UPDATED - Based on Light Variant)
- Professional, trustworthy, modern with warmth
- Target: Homeowners/renters planning a move (age 25-55)
- Emotion: Stress relief, simplicity, trust, faith-based values
- Tagline: "Serving families and businesses with speed, care, and faith — Galatians 5:13"

## Color Palette (NEW - Light Theme)
**Background:** Cream/Light Beige (#FDF8F3)
**Primary Text:** Dark Brown (#2A1405)
**Brand Orange:** (#E87020) - energy, action, CTAs
**Accent:** Warm neutrals (tan, brown tones)

## Typography
**Headings:** Montserrat (bold, modern, clean) - 700-800 weight
**Body:** Lato (readable, friendly) - 400-600 weight
**Sizes:**
- H1: 64-72px desktop / 40-48px mobile
- H2: 48-56px desktop / 32-36px mobile
- Body: 16-18px, line-height 1.6-1.8

## Hero Section (VIDEO BACKGROUND)
- Full-screen hero with video background
- Video: Muted autoplay loop (generated via Higgsfield)
  - Concept: Cinematic shot of moving truck driving through suburban neighborhood, golden hour, smooth motion
  - Fallback: Gradient overlay if video doesn't load
- Dark overlay (rgba(0,0,0,0.4)) for text readability
- Headline: "We Move You Fast. No Time Wasted." (white text)
- Subheadline: "Serving families and businesses with speed, care, and faith — Galatians 5:13"
- CTA: Orange "Book Your Move" button
- Scroll indicator at bottom (animated)

## 3D & Animation Requirements

### Framer Motion (Scroll Animations)
- **Fade-up on scroll:** All sections fade in and slide up as they enter viewport
- **Stagger children:** Cards/items appear one after another (0.1s delay)
- **Parallax hero text:** Hero headline moves slower than scroll (depth effect)
- **Navbar transform:** Transparent → white background + shadow on scroll
- **Number counters:** Stats count up when section enters viewport

### Three.js / React Three Fiber (3D Elements)
- **Floating 3D object in hero:** Rotating box or abstract shape (subtle, background element)
- **Optional:** 3D moving truck model (if you have the model file)
- **Performance:** Mobile-friendly, low poly count

### CSS Transforms (Hover Effects)
- **Card tilt:** 3D perspective tilt on hover (subtle, 5-10deg)
- **Button lift:** Buttons lift on hover (translateY + shadow)
- **Image zoom:** Images scale slightly on hover (1.05x)

## Components Needed

### 1. Navbar
- Transparent on hero, white background on scroll
- Logo: SVG (no PNG) - NoTimeMoving logo
- Links: Services, About, Reviews, Contact
- CTA: Orange "Get a Quote" button
- Sticky position

### 2. Hero Section
- Video background (hero.mp4)
- Dark overlay
- Large headline + subheadline
- Two CTAs: "Book Your Move" (orange) + "Learn More" (outline)
- Scroll indicator (animated arrow)
- Optional: 3D floating element

### 3. Services Section
- 3 cards (Local Moving, Long Distance, Packing & Storage)
- Framer Motion: fade-up on scroll
- Icons (could be 3D if using Three.js)
- Hover: 3D tilt effect

### 4. Stats Section (Counter Animation)
- 4 stats in grid:
  * 500+ Moves Completed
  * 5★ Average Rating
  * 3hr Average Response Time
  * 100% Licensed & Insured
- Numbers count up from 0 when section enters viewport
- Orange numbers, brown labels

### 5. Testimonials Carousel
- Horizontal scroll
- Smooth drag interaction
- 3-4 testimonial cards
- Star ratings, customer names

### 6. Quote Form (Same as before, but updated colors)
- Keep 3-step structure
- Update colors: orange CTAs, cream backgrounds
- Framer Motion: smooth step transitions

### 7. CTA Banner
- Full-width orange background (#E87020)
- "Ready to Move? Get Your Free Quote"
- White text, white outline button

### 8. Footer
- Logo, navigation links
- "Galatians 5:13" tagline
- Contact info, service areas
- Legal links

## Mobile Considerations
- Video background: Use static image on mobile (performance)
- 3D elements: Reduce or remove on mobile
- Animations: Reduce motion on mobile (respect prefers-reduced-motion)
- Touch-friendly: 48x48px minimum tap targets

## Performance Targets
- Lighthouse score: 90+ on mobile
- Video: Compressed, max 5MB, WebM format with MP4 fallback
- 3D: Low poly, lazy load Three.js
- Animations: GPU-accelerated (transform/opacity only)

## Accessibility
- Video: Muted, has pause control
- Animations: Respect prefers-reduced-motion
- Color contrast: WCAG AA (4.5:1 minimum)
- Keyboard navigation: All interactive elements

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS (custom colors)
- Framer Motion (scroll animations)
- React Three Fiber (@react-three/fiber @react-three/drei) - 3D
- Higgsfield (hero video generation)

## Assets Needed
- Hero video (generate via Higgsfield)
- NoTimeMoving logo (SVG)
- Service icons
- Testimonial photos (optional)
