"use client"

import { Mail, Users, Calendar } from "lucide-react"

interface Campaign {
  id: string
  template_id: string
  audience: string
  recipients_count: number
  sent_at: string
}

interface CampaignHistoryProps {
  campaigns: Campaign[]
}

const templateLabels: Record<string, string> = {
  "recordatorio-semana": "Recordatorio — 1 semana",
  "anuncio-apertura": "Apertura del curso",
}

const audienceLabels: Record<string, string> = {
  todos: "Todos",
  primera_mitad: "Primera mitad",
  segunda_mitad: "Segunda mitad",
}

export function CampaignHistory({ campaigns }: CampaignHistoryProps) {
  if (campaigns.length === 0) {
    return (
      <div className="rounded-xl border border-[#DCCFC6] bg-white p-8 text-center">
        <Mail size={24} className="mx-auto mb-2 text-[#C9A99A]" />
        <p className="text-[#6B6257]">No has enviado campañas aún.</p>
        <p className="mt-1 text-sm text-[#6B6257]">
          Las campañas enviadas aparecerán aquí.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="flex flex-col gap-3 rounded-xl border border-[#DCCFC6] bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F0EBE3]">
              <Mail size={16} className="text-[#433328]" />
            </div>
            <div>
              <p className="font-semibold text-[#1A1A1A]">
                {templateLabels[campaign.template_id] || campaign.template_id}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6B6257]">
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {audienceLabels[campaign.audience] || campaign.audience} ·{" "}
                  {campaign.recipients_count} persona
                  {campaign.recipients_count === 1 ? "" : "s"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(campaign.sent_at).toLocaleString("es-MX", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
