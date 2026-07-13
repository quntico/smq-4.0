import multiparty from 'multiparty';
import fs from 'fs';
import * as pdfParseModule from 'pdf-parse';
const PDFParse = pdfParseModule.PDFParse || pdfParseModule.default?.PDFParse || pdfParseModule;
import mammoth from 'mammoth';
import { createClient } from '@supabase/supabase-js';

// Configurar Vercel para permitir subidas de archivos grandes y tiempos de procesamiento largos
export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
    sizeLimit: '300mb',
  },
  maxDuration: 300, // 5 minutos de tiempo de espera máximo
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
      const isPDF = file.originalFilename.toLowerCase().endsWith('.pdf');
      const isTXT = file.originalFilename.toLowerCase().endsWith('.txt');
      const isDOCX = file.originalFilename.toLowerCase().endsWith('.docx');

      if (!isPDF && !isTXT && !isDOCX) {
        return res.status(400).json({ error: 'Solo se permiten archivos PDF, DOCX o TXT puros.' });
      }

      if (isPDF) {
        const dataBuffer = fs.readFileSync(filePath);
        const parser = new PDFParse({ data: dataBuffer });
        await parser.load();
        const pdfData = await parser.getText();
        text = pdfData.text;
      } else if (isDOCX) {
        const result = await mammoth.extractRawText({ path: filePath });
        text = result.value;
      } else {
        text = fs.readFileSync(filePath, 'utf8');
      }

      if (!text || text.trim().length === 0) {
        return res.status(400).json({ error: 'El archivo está vacío o es ilegible.' });
      }

      // Purificador Universal: Eliminar NUL, secuencias \u0000, caracteres de control y surrogates rotos
      const sanitizeString = (str) => {
        if (!str) return '';
        let s = str.replace(/\0/g, '').replace(/\\u0000/g, '');
        s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
        return s.replace(/[\uD800-\uDFFF]/g, '');
      };

      text = sanitizeString(text);

      // Chunking: Cortar el texto en pedazos superpuestos para no perder contexto
      const chunkSize = 1500;
      const overlap = 200;
      const chunks = [];
      for (let i = 0; i < text.length; i += (chunkSize - overlap)) {
        chunks.push(text.substring(i, i + chunkSize));
      }

      // Optimización Extrema: Procesar en bloques (Batching) para mayor velocidad
      const embeddedChunks = [];
      const validChunks = chunks.filter(c => c.trim().length >= 50).map(c => c.trim());
      
      const BATCH_SIZE = 10; // ~4000 tokens por viaje (límite de OpenAI es 8191)
      
      for (let i = 0; i < validChunks.length; i += BATCH_SIZE) {
        const batch = validChunks.slice(i, i + BATCH_SIZE);
        
        const embedRes = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            input: batch, // Enviamos el array completo
            model: 'text-embedding-3-small'
          })
        });

        if (!embedRes.ok) throw new Error('Fallo al conectar con OpenAI Embeddings');
        const embedData = await embedRes.json();
        
        // Emparejar cada respuesta matemática con su texto original
        embedData.data.forEach((item, index) => {
          embeddedChunks.push({
            content: batch[index],
            embedding: item.embedding
          });
        });
      }

      // Guardar el registro del archivo en Supabase
      // Extract the path from fields (or fallback to originalFilename)
      let relativePath = fields.path && fields.path[0] ? fields.path[0] : file.originalFilename;
      relativePath = sanitizeString(relativePath); // Purificar nombre de archivo y ruta

      const { data: docData, error: docError } = await supabase
        .from('ai_documents')
        .insert([{ filename: relativePath }])
        .select()
        .single();

      if (docError) throw docError;

      // Inyectar el conocimiento matemático a la base de datos en lotes para evitar Timeouts
      const knowledgeInserts = embeddedChunks.map(ec => ({
        document_id: docData.id,
        content: ec.content,
        embedding: ec.embedding
      }));

      const INSERT_BATCH_SIZE = 100;
      for (let i = 0; i < knowledgeInserts.length; i += INSERT_BATCH_SIZE) {
        const batch = knowledgeInserts.slice(i, i + INSERT_BATCH_SIZE);
        const { error: kError } = await supabase
          .from('ai_knowledge')
          .insert(batch);

        if (kError) throw kError;
      }

      res.status(200).json({ success: true, chunksProcessed: embeddedChunks.length });

    } catch (processErr) {
      console.error(processErr);
      res.status(500).json({ error: 'Fallo catastrófico al procesar el archivo.' });
    }
  });
}
