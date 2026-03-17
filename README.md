# Artebymm Portfolio

A custom **Next.js 16** portfolio and product catalog website for Montserrat Mantilla (Artebymm).

The project includes:
- A branded landing page (`/`) with hero, about, portfolio, and testimonials sections.
- A catalog hub (`/catalogo`) and product detail pages.
- Product configurators with fixed multi-currency pricing (no live FX conversion).
- FAQ page and WhatsApp contact flows.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI:** React 19 + Tailwind CSS v4
- **Animations:** `motion` (`motion/react`)
- **UI primitives:** shadcn/ui + Radix UI
- **Icons:** Lucide + React Icons
- **Analytics:** `@vercel/analytics`

## Routes

- `/` – Home (Hero, About, Portfolio, Testimonials)
- `/catalogo` – Catalog overview
- `/catalogo/retrato-oleo` – Oil portrait product page (size + currency selector)
- `/catalogo/digitales` – Digital portrait product page (currency + configurator)
- `/catalogo/llaveros` – Keychain product page (currency + configurator with max items)
- `/faq` – Frequently asked questions

## Product Pages Overview

### Retrato al Óleo
- Shared image carousel component.
- Size selector (multiple canvas sizes).
- Fixed price selector by currency: **MXN / USD / EUR**.
- Fixed extra-person pricing by currency.
- WhatsApp CTA with selected options.

### Retratos Digitales
- Shared image carousel component.
- Currency selector: **MXN / USD / EUR**.
- Increment/decrement configurator for:
  - extra people
  - extra pets
- Dynamic total calculation using fixed business pricing.
- Reset configuration button.

### Llaveros Personalizados
- Shared image carousel component.
- Currency selector: **MXN / USD / EUR**.
- Increment/decrement configurator for:
  - extra people
  - extra pets
- Max **4 total figures** (people/pets) per keychain.
- Dynamic total + reset + WhatsApp CTA.

## Project Structure

```txt
app/
  layout.tsx
  page.tsx
  globals.css
  catalogo/
    page.tsx
    retrato-oleo/page.tsx
    digitales/page.tsx
    llaveros/page.tsx
  faq/page.tsx

components/
  navbar.tsx
  footer.tsx
  hero-section.tsx
  about-section.tsx
  portfolio-section.tsx
  testimonials-section.tsx
  catalog/
    product-carousel.tsx
  ui/
    ...shadcn/ui components

lib/
  utils.ts
  products/
    retrato-oleo.ts

public/
  images/
    ...site and product assets
```

## Getting Started

### 1) Install dependencies

Using pnpm (recommended, lockfile included):

```bash
pnpm install
```

Or npm:

```bash
npm install
```

### 2) Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3) Build for production

```bash
pnpm build
pnpm start
```

### 4) Lint

```bash
pnpm lint
```

## Scripts

From `package.json`:

- `dev` – start development server
- `build` – build production app
- `start` – run production server
- `lint` – run ESLint

## Styling and Design Notes

- Global theme tokens are defined in `app/globals.css`.
- Typography combines **Cormorant Garamond** and **Jost**.
- Main palette uses warm neutral tones and soft rose accents.
- Most interactive sections use lightweight `motion` animations with reduced-motion handling where relevant.

## Content and Pricing Data

- Oil portrait size/currency pricing is centralized in:
  - `lib/products/retrato-oleo.ts`
- Digital and keychain pricing/configuration currently live in their page files:
  - `app/catalogo/digitales/page.tsx`
  - `app/catalogo/llaveros/page.tsx`

## Important Implementation Notes

- `next.config.mjs` currently sets:
  - `typescript.ignoreBuildErrors = true`
  - `images.unoptimized = true`

If you want stricter CI/build safety, consider turning `ignoreBuildErrors` off after cleaning all TS errors.

## Deployment

The app is ready for deployment on Vercel (Analytics already integrated).

## License

This repository currently has no explicit license file.
