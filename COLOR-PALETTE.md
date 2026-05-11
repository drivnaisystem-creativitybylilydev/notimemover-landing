# NoTimeMoving Color Palette

## Primary Colors

**Cream Background:**
- HEX: #FDF8F3
- RGB: rgb(253, 248, 243)
- Tailwind: bg-[#FDF8F3]
- Usage: Main background, card backgrounds

**Dark Brown (Text):**
- HEX: #2A1405
- RGB: rgb(42, 20, 5)
- Tailwind: text-[#2A1405]
- Usage: Headings, body text, navbar text

**Brand Orange:**
- HEX: #E87020
- RGB: rgb(232, 112, 32)
- Tailwind: bg-[#E87020] or text-[#E87020]
- Usage: CTAs, accents, buttons

## Tailwind Config

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'cream': '#FDF8F3',
        'brown-dark': '#2A1405',
        'orange-brand': '#E87020',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
    },
  },
}
```

## Typography

**Headings:** font-montserrat font-bold
**Body:** font-lato

## Usage Examples

**Hero:**
- Background: Video with dark overlay
- Text: White (#FFFFFF)
- CTA: bg-orange-brand

**Navbar:**
- Background: bg-cream (on scroll) or transparent
- Text: text-brown-dark
- CTA Button: bg-orange-brand text-white

**Sections:**
- Background: bg-cream
- Headings: text-brown-dark font-montserrat
- Body: text-brown-dark font-lato
