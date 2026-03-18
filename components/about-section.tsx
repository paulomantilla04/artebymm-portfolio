"use client"

import Image from "next/image"
import { Scheherazade_New, Gowun_Batang } from "next/font/google"
import { RiInstagramFill } from "react-icons/ri"
import { AiOutlineTikTok } from "react-icons/ai"
import { FaFacebookSquare } from "react-icons/fa"
import { motion, Variants } from "motion/react"

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
})

const gowunBatang = Gowun_Batang({
  weight: ["400"],
})

const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full py-24 md:py-32"
      style={{ background: "#F5F6F0" }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerStagger}
        className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:gap-20 md:px-12"
      >
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center text-center"
        >
          <h2
            id="about-heading"
            className={`${gowunBatang.className} font-light`}
            style={{
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              letterSpacing: "0.02em",
              lineHeight: 1.15,
              color: "#1A1A1A",
            }}
          >
            ACERCA DE <span className="font-semibold">MI</span>
          </h2>

          <motion.div
            variants={fadeInUp}
            className="mt-8 w-10 border-t"
            style={{ borderColor: "#C9A99A" }}
            aria-hidden="true"
          />
        </motion.div>

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-20">
          <motion.div
            variants={fadeInLeft}
            className="flex w-full flex-row justify-center gap-4 sm:gap-6 lg:w-1/2 lg:justify-start"
          >
            <motion.div
              variants={fadeInUp}
              className="relative h-70 w-40 shrink-0 overflow-hidden sm:h-100 sm:w-62.5"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
            >
              <Image
                src="/images/studio-1.jpeg"
                alt="Montserrat Mantilla en su estudio de arte"
                fill
                sizes="(max-width: 640px) 160px, 250px"
                className="h-full w-full object-cover object-center"
              />

              <div
                className="absolute bottom-0 left-0 h-0.5 w-1/3"
                style={{ background: "#C9A99A" }}
                aria-hidden="true"
              />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative mt-12 h-70 w-40 shrink-0 overflow-hidden sm:mt-24 sm:h-100 sm:w-62.5"
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
            >
              <Image
                src="/images/montse-foto.avif"
                alt="Detalles del estudio de Montserrat"
                fill
                sizes="(max-width: 640px) 160px, 250px"
                unoptimized
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            className="flex w-full flex-col gap-6 md:gap-8 lg:w-1/2 lg:pt-8"
          >
            <motion.h3
              variants={fadeInUp}
              className={`${scheherazade.className} text-2xl text-balance md:text-3xl`}
              style={{ color: "#1A1A1A", fontWeight: 400 }}
            >
              Hola, soy <span style={{ fontWeight: 600 }}>Montserrat Mantilla</span>
            </motion.h3>

            <motion.div
              variants={fadeInUp}
              className="w-10 border-t"
              style={{ borderColor: "#C9A99A" }}
              aria-hidden="true"
            />

            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-5 font-sans leading-relaxed"
              style={{ color: "#6B6257", fontWeight: 300, fontSize: "1rem" }}
            >
              <p>
                La mente creativa detrás de @ARTEBYMM. Te ayudo a transformar
                recuerdos y momentos especiales en obras de arte atemporales.
              </p>
              <p>
                En Artebymm, entiendo la profunda conexión emocional que
                compartimos con nuestros seres queridos. Cada pincelada está
                impregnada de amor y emoción, buscando capturar la esencia y la
                belleza de los lazos que nos unen.
              </p>
              <p>
                Permíteme ser tu compañera en este viaje lleno de sentimientos y
                recuerdos. Juntos, podemos transformar tus momentos más
                preciados en obras de arte que celebren la vida, el amor y los
                momentos que nos definen.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex gap-4 text-2xl">
              <motion.a
                href="https://www.instagram.com/artebymm/"
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="transition-transform duration-150"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Artebymm"
              >
                <RiInstagramFill />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@artebymm_"
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="transition-transform duration-150"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de Artebymm"
              >
                <AiOutlineTikTok />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/share/1Doj2fHZR1/?mibextid=wwXIfr"
                whileHover={{ y: -3, scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className="transition-transform duration-150"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Artebymm"
              >
                <FaFacebookSquare />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
