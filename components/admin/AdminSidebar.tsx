"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LayoutDashboard, FilePlus, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/propuestas/nueva", label: "Nueva Propuesta", icon: FilePlus, exact: false },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-[#2D1640] flex flex-col fixed top-0 left-0 z-10">
      {/* Logo */}
      <div className="p-6 border-b border-[#4B2E7B]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#72E6AD] rounded-md flex items-center justify-center">
            <span className="text-[#2D1640] font-black text-sm">T</span>
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-none">Tactech</p>
            <p className="text-[#D2C1EE] text-xs">Propuestas</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-[#6F45B8] text-white"
                  : "text-[#D2C1EE] hover:bg-[#4B2E7B] hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="p-4 border-t border-[#4B2E7B]">
        <Button
          variant="ghost"
          className="w-full justify-start text-[#D2C1EE] hover:text-white hover:bg-[#4B2E7B]"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Cerrar sesión
        </Button>
      </div>
    </aside>
  )
}
