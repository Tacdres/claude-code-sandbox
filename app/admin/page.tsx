import Link from "next/link"
import { prisma } from "@/lib/db"
import { deserializeProposal } from "@/lib/proposals"
import { ProposalTable } from "@/components/admin/ProposalTable"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, CheckCircle, Send, XCircle } from "lucide-react"
import { formatCLP } from "@/lib/utils"

async function getStats() {
  const all = await prisma.proposal.findMany({ orderBy: { createdAt: "desc" } })
  const proposals = all.map(deserializeProposal)
  const total = proposals.length
  const sent = proposals.filter((p) => p.status === "sent").length
  const accepted = proposals.filter((p) => p.status === "accepted").length
  const rejected = proposals.filter((p) => p.status === "rejected").length
  const totalValue = proposals
    .filter((p) => p.status === "accepted")
    .reduce((sum, p) => sum + p.valueCLP, 0)
  return { proposals, total, sent, accepted, rejected, totalValue }
}

export default async function AdminDashboard() {
  const { proposals, total, sent, accepted, rejected, totalValue } = await getStats()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2D1640]">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Gestión de propuestas comerciales</p>
        </div>
        <Link href="/admin/propuestas/nueva">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nueva propuesta
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total propuestas", value: total, icon: FileText, color: "bg-[#D2C1EE]/40 text-[#4B2E7B]" },
          { label: "Enviadas", value: sent, icon: Send, color: "bg-blue-100 text-blue-700" },
          { label: "Aceptadas", value: accepted, icon: CheckCircle, color: "bg-emerald-100 text-emerald-700" },
          { label: "Rechazadas", value: rejected, icon: XCircle, color: "bg-red-100 text-red-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-[#D2C1EE] p-5">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2D1640]">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalValue > 0 && (
        <div className="bg-gradient-to-r from-[#4B2E7B] to-[#6F45B8] rounded-xl p-6 text-white">
          <p className="text-[#D2C1EE] text-sm">Valor total de propuestas aceptadas</p>
          <p className="text-3xl font-bold mt-1 font-mono">{formatCLP(totalValue)}</p>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#D2C1EE] p-6">
        <h2 className="font-semibold text-[#2D1640] mb-4">Propuestas</h2>
        <ProposalTable proposals={proposals} />
      </div>
    </div>
  )
}
