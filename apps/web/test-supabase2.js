import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envFile = fs.readFileSync('.env', 'utf-8');
const envUrl = envFile.match(/VITE_SUPABASE_URL\s*=\s*(.*)/)[1];
const envAnonKey = envFile.match(/VITE_SUPABASE_ANON_KEY\s*=\s*(.*)/)[1];

const supabase = createClient(envUrl, envAnonKey);

async function testStorage() {
    const content = JSON.stringify({ testing: true, time: Date.now() });

    // Upload/upsert file
    const { data, error } = await supabase.storage.from('media').upload('cms-state.json', content, {
        contentType: 'application/json',
        upsert: true
    });

    if (error) {
        console.error("Error uploading:", error);
        return;
    }
    console.log("Uploaded successfully:", data);

    // Download file
    const { data: dlData, error: dlError } = await supabase.storage.from('media').download('cms-state.json');
    if (dlError) {
        console.error("Error downloading:", dlError);
        return;
    }

    const text = await dlData.text();
    console.log("Downloaded text:", text);
}
testStorage();
