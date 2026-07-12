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
            content: `Eres SMQ-AI, el buscador inteligente de la plataforma corporativa SMQ 4.0.
Tu objetivo es analizar lo que busca el usuario (ya sea una máquina, concepto, o industria) y redirigirlo a la sección más relevante.

SECCIONES DISPONIBLES:
- "/industria/reciclaje-y-plasticos" : (Nombre: "Reciclaje y Plásticos") Úsala para búsquedas sobre plásticos, PET, polímeros, peletizado, reciclaje, lavado, extrusoras.
- "/envasadoras" : (Nombre: "Línea de Envasadoras") Úsala para búsquedas sobre envasado, empaque, llenado, maquinaria de envasado, pesadoras.
- "/waste-to-energy" : (Nombre: "Waste to Energy (WtE)") Úsala para búsquedas sobre basura, residuos sólidos, MSW, WtE, generación de energía, pirólisis, reducción inteligente.
- "/proyectos" : (Nombre: "Proyectos Globales") Úsala para búsquedas sobre casos de éxito, instalaciones, plantas, ubicaciones, clientes.
- "/nosotros" : (Nombre: "Empresa") Úsala para búsquedas sobre SMQ, la empresa, historia, misión, visión, ingenieros.

INSTRUCCIÓN CRÍTICA:
Debes responder ESTRICTAMENTE con un objeto JSON válido, sin Markdown, sin bloques de código, sin texto adicional, con esta estructura exacta:
{"route": "/ruta-elegida", "name": "Nombre de la sección", "explanation": "Breve explicación de 1 línea de por qué lo llevas ahí con un tono profesional y corporativo."}`
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
