import { ProposalForm } from "@/components/admin/ProposalForm"

export default function NuevaPropuestaPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#2D1640]">Nueva Propuesta</h1>
        <p className="text-gray-500 text-sm mt-1">Completa los dos pasos para crear la propuesta</p>
      </div>
      <ProposalForm />
    </div>
  )
}
