import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { ProposalSchema } from "@/lib/validations"
import { deserializeProposal, serializeProposal } from "@/lib/proposals"

export async function GET() {
  const proposals = await prisma.proposal.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(proposals.map(deserializeProposal))
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const body = await req.json()
  const parsed = ProposalSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { presentationDate, ...rest } = parsed.data
  const serialized = serializeProposal(rest as Parameters<typeof serializeProposal>[0])

  const proposal = await prisma.proposal.create({
    data: {
      ...serialized,
      presentationDate: new Date(presentationDate),
    } as Parameters<typeof prisma.proposal.create>[0]["data"],
  })

  return NextResponse.json(deserializeProposal(proposal), { status: 201 })
}
