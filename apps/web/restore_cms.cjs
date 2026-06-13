const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://xbubebonbivunzrqeidg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhidWJlYm9uYml2dW56cnFlaWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTUzMzAsImV4cCI6MjA4ODQzMTMzMH0.QZds3VQUlGO9aeLP2Q2NKt-qiLmUAKmk2ul442qalwo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log("Downloading current cms-state.json from Supabase...");
  const { data: downloadData, error: downloadError } = await supabase.storage.from('media').download('cms-state.json');
  if (downloadError) {
    console.error("❌ Download failed:", downloadError);
    return;
  }
  const stateText = await downloadData.text();
  fs.writeFileSync(path.join(__dirname, 'cms-state-current-cloud.json'), stateText, 'utf8');
  console.log("✅ Successfully saved current cloud state to cms-state-current-cloud.json");
}

run();
