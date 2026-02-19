import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SessionProvider } from "@/components/SessionProvider"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/login")

  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-[#F8F5FF]">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8">{children}</main>
      </div>
    </SessionProvider>
  )
}
