"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Download, Trash2, Users, Loader2 } from "lucide-react"
import { deleteWaitlistEntry } from "./actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface WaitlistEntry {
  id: string
  name: string
  email: string
  created_at: string
}

interface DashboardContentProps {
  entries: WaitlistEntry[]
}

export function DashboardContent({ entries: initialEntries }: DashboardContentProps) {
  const router = useRouter()
  const [entries, setEntries] = useState(initialEntries)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [entryToDelete, setEntryToDelete] = useState<WaitlistEntry | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  // Sync local state when server props change (e.g. after refresh)
  useEffect(() => {
    setEntries(initialEntries)
  }, [initialEntries])

  const total = entries.length

  const exportCSV = () => {
    const headers = ["Nombre", "Correo electrónico", "Fecha de registro"]
    const rows = entries.map((entry) => [
      entry.name,
      entry.email,
      new Date(entry.created_at).toLocaleString("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    ])

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n")

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `lista-de-espera-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const openDeleteDialog = (entry: WaitlistEntry) => {
    setDeleteError(null)
    setEntryToDelete(entry)
    setDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!entryToDelete) return

    setDialogOpen(false)
    setDeletingId(entryToDelete.id)
    setDeleteError(null)

    const result = await deleteWaitlistEntry(entryToDelete.id)

    if (result.success) {
      setEntries((prev) => prev.filter((e) => e.id !== entryToDelete.id))
      router.refresh()
    } else {
      setDeleteError(result.error || "No se pudo eliminar el registro.")
    }

    setDeletingId(null)
    setEntryToDelete(null)
  }

  const formattedEntries = useMemo(() => {
    return entries.map((entry) => ({
      ...entry,
      date: new Date(entry.created_at).toLocaleString("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    }))
  }, [entries])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 rounded-xl border border-[#DCCFC6] bg-white px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0EBE3]">
            <Users size={18} className="text-[#433328]" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-[#1A1A1A]">{total}</p>
            <p className="text-sm text-[#6B6257]">
              {total === 1 ? "registro" : "registros"} en total
            </p>
          </div>
        </div>

        <button
          onClick={exportCSV}
          disabled={entries.length === 0}
          className="flex items-center justify-center gap-2 rounded-lg border border-[#DCCFC6] bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-[#C9A99A] hover:text-[#433328] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={16} />
          Exportar CSV
        </button>
      </div>

      {deleteError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <p className="font-semibold">Error al eliminar</p>
          <p>{deleteError}</p>
        </div>
      )}

      {entries.length === 0 ? (
        <div className="rounded-xl border border-[#DCCFC6] bg-white p-12 text-center">
          <p className="text-lg text-[#6B6257]">No hay registros aún.</p>
          <p className="mt-1 text-sm text-[#6B6257]">
            Los registros aparecerán aquí cuando alguien se una a la lista de espera.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#DCCFC6] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#DDD5C8] bg-[#F7F2EE]">
                  <th className="px-6 py-3.5 font-semibold uppercase tracking-wider text-[#6B6257]">
                    Nombre
                  </th>
                  <th className="px-6 py-3.5 font-semibold uppercase tracking-wider text-[#6B6257]">
                    Correo electrónico
                  </th>
                  <th className="px-6 py-3.5 font-semibold uppercase tracking-wider text-[#6B6257]">
                    Fecha de registro
                  </th>
                  <th className="px-6 py-3.5 font-semibold uppercase tracking-wider text-[#6B6257]">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EBE3]">
                {formattedEntries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="hover:bg-[#FAF7F2] transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-[#1A1A1A]">
                      {entry.name}
                    </td>
                    <td className="px-6 py-4 text-zinc-600">{entry.email}</td>
                    <td className="px-6 py-4 text-zinc-500">{entry.date}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openDeleteDialog(entry)}
                        disabled={deletingId === entry.id}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-red-500 px-2 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Eliminar registro"
                      >
                        {deletingId === entry.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="bg-[#FAF7F2] border-[#DDD5C8]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1A1A1A] font-serif text-xl">
              ¿Eliminar registro?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#6B6257]">
              Estás a punto de eliminar a{" "}
              <strong className="text-[#1A1A1A]">{entryToDelete?.name}</strong>{" "}
              ({entryToDelete?.email}) de la lista de espera. Esta acción no se
              puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="border-[#DCCFC6] bg-white text-zinc-700 hover:bg-[#F0EBE3] hover:text-[#1A1A1A]">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
