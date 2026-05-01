"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/utils/supabase/client"
import { Scheherazade_New } from "next/font/google"
import { Loader2, AlertCircle } from "lucide-react"

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

export default function DashboardLoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setStatus("error")
      setErrorMessage("Correo o contraseña incorrectos.")
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F6F0] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Image
            src="/images/montse-firma.PNG"
            alt="Montserrat Mantilla"
            width={144}
            height={52}
            className="mx-auto mb-6 h-auto w-36"
          />
          <h1
            className={`${scheherazade.className} text-2xl font-light uppercase tracking-wide text-[#1A1A1A]`}
          >
            Administrador
          </h1>
          <p className="mt-2 text-sm text-[#6B6257]">
            Inicia sesión para ver la lista de espera
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-semibold uppercase tracking-[0.12em] text-zinc-700"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#DCCFC6] bg-white px-4 py-3 text-zinc-800 focus:border-[#C9A99A] focus:outline-none focus:ring-1 focus:ring-[#C9A99A] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-semibold uppercase tracking-[0.12em] text-zinc-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[#DCCFC6] bg-white px-4 py-3 text-zinc-800 focus:border-[#C9A99A] focus:outline-none focus:ring-1 focus:ring-[#C9A99A] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className={`flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-base font-semibold text-white transition-all duration-200 ${
              status === "loading"
                ? "cursor-not-allowed bg-[#B8897A]/80"
                : "bg-[#C9A99A] hover:bg-[#B8897A] hover:scale-[98%]"
            }`}
          >
            {status === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>

        {status === "error" && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}
