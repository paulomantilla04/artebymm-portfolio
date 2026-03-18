"use client"

import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Scheherazade_New } from "next/font/google"
import { motion, Variants, useReducedMotion } from "motion/react"

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

export default function CatalogoPage() {
  const reduceMotion = useReducedMotion()

  const containerStagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.04,
          },
        },
      }

  const fadeInUp: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, ease: "easeOut" },
        },
      }

  const products = [
    { id: 1, title: "Retratos al Óleo", href: "/catalogo/retrato-oleo", src: "/images/catalogo/pintura-oleo.webp" },
    { id: 2, title: "Retratos Digitales", href: "/catalogo/digitales", src: "/images/catalogo/retratos-digitales.webp" },
    { id: 3, title: "Llaveros Personalizados", href: "/catalogo/llaveros", src: "/images/catalogo/llaveros.webp" },
  ]

  return (
    <main>
      <Navbar />
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F5F6F0] py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerStagger}
          className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:gap-16 md:px-12"
        >
          <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
            <h2
              id="portfolio-heading"
              className={`${scheherazade.className} text-balance font-light uppercase`}
              style={{
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                letterSpacing: "0.02em",
                lineHeight: 1.15,
                color: "#1A1A1A",
              }}
            >
              Catálogo
            </h2>
            <motion.div
              variants={fadeInUp}
              className="mt-8 w-10 border-t"
              style={{ borderColor: "#C9A99A" }}
            />
          </motion.div>

          <motion.div variants={containerStagger} className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {products.map((product) => (
              <motion.a
                key={product.id}
                variants={fadeInUp}
                href={product.href}
                className="group relative flex aspect-3/4 w-full flex-col items-center justify-end overflow-hidden rounded-xl shadow-lg transition-transform duration-200 hover:-translate-y-1"
              >
                <Image
                  src={product.src}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ filter: "saturation(1.15)" }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-200 group-hover:opacity-90" />

                <div className="relative z-10 mb-8 flex w-3/4 flex-col items-center justify-center rounded-lg bg-[#433328]/95 p-4 shadow-md backdrop-blur-sm transition-colors duration-200 group-hover:bg-[#69574B]">
                  <h3
                    className={`${scheherazade.className} text-balance text-center font-light uppercase`}
                    style={{
                      fontSize: "clamp(1.2rem, 2vw, 1.2rem)",
                      letterSpacing: "0.02em",
                      lineHeight: 1.15,
                      color: "#FFFFFF",
                    }}
                  >
                    {product.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </main>
  )
}
