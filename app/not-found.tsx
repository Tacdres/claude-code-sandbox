import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#2D1640] flex items-center justify-center text-center p-8">
      <div>
        <div className="w-16 h-16 mx-auto mb-6 bg-[#72E6AD] rounded-2xl flex items-center justify-center">
          <span className="text-[#2D1640] font-black text-2xl">T</span>
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-[#D2C1EE] text-lg mb-8">Esta propuesta no existe o aún no ha sido enviada.</p>
        <Link href="/login"
          className="inline-block bg-[#72E6AD] text-[#2D1640] font-bold px-6 py-3 rounded-lg hover:bg-[#72E6AD]/80 transition-colors">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
