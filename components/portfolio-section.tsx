"use client"

import { Scheherazade_New } from "next/font/google"
import { motion, Variants, useReducedMotion } from "motion/react"

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
})

export function PortfolioSection() {
  const reduceMotion = useReducedMotion()

  const containerStagger: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.02,
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

  const cardReveal: Variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.28, ease: "easeOut" },
        },
      }

  const works = [
    { id: 1, src: "/images/retrato-1.avif", alt: "obra de arte 1" },
    { id: 2, src: "/images/retrato-2.avif", alt: "obra de arte 2" },
    { id: 3, src: "/images/retrato-3.avif", alt: "obra de arte 3" },
    { id: 4, src: "/images/retrato-4.avif", alt: "obra de arte 4" },
    { id: 5, src: "/images/retrato-5.avif", alt: "obra de arte 5" },
    { id: 6, src: "/images/retrato-6.avif", alt: "obra de arte 6" },
    { id: 7, src: "/images/retrato-7.avif", alt: "obra de arte 7" },
    { id: 8, src: "/images/retrato-8.avif", alt: "obra de arte 8" },
    { id: 9, src: "/images/retrato-9.avif", alt: "obra de arte 9" },
    { id: 10, src: "/images/retrato-10.avif", alt: "obra de arte 10" },
    { id: 11, src: "/images/retrato-11.avif", alt: "obra de arte 11" },
    { id: 12, src: "/images/retrato-12.avif", alt: "obra de arte 12" },    
  ]

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="w-full bg-[#F5F6F0] py-24 md:py-32"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerStagger}
        className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:gap-16 md:px-12"
      >
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center text-center"
        >
          <h2
            id="portfolio-heading"
            className={`${scheherazade.className} text-balance font-light`}
            style={{
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              letterSpacing: "0.02em",
              lineHeight: 1.15,
              color: "#1A1A1A",
            }}
          >
            MI <span className="font-semibold">PORTAFOLIO</span>
          </h2>

          <motion.div
            variants={fadeInUp}
            className="mt-8 w-10 border-t"
            style={{ borderColor: "#C9A99A" }}
            aria-hidden="true"
          />
        </motion.div>

        <motion.div
          variants={containerStagger}
          className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-7"
        >
          {works.map((work) => (
            <motion.div
              key={work.id}
              variants={cardReveal}
              className="group relative w-full cursor-pointer overflow-hidden bg-neutral-100 transition-transform duration-200 hover:-translate-y-1"
              style={{ aspectRatio: "4/6" }}
            >
              <img
                src={work.src}
                alt={work.alt}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ filter: "saturate(1.05)" }}
              />
              <div
                className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/10"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
