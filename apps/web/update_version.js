import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read .env.local from project root or current dir
let envContent = '';
try {
  envContent = fs.readFileSync('../../.env.local', 'utf8');
} catch (e) {
  try {
    envContent = fs.readFileSync('.env.local', 'utf8');
  } catch (err) {
    console.error("Could not find .env.local file");
    process.exit(1);
  }
}

const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[match[1]] = value;
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: urlData } = supabase.storage.from('media').getPublicUrl('cms-state.json');
  const url = `${urlData.publicUrl}?t=${Date.now()}`;
  
  console.log("Downloading cms-state.json from:", url);
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Could not fetch cms-state.json from cloud, status:", res.status);
    process.exit(1);
  }
  
  const state = await res.json();
  console.log("Current version in cloud:", state.settings.appVersion);
  
  state.settings.appVersion = '6.0';
  console.log("Setting version to '6.0'...");
  
  const content = JSON.stringify(state, null, 2);
  
  const { error } = await supabase.storage.from('media').upload('cms-state.json', Buffer.from(content), {
    contentType: 'application/json',
    upsert: true,
    cacheControl: '0'
  });
  
  if (error) {
    console.error("Error uploading updated state to cloud:", error);
    process.exit(1);
  }
  
  console.log("Success! Cloud version has been updated to 6.0.");
}

run();
