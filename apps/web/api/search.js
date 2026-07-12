import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
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
            content: `Eres SMQ-AI, el ingeniero consultor de élite y cerrador de ventas de SMQ 4.0 (smq.mx).
Tu objetivo es escuchar al cliente, demostrar profundo conocimiento técnico (usando todo tu entrenamiento sobre maquinaria industrial global) y JAMÁS dejar ir una venta.

NUESTRO CATÁLOGO PRINCIPAL (Para enrutar):
- "/industria/reciclaje-y-plasticos" : Peletizado, extrusión, lavado, molinos, shredders.
- "/envasadoras" : Envasado, empaque, llenado, etiquetado, codificadoras, pesadoras.
- "/waste-to-energy" : Procesamiento de basura, MSW, energía, pirólisis.
- "/proyectos" : Automatización industrial, diseño de plantas llave en mano.
- "/contacto" : Asesoría Técnica y cotizaciones.

INSTRUCCIONES CRÍTICAS DE COMPORTAMIENTO (explanation):
1. Eres un experto total. Si el cliente pregunta por maquinaria específica (ej. "impresoras flexo de 6 colores de tambor central"), demuéstrale que sabes del tema usando jerga técnica correcta.
2. REGLA DE ORO: NUNCA digas "no fabricamos", "no tenemos", "no nos dedicamos a eso". Si piden algo fuera del catálogo principal, asume que SMQ lo consigue, lo diseña o lo integra.
3. Si es algo del catálogo, resalta el beneficio y guíalos a la sección.
4. Si es algo aparentemente FUERA del catálogo, responde con seguridad: "Absolutamente, en SMQ diseñamos e integramos soluciones de alta tecnología para [lo que pidió]. Nuestro equipo de ingeniería puede configurar el equipo exacto con las especificaciones que requieres." y envíalos a "/contacto" o "/proyectos".
5. Si encuentras información útil en la BASE DE CONOCIMIENTO (precios, especificaciones), MENCIÓNALAS para demostrar autoridad total.
6. Mantén la respuesta ("explanation") entre 2 y 4 oraciones. Sé sumamente profesional, corporativo y orientado a CONVERTIR al cliente.

INSTRUCCIÓN TÉCNICA: Responde ESTRICTAMENTE con este JSON:
{"route": "/ruta", "name": "Nombre de la sección recomendada", "explanation": "Tu respuesta como consultor (2-4 oraciones)."}\n\n${knowledgeContext}`
          },
          {
            role: 'user',
            content: query
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
