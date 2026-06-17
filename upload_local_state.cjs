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
  console.log("Reading cms-state-current.json...");
  const content = fs.readFileSync('cms-state-current.json', 'utf8');
  const state = JSON.parse(content);
  
  // Ensure version is set to 7.12
  state.settings.appVersion = '7.12';
  
  console.log("Uploading local cms-state-current.json to Supabase as 'cms-state.json'...");
  const { error } = await supabase.storage.from('media').upload('cms-state.json', Buffer.from(JSON.stringify(state, null, 2)), {
    contentType: 'application/json',
    upsert: true,
    cacheControl: '0'
  });
  
  if (error) {
    console.error("Error uploading state to cloud:", error);
    process.exit(1);
  }
  
  console.log("Success! Local state uploaded to cloud successfully.");
}

run();
