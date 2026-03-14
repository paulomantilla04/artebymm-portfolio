import { Scheherazade_New, Gowun_Batang } from "next/font/google";
import { RiInstagramFill } from "react-icons/ri";
import { AiOutlineTikTok } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
});

const gowunBatang = Gowun_Batang({
  weight: ["400"],
});

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full py-24 md:py-32"
      style={{ background: "#F5F6F0" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col gap-12 md:gap-20">
        {/*  */}
        {/* Encabezado */}
        <div className="flex flex-col items-center text-center">

          <h2
            id="about-heading"
            className="font-serif font-light"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              letterSpacing: "0.02em",
              lineHeight: 1.15,
              color: "#1A1A1A",
            }}
          >
            ACERCA DE <span className="font-semibold">MI</span>
          </h2>
          
          {/* Divisor */}
          <div
            className="w-10 border-t mt-8"
            style={{ borderColor: "#C9A99A" }}
            aria-hidden="true"
          />
        </div>
    

        {/* Contenedor Flex: Imágenes (Izquierda) y Texto (Derecha) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
          {/* Contenedor Izquierdo: Dos imágenes rectangulares desfasadas */}
          <div className="flex flex-row justify-center lg:justify-start gap-4 sm:gap-6 w-full lg:w-1/2">
            {/* Imagen 1 */}
            <div className="relative w-40 sm:w-62.5 h-70 sm:h-100 overflow-hidden shrink-0">
              <img
                src="/images/studio-1.jpeg"
                alt="Montserrat Mantilla en su estudio de arte"
                className="w-full h-full object-cover object-center"
                style={{ filter: "saturate(0.88) contrast(1.04)" }}
              />
              {/* Subtle accent border */}
              <div
                className="absolute bottom-0 left-0 w-1/3 h-0.5"
                style={{ background: "#C9A99A" }}
                aria-hidden="true"
              />
            </div>

            {/* Imagen 2 (Con margen superior para dar el efecto escalonado) */}
            <div className="relative w-40 sm:w-62.5 h-70 sm:h-100 overflow-hidden shrink-0 mt-12 sm:mt-24">
              {/* Nota: Cambia el src por la segunda imagen que quieras mostrar */}
              <img
                src="/images/studio-2.jpeg"
                alt="Detalles del estudio de Montserrat"
                className="w-full h-full object-cover object-center"
                style={{ filter: "saturate(0.88) contrast(1.04)" }}
              />
            </div>
          </div>

          {/* Contenedor Derecho: Contenido de Texto */}
          <div className="flex flex-col gap-6 md:gap-8 w-full lg:w-1/2 lg:pt-8">
            <h3
              className={`${scheherazade.className} text-2xl md:text-3xl text-balance`}
              style={{ color: "#1A1A1A", fontWeight: 400 }}
            >
              Hola, soy{" "}
              <span style={{ fontWeight: 600 }}>Montserrat Mantilla</span>
            </h3>

            {/* Divider */}
            <div
              className="w-10 border-t"
              style={{ borderColor: "#C9A99A" }}
              aria-hidden="true"
            />

            {/* Párrafos */}
            <div
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
            </div>

            {/* Redes Sociales */}
            <div className="flex gap-4 text-2xl">
              <a
                href="https://www.instagram.com/artebymm/"
                className="hover:-translate-y-2 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiInstagramFill />
              </a>
              <a
                href="https://www.tiktok.com/@artebymm_"
                className="hover:-translate-y-2 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineTikTok />
              </a>
              <a
                href="https://www.facebook.com/share/1Doj2fHZR1/?mibextid=wwXIfr"
                className="hover:-translate-y-2 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookSquare />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
