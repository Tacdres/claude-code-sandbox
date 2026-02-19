"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Circle } from "lucide-react"
import type { ConfirmationStep } from "@/types"
import { formatDate } from "@/lib/utils"

interface Props {
  steps: ConfirmationStep[]
  proposalId: string
}

export function ConfirmationSteps({ steps: initial, proposalId }: Props) {
  const router = useRouter()
  const [steps, setSteps] = useState<ConfirmationStep[]>(initial)
  const [loading, setLoading] = useState<number | null>(null)

  async function toggle(index: number) {
    setLoading(index)
    const updated = steps.map((s, i) => {
      if (i !== index) return s
      const completed = !s.completed
      return {
        ...s,
        completed,
        completedAt: completed ? new Date().toISOString() : undefined,
      }
    })
    setSteps(updated)

    await fetch(`/api/proposals/${proposalId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ confirmationSteps: updated }),
    }).catch(() => setSteps(initial))

    setLoading(null)
    router.refresh()
  }

  if (steps.length === 0) {
    return <p className="text-gray-400 text-sm">No hay pasos de confirmación definidos.</p>
  }

  const completed = steps.filter((s) => s.completed).length

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{completed} de {steps.length} completados</span>
        <div className="h-2 w-40 bg-[#D2C1EE]/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#72E6AD] transition-all rounded-full"
            style={{ width: `${(completed / steps.length) * 100}%` }}
          />
        </div>
      </div>
      {steps.map((step, index) => (
        <button
          key={index}
          onClick={() => toggle(index)}
          disabled={loading === index}
          className="flex items-start gap-3 w-full text-left p-3 rounded-lg hover:bg-[#F8F5FF] transition-colors disabled:opacity-50"
        >
          {step.completed ? (
            <CheckCircle2 className="h-5 w-5 text-[#72E6AD] mt-0.5 shrink-0" />
          ) : (
            <Circle className="h-5 w-5 text-[#D2C1EE] mt-0.5 shrink-0" />
          )}
          <div>
            <p className={`text-sm font-medium ${step.completed ? "line-through text-gray-400" : "text-[#2D1640]"}`}>
              {step.step}
            </p>
            {step.completed && step.completedAt && (
              <p className="text-xs text-gray-400">{formatDate(step.completedAt)}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
