"use client"

import { useMemo, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCarousel } from "@/components/catalog/product-carousel"
import { Scheherazade_New } from "next/font/google"
import { currencyCodes, CurrencyCode, retratoOleoSizes } from "@/lib/products/retrato-oleo"
import { motion, Variants, useReducedMotion } from "motion/react"
import { FaWhatsapp } from "react-icons/fa"

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

const carouselImages = [
  "/images/retrato-5.avif",
  "/images/retrato-2.avif",
  "/images/retrato-1.avif",
  "/images/retrato-7.avif",
  "/images/retrato-10.avif",
  "/images/retrato-8.avif",
]

export default function PinturaOleoPage() {
  const reduceMotion = useReducedMotion()
  const [selectedSizeId, setSelectedSizeId] = useState("20x20")
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("MXN")

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
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.28, ease: "easeOut" },
        },
      }

  const selectedSize = useMemo(() => {
    return retratoOleoSizes.find((item) => item.id === selectedSizeId) ?? retratoOleoSizes[0]
  }, [selectedSizeId])

  const contactWhatsApp = (size: string, price: string) => {
    const message = `Hola, estoy interesad@ en el retrato ${size}. \nElegí como moneda: ${selectedCurrency}.`
    const url = `https://wa.me/9221994995?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <main>
      <Navbar />
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F5F6F0] py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerStagger}
          className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 md:px-12 lg:grid-cols-2 lg:gap-16"
        >
          <motion.div variants={fadeInUp}>
            <ProductCarousel images={carouselImages} alt="Retrato al óleo" />
          </motion.div>

          <motion.div variants={containerStagger} className="flex flex-col justify-center gap-6 lg:gap-8">
            <motion.h1
              variants={fadeInUp}
              className={`${scheherazade.className} text-balance text-4xl font-light uppercase md:text-5xl`}
              style={{ color: "#1A1A1A", lineHeight: 1.1 }}
            >
              Retrato al Óleo
            </motion.h1>

            <motion.p variants={fadeInUp} className="max-w-xl text-zinc-600">
              Cada retrato es una pieza única hecha a mano. Elige el tamaño ideal para tu espacio y te
              mostraré el precio y condiciones correspondientes.
            </motion.p>

            <motion.p variants={fadeInUp} className="max-w-xl text-zinc-600 text-sm font-medium">
              IMPORTANTE: Para agendarte y apartar tu lugar se hace el 50% de anticipo y el otro 50% al
              momento de mostrarte el primer avance. Se te manda foto por cualquier cambio que quieras hacer
              antes de enviar.
            </motion.p>

            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-700">
                Moneda
              </p>
              <div className="flex flex-wrap gap-2">
              {currencyCodes.map((currency) => {
                const isActive = selectedCurrency === currency

                return (
                  <button
                    key={currency}
                    type="button"
                    onClick={() => setSelectedCurrency(currency)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                      isActive
                        ? "border-[#433328] bg-[#433328] text-white"
                        : "border-zinc-300 bg-white text-zinc-700 hover:border-[#433328] hover:text-[#433328]"
                    }`}
                  >
                    {currency}
                  </button>
                )
              })}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-700">
                Tamaño
              </p>
              <div className="flex flex-wrap gap-2">
              {retratoOleoSizes.map((size) => {
                const isActive = size.id === selectedSize.id

                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSizeId(size.id)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? "border-[#BB9C87] bg-[#BB9C87] text-white"
                        : "border-zinc-300 bg-white text-zinc-700 hover:border-[#BB9C87] hover:text-[#433328]"
                    }`}
                  >
                    {size.title}
                  </button>
                )
              })}
              </div>
            </motion.div>

            <motion.div
              key={`${selectedSize.id}-${selectedCurrency}`}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: "easeOut" }}
              className="space-y-3 rounded-xl border border-[#DCCFC6] bg-white/80 p-6"
            >
              <h2 className={`${scheherazade.className} text-2xl font-medium text-[#2E251F]`}>
                {selectedSize.title}
              </h2>

              <p className="text-xl font-semibold text-[#433328]">{selectedSize.price[selectedCurrency]}</p>

              <p className="text-zinc-700">{selectedSize.description}</p>

              <p className="font-medium text-zinc-800">{selectedSize.included}</p>

              {selectedSize.extraPerson ? (
                <p className="text-sm text-[#7B5E4C]">
                  {selectedSize.extraPerson[selectedCurrency]} por persona extra.
                </p>
              ) : null}

              <button
                onClick={() => contactWhatsApp(selectedSize.title, selectedSize.price[selectedCurrency])}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-green-600 p-3 font-semibold text-white transition-all duration-300 hover:scale-[98%] hover:bg-green-700"
              >
                Contactar por WhatsApp
                <FaWhatsapp size={20} />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </main>
  )
}
