interface Props {
  title: string
  subtitle?: string
  children: React.ReactNode
  dark?: boolean
}

export function ProposalSection({ title, subtitle, children, dark = false }: Props) {
  return (
    <section className={`py-20 ${dark ? "bg-[#2D1640] text-white" : "bg-white"}`}>
      <div className="max-w-5xl mx-auto px-8">
        <div className="mb-10">
          <div className={`inline-block w-12 h-1 mb-4 ${dark ? "bg-[#72E6AD]" : "bg-[#72E6AD]"}`} />
          <h2 className={`text-3xl font-bold ${dark ? "text-white" : "text-[#2D1640]"}`}>{title}</h2>
          {subtitle && (
            <p className={`mt-2 ${dark ? "text-[#D2C1EE]" : "text-gray-500"}`}>{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
