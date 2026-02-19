"use client"
import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { useEffect } from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCLP } from "@/lib/utils"
import type { ProposalFormValues } from "@/lib/validations"

function PriceRow({ index, remove }: { index: number; remove: () => void }) {
  const { register, setValue, control } = useFormContext<ProposalFormValues>()
  const quantity = useWatch({ control, name: `price.${index}.quantity` })
  const unitPrice = useWatch({ control, name: `price.${index}.unitPrice` })

  useEffect(() => {
    const q = Number(quantity) || 0
    const u = Number(unitPrice) || 0
    setValue(`price.${index}.total`, q * u)
  }, [quantity, unitPrice, index, setValue])

  const total = (Number(quantity) || 0) * (Number(unitPrice) || 0)

  return (
    <div className="p-4 border border-[#D2C1EE] rounded-lg space-y-3 bg-[#F8F5FF]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#4B2E7B]">Ítem {index + 1}</span>
        <Button size="icon" variant="ghost" type="button" onClick={remove}
          className="text-red-400 hover:text-red-600 h-7 w-7">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-1">
        <Label>Descripción</Label>
        <Input {...register(`price.${index}.description`)} placeholder="Ej: Desarrollo frontend" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <Label>Cantidad</Label>
          <Input type="number" min="1" {...register(`price.${index}.quantity`)} placeholder="1" />
        </div>
        <div className="space-y-1">
          <Label>Precio unitario (CLP)</Label>
          <Input type="number" {...register(`price.${index}.unitPrice`)} placeholder="0" />
        </div>
        <div className="space-y-1">
          <Label>Total</Label>
          <div className="h-10 flex items-center px-3 border border-[#D2C1EE] rounded-md bg-[#D2C1EE]/20 text-sm font-mono text-[#4B2E7B]">
            {formatCLP(total)}
          </div>
          <input type="hidden" {...register(`price.${index}.total`)} />
        </div>
      </div>
    </div>
  )
}

export function PriceEditor() {
  const { control, watch } = useFormContext<ProposalFormValues>()
  const { fields, append, remove } = useFieldArray({ control, name: "price" })
  const priceItems = watch("price") || []
  const grandTotal = priceItems.reduce((sum, item) => sum + (Number(item.total) || 0), 0)

  return (
    <div className="space-y-3">
      {fields.map((field, index) => (
        <PriceRow key={field.id} index={index} remove={() => remove(index)} />
      ))}
      <Button type="button" variant="outline" size="sm"
        onClick={() => append({ description: "", quantity: 1, unitPrice: 0, total: 0 })}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Agregar ítem
      </Button>
      {fields.length > 0 && (
        <div className="flex justify-end">
          <div className="bg-[#4B2E7B] text-white px-6 py-3 rounded-lg">
            <span className="text-sm opacity-80">Total general: </span>
            <span className="font-bold font-mono">{formatCLP(grandTotal)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
