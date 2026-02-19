"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = new FormData(e.currentTarget)
    const result = await signIn("credentials", {
      username: form.get("username"),
      password: form.get("password"),
      redirect: false,
    })
    if (result?.error) {
      setError("Credenciales incorrectas. Verifica tu usuario y contraseña.")
      setLoading(false)
    } else {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D1640] via-[#4B2E7B] to-[#6F45B8] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#72E6AD] rounded-2xl mb-4">
            <span className="text-[#2D1640] font-black text-2xl">T</span>
          </div>
          <h1 className="text-white text-2xl font-bold">Tactech</h1>
          <p className="text-[#D2C1EE] text-sm mt-1">Gestión de Propuestas</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-5 w-5 text-[#6F45B8]" />
            <h2 className="font-semibold text-[#2D1640]">Iniciar sesión</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="username">Usuario</Label>
              <Input id="username" name="username" placeholder="admin" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
