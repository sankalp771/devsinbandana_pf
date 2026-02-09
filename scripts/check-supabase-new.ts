
const supabaseUrl = 'https://sxboeihuxhyylexwptgg.supabase.co'
const supabaseKey = 'sb_publishable_LQBMZjwUbpB8TgBkecc3_g_9y7CazNf'

async function checkProject() {
    try {
        const res = await fetch(`${supabaseUrl}/rest/v1/`, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        })
        console.log(`Project Status: ${res.status} ${res.statusText}`)
        const text = await res.text()
        console.log(`Response snippet: ${text.substring(0, 100)}`)
    } catch (e) {
        console.error("Fetch failed:", e)
    }
}

checkProject()
