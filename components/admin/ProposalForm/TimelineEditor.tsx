"use client"
import { useFieldArray, useFormContext } from "react-hook-form"
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { ProposalFormValues } from "@/lib/validations"

export function TimelineEditor() {
  const { register, control } = useFormContext<ProposalFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: "timeline" })

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-[#D2C1EE] rounded-lg space-y-3 bg-[#F8F5FF]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#4B2E7B]">Hito {index + 1}</span>
            <Button size="icon" variant="ghost" type="button" onClick={() => remove(index)}
              className="text-red-400 hover:text-red-600 h-7 w-7">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Hito / Entregable</Label>
              <Input {...register(`timeline.${index}.milestone`)} placeholder="Ej: Kickoff inicial" />
            </div>
            <div className="space-y-1">
              <Label>Fecha</Label>
              <Input type="date" {...register(`timeline.${index}.date`)} />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Descripción</Label>
            <Textarea {...register(`timeline.${index}.description`)} placeholder="Descripción del hito..." rows={2} />
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm"
        onClick={() => append({ milestone: "", date: "", description: "" })}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Agregar hito
      </Button>
    </div>
  )
}
