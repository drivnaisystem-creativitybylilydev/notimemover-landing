# Two-Button Strategy

## Client Request
Landing page should offer two paths:
1. Storage option (redirect to NoTimeStorage)
2. Moving quote (stay on this site)

## Final Button Labels

**Button 1 (Secondary):** "Need Storage?"
- Style: Ghost/outline button (border only, no fill)
- Action: href="https://notimestorage.com"
- Color: Blue outline

**Button 2 (Primary):** "Get Moving Quote"
- Style: Solid/filled button (bold, prominent)
- Action: href="/quote" (internal navigation)
- Color: Purple/blue gradient fill

## Recommended Layout

### Hero Section:
**Headline:** "Moving & Storage Made Simple"
**Subheadline:** "One platform for all your moving needs"

**Two-Button CTA:**
[Need Storage?]  [Get Moving Quote →]
     (secondary)      (primary CTA)

## Structure (Separate Pages - RECOMMENDED)

/ (homepage)
  ├── Hero with two buttons
  ├── Storage button → external redirect
  └── Moving button → /quote page

/quote (quote form page)
  └── 3-step form

**Why separate pages:**
- Cleaner UX
- Easier to track conversions
- Quote form gets dedicated space
