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

interface WaitlistConfirmationEmailProps {
  name: string
}

export function WaitlistConfirmationEmail({ name }: WaitlistConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Bienvenida a la lista de espera — Curso de retratos al óleo con Montserrat Mantilla
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
            Gracias por unirte a la lista de espera del curso{" "}
            <strong>
              Transforma tu hobby en ingresos ✨ — curso de retratos al óleo desde cero por
              Montserrat Mantilla
            </strong>
            .
          </Text>
          <Text style={text}>
            Estoy emocionada de que quieras acompañarme en este viaje creativo. El curso
            será <strong>online</strong> y tiene una fecha estimada de inicio en{" "}
            <strong>septiembre de 2026</strong>.
          </Text>
          <Text style={text}>
            Te contactaré por correo electrónico con todos los detalles, el temario
            completo y las opciones de inscripción tan pronto como estén listos.
          </Text>
          <Section style={buttonContainer}>
            <Button
              href="https://artebymm.com"
              style={button}
            >
              Visitar artebymm.com
            </Button>
          </Section>
          <Text style={text}>
            Mientras tanto, puedes seguirme en redes para ver mi trabajo diario:
          </Text>
          <Text style={text}>
            <Link href="https://www.instagram.com/artebymm/" style={link}>
              Instagram
            </Link>{" "}
            ·{" "}
            <Link href="https://www.tiktok.com/@artebymm_" style={link}>
              TikTok
            </Link>{" "}
            ·{" "}
            <Link href="https://www.facebook.com/share/1Doj2fHZR1/?mibextid=wwXIfr" style={link}>
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

export default WaitlistConfirmationEmail
