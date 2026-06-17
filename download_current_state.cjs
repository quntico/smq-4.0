const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Read .env.local
let envContent = '';
try {
  envContent = fs.readFileSync('apps/web/../../.env.local', 'utf8');
} catch (e) {
  try {
    envContent = fs.readFileSync('apps/web/.env.local', 'utf8');
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

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: urlData } = supabase.storage.from('media').getPublicUrl('cms-state.json');
  const url = `${urlData.publicUrl}?t=${Date.now()}`;
  
  console.log("Downloading cms-state.json from:", url);
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Could not fetch cms-state.json");
    process.exit(1);
  }
  const state = await res.json();
  fs.writeFileSync('cms-state-current.json', JSON.stringify(state, null, 2));
  console.log("Saved current cloud state to cms-state-current.json");
}

run();
