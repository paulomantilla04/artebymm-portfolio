"use client";

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'motion/react';

const reviews = [
  {
    name: "SAM arte",
    username: "@samcj.arte",
    body: "Soy faaaaaan ✨💖 increíble trabajo bebé, felicidades!!! ✨",
    img: "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg",
  },
  {
    name: "Ariadne Huesca",
    username: "@ariadne.huesca",
    body: "Lloré cuando lo ví, lo amé 🥰 gracias 💗",
    img: "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg",
  },
  {
    name: "levario_ruby",
    username: "@levario_ruby",
    body: "😍😍😍",
    img: "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg",
  },
  {
    name: "nayeli",
    username: "@lagunasnayeli",
    body: "100% recomendada 🫶🏻",
    img: "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg",
  },
  {
    name: "Maritere Mantilla",
    username: "@mariteremantilla",
    body: "La mejor !! 👏🏻👏🏻",
    img: "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg",
  },
  {
    name: "Andrea Jimenez",
    username: "@andreajimenez53",
    body: "Mil gracias, excelente trabajo 🥹🫶🏻",
    img: "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg",
  },
  {
    name: "•Nisa•",
    username: "@._junjun",
    body: "Si tienen la oportunidad de hacerle un pedido, no la desaprovechen ❤️tiene un trabajo hermoso y realmente llega al corazón",
    img: "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg",
  },
  {
    name: "Edizet",
    username: "@edizett",
    body: "Ya me muero por ver como queda el mío 🥰",
    img: "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg",
  },
  {
    name: "Lenmy💕🥹😍",
    username: "@lenmydiscua",
    body: "Estoy encantada de tu trabajo a mi esposo le encanto su recuerdo con su papá ❤️",
    img: "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg",
  },
  {
    name: "artu",
    username: "@artu_cc",
    body: "Pintas hermoso 🤍",
    img: "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg",
  },
  {
    name: "Te de burbujas",
    username: "@tecitooo6",
    body: "Desde que te sigo eres una gran inspiración para mi, y por ti empecé a practicar realismo, admiro tu trabajo, es grandiosa la magia que llevas en tus manos 🥹❤️",
    img: "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg",
  },
  {
    name: "Luu",
    username: "@luu",
    body: "Yo solo vengo a compartir mi experiencia, muy amable la chica y una artista increíble, a mi esposo le encanto el cuadro con su abuelo🫰🏽✨",
    img: "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

type ReviewCardProps = {
  img: string;
  name: string;
  username: string;
  body: string;
};

const ReviewCard = ({ img, name, username, body }: ReviewCardProps) => {
  return (
    <figure className="relative h-full w-75 shrink-0 cursor-pointer overflow-hidden rounded-2xl p-6 mx-4 bg-white shadow-sm border  hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-row items-center gap-3">
        <img alt="Perfil del cliente" className="rounded-full object-cover" height="40" src={img} width="40" />
        <div className="flex flex-col">
          <figcaption className="text-sm font-sans" style={{ color: "#1A1A1A", fontWeight: 500 }}>
            {name}
          </figcaption>
          <p className="text-xs font-sans" style={{ color: "#C9A99A" }}>{username}</p>
        </div>
      </div>
      <blockquote className="mt-4 text-sm font-sans leading-relaxed" style={{ color: "#6B6257", fontWeight: 300 }}>
        "{body}"
      </blockquote>
    </figure>
  );
};

const Marquee = ({
  children,
  reverse = false,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) => {
  const marqueeStyle = `
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes marquee-reverse {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
    .animate-marquee {
      animation: marquee 40s linear infinite;
    }
    .animate-marquee-reverse {
      animation: marquee-reverse 40s linear infinite;
    }
  `;

  return (
    <div className="relative w-full overflow-hidden flex">
      <style dangerouslySetInnerHTML={{ __html: marqueeStyle }} />
      <div 
        className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        onMouseEnter={(e) => {
          if (pauseOnHover) {
            e.currentTarget.style.animationPlayState = 'paused';
          }
        }}
        onMouseLeave={(e) => {
          if (pauseOnHover) {
            e.currentTarget.style.animationPlayState = 'running';
          }
        }}
      >
        {children}
        {children} {/* Duplicado para un loop perfecto */}
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, {
    once: true,
    amount: 0.2
  });

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      animate={sectionInView ? 'visible' : 'hidden'}
      id="testimonials"
      initial="hidden"
      variants={staggerContainer}
      className="w-full py-24 md:py-32 relative" 
      style={{ background: "#F5F6F0" }} // Fondo consistente con la sección About
    >
      <div className="max-w-[100vw] mx-auto flex flex-col gap-12 md:gap-16">
        
        {/* Encabezado adaptado al nuevo diseño */}
        <motion.div className="flex flex-col items-center text-center px-6 md:px-12" variants={fadeInUp}>
          <h2
            className="font-serif text-balance"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              fontWeight: 300,
              letterSpacing: "0.02em",
              lineHeight: 1.15,
              color: "#1A1A1A",
            }}
          >
            TESTIMONIOS
          </h2>
          <div
            className="w-10 border-t mt-8"
            style={{ borderColor: "#C9A99A" }}
            aria-hidden="true"
          />
        </motion.div>
        
        {/* Carrusel de Testimonios */}
        <motion.div 
          className="relative flex w-full flex-col items-center justify-center overflow-hidden space-y-6 py-4"
          variants={fadeInScale}
        >
          <Marquee pauseOnHover>
            {firstRow.map((review, index) => (
              <ReviewCard key={`first-${index}`} {...review} />
            ))}
          </Marquee>
          
          <Marquee pauseOnHover reverse>
            {secondRow.map((review, index) => (
              <ReviewCard key={`second-${index}`} {...review} />
            ))}
          </Marquee>
          
          {/* Gradientes laterales para difuminar los bordes usando el color de fondo exacto */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 md:w-1/4 z-10" style={{ background: "linear-gradient(to right, #F5F6F0, transparent)" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 md:w-1/4 z-10" style={{ background: "linear-gradient(to left, #F5F6F0, transparent)" }} />
        </motion.div>

      </div>
    </motion.section>
  );
}