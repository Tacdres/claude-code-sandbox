"use client"
import { useFieldArray, useFormContext } from "react-hook-form"
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ProposalFormValues } from "@/lib/validations"

export function MetadataStep() {
  const { register, control, setValue, watch, formState: { errors } } = useFormContext<ProposalFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: "confirmationSteps" })
  const status = watch("status")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Nombre del cliente *</Label>
          <Input {...register("clientName")} placeholder="Ej: Empresa ABC SpA" />
          {errors.clientName && <p className="text-xs text-red-500">{errors.clientName.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Nombre de la propuesta *</Label>
          <Input {...register("proposalName")} placeholder="Ej: Plataforma de gestión interna" />
          {errors.proposalName && <p className="text-xs text-red-500">{errors.proposalName.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Fecha de presentación *</Label>
          <Input type="date" {...register("presentationDate")} />
        </div>
        <div className="space-y-1.5">
          <Label>Estado</Label>
          <Select value={status} onValueChange={(v) => setValue("status", v as ProposalFormValues["status"])}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Borrador</SelectItem>
              <SelectItem value="sent">Enviado</SelectItem>
              <SelectItem value="accepted">Aceptado</SelectItem>
              <SelectItem value="rejected">Rechazado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Valor de la propuesta (CLP) *</Label>
          <Input type="number" {...register("valueCLP")} placeholder="0" />
          {errors.valueCLP && <p className="text-xs text-red-500">{errors.valueCLP.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Vigencia (días) *</Label>
          <Input type="number" {...register("validityDays")} placeholder="30" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Enviado por *</Label>
          <Input {...register("sentBy")} placeholder="Nombre del responsable" />
          {errors.sentBy && <p className="text-xs text-red-500">{errors.sentBy.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Enviado para *</Label>
          <Input {...register("sentTo")} placeholder="Nombre del destinatario" />
          {errors.sentTo && <p className="text-xs text-red-500">{errors.sentTo.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Detalles generales</Label>
        <Textarea {...register("details")} placeholder="Resumen o contexto breve de la propuesta..." rows={3} />
      </div>

      {/* Pasos de confirmación */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Pasos de confirmación</Label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              {...register(`confirmationSteps.${index}.step`)}
              placeholder={`Paso ${index + 1}...`}
              className="flex-1"
            />
            <Button size="icon" variant="ghost" type="button" onClick={() => remove(index)}
              className="text-red-400 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm"
          onClick={() => append({ step: "", completed: false })}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Agregar paso
        </Button>
      </div>
    </div>
  )
}
