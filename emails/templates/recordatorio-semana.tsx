import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

interface RecordatorioSemanaEmailProps {
  name: string
}

export function RecordatorioSemanaEmail({ name }: RecordatorioSemanaEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        ¡En una semana anuncio todos los detalles del curso de retratos al óleo!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://artebymm.com/images/montse-firma.PNG"
            width="160"
            height="58"
            alt="Montserrat Mantilla"
            style={logo}
          />
          <Heading style={h1}>¡Hola, {name}!</Heading>
          <Text style={text}>
            Te escribo porque <strong>en una semana</strong> anunciaré todos los detalles
            del curso{" "}
            <strong>Transforma tu hobby en ingresos ✨</strong>.
          </Text>
          <Text style={text}>
            Esto incluye el temario completo, las fechas exactas, el precio y cómo
            inscribirte. Sé que muchas de ustedes están esperando este momento y
            quiero que seas de las primeras en enterarte.
          </Text>
          <Text style={text}>
            Mientras tanto, te invito a visitar mi sitio y seguirme en redes para
            no perderte ninguna novedad:
          </Text>
          <Section style={buttonContainer}>
            <Button href="https://artebymm.com" style={button}>
              Visitar artebymm.com
            </Button>
          </Section>
          <Text style={text}>
            <Link href="https://www.instagram.com/artebymm/" style={link}>
              Instagram
            </Link>{" "}
            ·{" "}
            <Link href="https://www.tiktok.com/@artebymm_" style={link}>
              TikTok
            </Link>{" "}
            ·{" "}
            <Link
              href="https://www.facebook.com/share/1Doj2fHZR1/?mibextid=wwXIfr"
              style={link}
            >
              Facebook
            </Link>
          </Text>
          <Text style={footer}>
            Con cariño,
            <br />
            Montserrat Mantilla
            <br />
            <Link href="https://artebymm.com" style={link}>
              artebymm.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#FAF7F2",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "40px 0",
}

const container = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #DDD5C8",
  borderRadius: "12px",
  margin: "0 auto",
  padding: "40px",
  maxWidth: "480px",
}

const logo = {
  margin: "0 auto 24px",
  display: "block",
}

const h1 = {
  color: "#1A1A1A",
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: "28px",
  fontWeight: 400,
  lineHeight: 1.2,
  margin: "0 0 24px",
  textAlign: "center" as const,
}

const text = {
  color: "#4A4A4A",
  fontSize: "16px",
  lineHeight: 1.6,
  margin: "0 0 16px",
}

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
}

const button = {
  backgroundColor: "#C9A99A",
  borderRadius: "8px",
  color: "#FFFFFF",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: 500,
  padding: "14px 28px",
  textDecoration: "none",
}

const link = {
  color: "#C9A99A",
  textDecoration: "underline",
}

const footer = {
  color: "#6B6257",
  fontSize: "14px",
  lineHeight: 1.6,
  margin: "32px 0 0",
  textAlign: "center" as const,
}

export default RecordatorioSemanaEmail
