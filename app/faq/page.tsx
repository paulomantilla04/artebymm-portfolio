
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Scheherazade_New } from "next/font/google";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Datos de ejemplo para las preguntas frecuentes. Puedes editar esto.
const faqData = [
  {
    question: "¿Cómo agendar un pedido?",
    answer:
      "Para agendar y apartar tu lugar se requiere un 50% de anticipo. El 50% restante se paga cuando se envíe el primer avance (boceto pasado al lienzo). Una vez enviado el primer avance, tendrás un máximo de 10 días para liquidar el restante. En caso de no liquidar en ese plazo, el lienzo podrá reutilizarse.",
  },
  {
    question: "¿Los anticipos o pagos son reembolsables?",
    answer:
      "No. Una vez realizado el pago o anticipo no se realizan reembolsos bajo ninguna circunstancia. El anticipo asegura tu lugar en la lista de espera y la compra de materiales, por lo que no es posible revertirlo.",
  },
  {
    question: "¿Realizan envíos?",
    answer:
      "Sí. Envío GRATIS a todo México (excepto tamaños extra grandes). Envíos internacionales desde $35 USD.",
  },
  {
    question: "¿El proceso del cuadro se publica en redes sociales?",
    answer:
      "Todos los cuadros pueden ser fotografiados o grabados durante su proceso como parte del contenido artístico y documental del trabajo. Si no deseas que tu pedido aparezca en redes sociales o videos, deberás indicarlo al momento de realizar el pago. De lo contrario, se entenderá que autorizas el uso de imágenes o videos del proceso para portafolio o difusión.",
  },
  {
    question: "¿Cuánto tarda un encargo?",
    answer:
      "Cada obra tiene un tiempo de elaboración personalizado según la lista de pedidos vigente. Se proporcionará una fecha estimada, aunque puede haber ligeros ajustes dependiendo de la carga de trabajo o condiciones técnicas.",
  },
  {
    question: "¿Puedo pedir un tamaño personalizado?",
    answer:
      "Sí. Si deseas un tamaño personalizado puede cotizarse especialmente. Solo debes enviar un mensaje para agendar tu pedido. Se aceptan únicamente un número limitado de encargos por mes.",
  },
];

export default function FAQPage() {
  return (
    <>
      <main>
        <Navbar />
        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F5F6F0] py-24">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 md:gap-16 md:px-12">
            <div className="flex flex-col items-center text-center">
              <h1
                className={`${scheherazade.className} text-balance font-light uppercase`}
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.4rem)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.15,
                  color: "#1A1A1A",
                }}
              >
                Preguntas Frecuentes
              </h1>
              <div
                className="mt-8 w-10 border-t"
                style={{ borderColor: "#C9A99A" }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              
            
              <div className="relative w-full h-125 lg:h-4/5 min-h-100 lg:sticky lg:top-24">
                <img
                  src="/images/montse-foto.avif" 
                  alt="Catálogo"
                  className="w-full h-full object-cover"
                />
              </div>
          
              <div className="flex flex-col justify-center gap-8">
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index + 1}`}
                      className="border-b border-zinc-200"
                    >
                      <AccordionTrigger className="text-lg font-semibold text-zinc-900 hover:text-[#BB9C87] hover:bg-zinc-50 rounded-lg px-5 py-4 transition-all">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-zinc-600 text-base px-5 pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* Botón Ver Catálogo */}
                <a
                  className="mt-2 inline-block border bg-[#BB9C87] px-8 py-4 text-xs font-sans uppercase tracking-[0.22em] text-white/90  transition-colors duration-200 hover:bg-white/10 hover:text-black cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  style={{
                    borderColor: "#BB9C87",
                    fontWeight: 500,
                    letterSpacing: "0.22em",
                    willChange: "transform",
                  }}
                  aria-label="Ver el catálogo de obras"
                >
                  Ver Catálogo
                </a>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
