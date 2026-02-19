import { PrismaClient } from "@prisma/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"
import path from "path"

const dbPath = path.resolve(process.cwd(), "dev.db")
const dbUrl = `file://${dbPath}`

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  const adapter = new PrismaLibSql({ url: dbUrl })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
