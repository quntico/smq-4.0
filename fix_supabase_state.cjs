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
  console.log("Downloading cms-state.json from Supabase...");
  const { data: downloadData, error: downloadError } = await supabase.storage
    .from('media')
    .download('cms-state.json');

  if (downloadError) {
    console.error("Error downloading file:", downloadError);
    process.exit(1);
  }

  const text = await downloadData.text();
  const state = JSON.parse(text);

  let modified = false;

  // Search and replace the dead URL in pages -> modules -> sections
  if (state.pages) {
    state.pages.forEach(page => {
      if (page.id === 'wte') {
        page.modules.forEach(mod => {
          if (mod.id === 'content' && mod.data && mod.data.sections) {
            mod.data.sections.forEach(sec => {
              if (sec.id === 'conversion-energetica') {
                const oldUrl = 'https://images.unsplash.com/photo-1513828742140-ccaa34f3158e?auto=format&fit=crop&q=80&w=800';
                const newUrl = 'https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?auto=format&fit=crop&q=80&w=800';

                if (sec.bgImage === oldUrl) {
                  sec.bgImage = newUrl;
                  modified = true;
                  console.log("Fixed bgImage for conversion-energetica");
                }

                if (sec.images) {
                  sec.images.forEach(img => {
                    if (img.url === oldUrl) {
                      img.url = newUrl;
                      modified = true;
                      console.log("Fixed image in images array for conversion-energetica");
                    }
                  });
                }
              }
            });
          }
        });
      }
    });
  }

  if (modified) {
    state.settings = state.settings || {};
    state.settings.updatedAt = Date.now();

    const content = JSON.stringify(state, null, 2);
    
    console.log("Uploading modified state back to Supabase...");
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload('cms-state.json', Buffer.from(content), {
        contentType: 'application/json',
        upsert: true,
        cacheControl: '0'
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      process.exit(1);
    }

    console.log("Writing modified state locally to cms-state-current.json...");
    fs.writeFileSync('cms-state-current.json', content, 'utf8');
    console.log("✅ Successfully corrected the state and uploaded to Supabase & wrote to disk.");
  } else {
    console.log("No dead Unsplash URLs found in the cloud state.");
  }
}

run();
