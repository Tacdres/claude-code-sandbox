"use client"
import { useFormContext } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { TimelineEditor } from "./TimelineEditor"
import { PriceEditor } from "./PriceEditor"
import { TeamEditor } from "./TeamEditor"
import type { ProposalFormValues } from "@/lib/validations"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-[#4B2E7B] text-base border-b border-[#D2C1EE] pb-2">
        {title}
      </h3>
      {children}
    </div>
  )
}

export function ContentStep() {
  const { register } = useFormContext<ProposalFormValues>()

  return (
    <div className="space-y-8">
      <Section title="Introducción">
        <Textarea {...register("introduction")} rows={5}
          placeholder="Presenta Tactech y el contexto de esta propuesta..." />
      </Section>

      <Section title="Contexto">
        <Textarea {...register("context")} rows={5}
          placeholder="Describe la situación actual del cliente, problemas detectados..." />
      </Section>

      <Section title="Objetivo">
        <Textarea {...register("objective")} rows={5}
          placeholder="Define el objetivo principal y los resultados esperados del proyecto..." />
      </Section>

      <Section title="Cronograma">
        <TimelineEditor />
      </Section>

      <Section title="Equipo">
        <TeamEditor />
      </Section>

      <Section title="Precio / Inversión">
        <PriceEditor />
      </Section>

      <Section title="¿Por qué Tactech?">
        <Textarea {...register("whyTactech")} rows={8}
          placeholder="Describe la experiencia técnica de Tactech, casos de éxito, metodología y diferenciadores..." />
      </Section>
    </div>
  )
}
