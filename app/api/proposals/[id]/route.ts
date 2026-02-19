import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { ProposalSchema } from "@/lib/validations"
import { deserializeProposal, serializeProposal } from "@/lib/proposals"

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const proposal = await prisma.proposal.findUnique({ where: { id: params.id } })
  if (!proposal) return NextResponse.json({ error: "No encontrado" }, { status: 404 })
  return NextResponse.json(deserializeProposal(proposal))
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const body = await req.json()

  // Partial update (e.g. only confirmationSteps from the ConfirmationSteps component)
  const isPartial = Object.keys(body).length < 5
  if (isPartial) {
    const serialized = serializeProposal(body)
    const proposal = await prisma.proposal.update({
      where: { id: params.id },
      data: serialized as Parameters<typeof prisma.proposal.update>[0]["data"],
    })
    return NextResponse.json(deserializeProposal(proposal))
  }

  // Full update via form
  const parsed = ProposalSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { presentationDate, ...rest } = parsed.data
  const serialized = serializeProposal(rest as Parameters<typeof serializeProposal>[0])

  const proposal = await prisma.proposal.update({
    where: { id: params.id },
    data: {
      ...serialized,
      presentationDate: new Date(presentationDate),
    } as Parameters<typeof prisma.proposal.update>[0]["data"],
  })

  return NextResponse.json(deserializeProposal(proposal))
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  await prisma.proposal.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
