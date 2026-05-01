import { NextResponse } from "next/server"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import { z } from "zod"
import WaitlistConfirmationEmail from "@/emails/confirmation"

const resend = new Resend(process.env.RESEND_API_KEY)

const waitlistSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100),
  email: z.string().email("Correo electrónico inválido").max(200),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = waitlistSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Datos inválidos. Verifica tu nombre y correo electrónico." },
        { status: 400 }
      )
    }

    const { name, email } = result.data

    // Insert into Supabase using an anonymous client (no cookies)
    // This ensures the request always goes through the "anon" RLS policy
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )
    const { error: insertError } = await supabase
      .from("waitlist")
      .insert({ name, email })

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "Este correo electrónico ya está registrado en la lista de espera." },
          { status: 409 }
        )
      }
      console.error("Supabase insert error:", insertError)
      return NextResponse.json(
        { error: "Ocurrió un error al registrarte. Por favor, intenta de nuevo." },
        { status: 500 }
      )
    }

    // Send confirmation email
    try {
      await resend.emails.send({
        from: "Montserrat Mantilla <montserrat@artebymm.com>",
        to: email,
        subject: "Bienvenida a la lista de espera — Curso de retratos al óleo",
        react: WaitlistConfirmationEmail({ name }),
      })
    } catch (emailError) {
      console.error("Email send error:", emailError)
      // Don't fail the request if email fails — user is already registered
    }

    return NextResponse.json(
      { message: "Registro exitoso. ¡Te has unido a la lista de espera!" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Waitlist API error:", error)
    return NextResponse.json(
      { error: "Ocurrió un error inesperado. Por favor, intenta de nuevo." },
      { status: 500 }
    )
  }
}
