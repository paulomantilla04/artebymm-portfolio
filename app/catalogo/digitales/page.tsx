"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Scheherazade_New } from "next/font/google"
import { AnimatePresence, motion, Variants, useReducedMotion } from "motion/react"
import { FaWhatsapp } from "react-icons/fa"

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

const carouselImages = [
  "/images/digitales/digital-4.avif",
  "/images/digitales/digital-2.avif",
  "/images/digitales/digital-3.avif",
  "/images/digitales/digital-1.avif",
  "/images/digitales/digital-5.avif",
]

const BASE_PRICE = 1950
const BASE_INCLUDED = 2
const EXTRA_PERSON_PRICE = 350
const PET_PRICE = 250

const formatPriceMXN = (amount: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(amount)

export default function DigitalesPage() {
  const reduceMotion = useReducedMotion()
  const [activeImage, setActiveImage] = useState(0)
  const [isSwitchingImage, setIsSwitchingImage] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})
  const [extraPeople, setExtraPeople] = useState(0)
  const [pets, setPets] = useState(0)

  const markImageAsLoaded = useCallback((src: string) => {
    setLoadedImages((prev) => (prev[src] ? prev : { ...prev, [src]: true }))
  }, [])

  const preloadImage = useCallback(
    (src: string) => {
      if (typeof window === "undefined" || loadedImages[src]) {
        return Promise.resolve()
      }

      return new Promise<void>((resolve) => {
        const img = new window.Image()
        img.src = src

        if (img.complete) {
          markImageAsLoaded(src)
          resolve()
          return
        }

        img.onload = () => {
          markImageAsLoaded(src)
          resolve()
        }

        img.onerror = () => resolve()
      })
    },
    [loadedImages, markImageAsLoaded],
  )

  useEffect(() => {
    carouselImages.forEach((src) => {
      void preloadImage(src)
    })
  }, [preloadImage])

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

  const totalPrice = useMemo(() => {
    return BASE_PRICE + extraPeople * EXTRA_PERSON_PRICE + pets * PET_PRICE
  }, [extraPeople, pets])

  const totalPeople = BASE_INCLUDED + extraPeople

  const changeImage = useCallback(
    async (nextIndex: number) => {
      if (nextIndex === activeImage) return

      const nextSrc = carouselImages[nextIndex]

      if (!loadedImages[nextSrc]) {
        setIsSwitchingImage(true)
        await preloadImage(nextSrc)
      }

      setActiveImage(nextIndex)
      setIsSwitchingImage(false)
    },
    [activeImage, loadedImages, preloadImage],
  )

  const goPrevImage = () => {
    const next = (activeImage - 1 + carouselImages.length) % carouselImages.length
    void changeImage(next)
  }

  const goNextImage = () => {
    const next = (activeImage + 1) % carouselImages.length
    void changeImage(next)
  }

  const contactWhatsApp = () => {
    const message = `Hola, estoy interesad@ en un retrato digital. \nElegí ${totalPeople} personas y ${pets} mascota(s). \nTotal estimado: ${formatPriceMXN(totalPrice)}.`
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
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-zinc-200 shadow-lg">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={activeImage}
                  src={carouselImages[activeImage]}
                  alt="Retrato digital"
                  className="absolute inset-0 h-full w-full object-cover"
                  onLoad={() => markImageAsLoaded(carouselImages[activeImage])}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: "easeOut" }}
                />
              </AnimatePresence>

              {isSwitchingImage ? (
                <div
                  className="absolute inset-0 animate-pulse bg-linear-to-r from-black/10 via-white/15 to-black/10"
                  aria-hidden="true"
                />
              ) : null}

              <button
                type="button"
                onClick={goPrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition-colors duration-150 hover:bg-black/60"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={goNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition-colors duration-150 hover:bg-black/60"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex justify-center gap-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => void changeImage(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors duration-150 ${
                    activeImage === index ? "bg-[#BB9C87]" : "bg-zinc-300 hover:bg-zinc-400"
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={containerStagger} className="flex flex-col justify-center gap-6 lg:gap-8">
            <motion.h1
              variants={fadeInUp}
              className={`${scheherazade.className} text-balance text-4xl font-light uppercase md:text-5xl`}
              style={{ color: "#1A1A1A", lineHeight: 1.1 }}
            >
              Retratos Digitales
            </motion.h1>

            <motion.p variants={fadeInUp} className="max-w-xl text-zinc-600">
              Retratos personalizados a partir de tu foto (se pueden unir fotos diferentes). Archivo
              digital en alta resolución listo para imprimir.
            </motion.p>
            
            <motion.p variants={fadeInUp} className="max-w-xl text-zinc-600 font-medium text-sm">
              IMPORTANTE: Para agendarte y apartar tu lugar se hace el 50% de anticipo y el otro 50% al momento de mostrarte el primer avance. Se te manda foto por cualquier cambio que quieras hacer antes de enviar.
            </motion.p>

            <motion.div variants={fadeInUp} className="space-y-4 rounded-xl border border-[#DCCFC6] bg-white/80 p-6">
              <div className="flex items-center justify-between">
                <p className="text-zinc-700">Incluye {BASE_INCLUDED} personas</p>
                <p className="font-semibold text-[#433328]">{formatPriceMXN(BASE_PRICE)}</p>
              </div>

              <div className="space-y-3 rounded-lg bg-[#F7F2EE] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-zinc-800">Personas extra</p>
                    <p className="text-sm text-zinc-600">+{formatPriceMXN(EXTRA_PERSON_PRICE)} c/u</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setExtraPeople((prev) => Math.max(0, prev - 1))}
                      aria-label="Disminuir personas extra"
                    >
                      <Minus />
                    </Button>
                    <span className="min-w-7 text-center text-base font-semibold text-zinc-800">{extraPeople}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setExtraPeople((prev) => prev + 1)}
                      aria-label="Aumentar personas extra"
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-zinc-800">Mascota</p>
                    <p className="text-sm text-zinc-600">+{formatPriceMXN(PET_PRICE)} c/u</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setPets((prev) => Math.max(0, prev - 1))}
                      aria-label="Disminuir mascotas"
                    >
                      <Minus />
                    </Button>
                    <span className="min-w-7 text-center text-base font-semibold text-zinc-800">{pets}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setPets((prev) => prev + 1)}
                      aria-label="Aumentar mascotas"
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-1 border-t border-[#E6D8CF] pt-3">
                <p className="text-sm text-zinc-600">Configuración actual: {totalPeople} personas y {pets} mascota(s).</p>
                <p className="text-2xl font-semibold text-[#433328]">Total: {formatPriceMXN(totalPrice)}</p>
              </div>

              <button
                onClick={contactWhatsApp}
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
