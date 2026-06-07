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
    if (items && items[0]) {
      console.log("Current item 1 ID:", items[0].id);
      items[0].id = 'trituracion';
      console.log("Updated item 1 ID to 'trituracion'.");
    }
    
    // Upload back to cloud
    const content = JSON.stringify(stateObj, null, 2);
    const { error: uploadError } = await supabase.storage.from('media').upload('cms-state.json', Buffer.from(content), {
      contentType: 'application/json',
      upsert: true,
      cacheControl: '0'
    });
    if (uploadError) {
      console.error("❌ Error uploading state:", uploadError);
    } else {
      console.log("✅ Successfully updated Trituradoras ID to 'trituracion' in cloud!");
    }
  }
}

run();
