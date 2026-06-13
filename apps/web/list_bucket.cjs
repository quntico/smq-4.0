const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xbubebonbivunzrqeidg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhidWJlYm9uYml2dW56cnFlaWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTUzMzAsImV4cCI6MjA4ODQzMTMzMH0.QZds3VQUlGO9aeLP2Q2NKt-qiLmUAKmk2ul442qalwo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  let hasMore = true;
  let offset = 0;
  const limit = 100;
  
  console.log("Searching for files in bucket 'media'...");
  while (hasMore) {
    const { data, error } = await supabase.storage.from('media').list('', {
      limit,
      offset,
      sortBy: { column: 'name', order: 'asc' }
    });
    
    if (error) {
      console.error("Error listing files:", error);
      break;
    }
    
    if (!data || data.length === 0) {
      break;
    }
    
    data.forEach(file => {
      if (file.name.endsWith('.json') || file.name.includes('state') || file.name.includes('backup')) {
        console.log(`- ${file.name} (size: ${file.metadata?.size || 'N/A'}, updated: ${file.created_at || 'N/A'})`);
      }
    });
    
    if (data.length < limit) {
      hasMore = false;
    } else {
      offset += limit;
    }
  }
  console.log("Search complete.");
}

run();
