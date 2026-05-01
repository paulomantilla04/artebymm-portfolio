import { redirect } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/utils/supabase/server"
import { Scheherazade_New } from "next/font/google"
import { DashboardContent } from "./dashboard-content"

const scheherazade = Scheherazade_New({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: waitlist, error } = await supabase
    .from("waitlist")
    .select("id, name, email, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching waitlist:", error)
  }

  const entries = waitlist ?? []

  return (
    <div className="min-h-screen bg-[#F5F6F0]">
      <header className="border-b border-[#DDD5C8] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
          <div className="flex items-center gap-3">
            <Image
              src="/images/montse-firma.PNG"
              alt="Montserrat Mantilla"
              width={120}
              height={44}
              className="h-auto w-28"
            />
            <span className="hidden text-sm text-[#6B6257] md:inline">
              | Lista de espera
            </span>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 md:px-12">
        <div className="mb-8 flex flex-col gap-2">
          <h1
            className={`${scheherazade.className} text-3xl font-light uppercase text-[#1A1A1A]`}
          >
            Lista de espera
          </h1>
          <p className="text-[#6B6257]">
            Curso: <strong>Transforma tu hobby en ingresos</strong> · Retratos al óleo
          </p>
        </div>

        <DashboardContent entries={entries} />
      </main>
    </div>
  )
}

function LogoutButton() {
  return (
    <form action="/api/auth/signout" method="post">
      <button
        type="submit"
        className="rounded-lg border border-[#DCCFC6] bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-[#C9A99A] hover:text-[#433328]"
      >
        Cerrar sesión
      </button>
    </form>
  )
}
