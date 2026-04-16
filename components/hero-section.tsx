"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Scheherazade_New } from "next/font/google"
import { motion, Variants } from "motion/react"

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
})

export function HeroSection() {
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.2,
      },
    },
  }

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      id="home"
      aria-label="Portada"
      className="relative flex min-h-150 h-screen w-full items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
        style={{ zIndex: 0, willChange: "transform" }}
      >
        <Image
          src="/images/momo-hero.webp"
          alt="Estudio de arte — pinceles y paleta de colores cálidos sobre lienzo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.5)", zIndex: 1 }}
        aria-hidden="true"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center justify-center gap-5 px-6 text-center"
        style={{ zIndex: 2 }}
      >
        <motion.h1
          variants={fadeInUp}
          className={`text-balance text-5xl uppercase text-white lg:text-7xl ${scheherazade.className}`}
          style={{
            fontWeight: 400,
            lineHeight: 1.08,
          }}
        >
          Montserrat Mantilla
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className={`text-3xl text-white lg:text-5xl ${scheherazade.className}`}
        >
          Arte Personalizado
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="w-12 border-t"
          style={{ borderColor: "rgba(201,169,154,0.6)" }}
          aria-hidden="true"
        />

        <motion.a
          variants={fadeInUp}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          href="/catalogo"
          className="mt-2 inline-block border bg-[#BB9C87] px-8 py-4 text-xs font-sans uppercase tracking-[0.22em] text-white/90 transition-colors duration-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          style={{
            borderColor: "#BB9C87",
            fontWeight: 500,
            letterSpacing: "0.22em",
            willChange: "transform",
          }}
          aria-label="Ver el catálogo de obras"
        >
          Ver Catálogo
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      >
        <ChevronDown
          size={24}
          strokeWidth={1.2}
          className="animate-bounce text-white/50"
          style={{ animationDuration: "2s" }}
        />
      </motion.div>
    </section>
  )
}
