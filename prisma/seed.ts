import { PrismaLibSql } from "@prisma/adapter-libsql"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import path from "path"

const dbPath = path.resolve(process.cwd(), "dev.db")
const adapter = new PrismaLibSql({ url: `file://${dbPath}` })
const prisma = new PrismaClient({ adapter })

async function main() {
  const hashedPassword = await bcrypt.hash("tactech2024", 12)

  const user = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  })

  console.log("✅ Usuario admin creado:", user.username)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
