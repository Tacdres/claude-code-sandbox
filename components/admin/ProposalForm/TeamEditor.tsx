"use client"
import { useFieldArray, useFormContext } from "react-hook-form"
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { ProposalFormValues } from "@/lib/validations"

export function TeamEditor() {
  const { register, control } = useFormContext<ProposalFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: "team" })

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-[#D2C1EE] rounded-lg space-y-3 bg-[#F8F5FF]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#4B2E7B]">Miembro {index + 1}</span>
            <Button size="icon" variant="ghost" type="button" onClick={() => remove(index)}
              className="text-red-400 hover:text-red-600 h-7 w-7">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Nombre</Label>
              <Input {...register(`team.${index}.name`)} placeholder="Nombre completo" />
            </div>
            <div className="space-y-1">
              <Label>Cargo / Rol</Label>
              <Input {...register(`team.${index}.role`)} placeholder="Ej: Tech Lead" />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Descripción / Bio</Label>
            <Textarea {...register(`team.${index}.bio`)} placeholder="Breve descripción del rol en el proyecto..." rows={2} />
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm"
        onClick={() => append({ name: "", role: "", bio: "" })}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Agregar miembro
      </Button>
    </div>
  )
}
