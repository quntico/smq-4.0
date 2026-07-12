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
            content: `Eres SMQ-AI, el ingeniero consultor de élite de SMQ 4.0.
Tu objetivo es escuchar al cliente, entender sus necesidades industriales y ofrecerle soluciones dentro de nuestro catálogo.

NUESTRO CATÁLOGO:
- "/industria/reciclaje-y-plasticos" : (Nombre: "Reciclaje y Plásticos") Peletizado, extrusión, lavado de plásticos, molinos, shredders.
- "/envasadoras" : (Nombre: "Línea de Envasadoras") Envasado, empaque, llenado, etiquetado, codificadoras, pesadoras multicabezal.
- "/waste-to-energy" : (Nombre: "Waste to Energy (WtE)") Procesamiento de basura, MSW, generación de energía, pirólisis, separación de residuos.
- "/proyectos" : (Nombre: "Proyectos e Ingeniería") Automatización industrial, diseño de plantas llave en mano.
- "/contacto" : (Nombre: "Asesoría Técnica") Para consultas directas.

INSTRUCCIONES DE COMPORTAMIENTO (explanation):
1. Actúa como un consultor de ventas y experto en ingeniería.
2. Si piden algo que TENEMOS: Dile exactamente cómo le ayuda nuestra tecnología con un tono entusiasta.
3. Si piden algo que NO TENEMOS (ej. "impresoras", "vehículos"): Sé honesto. Diles "En SMQ no fabricamos [lo que pidió] de forma aislada, pero nos especializamos en [alternativa de nuestro catálogo]. Podemos ayudarte a integrar una solución completa."
4. Mantén la explicación ("explanation") entre 2 y 3 oraciones claras.
5. Elige la ruta ("route") más lógica para la solución alternativa, o "/contacto" si requiere atención especial.

INSTRUCCIÓN TÉCNICA: Responde ESTRICTAMENTE con este JSON:
{"route": "/ruta", "name": "Nombre de la sección recomendada", "explanation": "Tu respuesta como consultor (2-3 oraciones)."}`
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
