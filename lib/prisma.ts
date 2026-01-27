import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

// Using DIRECT_URL for the driver adapter to avoid double-pooling issues with Pgbouncer
// We also add ssl: true which is required for Supabase
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL

const pool = new pg.Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false // Required for Supabase in some environments
    }
})

const adapter = new PrismaPg(pool)

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
        log: ['query', 'error', 'warn'],
    })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
