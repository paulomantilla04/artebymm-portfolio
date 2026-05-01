import { RecordatorioSemanaEmail } from "./recordatorio-semana"
import { AnuncioAperturaEmail } from "./anuncio-apertura"

export const templates = [
  {
    id: "recordatorio-semana",
    label: "Recordatorio — 1 semana",
    subject: "¡En una semana anuncio todos los detalles del curso!",
    component: RecordatorioSemanaEmail,
  },
  {
    id: "anuncio-apertura",
    label: "Apertura del curso",
    subject: "¡Ya está aquí! El curso de pintura abre sus puertas",
    component: AnuncioAperturaEmail,
  },
] as const

export type TemplateId = (typeof templates)[number]["id"]

export function getTemplateById(id: TemplateId) {
  return templates.find((t) => t.id === id)
}
