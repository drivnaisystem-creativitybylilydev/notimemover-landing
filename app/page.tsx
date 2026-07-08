import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import FaqSection from '@/components/FaqSection'
import { getAllPosts } from '@/lib/blog'

const HOME_FAQS = [
  {
    q: 'Is NoTimeMover insured?',
    a: 'Yes — NoTimeMover is fully insured on every move. We carry general liability coverage across all jobs, and we can provide a certificate of insurance for any building that requires one before move day. Just mention it when you submit your quote request.',
  },
  {
    q: 'How does pricing work?',
    a: 'You set your budget before we ever contact you. Enter your pickup and dropoff addresses, choose your home size, and set a price range — we follow up to confirm what that covers and lock in timing. No surprise quotes after the fact.',
  },
  {
    q: 'How far in advance do I need to book?',
    a: 'We take moves with as little as 24 hours notice. Same-day moves are available if you reach out before noon. For weekends and peak season — especially around September 1st in Boston — booking 3–5 days ahead is recommended.',
  },
  {
    q: 'What areas do you serve?',
    a: 'All of Boston and Greater Massachusetts — Back Bay, Allston, South End, Somerville, Cambridge, Dorchester, Charlestown, Jamaica Plain, Newton, Quincy, and more. We also handle out-of-state moves from Massachusetts to any destination.',
  },
  {
    q: 'How long does a move take?',
    a: "A studio or 1-bedroom typically takes 2–4 hours. A 2-bedroom runs 4–6 hours. Larger homes and long-distance moves get scoped individually when you get your quote. We'll give you a realistic time window before move day.",
  },
  {
    q: 'Do you charge extra for stairs or walk-ups?',
    a: "No. Stair fees are not part of how we price. Whether you're in a triple-decker in Allston or a brownstone in Back Bay, the price you agree to is the price you pay — nothing added on move day.",
  },
  {
    q: "What's included in the price?",
    a: 'Labor, truck, and fuel. We move your items door to door — loading, transport, and unloading. Packing materials are separate. Any add-ons get discussed and agreed before move day, never dropped in as a surprise.',
  },
  {
    q: 'Do you do same-day moves?',
    a: "Yes. Contact us before noon and we'll confirm same-day availability. It's not a special service — it's built into how NoTimeMover operates. Short-notice moves are what the name is built around.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOME_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
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
      <FaqSection id="faq" faqs={HOME_FAQS} />
      <Footer />
    </>
  )
}
