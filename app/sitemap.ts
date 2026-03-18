import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://artebymm.com'

  const routes = [
    '',
    '/catalogo',
    '/catalogo/retrato-oleo',
    '/catalogo/digitales',
    '/catalogo/llaveros',
    '/faq',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
