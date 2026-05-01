"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { templates, type TemplateId } from "@/emails/templates"
import { Mail, ChevronRight, ChevronLeft, Send, Users, Loader2, CheckCircle, AlertCircle } from "lucide-react"

type Audience = "todos" | "primera_mitad" | "segunda_mitad"

interface CampaignModalProps {
  totalCount: number
}

export function CampaignModal({ totalCount }: CampaignModalProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | null>(null)
  const [selectedAudience, setSelectedAudience] = useState<Audience | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const half = Math.ceil(totalCount / 2)
  const audiences = {
    todos: totalCount,
    primera_mitad: half,
    segunda_mitad: totalCount - half,
  }

  const audienceLabels: Record<Audience, string> = {
    todos: "Todos",
    primera_mitad: "Primera mitad",
    segunda_mitad: "Segunda mitad",
  }

  const reset = () => {
    setStep(1)
    setSelectedTemplate(null)
    setSelectedAudience(null)
    setStatus("idle")
    setMessage("")
  }

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setTimeout(reset, 300)
    }
  }

  const handleSend = async () => {
    if (!selectedTemplate || !selectedAudience) return

    setStatus("loading")

    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: selectedTemplate,
          audience: selectedAudience,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.error || "Ocurrió un error al enviar la campaña.")
      }
    } catch {
      setStatus("error")
      setMessage("Ocurrió un error de conexión. Por favor, intenta de nuevo.")
    }
  }

  const selectedTemplateData = templates.find((t) => t.id === selectedTemplate)
  const recipientCount = selectedAudience ? audiences[selectedAudience] : 0

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-[#433328] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5a4538]">
          <Mail size={16} />
          Enviar email
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md border-[#DDD5C8] bg-[#FAF7F2] p-0">
        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="font-serif text-xl font-light uppercase text-[#1A1A1A]">
              {status === "success"
                ? "¡Campaña enviada!"
                : status === "error"
                ? "Error al enviar"
                : "Nueva campaña"}
            </DialogTitle>
            <DialogDescription className="text-[#6B6257]">
              {status === "success"
                ? "Tu campaña se envió correctamente."
                : status === "error"
                ? "Ocurrió un problema. Revisa los detalles."
                : `Paso ${step} de 3`}
            </DialogDescription>
          </DialogHeader>

          {status === "success" && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <CheckCircle size={48} className="text-green-600" />
              <p className="text-green-800">{message}</p>
              <button
                onClick={() => handleClose(false)}
                className="rounded-lg bg-[#C9A99A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B8897A]"
              >
                Cerrar
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <AlertCircle size={48} className="text-red-500" />
              <p className="text-red-800">{message}</p>
              <button
                onClick={reset}
                className="rounded-lg border border-[#DCCFC6] bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-[#C9A99A] hover:text-[#433328]"
              >
                Intentar de nuevo
              </button>
            </div>
          )}

          {status === "idle" && step === 1 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-700">
                Elige una plantilla
              </p>
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    selectedTemplate === template.id
                      ? "border-[#C9A99A] bg-[#F7F2EE] ring-1 ring-[#C9A99A]"
                      : "border-[#DCCFC6] bg-white hover:border-[#C9A99A]"
                  }`}
                >
                  <p className="font-semibold text-[#1A1A1A]">{template.label}</p>
                  <p className="mt-1 text-sm text-[#6B6257]">{template.subject}</p>
                </button>
              ))}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedTemplate}
                  className="flex items-center gap-1 rounded-lg bg-[#C9A99A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B8897A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Siguiente
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {status === "idle" && step === 2 && (
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-700">
                Elige la audiencia
              </p>
              {(Object.keys(audiences) as Audience[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedAudience(key)}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                    selectedAudience === key
                      ? "border-[#C9A99A] bg-[#F7F2EE] ring-1 ring-[#C9A99A]"
                      : "border-[#DCCFC6] bg-white hover:border-[#C9A99A]"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">
                      {audienceLabels[key]}
                    </p>
                    <p className="mt-0.5 text-sm text-[#6B6257]">
                      {key === "primera_mitad"
                        ? `Primeras ${audiences[key]} personas en registrarse`
                        : key === "segunda_mitad"
                        ? `Últimas ${audiences[key]} personas en registrarse`
                        : `Todas las ${audiences[key]} personas registradas`}
                    </p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0EBE3]">
                    <Users size={16} className="text-[#433328]" />
                  </div>
                </button>
              ))}
              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 rounded-lg border border-[#DCCFC6] bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-[#C9A99A] hover:text-[#433328]"
                >
                  <ChevronLeft size={16} />
                  Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedAudience}
                  className="flex items-center gap-1 rounded-lg bg-[#C9A99A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#B8897A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Siguiente
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {status === "idle" && step === 3 && (
            <div className="space-y-4">
              <div className="rounded-xl border border-[#DCCFC6] bg-white p-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6257]">
                    Plantilla
                  </p>
                  <p className="font-medium text-[#1A1A1A]">
                    {selectedTemplateData?.label}
                  </p>
                  <p className="text-sm text-[#6B6257]">
                    {selectedTemplateData?.subject}
                  </p>
                </div>
                <div className="border-t border-[#F0EBE3] pt-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6257]">
                    Audiencia
                  </p>
                  <p className="font-medium text-[#1A1A1A]">
                    {selectedAudience ? audienceLabels[selectedAudience] : ""}
                  </p>
                  <p className="text-sm text-[#6B6257]">
                    {recipientCount} destinatario{recipientCount === 1 ? "" : "s"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 rounded-lg border border-[#DCCFC6] bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-[#C9A99A] hover:text-[#433328]"
                >
                  <ChevronLeft size={16} />
                  Atrás
                </button>
                <button
                  onClick={handleSend}
                  disabled={status === "loading"}
                  className="flex items-center gap-2 rounded-lg bg-[#433328] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5a4538] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Enviar campaña
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
