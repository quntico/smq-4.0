const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xbubebonbivunzrqeidg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhidWJlYm9uYml2dW56cnFlaWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTUzMzAsImV4cCI6MjA4ODQzMTMzMH0.QZds3VQUlGO9aeLP2Q2NKt-qiLmUAKmk2ul442qalwo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data: downloadData } = await supabase.storage.from('media').download('cms-state.json');
  const stateObj = JSON.parse(await downloadData.text());
  const recyclingPage = stateObj.pages.find(p => p.id === 'industria-reciclaje-y-plasticos');
  if (recyclingPage) {
    const items = recyclingPage.modules?.[0]?.data?.items;
    if (items) {
      items.forEach((item, idx) => {
        console.log(`Item ${idx + 1}: ${item.title}`);
        console.log("  id:", item.id);
      });
    }
  }
}

run();
