import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envFile = fs.readFileSync('.env', 'utf-8');
const envUrl = envFile.match(/VITE_SUPABASE_URL\s*=\s*(.*)/)[1];
const envAnonKey = envFile.match(/VITE_SUPABASE_ANON_KEY\s*=\s*(.*)/)[1];

const supabase = createClient(envUrl, envAnonKey);

async function checkCloud() {
    const { data, error } = await supabase.storage.from('media').download('cms-state.json');
    if (error) {
        console.error("Error downloading cms-state.json:", error);
    } else {
        const text = await data.text();
        console.log("Current cms-state.json length:", text.length, "characters");
        try {
            const parsed = JSON.parse(text);
            console.log("Parsed keys:", Object.keys(parsed));
            // Let's dump out some of the hotspots or text from the first visualizer section to see what's in there
            const home = parsed.pages?.find(p => p.id === 'home');
            const visualizer = home?.modules?.find(m => m.id === 'visualizer');
            if (visualizer) {
                console.log("Visualizer data in cloud:", JSON.stringify(visualizer.data, null, 2));
            } else {
                console.log("No visualizer data in cloud");
            }
        } catch (e) {
            console.log("Could not parse JSON", e);
        }
    }
}
checkCloud();
