import { prisma } from './prisma';
import { drops } from './data';

async function migrateData() {
    console.log('🚀 Starting migration to Prisma/Supabase...');

    try {
        // Clear existing data as we are resetting
        await prisma.drop.deleteMany({});
        console.log('🗑️  Cleared existing drops.');

        for (const drop of drops) {
            await prisma.drop.create({
                data: {
                    day: drop.day,
                    topic: drop.topic,
                    description: drop.description,
                    stack: drop.stack,
                    commitMsg: drop.commit,
                    date: new Date(drop.date)
                }
            });
            console.log(`✅ Migrated Day ${drop.day}`);
        }

        console.log('✨ Migration complete!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

migrateData();
