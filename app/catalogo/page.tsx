import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Scheherazade_New } from "next/font/google";

const scheherazade = Scheherazade_New({ weight: ["400", "500", "600", "700"] });

export default function CatalogoPage() {
  
  const products = [
    { id: 1, title: "Pintura Óleo", href: "/catalogo/pintura-oleo" },
    { id: 2, title: "Digitales", href: "/catalogo/digitales" },
    { id: 3, title: "Llaveros", href: "/catalogo/llaveros" }
  ];
  
  return (
    <main>
      <Navbar />
      <section className="relative flex min-h-150 h-screen w-full items-center justify-center overflow-hidden bg-[#F5F6F0]">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:gap-16 md:px-12">
          <div className="flex flex-col items-center text-center">
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
            <div
              className="mt-8 w-10 border-t"
              style={{ borderColor: "#C9A99A" }}
            />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {products.map((product) => (
              <a
                key={product.id}
                href={product.href}
                className="flex flex-col items-center gap-4 rounded-lg bg-[#433328]  p-4 shadow-md transition-colors hover:bg-[#69574B]"
              >
                <h3
                  className={`${scheherazade.className} text-balance font-light uppercase`}
                  style={{
                    fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                    letterSpacing: "0.02em",
                    lineHeight: 1.15,
                    color: "#FFFFFF",
                  }}
                >
                  {product.title}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
