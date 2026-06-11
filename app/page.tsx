import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import { getAllPosts } from '@/lib/blog'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does your pricing work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You name the number before we ever pick up the phone. Fill out the quote form with your pickup address, dropoff address, home size, and a budget range you are comfortable with. We follow up within minutes to confirm availability and details. Most Boston local moves land between $400 and $900 depending on size and distance. Out-of-state jobs are scoped individually on a quick confirmation call — still no counter-offers, still no surprises.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you charge for stairs or extra floors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No stair fees, no elevator fees, no long-carry fees. Boston walk-ups are the default — Back Bay brownstones, Allston three-deckers, Fenway buildings with no elevator. The price you set is what you pay, period.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you insured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, fully. NoTimeMover carries general liability insurance on every move. Your belongings are covered from the moment we load the first item to the moment we set down the last box. If your building requires a Certificate of Insurance before move day, contact us a few days ahead and we will have it ready.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly will I hear back after I submit a quote request?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Within minutes during business hours, never more than a few hours. A real person reviews your request and reaches out by phone or text to confirm timing and details — not an automated drip sequence.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you handle Boston parking permits for the moving truck?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Boston requires a moving truck permit on most residential streets, applied through the city at least 10 to 14 business days before your move date. We will tell you exactly which streets need permits and how to file, or coordinate it directly with you.',
      },
    },
    {
      '@type': 'Question',
      name: 'How far in advance should I book a mover in Boston?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For weekday moves, three to five days notice usually works. For weekend moves — especially anything in September — book at least one to two weeks out. September 1 is the single busiest moving day in the country because of Boston lease cycles. Same-day moves are available on weekdays if you reach out before noon.',
      },
    },
  ],
}

export default function Home() {
  const posts = getAllPosts()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen bg-ink text-white">
        <Hero posts={posts} />
      </main>
      <Footer />
    </>
  )
}
