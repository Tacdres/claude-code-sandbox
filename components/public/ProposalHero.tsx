import { formatDate, formatCLP } from "@/lib/utils"
import type { Proposal } from "@/types"

export function ProposalHero({ proposal }: { proposal: Proposal }) {
  return (
    <section className="relative bg-[#2D1640] text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6F45B8]/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#72E6AD]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-5xl mx-auto px-8 py-24">
        {/* Tactech badge */}
        <div className="inline-flex items-center gap-2 bg-[#72E6AD]/20 border border-[#72E6AD]/40 text-[#72E6AD] text-sm px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 bg-[#72E6AD] rounded-full" />
          Propuesta Comercial
        </div>

        <h1 className="text-5xl font-bold leading-tight mb-4 max-w-3xl">{proposal.proposalName}</h1>

        <p className="text-[#D2C1EE] text-xl mb-10">
          Preparado para <span className="text-white font-semibold">{proposal.clientName}</span>
        </p>

        {/* Meta grid */}
        <div className="grid grid-cols-3 gap-6 border-t border-[#4B2E7B] pt-8 mt-8">
          <div>
            <p className="text-[#D2C1EE]/60 text-xs uppercase tracking-widest mb-1">Fecha de presentación</p>
            <p className="font-semibold">{formatDate(proposal.presentationDate)}</p>
          </div>
          <div>
            <p className="text-[#D2C1EE]/60 text-xs uppercase tracking-widest mb-1">Inversión total</p>
            <p className="font-bold text-[#72E6AD] font-mono text-xl">{formatCLP(proposal.valueCLP)}</p>
          </div>
          <div>
            <p className="text-[#D2C1EE]/60 text-xs uppercase tracking-widest mb-1">Vigencia</p>
            <p className="font-semibold">{proposal.validityDays} días</p>
          </div>
        </div>

        {/* Sender info */}
        <div className="flex items-center gap-6 mt-8 text-sm text-[#D2C1EE]">
          <span>Enviado por <strong className="text-white">{proposal.sentBy}</strong></span>
          <span className="text-[#4B2E7B]">·</span>
          <span>Para <strong className="text-white">{proposal.sentTo}</strong></span>
        </div>
      </div>
    </section>
  )
}
