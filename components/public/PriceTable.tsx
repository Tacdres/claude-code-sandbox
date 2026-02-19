import type { PriceItem } from "@/types"
import { formatCLP } from "@/lib/utils"

export function PriceTable({ items, valueCLP }: { items: PriceItem[]; valueCLP: number }) {
  if (items.length === 0) return null

  return (
    <div className="overflow-hidden rounded-xl border border-[#D2C1EE]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#4B2E7B] text-white">
            <th className="text-left px-6 py-4 font-semibold">Descripción</th>
            <th className="text-center px-4 py-4 font-semibold w-20">Cant.</th>
            <th className="text-right px-4 py-4 font-semibold">Precio unit.</th>
            <th className="text-right px-6 py-4 font-semibold">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#D2C1EE]/50">
          {items.map((item, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F8F5FF]"}>
              <td className="px-6 py-4 text-[#2D1640] font-medium">{item.description}</td>
              <td className="px-4 py-4 text-center text-gray-500">{item.quantity}</td>
              <td className="px-4 py-4 text-right font-mono text-gray-600">{formatCLP(item.unitPrice)}</td>
              <td className="px-6 py-4 text-right font-mono font-semibold text-[#4B2E7B]">{formatCLP(item.total)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-[#2D1640] text-white">
            <td colSpan={3} className="px-6 py-4 font-bold text-right text-[#D2C1EE]">
              Total de la propuesta:
            </td>
            <td className="px-6 py-4 text-right font-bold font-mono text-[#72E6AD] text-lg">
              {formatCLP(valueCLP)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
