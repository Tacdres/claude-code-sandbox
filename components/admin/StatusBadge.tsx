import { Badge } from "@/components/ui/badge"
import type { ProposalStatus } from "@/types"

const STATUS_LABELS: Record<ProposalStatus, string> = {
  draft: "Borrador",
  sent: "Enviado",
  accepted: "Aceptado",
  rejected: "Rechazado",
}

export function StatusBadge({ status }: { status: string }) {
  const s = status as ProposalStatus
  return <Badge variant={s}>{STATUS_LABELS[s] ?? status}</Badge>
}
