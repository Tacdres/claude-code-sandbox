import type { ConfirmationStep } from "@/types"
import { CheckCircle2, Circle } from "lucide-react"

export function ConfirmationStepsView({ steps }: { steps: ConfirmationStep[] }) {
  if (steps.length === 0) return null

  const completed = steps.filter((s) => s.completed).length
  const pct = Math.round((completed / steps.length) * 100)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 bg-[#D2C1EE]/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#72E6AD] rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-white">{pct}% completado</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-4 rounded-lg border ${
              step.completed
                ? "border-[#72E6AD]/40 bg-[#72E6AD]/10"
                : "border-[#4B2E7B] bg-[#4B2E7B]/30"
            }`}
          >
            {step.completed ? (
              <CheckCircle2 className="h-5 w-5 text-[#72E6AD] shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-[#D2C1EE]/50 shrink-0" />
            )}
            <span className={`text-sm ${step.completed ? "text-[#72E6AD]" : "text-[#D2C1EE]"}`}>
              {step.step}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
