"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, Pencil, Trash2, Search } from "lucide-react"
import type { Proposal } from "@/types"
import { formatCLP, formatDate } from "@/lib/utils"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const STATUS_OPTS: { value: string; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "draft", label: "Borrador" },
  { value: "sent", label: "Enviado" },
  { value: "accepted", label: "Aceptado" },
  { value: "rejected", label: "Rechazado" },
]

export function ProposalTable({ proposals: initial }: { proposals: Proposal[] }) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const filtered = initial.filter((p) => {
    const matchSearch =
      p.proposalName.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter ? p.status === statusFilter : true
    return matchSearch && matchStatus
  })

  async function handleDelete(id: string, name: string) {
    if (!confirm(`¿Eliminar la propuesta "${name}"? Esta acción no se puede deshacer.`)) return
    await fetch(`/api/proposals/${id}`, { method: "DELETE" })
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por propuesta o cliente..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1">
          {STATUS_OPTS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                statusFilter === opt.value
                  ? "bg-[#6F45B8] text-white"
                  : "bg-[#D2C1EE]/30 text-[#4B2E7B] hover:bg-[#D2C1EE]/60"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#D2C1EE] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F8F5FF]">
            <tr>
              <th className="text-left px-4 py-3 text-[#4B2E7B] font-semibold">Propuesta</th>
              <th className="text-left px-4 py-3 text-[#4B2E7B] font-semibold">Cliente</th>
              <th className="text-left px-4 py-3 text-[#4B2E7B] font-semibold">Fecha</th>
              <th className="text-right px-4 py-3 text-[#4B2E7B] font-semibold">Valor</th>
              <th className="text-center px-4 py-3 text-[#4B2E7B] font-semibold">Estado</th>
              <th className="text-right px-4 py-3 text-[#4B2E7B] font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D2C1EE]/50">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-gray-400">
                  No se encontraron propuestas
                </td>
              </tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id} className="bg-white hover:bg-[#F8F5FF] transition-colors">
                <td className="px-4 py-3 font-medium text-[#2D1640]">{p.proposalName}</td>
                <td className="px-4 py-3 text-gray-600">{p.clientName}</td>
                <td className="px-4 py-3 text-gray-500">{formatDate(p.presentationDate)}</td>
                <td className="px-4 py-3 text-right font-mono text-[#4B2E7B]">
                  {formatCLP(p.valueCLP)}
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/propuestas/${p.id}`}>
                      <Button size="icon" variant="ghost" title="Ver">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/propuestas/${p.id}/editar`}>
                      <Button size="icon" variant="ghost" title="Editar">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      size="icon"
                      variant="ghost"
                      title="Eliminar"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(p.id, p.proposalName)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 text-right">
        {filtered.length} de {initial.length} propuestas
      </p>
    </div>
  )
}
