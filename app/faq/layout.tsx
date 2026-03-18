import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes',
  description:
    'Resuelve dudas sobre anticipos, tiempos de entrega, envíos y proceso de encargos en Artebymm.',
  alternates: {
    canonical: '/faq',
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
