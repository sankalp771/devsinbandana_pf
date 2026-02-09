
const supabaseUrl = 'https://bgmiopvipnujlcpqansx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnbWlvcHZpcG51amxjcHFhbnN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyNTU0ODcsImV4cCI6MjA4NDgzMTQ4N30.CtiAhr-yIo3LGER3G6wk5hUXlYrFtvuusE972Rkr2fw'

async function checkProject() {
    try {
        const res = await fetch(`${supabaseUrl}/rest/v1/drops?select=day&order=day.desc&limit=1`, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
            }
        })
        if (!res.ok) {
            const text = await res.text()
            console.log(`Project Status Error: ${res.status} ${res.statusText}`)
            console.log(`Response: ${text}`)
            return
        }
        const data = await res.json()
        console.log("Project is UP.")
        console.log("Latest drop in DB:", data)
    } catch (e) {
        console.error("Fetch failed:", e)
    }
}

checkProject()
