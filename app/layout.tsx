import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Tactech — Propuestas Comerciales",
  description: "Sistema de gestión de propuestas comerciales de Tactech",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  )
}
