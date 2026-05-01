import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WaitlistForm } from "@/app/components/waitlist-form";
import { Scheherazade_New, Ephesis, Homemade_Apple } from "next/font/google";
import {
  RiShiningLine,
  RiMailLine,
  RiNotification4Line,
  RiHeartFill,
} from "react-icons/ri";

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const ephesis = Ephesis({
  weight: ["400"],
  subsets: ["latin"],
});

const homemade_apple = Homemade_Apple({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Curso de Retratos al Óleo",
  description:
    "Transforma tu hobby en ingresos. Únete a la lista de espera del curso de retratos al óleo por Montserrat Mantilla. Inicio estimado: septiembre 2026.",
  alternates: {
    canonical: "/cursos",
  },
  openGraph: {
    title: "Curso de Retratos al Óleo — Montserrat Mantilla",
    description:
      "Transforma tu hobby en ingresos. Curso online de retratos al óleo. Inicio estimado: septiembre 2026.",
    url: "https://artebymm.com/cursos",
  },
};

export default function CursosPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />

      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/waitlist-image-2.webp"
          alt="Estudio de Montserrat Mantilla"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <section className="flex min-h-screen items-center justify-center px-6 py-32">
        <div className="w-full max-w-lg">
          <div className="rounded-2xl border border-[#DDD5C8] bg-[#FAF7F2]/95 p-8 shadow-2xl backdrop-blur-sm md:p-10">
            <div className="mb-6 space-y-3 text-center">
              <h1
                className={`${scheherazade.className} text-3xl font-light uppercase text-[#1A1A1A] md:text-4xl`}
              >
                La lista de espera está abierta ✨
              </h1>
              <p className="text-[#1A1A1A] leading-relaxed ">
                Estoy creando una metodología{" "}
                <strong className="text-[#BB9C87]">simple</strong> y{" "}
                <strong className="text-[#BB9C87]">efectiva</strong> para que
                aprendas a pintar al óleo desde cero.
              </p>
            </div>

            <div className="border-t border-[#DDD5C8] my-6" />

            <div className="space-y-2 text-center flex flex-col items-center justify-center mb-5">
              <RiMailLine size={36} className="text-[#BB9C87]" />
              <p
                className={`${scheherazade.className} text-2xl font-light uppercase text-[#1A1A1A]`}
              >
                Únete a la lista de espera
              </p>
              <p className="">
                Sé la primera persona en enterarte cuando abra inscripciones,
                recibirás beneficios exclusivos.
              </p>
            </div>

            <WaitlistForm />

            <div className="space-y-2 text-center flex flex-row gap-2 items-center justify-center mt-5">
              <RiNotification4Line
                size={18}
                className="text-[#BB9C87] -translate-y-1.5"
              />
              <div className="text-sm">
                <p>No te preocupes, no te enviaré spam.</p>
                <p>Solo información importante.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
