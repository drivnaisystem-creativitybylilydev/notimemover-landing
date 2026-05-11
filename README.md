# NoTimeMoving Landing Page

A professional, mobile-first landing page for the NoTimeMoving moving & storage marketplace.

## Features

- **Responsive Design**: Mobile-first design that looks great on all devices (375px → 1920px+)
- **Two-Page Structure**:
  - Homepage (`/`) - Hero section, trust signals, how it works, and footer
  - Quote Form (`/quote`) - 3-step multi-screen form with progress indicator
- **Form Features**:
  - Step 1: Moving locations & date
  - Step 2: Home size selection with instant price estimates
  - Step 3: Contact information
  - Thank you page with submitted data summary
  - Full form validation
- **Professional Design**:
  - Deep Blue (#1E40AF) primary color
  - Purple (#7C3AED) secondary for CTAs
  - Orange (#F59E0B) accent color
  - Clean typography and generous whitespace
  - Smooth animations and transitions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create an optimized production build:

```bash
npm run build
npm start
```

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   ├── quote/
│   │   └── page.tsx        # Quote form page
│   └── globals.css         # Global styles & Tailwind imports
├── components/
│   ├── Hero.tsx            # Hero section with CTAs
│   ├── TrustSignals.tsx    # Trust badges section
│   ├── HowItWorks.tsx      # 3-step process section
│   ├── Footer.tsx          # Site footer
│   └── QuoteForm.tsx       # Multi-step quote form
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies & scripts
```

## Components

### Hero
Large hero section with main headline, subheadline, and two CTAs:
- "Need Storage?" - Links to https://notimestorage.com
- "Get Moving Quote" - Links to /quote

### TrustSignals
Three trust badges highlighting key benefits:
- 24-Hour Response Time
- Licensed & Insured Movers
- Best Price Guarantee

### HowItWorks
3-step process visualization:
1. Tell us where you're moving
2. Get instant estimate
3. Book your move

### QuoteForm
Multi-step form with client-side state management:
- Progress indicator shows step and completion percentage
- Form validation on each step
- Price estimates shown for each home size
- Thank you page on submission
- Console logging of form data (ready for backend integration)

## Color Scheme

| Color | Value | Usage |
|-------|-------|-------|
| Primary | #1E40AF | Trust, reliability |
| Secondary | #7C3AED | Primary CTA, modern |
| Accent | #F59E0B | Energy, action |
| Gray Scale | Tailwind defaults | Text, backgrounds |

## Typography

- **Headings**: Bold, 32-72px (responsive)
- **Body**: 16-18px, high readability
- **Font Stack**: System fonts for optimal performance

## Mobile Optimization

- Minimum tap targets: 48x48px
- Full-width form fields on mobile
- Vertical button stacking on small screens
- Touch-friendly input sizes (no zoom on iOS)
- Fast load time (<2s target)

## Form Data

When a quote is submitted, the form data is logged to the browser console:

```javascript
{
  movingFrom: "New York, NY",
  movingTo: "San Francisco, CA",
  moveDate: "2024-06-15",
  size: "2br",
  name: "John Doe",
  email: "john@example.com",
  phone: "(555) 123-4567"
}
```

**Phase 2**: This will be connected to a backend API/database.

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repo to Vercel dashboard
3. Deploy automatically on push

Or deploy manually:

```bash
npm i -g vercel
vercel
```

### Performance

- **First Load JS**: ~98kB
- **Static Prerendering**: All pages prerendered
- **Optimizations**:
  - CSS-in-JS with Tailwind
  - Image optimization (WebP format)
  - Minimal JavaScript bundle
  - Gzip compression

## Accessibility

- WCAG AA compliant
- Semantic HTML
- Proper heading hierarchy
- Form labels associated with inputs
- Focus states visible
- Sufficient color contrast

## Future Enhancements (Phase 2+)

- Backend API integration
- Database for quote storage
- Email notifications
- Marketplace platform
- Moving company dashboard
- Advanced pricing logic
