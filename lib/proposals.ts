import type { Proposal, ProposalRaw } from "@/types"

export function deserializeProposal(raw: ProposalRaw): Proposal {
  return {
    ...raw,
    status: raw.status as Proposal["status"],
    confirmationSteps: JSON.parse(raw.confirmationSteps || "[]"),
    timeline: JSON.parse(raw.timeline || "[]"),
    price: JSON.parse(raw.price || "[]"),
    team: JSON.parse(raw.team || "[]"),
  }
}

export function serializeProposal(data: Partial<Proposal>): Record<string, unknown> {
  const result: Record<string, unknown> = { ...data }
  if (data.confirmationSteps !== undefined) {
    result.confirmationSteps = JSON.stringify(data.confirmationSteps)
  }
  if (data.timeline !== undefined) {
    result.timeline = JSON.stringify(data.timeline)
  }
  if (data.price !== undefined) {
    result.price = JSON.stringify(data.price)
  }
  if (data.team !== undefined) {
    result.team = JSON.stringify(data.team)
  }
  return result
}
