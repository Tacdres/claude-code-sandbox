import type { TeamMember } from "@/types"

export function TeamGrid({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return <p className="text-gray-400">Equipo por confirmar.</p>
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {members.map((member, i) => (
        <div key={i} className="bg-white border border-[#D2C1EE] rounded-xl p-6 text-center hover:shadow-md transition-shadow">
          {/* Avatar placeholder */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#6F45B8] to-[#8454DE] flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {member.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="font-bold text-[#2D1640]">{member.name}</h3>
          <p className="text-[#6F45B8] text-sm font-medium mt-0.5">{member.role}</p>
          {member.bio && (
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">{member.bio}</p>
          )}
        </div>
      ))}
    </div>
  )
}
