export interface ServiceFaq {
  q: string
  a: string
}

export interface Service {
  slug: string
  /** ISO date (YYYY-MM-DD) this entry's own content was last edited — bump when editing this specific service, not the whole file. Drives per-page sitemap lastmod. */
  lastUpdated: string
  name: string
  eyebrow: string
  headline: string
  description: string
  metaTitle: string
  metaDescription: string
  whoItsFor: string[]
  faqs: ServiceFaq[]
  relatedLocationSlugs: string[]
  relatedOosSlugs: string[]
}

export const services: Service[] = [
  {
    slug: 'local-moving',
    lastUpdated: '2026-07-07',
    name: 'Local Moving',
    eyebrow: 'Local Moving',
    headline: 'Local moving in Massachusetts, on your terms.',
    description:
      'Most moves NoTimeMover handles are local — apartment to apartment, house to house, all within Greater Massachusetts. The process is the same everywhere: you set a budget before we ever call, and that budget is the price you pay. No hourly clock running while a crew "figures out" your move.',
    metaTitle: 'Local Moving Company in Boston, MA — NoTimeMover | No Surprise Fees',
    metaDescription: 'Local movers across Greater Boston and Massachusetts. Set your budget before we call — no hourly surprises. Fully insured, same-day response.',
    whoItsFor: [
      'Apartment-to-apartment moves within the same city or a nearby town',
      'House moves anywhere in Greater Massachusetts',
      'September 1st lease-turnover moves',
      'Single-item or partial moves that don\'t need a full crew day',
    ],
    faqs: [
      {
        q: 'What counts as a "local" move?',
        a: 'Anything within Massachusetts and the immediate Greater Boston area — a move within the same city, or between two nearby towns. If your move crosses state lines, see our long-distance moving page instead.',
      },
      {
        q: 'How is local moving priced?',
        a: 'You set a budget range before we contact you. We match it to a price tier based on home size and distance, so there\'s no hourly clock and no surprise number at the end.',
      },
      {
        q: 'Do you charge extra for stairs or walk-ups?',
        a: 'No. Walk-ups are priced the same as ground-floor moves. The budget you set is the price you pay, regardless of how many flights are involved.',
      },
      {
        q: 'How far in advance should I book a local move?',
        a: '2–3 days notice is usually enough, and same-day is often possible if you contact us before noon. During peak season — especially around September 1st — book 5–7 days ahead to lock in your date.',
      },
    ],
    relatedLocationSlugs: ['movers-boston-ma', 'movers-cambridge-ma', 'movers-somerville-ma', 'movers-allston-ma', 'movers-brighton-ma', 'movers-quincy-ma'],
    relatedOosSlugs: [],
  },
  {
    slug: 'long-distance-moving',
    lastUpdated: '2026-07-07',
    name: 'Long-Distance Moving',
    eyebrow: 'Long-Distance Moving',
    headline: 'Long-distance moving from Boston — your price, our truck.',
    description:
      'Moving out of Massachusetts doesn\'t have to mean a week of quote calls and vague binding estimates. Tell us your budget and where you\'re headed — we confirm what it covers and handle the logistics, from Certificates of Insurance for out-of-state buildings to coordinating drop-off timing.',
    metaTitle: 'Long-Distance Movers from Boston, MA — NoTimeMover | Fully Insured',
    metaDescription: 'Long-distance and out-of-state movers from Boston. Set your budget upfront — fully insured, no hidden fees. Serving NY, NJ, CT, PA, DC, and FL routes.',
    whoItsFor: [
      'Moves from Boston to another state',
      'Corporate relocations with a fixed budget',
      'College students moving home or to a new city',
      'Anyone who wants one flat price instead of a per-mile hourly estimate',
    ],
    faqs: [
      {
        q: 'Which out-of-state routes do you cover?',
        a: 'Our most common routes are Boston to New York, New Jersey, Connecticut, Philadelphia, Washington DC, and Florida — each has its own dedicated page with route-specific details below. Headed somewhere else? Enter your addresses in the booking flow and we\'ll confirm coverage.',
      },
      {
        q: 'Is the price really fixed for long-distance moves?',
        a: 'Yes. You set a budget range before we contact you, and we confirm exactly what it covers — no per-mile surprises added after the truck is loaded.',
      },
      {
        q: 'Do you provide a Certificate of Insurance for out-of-state buildings?',
        a: 'Yes — many out-of-state buildings (especially in NYC and DC) require a COI before move-in. We keep one ready on request.',
      },
      {
        q: 'How far ahead should I book a long-distance move?',
        a: 'For out-of-state moves, 5–7 days notice is recommended to properly coordinate timing on both ends. Around September 1st and during peak season, book as early as possible.',
      },
    ],
    relatedLocationSlugs: ['movers-boston-ma'],
    relatedOosSlugs: [
      'boston-to-new-york-movers',
      'boston-to-new-jersey-movers',
      'boston-to-connecticut-movers',
      'boston-to-philadelphia-movers',
      'boston-to-washington-dc-movers',
      'boston-to-florida-movers',
    ],
  },
  {
    slug: 'same-day-moving',
    lastUpdated: '2026-07-07',
    name: 'Same-Day Moving',
    eyebrow: 'Same-Day Moving',
    headline: 'Need to move today? We\'re ready.',
    description:
      'Lease fell through, other mover cancelled, or you just procrastinated — same-day moving is where NoTimeMover was built to work. Contact us before noon for the best chance at same-day availability, set your budget, and we confirm what we can do within the hour.',
    metaTitle: 'Same-Day Movers in Boston, MA — NoTimeMover | Fast Response',
    metaDescription: 'Need movers today? NoTimeMover offers same-day moving across Greater Boston. Contact before noon for the best availability. Fully insured, no surprise fees.',
    whoItsFor: [
      'Last-minute movers whose plans changed',
      'Anyone whose original mover cancelled',
      'Lease-ending emergencies',
      'Same-day partial or single-item moves',
    ],
    faqs: [
      {
        q: 'Can you really move me today?',
        a: 'Often, yes — same-day availability depends on crew schedules, but contacting us before noon gives you the best chance. Enter your details in the booking flow and we\'ll confirm within the hour.',
      },
      {
        q: 'Does same-day moving cost more?',
        a: 'No. The budget-first model works the same regardless of notice — you set a price range, we confirm what it covers. There\'s no rush surcharge baked in.',
      },
      {
        q: 'What if I contact you after noon?',
        a: 'We\'ll still try. Same-day requests after noon depend entirely on same-day crew availability, but it\'s always worth asking — next-morning is the fallback if today doesn\'t work.',
      },
      {
        q: 'What information do you need for a same-day move?',
        a: 'Just your pickup and dropoff addresses, home size, and budget — the same 60-second flow as any other move. We follow up immediately to confirm timing.',
      },
    ],
    relatedLocationSlugs: ['movers-boston-ma', 'movers-allston-ma', 'movers-brighton-ma', 'movers-cambridge-ma', 'movers-somerville-ma', 'movers-fenway-ma'],
    relatedOosSlugs: [],
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug)
}
