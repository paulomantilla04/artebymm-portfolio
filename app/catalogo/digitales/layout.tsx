import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retratos Digitales',
  description:
    'Retratos digitales personalizados en alta resolución, listos para imprimir.',
  alternates: {
    canonical: '/catalogo/digitales',
  },
}

export default function DigitalesLayout({ children }: { children: React.ReactNode }) {
  return children
}
