import multiparty from 'multiparty';
import fs from 'fs';
import pdf from 'pdf-parse';
import { createClient } from '@supabase/supabase-js';

// Configurar Vercel para permitir subidas de archivos grandes (desactiva el parseo automático de body)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const apiKey = process.env.OPENAI_API_KEY;
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!apiKey || !supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Faltan llaves de API o Base de Datos.' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const form = new multiparty.Form();
  
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Fallo al procesar el formulario' });
    
    if (!files.file || !files.file[0]) {
      return res.status(400).json({ error: 'No se detectó ningún archivo.' });
    }

    const file = files.file[0];
    const filePath = file.path;
    let text = '';

    try {
      if (file.originalFilename.toLowerCase().endsWith('.pdf')) {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        text = data.text;
      } else {
        text = fs.readFileSync(filePath, 'utf8');
      }

      if (!text || text.trim().length === 0) {
        return res.status(400).json({ error: 'El archivo está vacío o es ilegible.' });
      }

      // Chunking: Cortar el texto en pedazos superpuestos para no perder contexto
      const chunkSize = 1500;
      const overlap = 200;
      const chunks = [];
      for (let i = 0; i < text.length; i += (chunkSize - overlap)) {
        chunks.push(text.substring(i, i + chunkSize));
      }

      // Convertir cada pedazo de texto a vectores matemáticos usando OpenAI
      const embeddedChunks = [];
      for (const chunk of chunks) {
        if (chunk.trim().length < 50) continue; // Ignorar pedazos inútiles

        const embedRes = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            input: chunk.trim(),
            model: 'text-embedding-3-small' // Modelo de embedding más moderno y rápido
          })
        });

        if (!embedRes.ok) throw new Error('Fallo al conectar con OpenAI Embeddings');
        const embedData = await embedRes.json();
        
        embeddedChunks.push({
          content: chunk.trim(),
          embedding: embedData.data[0].embedding
        });
      }

      // Guardar el registro del archivo en Supabase
      const { data: docData, error: docError } = await supabase
        .from('ai_documents')
        .insert([{ filename: file.originalFilename }])
        .select()
        .single();

      if (docError) throw docError;

      // Inyectar el conocimiento matemático a la base de datos
      const knowledgeInserts = embeddedChunks.map(ec => ({
        document_id: docData.id,
        content: ec.content,
        embedding: ec.embedding
      }));

      const { error: kError } = await supabase
        .from('ai_knowledge')
        .insert(knowledgeInserts);

      if (kError) throw kError;

      res.status(200).json({ success: true, chunksProcessed: embeddedChunks.length });

    } catch (processErr) {
      console.error(processErr);
      res.status(500).json({ error: 'Fallo catastrófico al procesar el archivo.' });
    }
  });
}
