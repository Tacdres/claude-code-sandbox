"use client"
import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { ProposalSchema, type ProposalFormValues } from "@/lib/validations"
import { MetadataStep } from "./MetadataStep"
import { ContentStep } from "./ContentStep"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Save } from "lucide-react"
import type { Proposal } from "@/types"
import { formatDateInput } from "@/lib/utils"

interface Props {
  defaultValues?: Partial<Proposal>
  proposalId?: string
}

function toFormDefaults(p?: Partial<Proposal>): Partial<ProposalFormValues> {
  if (!p) return {}
  return {
    ...p,
    presentationDate: p.presentationDate ? formatDateInput(p.presentationDate) : "",
    status: (p.status ?? "draft") as ProposalFormValues["status"],
  }
}

const STEPS = ["Información General", "Contenido de la Propuesta"]

export function ProposalForm({ defaultValues, proposalId }: Props) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = useForm<ProposalFormValues>({
    resolver: zodResolver(ProposalSchema) as any,
    defaultValues: {
      clientName: "",
      proposalName: "",
      presentationDate: "",
      valueCLP: 0,
      validityDays: 30,
      details: "",
      sentBy: "",
      sentTo: "",
      status: "draft",
      confirmationSteps: [],
      introduction: "",
      context: "",
      objective: "",
      timeline: [],
      price: [],
      team: [],
      whyTactech: "",
      ...toFormDefaults(defaultValues),
    },
  })

  async function onSubmit(data: ProposalFormValues) {
    setSaving(true)
    setError("")
    try {
      const url = proposalId ? `/api/proposals/${proposalId}` : "/api/proposals"
      const method = proposalId ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Error al guardar")
      const saved = await res.json()
      router.push(`/admin/propuestas/${saved.id}`)
      router.refresh()
    } catch {
      setError("Hubo un error al guardar la propuesta. Intenta nuevamente.")
    } finally {
      setSaving(false)
    }
  }

  async function handleNext() {
    const fieldsStep0: (keyof ProposalFormValues)[] = [
      "clientName", "proposalName", "presentationDate", "valueCLP", "validityDays", "sentBy", "sentTo",
    ]
    const valid = step === 0 ? await methods.trigger(fieldsStep0) : true
    if (valid) setStep((s) => s + 1)
  }

  return (
    <FormProvider {...methods}>
      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-8">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              i === step
                ? "bg-[#6F45B8] text-white"
                : i < step
                ? "bg-[#72E6AD] text-[#2D1640]"
                : "bg-[#D2C1EE]/50 text-gray-400"
            }`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                i === step ? "bg-white/20" : i < step ? "bg-[#2D1640]/20" : "bg-[#D2C1EE]"
              }`}>
                {i < step ? "✓" : i + 1}
              </span>
              {label}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-8 h-0.5 ${i < step ? "bg-[#72E6AD]" : "bg-[#D2C1EE]"}`} />
            )}
          </div>
        ))}
      </div>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <form onSubmit={(methods.handleSubmit as any)(onSubmit)}>
        <div className="bg-white rounded-xl border border-[#D2C1EE] p-8 min-h-[500px]">
          {step === 0 && <MetadataStep />}
          {step === 1 && <ContentStep />}
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-2">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => step === 0 ? router.back() : setStep((s) => s - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {step === 0 ? "Cancelar" : "Anterior"}
          </Button>

          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Siguiente
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button type="submit" variant="mint" disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Guardando..." : proposalId ? "Actualizar propuesta" : "Crear propuesta"}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}
