import { supabase } from './supabase';
import { drops } from './data';

export async function migrateData() {
    console.log('Starting migration...');

    const { data, error } = await supabase
        .from('drops')
        .insert(drops.map(drop => ({
            day: drop.day,
            date: drop.date,
            topic: drop.topic,
            description: drop.description,
            stack: drop.stack,
            commit_msg: drop.commit
        })));

    if (error) {
        console.error('Migration failed:', error);
    } else {
        console.log('Migration successful!', data);
    }
}
