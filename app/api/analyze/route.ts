import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    nombreCampana,
    producto,
    presupuestodiario,
    diasActiva,
    impresiones,
    alcance,
    ctr,
    cpc,
    cpp,
    roas,
    compras,
    visitasTienda,
    agregadosCarrito,
    inicioPago,
    gastoTotal,
    objetivo,
  } = body;

  const prompt = `Eres un experto en Meta Ads con más de 10 años de experiencia optimizando campañas de ecommerce para marcas de productos físicos en Latinoamérica. Tu trabajo es analizar métricas reales y dar un diagnóstico claro y un plan de acción priorizado.

DATOS DE LA CAMPAÑA:
- Campaña: ${nombreCampana}
- Producto: ${producto}
- Objetivo de la campaña: ${objetivo}
- Presupuesto diario: $${presupuestodiario} USD
- Días activa: ${diasActiva}
- Gasto total: $${gastoTotal} USD

MÉTRICAS DE RENDIMIENTO:
- Impresiones: ${impresiones}
- Alcance: ${alcance}
- CTR: ${ctr}%
- CPC: $${cpc} USD
- CPP (Costo por compra): $${cpp} USD
- ROAS: ${roas}
- Compras: ${compras}
- Visitas a tienda: ${visitasTienda}
- Agregados al carrito: ${agregadosCarrito}
- Inicio de pago: ${inicioPago}

Analiza esta campaña en 3 niveles y entrega el siguiente reporte estructurado:

## 🔍 DIAGNÓSTICO GENERAL
Un párrafo de 3-4 líneas con tu evaluación global de la campaña. Sé directo y específico.

## 📊 ANÁLISIS POR NIVEL

### Nivel 1 — Campaña
Evalúa el objetivo elegido, el presupuesto y los días activos. ¿Está bien configurada la base?

### Nivel 2 — Conjunto de anuncios (Adset)
Evalúa el CPM, CTR y alcance. ¿Hay problemas de audiencia, fatiga o segmentación?

### Nivel 3 — Anuncio
Evalúa el CTR y el CPC. ¿El creativo está atrayendo clics de calidad?

## 🚨 PROBLEMAS DETECTADOS
Lista los problemas en orden de impacto, del más crítico al menos crítico. Para cada uno indica:
- **Problema:** qué está fallando
- **Causa probable:** por qué está pasando
- **Impacto:** cómo está afectando el ROAS

## ✅ PLAN DE OPTIMIZACIÓN PRIORIZADO
Lista las acciones a tomar en orden de prioridad. Para cada una indica:
- **Acción:** qué hacer exactamente
- **Cuándo:** inmediato / esta semana / próxima semana
- **Resultado esperado:** qué debería mejorar

## 📈 PROYECCIÓN
Si se implementan los cambios sugeridos, ¿qué ROAS es alcanzable en los próximos 14 días? Sé realista y explica por qué. No hagas preguntas al final del reporte. Termina con la proyección.`;

  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0];
  const text = content.type === "text" ? content.text : "";

  return NextResponse.json({ resultado: text });
}