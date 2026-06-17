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
  console.log("Listing files in 'media' bucket...");
  const { data, error } = await supabase.storage.from('media').list('', {
    limit: 50,
    sortBy: { column: 'created_at', order: 'desc' }
  });
  
  if (error) {
    console.error("Error listing files:", error);
    process.exit(1);
  }
  
  console.log("Recently uploaded files in Supabase storage:");
  data.forEach(file => {
    console.log(`- Name: ${file.name}, Created: ${file.created_at}, Size: ${file.metadata.size} bytes`);
  });
}

run();
