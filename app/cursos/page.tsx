import type { Metadata } from "next"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WaitlistForm } from "@/app/components/waitlist-form"
import { Scheherazade_New } from "next/font/google"

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

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
}

export default function CursosPage() {
  return (
    <main>
      <Navbar />
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F5F6F0] py-24">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-6 md:gap-16 md:px-12">
          <div className="flex flex-col items-center text-center gap-6">
            <h1
              className={`${scheherazade.className} text-balance font-light uppercase`}
              style={{
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                letterSpacing: "0.02em",
                lineHeight: 1.15,
                color: "#1A1A1A",
              }}
            >
              Transforma tu hobby en ingresos
            </h1>
            <p
              className="max-w-2xl text-lg md:text-xl"
              style={{ color: "#6B6257", lineHeight: 1.6 }}
            >
              Curso de retratos al óleo por{" "}
              <strong className="text-[#1A1A1A]">Montserrat Mantilla</strong>
            </p>
            <div className="w-10 border-t" style={{ borderColor: "#C9A99A" }} />
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-center w-full">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/catalogo/oleo/oleo-1.webp"
                alt="Retrato al óleo de Montserrat Mantilla"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <h2
                  className={`${scheherazade.className} text-2xl md:text-3xl font-light uppercase`}
                  style={{ color: "#1A1A1A", lineHeight: 1.2 }}
                >
                  Lista de espera
                </h2>
                <p className="text-zinc-600 leading-relaxed">
                  Aprende a crear retratos al óleo desde cero y convierte tu pasión
                  por el arte en una fuente de ingresos. Este curso online está
                  diseñado para llevarte paso a paso, sin importar tu nivel actual.
                </p>
                <ul className="space-y-2 text-zinc-600">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C9A99A]" />
                    Modalidad: <strong>Online</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C9A99A]" />
                    Inicio estimado: <strong>Septiembre 2026</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C9A99A]" />
                    Instructora: <strong>Montserrat Mantilla</strong>
                  </li>
                </ul>
                <p className="text-sm text-zinc-500">
                  Déjanos tu nombre y correo para ser el primero en recibir la
                  información de inscripción, descuentos exclusivos y el temario
                  completo.
                </p>
              </div>

              <WaitlistForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
