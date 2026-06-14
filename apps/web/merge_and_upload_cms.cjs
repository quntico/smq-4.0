const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://xbubebonbivunzrqeidg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhidWJlYm9uYml2dW56cnFlaWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTUzMzAsImV4cCI6MjA4ODQzMTMzMH0.QZds3VQUlGO9aeLP2Q2NKt-qiLmUAKmk2ul442qalwo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function mergeStates() {
  console.log("Loading files...");
  const currentCloud = JSON.parse(fs.readFileSync(path.join(__dirname, 'cms-state-current-cloud.json'), 'utf8'));
  const backup = JSON.parse(fs.readFileSync(path.join(__dirname, 'cms-state-backup.json'), 'utf8'));

  // Clonamos el estado actual para no mutar directamente
  const merged = JSON.parse(JSON.stringify(currentCloud));

  // 1. Aseguramos que la versión se mantenga como la última 6.85
  merged.settings.appVersion = "6.85";

  // 2. Buscamos las páginas en el backup
  const backupHome = backup.pages.find(p => p.id === 'home');
  const backupEnvasadoras = backup.pages.find(p => p.id === 'envasadoras');

  // 3. Modificamos la Home en el merged
  const mergedHome = merged.pages.find(p => p.id === 'home');
  if (mergedHome && backupHome) {
    console.log("Merging Home modules...");
    const mergedModules = [];

    // Recorremos los módulos del backup para preservar su orden
    for (const bMod of backupHome.modules) {
      if (bMod.id === 'hero-1') {
        // Usamos el hero-1 del backup completo
        mergedModules.push(bMod);
      } else {
        // Para todos los demás módulos del backup (industries, capabilities, visualizer, nosotros-*), los agregamos directamente
        mergedModules.push(bMod);
      }
    }

    // Buscamos si la Home actual de la nube tiene el módulo "proyectos" y lo insertamos en el lugar adecuado.
    // En la Home original, ¿dónde va "proyectos"?
    // En la Home actual, el orden era: hero-1, proyectos.
    // En la estructura general, usualmente los proyectos van después de las industrias/capacidades o antes de nosotros-final.
    // Insertemos el módulo "proyectos" justo antes de "nosotros-final" si existe.
    const currentProyectos = mergedHome.modules.find(m => m.id === 'proyectos');
    if (currentProyectos) {
      const idxNosotros = mergedModules.findIndex(m => m.id === 'nosotros-final');
      if (idxNosotros !== -1) {
        mergedModules.splice(idxNosotros, 0, currentProyectos);
        console.log("Added 'proyectos' module from current cloud before 'nosotros-final'.");
      } else {
        mergedModules.push(currentProyectos);
        console.log("Added 'proyectos' module from current cloud at the end.");
      }
    }

    mergedHome.modules = mergedModules;
  }

  // 4. Reponemos la página "envasadoras" si no existe
  const mergedEnvasadoras = merged.pages.find(p => p.id === 'envasadoras');
  if (!mergedEnvasadoras && backupEnvasadoras) {
    console.log("Restoring 'envasadoras' page from backup...");
    merged.pages.push(backupEnvasadoras);
  }

  // Escribimos el resultado localmente para revisión
  fs.writeFileSync(path.join(__dirname, 'cms-state-restored.json'), JSON.stringify(merged, null, 2), 'utf8');
  console.log("✅ Successfully merged states into cms-state-restored.json");
  return merged;
}

async function uploadRestored(mergedState) {
  console.log("Uploading restored state to Supabase storage as cms-state.json...");
  const content = JSON.stringify(mergedState, null, 2);
  const { data, error } = await supabase.storage.from('media').upload('cms-state.json', Buffer.from(content), {
    upsert: true,
    contentType: 'application/json',
    cacheControl: '0'
  });

  if (error) {
    console.error("❌ Failed to upload restored state:", error);
  } else {
    console.log("✅ Successfully restored and uploaded cms-state.json to Supabase!");
    console.log("Data details:", data);
  }
}

async function run() {
  try {
    const merged = mergeStates();
    await uploadRestored(merged);
  } catch (err) {
    console.error("❌ Process crashed:", err);
  }
}

run();
