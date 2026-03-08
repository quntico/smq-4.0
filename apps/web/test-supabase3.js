import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envFile = fs.readFileSync('.env', 'utf-8');
const envUrl = envFile.match(/VITE_SUPABASE_URL\s*=\s*(.*)/)[1];
const envAnonKey = envFile.match(/VITE_SUPABASE_ANON_KEY\s*=\s*(.*)/)[1];

const supabase = createClient(envUrl, envAnonKey);

async function fix() {
    const { error } = await supabase.storage.from('media').remove(['cms-state.json']);
    if (error) {
        console.error("Error deleting:", error);
    } else {
        console.log("Deleted cms-state.json successfully to prevent overwrite.");
    }
}
fix();
