import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Database URL configuration based on environment
const getDatabaseUrl = () => {
  if (process.env.NODE_ENV === 'production' && process.env.TURSO_DATABASE_URL) {
    return process.env.TURSO_DATABASE_URL
  }
  return process.env.DATABASE_URL
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
