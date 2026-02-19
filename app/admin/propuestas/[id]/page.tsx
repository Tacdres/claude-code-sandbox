import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/db"
import { deserializeProposal } from "@/lib/proposals"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { ConfirmationSteps } from "@/components/admin/ConfirmationSteps"
import { Button } from "@/components/ui/button"
import { formatCLP, formatDate } from "@/lib/utils"
import { Pencil, ExternalLink, ArrowLeft } from "lucide-react"

export default async function ViewProposalPage({ params }: { params: { id: string } }) {
  const raw = await prisma.proposal.findUnique({ where: { id: params.id } })
  if (!raw) notFound()
  const proposal = deserializeProposal(raw)

  const fields = [
    { label: "Cliente", value: proposal.clientName },
    { label: "Enviado por", value: proposal.sentBy },
    { label: "Enviado para", value: proposal.sentTo },
    { label: "Fecha de presentación", value: formatDate(proposal.presentationDate) },
    { label: "Valor", value: formatCLP(proposal.valueCLP) },
    { label: "Vigencia", value: `${proposal.validityDays} días` },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin">
            <Button size="icon" variant="ghost">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#2D1640]">{proposal.proposalName}</h1>
              <StatusBadge status={proposal.status} />
            </div>
            <p className="text-gray-500 text-sm mt-0.5">{proposal.clientName}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/propuestas/${proposal.id}`} target="_blank">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              Ver propuesta
            </Button>
          </Link>
          <Link href={`/admin/propuestas/${proposal.id}/editar`}>
            <Button size="sm">
              <Pencil className="h-4 w-4 mr-1" />
              Editar
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Info card */}
        <div className="bg-white rounded-xl border border-[#D2C1EE] p-6 space-y-4">
          <h2 className="font-semibold text-[#2D1640]">Información general</h2>
          <dl className="space-y-3">
            {fields.map((f) => (
              <div key={f.label}>
                <dt className="text-xs text-gray-400 uppercase tracking-wide">{f.label}</dt>
                <dd className="font-medium text-[#2D1640] mt-0.5">{f.value}</dd>
              </div>
            ))}
            {proposal.details && (
              <div>
                <dt className="text-xs text-gray-400 uppercase tracking-wide">Detalles</dt>
                <dd className="text-sm text-gray-600 mt-0.5">{proposal.details}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Confirmation steps */}
        <div className="bg-white rounded-xl border border-[#D2C1EE] p-6">
          <h2 className="font-semibold text-[#2D1640] mb-4">Pasos de confirmación</h2>
          <ConfirmationSteps steps={proposal.confirmationSteps} proposalId={proposal.id} />
        </div>
      </div>

      {/* Content sections preview */}
      <div className="bg-white rounded-xl border border-[#D2C1EE] p-6 space-y-4">
        <h2 className="font-semibold text-[#2D1640]">Contenido de la propuesta</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            { label: "Introducción", value: proposal.introduction },
            { label: "Contexto", value: proposal.context },
            { label: "Objetivo", value: proposal.objective },
            { label: "Por qué Tactech", value: proposal.whyTactech },
          ].map((s) => (
            <div key={s.label} className="p-3 bg-[#F8F5FF] rounded-lg">
              <p className="text-xs font-semibold text-[#6F45B8] uppercase mb-1">{s.label}</p>
              <p className="text-gray-600 line-clamp-3 text-xs">{s.value || "(sin contenido)"}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>Cronograma: {proposal.timeline.length} hitos</span>
          <span>·</span>
          <span>Equipo: {proposal.team.length} personas</span>
          <span>·</span>
          <span>Precio: {proposal.price.length} ítems</span>
        </div>
      </div>
    </div>
  )
}
