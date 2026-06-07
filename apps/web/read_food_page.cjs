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
  const foodPage = stateObj.pages.find(p => p.id === 'industria-alimentos');
  if (foodPage) {
    console.log("FOOD PAGE FOUND!");
    const items = foodPage.modules?.[0]?.data?.items;
    if (items) {
      items.forEach((item, idx) => {
        console.log(`Item ${idx + 1}: ${item.title}`);
        console.log("  image:", item.image);
        console.log("  image2:", item.image2);
        console.log("  video:", item.video);
      });
    }
  } else {
    console.log("❌ Food page NOT found in cloud!");
  }
}

run();
