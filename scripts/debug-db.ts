
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL

console.log("Connecting to:", connectionString?.split('@')[1]) // Log host only for safety

const pool = new pg.Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    try {
        const drops = await prisma.drop.findMany({
            orderBy: { day: 'desc' }
        })
        console.log(`Found ${drops.length} drops.`)
        if (drops.length > 0) {
            console.log("Latest drop day:", drops[0].day)
        }
    } catch (e) {
        console.error("Error:", e)
    } finally {
        await prisma.$disconnect()
        await pool.end()
    }
}

main()
