import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact NoTimeMover — Boston Movers',
  description: 'Get in touch with NoTimeMover, fully insured Boston movers. Questions about pricing, availability, or your upcoming move — send us a message.',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
