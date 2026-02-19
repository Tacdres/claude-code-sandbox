import type { TimelineItem } from "@/types"

export function TimelineView({ items }: { items: TimelineItem[] }) {
  if (items.length === 0) return <p className="text-gray-400">Sin hitos definidos.</p>
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[#D2C1EE]" />
      <div className="space-y-8">
        {items.map((item, i) => (
          <div key={i} className="flex gap-6 relative">
            {/* Dot */}
            <div className="shrink-0 w-10 h-10 rounded-full bg-[#6F45B8] border-4 border-[#D2C1EE] flex items-center justify-center z-10">
              <span className="text-white text-xs font-bold">{i + 1}</span>
            </div>
            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h3 className="font-semibold text-[#2D1640]">{item.milestone}</h3>
                <span className="text-xs bg-[#D2C1EE]/40 text-[#4B2E7B] px-2 py-0.5 rounded-full font-medium">
                  {item.date}
                </span>
              </div>
              {item.description && (
                <p className="text-gray-500 text-sm">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
