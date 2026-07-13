import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Parche para entorno local (Vite no parsea el JSON automáticamente como lo hace Vercel)
  if (!req.body) {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    try {
      req.body = data ? JSON.parse(data) : {};
    } catch (e) {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }

  const { query, history = [], customPrompt = "", image = null } = req.body;
  if (!query && !image) {
    return res.status(400).json({ error: 'Query or image is required' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured in Vercel' });
  }

  // Get User IP
  const userIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';

  // Init Supabase for logging
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
  let supabase = null;
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }

  let knowledgeContext = "";
  if (supabase) {
    try {
      // Convertir la pregunta a vectores para buscar en los PDFs de cotizaciones
      const embedRes = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ input: query, model: 'text-embedding-3-small' })
      });
      if (embedRes.ok) {
        const embedData = await embedRes.json();
        const queryEmbedding = embedData.data[0].embedding;
        
        // Buscar las 3 páginas de cotización más relevantes
        const { data: matchedDocs } = await supabase.rpc('match_knowledge', {
          query_embedding: queryEmbedding,
          match_threshold: 0.65, // Threshold flexible
          match_count: 4
        });
        
        if (matchedDocs && matchedDocs.length > 0) {
          knowledgeContext = "\n\n--- BASE DE CONOCIMIENTO DE LA EMPRESA (Tus cotizaciones/datos técnicos) ---\n" + matchedDocs.map(doc => doc.content).join("\n\n");
        }
      }
    } catch (ragError) {
      console.error("Error en RAG:", ragError);
    }
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Eres SMQ-AI, el ingeniero consultor de élite y primer filtro de ventas de SMQ 4.0 (smq.mx).
Tu objetivo es enganchar al cliente rápidamente, perfilar su proyecto y guiarlo a contactar a un asesor.

NUESTRO CATÁLOGO PRINCIPAL (Para enrutar):
- "/industria/reciclaje-y-plasticos" : Peletizado, extrusión, lavado, molinos.
- "/industria/packaging" : Impresoras flexográficas, bolseadoras, laminadoras, cortadoras, rebobinadoras.
- "/envasadoras" : Envasado, empaque, llenado.
- "/waste-to-energy" : Procesamiento de basura, MSW.
- "/proyectos" : Automatización y plantas llave en mano.
- "/contacto" : Asesoría y cotizaciones.

INSTRUCCIONES CRÍTICAS:
1. SÉ EXTREMADAMENTE HUMANO, CASUAL Y BREVE (Máximo 1 o 2 oraciones, menos de 30 palabras).
2. Empieza con un tono natural y de servicio (ej: "¡Claro que sí!", "¡Por supuesto!").
3. Confirma rápido que lo fabricamos o diseñamos.
4. HAZ LAS PREGUNTAS DE PERFILAMIENTO SÚPER DIRECTAS:
   - Capacidad exacta en la unidad de medida correspondiente al tipo de máquina.
   - Tipo de material o máquina exacta.
   - Pide fotos del material/proyecto para filtrarlo a ventas.

${customPrompt ? `\nREGLAS DE NEGOCIO PERSONALIZADAS (PRIORIDAD MÁXIMA):\n${customPrompt}\n` : ''}
EJEMPLO DE RESPUESTA PERFECTA:
"¡Claro que sí! Fabricamos peletizadoras a la medida. Para cotizarte rápido: ¿cuántos kilos por hora buscas y qué material es? Si tienes fotos, envíanoslas para asesorarte."

Responde ESTRICTAMENTE con este JSON:
{"route": "/ruta", "name": "Nombre de la sección", "explanation": "Tu respuesta súper humana y corta (max 30 palabras)."}\n\n${knowledgeContext}`
          },
          ...history.map(msg => {
            if (msg.role === 'user' && msg.image) {
              return {
                role: 'user',
                content: [
                  { type: 'text', text: msg.content },
                  { type: 'image_url', image_url: { url: msg.image } }
                ]
              };
            }
            return { role: msg.role, content: msg.content };
          }),
          {
            role: 'user',
            content: image ? [
              { type: 'text', text: query },
              { type: 'image_url', image_url: { url: image } }
            ] : query
          }
        ],
        temperature: 0.3,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0].message.content) {
      let result = JSON.parse(data.choices[0].message.content);
      // Normalize keys to lowercase just in case
      const normalizedResult = {
        route: result.route || result.Route || '/proyectos',
        name: result.name || result.Name || 'Sección Sugerida',
        explanation: result.explanation || result.Explanation || result.Explicacion || 'Redirigiendo a la sección más adecuada.'
      };

      // Log the search to Supabase asynchronously (non-blocking)
      if (supabase) {
        supabase.from('search_logs').insert([{
          ip_address: userIp,
          query: query,
          response: normalizedResult.name
        }]).then(({ error }) => {
          if (error) console.error("Supabase Log Error:", error);
        });
      }

      return res.status(200).json(normalizedResult);
    } else {
      console.error("OpenAI Error:", data);
      throw new Error("Invalid response from OpenAI");
    }
  } catch (error) {
    console.error('Error fetching OpenAI:', error);
    return res.status(500).json({ error: 'Failed to process search' });
  }
}
