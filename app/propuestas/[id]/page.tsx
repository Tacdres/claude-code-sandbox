import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import { deserializeProposal } from "@/lib/proposals"
import { ProposalHero } from "@/components/public/ProposalHero"
import { ProposalSection } from "@/components/public/ProposalSection"
import { TimelineView } from "@/components/public/TimelineView"
import { PriceTable } from "@/components/public/PriceTable"
import { TeamGrid } from "@/components/public/TeamGrid"
import { ConfirmationStepsView } from "@/components/public/ConfirmationStepsView"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const raw = await prisma.proposal.findUnique({ where: { id: params.id } })
  if (!raw || raw.status === "draft") return { title: "Propuesta no encontrada" }
  return {
    title: `${raw.proposalName} — Tactech`,
    description: `Propuesta comercial para ${raw.clientName}`,
    openGraph: {
      title: `${raw.proposalName} — Tactech`,
      description: `Propuesta comercial preparada por Tactech para ${raw.clientName}`,
    },
  }
}

export default async function PublicProposalPage({ params }: { params: { id: string } }) {
  const raw = await prisma.proposal.findUnique({ where: { id: params.id } })

  if (!raw || raw.status === "draft") notFound()

  const proposal = deserializeProposal(raw)

  return (
    <main className="min-h-screen bg-[#F8F5FF]">
      <ProposalHero proposal={proposal} />

      {proposal.introduction && (
        <ProposalSection title="Introducción">
          <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
            {proposal.introduction}
          </p>
        </ProposalSection>
      )}

      {proposal.context && (
        <ProposalSection title="Contexto" dark>
          <p className="text-[#D2C1EE] text-lg leading-relaxed whitespace-pre-line">
            {proposal.context}
          </p>
        </ProposalSection>
      )}

      {proposal.objective && (
        <ProposalSection title="Objetivo">
          <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
            {proposal.objective}
          </p>
        </ProposalSection>
      )}

      {proposal.whyTactech && (
        <ProposalSection title="¿Por qué Tactech?" subtitle="Nuestra experiencia y respaldo técnico" dark>
          <p className="text-[#D2C1EE] text-lg leading-relaxed whitespace-pre-line">
            {proposal.whyTactech}
          </p>
        </ProposalSection>
      )}

      {proposal.timeline.length > 0 && (
        <ProposalSection title="Cronograma" subtitle="Hitos y etapas del proyecto">
          <TimelineView items={proposal.timeline} />
        </ProposalSection>
      )}

      {proposal.team.length > 0 && (
        <ProposalSection title="Equipo" subtitle="Las personas detrás del proyecto" dark>
          <TeamGrid members={proposal.team} />
        </ProposalSection>
      )}

      {proposal.price.length > 0 && (
        <ProposalSection title="Inversión" subtitle="Detalle de la propuesta económica">
          <PriceTable items={proposal.price} valueCLP={proposal.valueCLP} />
        </ProposalSection>
      )}

      {proposal.confirmationSteps.length > 0 && (
        <ProposalSection title="Próximos pasos" dark>
          <ConfirmationStepsView steps={proposal.confirmationSteps} />
        </ProposalSection>
      )}

      {/* Footer */}
      <footer className="bg-[#2D1640] text-[#D2C1EE] py-8">
        <div className="max-w-5xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#72E6AD] rounded-lg flex items-center justify-center">
              <span className="text-[#2D1640] font-black text-sm">T</span>
            </div>
            <div>
              <p className="text-white font-bold">Tactech</p>
              <p className="text-xs">Soluciones tecnológicas</p>
            </div>
          </div>
          <p className="text-xs">
            Propuesta preparada por <strong className="text-white">{proposal.sentBy}</strong>
          </p>
        </div>
      </footer>
    </main>
  )
}
