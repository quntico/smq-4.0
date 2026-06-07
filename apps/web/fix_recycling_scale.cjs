const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xbubebonbivunzrqeidg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhidWJlYm9uYml2dW56cnFlaWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTUzMzAsImV4cCI6MjA4ODQzMTMzMH0.QZds3VQUlGO9aeLP2Q2NKt-qiLmUAKmk2ul442qalwo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data: downloadData, error: downloadError } = await supabase.storage.from('media').download('cms-state.json');
  if (downloadError) {
    console.error("❌ Download failed:", downloadError);
    return;
  }
  const stateText = await downloadData.text();
  const stateObj = JSON.parse(stateText);
  const recyclingPage = stateObj.pages.find(p => p.id === 'industria-reciclaje-y-plasticos');
  if (recyclingPage) {
    const items = recyclingPage.modules?.[0]?.data?.items;
    if (items && items[1]) {
      console.log("Current item 2 image details:", items[1].image);
      if (items[1].image && typeof items[1].image === 'object') {
        items[1].image.scale = 1;
        console.log("Updated item 2 image details scale to 1.");
      }
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
      console.log("✅ Successfully updated cms-state.json in cloud with scale: 1 for Pelletizado!");
    }
  } else {
    console.log("❌ Recycling page NOT found!");
  }
}

run();
