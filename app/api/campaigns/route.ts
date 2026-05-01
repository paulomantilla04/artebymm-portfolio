import { NextResponse } from "next/server"
import { Resend } from "resend"
import { render } from "@react-email/render"
import { createElement } from "react"
import { createClient } from "@/utils/supabase/server"
import { getTemplateById } from "@/emails/templates"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const campaignSchema = z.object({
  templateId: z.enum(["recordatorio-semana", "anuncio-apertura"]),
  audience: z.enum(["todos", "primera_mitad", "segunda_mitad"]),
})

export async function POST(request: Request) {
  try {
    // Verify authentication
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "No autorizado. Inicia sesión para enviar campañas." },
        { status: 401 }
      )
    }

    // Parse and validate body
    const body = await request.json()
    const result = campaignSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos. Verifica la plantilla y la audiencia." },
        { status: 400 }
      )
    }

    const { templateId, audience } = result.data
    const template = getTemplateById(templateId)

    if (!template) {
      return NextResponse.json(
        { error: "Plantilla no encontrada." },
        { status: 400 }
      )
    }

    // Fetch waitlist entries using the authenticated client (RLS requires authenticated role)
    const { data: waitlist, error: fetchError } = await supabase
      .from("waitlist")
      .select("email, name, created_at")
      .order("created_at", { ascending: true })

    if (fetchError) {
      console.error("Fetch waitlist error:", fetchError)
      return NextResponse.json(
        { error: "Error al obtener la lista de espera." },
        { status: 500 }
      )
    }

    if (!waitlist || waitlist.length === 0) {
      return NextResponse.json(
        { error: "No hay registros en la lista de espera." },
        { status: 400 }
      )
    }

    // Split audience
    const half = Math.ceil(waitlist.length / 2)
    const audiences = {
      todos: waitlist,
      primera_mitad: waitlist.slice(0, half),
      segunda_mitad: waitlist.slice(half),
    }

    const recipients = audiences[audience]

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "No hay destinatarios para esta audiencia." },
        { status: 400 }
      )
    }

    // Send emails in batches of 100 using Resend batch API
    const BATCH_SIZE = 100
    const batches: Promise<unknown>[] = []

    for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
      const batch = recipients.slice(i, i + BATCH_SIZE)
      const batchPayload = await Promise.all(
        batch.map(async (person) => ({
          from: "Montserrat Mantilla <montserrat@artebymm.com>",
          to: person.email,
          subject: template.subject,
          html: await render(
            createElement(template.component, { name: person.name })
          ),
        }))
      )
      batches.push(resend.batch.send(batchPayload))
    }

    const batchResults = await Promise.allSettled(batches)
    const failedBatches = batchResults.filter((r) => r.status === "rejected")

    if (failedBatches.length > 0) {
      console.error("Some batches failed:", failedBatches)
      return NextResponse.json(
        {
          error: `Error al enviar ${failedBatches.length} de ${batches.length} lotes de correos.`,
        },
        { status: 500 }
      )
    }

    // Log campaign to database (using authenticated client)
    const { error: logError } = await supabase.from("email_campaigns").insert({
      template_id: templateId,
      audience,
      recipients_count: recipients.length,
    })

    if (logError) {
      console.error("Log campaign error:", logError)
      // Don't fail the request — emails were sent successfully
    }

    return NextResponse.json(
      {
        success: true,
        recipientsCount: recipients.length,
        message: `Campaña enviada exitosamente a ${recipients.length} persona${recipients.length === 1 ? "" : "s"}.`,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Campaign API error:", error)
    return NextResponse.json(
      { error: "Ocurrió un error inesperado al enviar la campaña." },
      { status: 500 }
    )
  }
}
