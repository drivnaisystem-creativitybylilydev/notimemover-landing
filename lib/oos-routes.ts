export interface OosRoute {
  slug: string
  destination: string
  destinationState: string
  headline: string
  description: string
  metaTitle: string
  metaDescription: string
  distance: string
  driveTime: string
  popularAreas: string[]
  routeFacts: string[]
}

export const oosRoutes: OosRoute[] = [
  {
    slug: 'boston-to-new-york-movers',
    destination: 'New York',
    destinationState: 'NY',
    headline: 'Boston to New York. Your price, our truck.',
    description:
      'The Boston–New York corridor is the most common out-of-state move in the Northeast. Tight Manhattan hallways, Brooklyn walk-ups, elevator reservations, COI requirements from building management — we know what this route actually involves. You set your budget before we contact you. No quote calls just to get a number.',
    metaTitle: 'Boston to New York Movers | NoTimeMover — Fully Insured',
    metaDescription:
      'Moving from Boston to New York? Fully insured MA–NY movers — no hidden fees, same-day response. Tell us your budget upfront. Manhattan, Brooklyn, Queens and beyond.',
    distance: '225 miles',
    driveTime: '4–5 hours',
    popularAreas: ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island', 'Hoboken', 'Jersey City'],
    routeFacts: [
      'NYC buildings require a Certificate of Insurance — we have it ready on request',
      'Most Manhattan buildings require elevator reservations 72+ hours in advance — we help coordinate',
      'Boston lease cycles mean Sept 1 Boston→NYC moves book weeks out — plan early',
    ],
  },
  {
    slug: 'boston-to-new-jersey-movers',
    destination: 'New Jersey',
    destinationState: 'NJ',
    headline: 'Boston to New Jersey. Fully insured, no surprises.',
    description:
      'New Jersey is one of the most common out-of-state routes from Boston — whether you are relocating for work in Newark, moving closer to the city in Hoboken, or settling in Princeton. We have done this run. You set your budget, we handle the rest.',
    metaTitle: 'Boston to New Jersey Movers | NoTimeMover — Fully Insured Long-Distance',
    metaDescription:
      'Moving from Boston to New Jersey? Fully insured movers serving the MA–NJ route. No surprise fees. Newark, Hoboken, Princeton, and all of NJ. Same-day response.',
    distance: '280 miles',
    driveTime: '5–6 hours',
    popularAreas: ['Newark', 'Jersey City', 'Hoboken', 'Princeton', 'Edison', 'Trenton', 'Cherry Hill'],
    routeFacts: [
      'NJ apartment buildings increasingly require COI — available on request',
      'I-95 and I-78 corridor — we route around typical bottlenecks with early departure',
      'Common relocation for Boston finance and pharma workers moving to the NJ suburbs',
    ],
  },
  {
    slug: 'boston-to-connecticut-movers',
    destination: 'Connecticut',
    destinationState: 'CT',
    headline: 'Boston to Connecticut. Short distance, done right.',
    description:
      'Connecticut is the closest out-of-state move from Boston — Hartford is under two hours, Stamford under three. But shorter distance does not mean less to manage. Building access, parking, and timing still need handling. We know this route and we move on your schedule.',
    metaTitle: 'Boston to Connecticut Movers | NoTimeMover — Fully Insured',
    metaDescription:
      'Moving from Boston to Connecticut? NoTimeMover handles the full MA–CT route — Hartford, New Haven, Stamford, Greenwich. Fully insured. Tell us your budget — we follow up same day.',
    distance: '100–160 miles',
    driveTime: '2–3 hours',
    popularAreas: ['Hartford', 'New Haven', 'Stamford', 'Greenwich', 'Bridgeport', 'Norwalk', 'Waterbury'],
    routeFacts: [
      'Stamford and Greenwich are popular relocations for Boston finance workers commuting to NYC',
      'Yale, UConn, and Wesleyan moves are common — we handle student and family moves equally',
      'Short enough for a single-day move even for larger apartments',
    ],
  },
  {
    slug: 'boston-to-philadelphia-movers',
    destination: 'Philadelphia',
    destinationState: 'PA',
    headline: 'Boston to Philadelphia. One move, handled.',
    description:
      'Philadelphia is a growing destination for Boston movers — more affordable, central location, direct Amtrak corridor. Row homes, Center City high-rises, and South Philly neighborhoods all come with their own logistics. You set your budget upfront and we manage the details.',
    metaTitle: 'Boston to Philadelphia Movers | NoTimeMover — Fully Insured Long-Distance',
    metaDescription:
      'Moving from Boston to Philadelphia? Fully insured MA–PA movers. No surprise fees. Center City, South Philly, Main Line, and beyond. Tell us your budget — real person responds same day.',
    distance: '300 miles',
    driveTime: '5–6 hours',
    popularAreas: ['Center City', 'South Philadelphia', 'Fishtown', 'Northern Liberties', 'Main Line', 'West Chester', 'King of Prussia'],
    routeFacts: [
      'Philadelphia row homes often have narrow staircases — we factor that into every quote',
      'Boston to Philly is a direct I-95 run — reliable timing with early morning departure',
      'Increasingly popular for Boston renters priced out of the local market',
    ],
  },
  {
    slug: 'boston-to-washington-dc-movers',
    destination: 'Washington DC',
    destinationState: 'DC',
    headline: 'Boston to Washington DC. Distance handled.',
    description:
      'The Boston–DC move is a full day on the road and involves some of the most complex urban parking situations on the East Coast. Capitol Hill rowhouses, Georgetown permits, NoVa high-rises — we know what these buildings require. You tell us your budget. We handle what comes next.',
    metaTitle: 'Boston to Washington DC Movers | NoTimeMover — Fully Insured',
    metaDescription:
      'Moving from Boston to Washington DC? Fully insured long-distance movers for the MA–DC route. Georgetown, Capitol Hill, NoVa, and Maryland. No surprise fees, same-day response.',
    distance: '450 miles',
    driveTime: '7–8 hours',
    popularAreas: ['Georgetown', 'Capitol Hill', 'Adams Morgan', 'Arlington', 'Alexandria', 'Bethesda', 'Silver Spring'],
    routeFacts: [
      'DC and NoVa buildings frequently require elevator reservations and parking permits — we coordinate ahead',
      'Government and consulting relocations are common — we work around tight timelines',
      'Two-driver option available for this route on request',
    ],
  },
  {
    slug: 'boston-to-florida-movers',
    destination: 'Florida',
    destinationState: 'FL',
    headline: 'Boston to Florida. The full move, fully covered.',
    description:
      'Florida is one of the top relocation destinations from Massachusetts — retirees, remote workers, and families leaving New England winters behind. This is not a day trip. It is a 1,300-mile run that requires real planning, a real crew, and a real number you can count on before the truck is loaded.',
    metaTitle: 'Boston to Florida Movers | NoTimeMover — Fully Insured Long-Distance',
    metaDescription:
      'Moving from Boston to Florida? Fully insured long-distance movers for the MA–FL route. Miami, Orlando, Tampa, Fort Lauderdale, and beyond. Tell us your budget — we handle the rest.',
    distance: '1,300 miles',
    driveTime: '18–20 hours',
    popularAreas: ['Miami', 'Orlando', 'Tampa', 'Fort Lauderdale', 'Jacksonville', 'Naples', 'Sarasota'],
    routeFacts: [
      'MA–FL is one of the highest-volume long-distance moving routes in the US',
      'Florida HOA communities often have strict move-in windows and elevator rules — we confirm in advance',
      'Book at least 2–3 weeks ahead for this route — long-distance inventory fills faster than local',
    ],
  },
]

export function getOosRoute(slug: string): OosRoute | undefined {
  return oosRoutes.find((r) => r.slug === slug)
}

export function getAllOosSlugs(): string[] {
  return oosRoutes.map((r) => r.slug)
}
