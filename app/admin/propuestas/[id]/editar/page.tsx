import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { deserializeProposal } from "@/lib/proposals"
import { ProposalForm } from "@/components/admin/ProposalForm"

export default async function EditProposalPage({ params }: { params: { id: string } }) {
  const raw = await prisma.proposal.findUnique({ where: { id: params.id } })
  if (!raw) notFound()
  const proposal = deserializeProposal(raw)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#2D1640]">Editar Propuesta</h1>
        <p className="text-gray-500 text-sm mt-1">{proposal.proposalName} — {proposal.clientName}</p>
      </div>
      <ProposalForm defaultValues={proposal} proposalId={proposal.id} />
    </div>
  )
}
