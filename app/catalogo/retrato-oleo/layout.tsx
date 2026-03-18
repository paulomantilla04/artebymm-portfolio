import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retrato al Óleo',
  description:
    'Cotiza tu retrato al óleo personalizado en distintos tamaños. Obra original pintada a mano.',
  alternates: {
    canonical: '/catalogo/retrato-oleo',
  },
}

export default function OleoLayout({ children }: { children: React.ReactNode }) {
  return children
}
