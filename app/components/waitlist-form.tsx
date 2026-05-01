"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Scheherazade_New } from "next/font/google"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

export function WaitlistForm() {
  const reduceMotion = useReducedMotion()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
        setName("")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Ocurrió un error. Por favor, intenta de nuevo.")
      }
    } catch {
      setStatus("error")
      setMessage("Ocurrió un error de conexión. Por favor, intenta de nuevo.")
    }
  }

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: "easeOut" }}
      className="mx-auto w-full max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="waitlist-name"
            className="block text-sm font-semibold uppercase tracking-[0.12em] text-zinc-700"
          >
            Nombre completo
          </label>
          <input
            id="waitlist-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="w-full rounded-lg border border-[#DCCFC6] bg-white px-4 py-3 text-zinc-800 placeholder:text-zinc-400 focus:border-[#C9A99A] focus:outline-none focus:ring-1 focus:ring-[#C9A99A] transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="waitlist-email"
            className="block text-sm font-semibold uppercase tracking-[0.12em] text-zinc-700"
          >
            Correo electrónico
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full rounded-lg border border-[#DCCFC6] bg-white px-4 py-3 text-zinc-800 placeholder:text-zinc-400 focus:border-[#C9A99A] focus:outline-none focus:ring-1 focus:ring-[#C9A99A] transition-colors"
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
              Registrando...
            </>
          ) : (
            "Unirme a la lista de espera"
          )}
        </button>
      </form>

      {status === "success" && (
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-5 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
        >
          <CheckCircle size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">¡Registro exitoso!</p>
            <p className="text-sm">{message}</p>
          </div>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
        >
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Algo salió mal</p>
            <p className="text-sm">{message}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
