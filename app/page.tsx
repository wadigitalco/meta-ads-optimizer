"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const camposMetricas = [
  { key: "nombreCampana", label: "Nombre de la campaña", placeholder: "Ej: Campaña Pañales Mayo" },
  { key: "producto", label: "Producto principal", placeholder: "Ej: Serum facial hidratante" },
  { key: "objetivo", label: "Objetivo de la campaña", placeholder: "Ej: Conversiones / Ventas" },
  { key: "presupuestodiario", label: "Presupuesto diario (USD)", placeholder: "Ej: 10" },
  { key: "diasActiva", label: "Días activa", placeholder: "Ej: 7" },
  { key: "gastoTotal", label: "Gasto total (USD)", placeholder: "Ej: 70" },
  { key: "impresiones", label: "Impresiones", placeholder: "Ej: 15000" },
  { key: "alcance", label: "Alcance", placeholder: "Ej: 12000" },
  { key: "ctr", label: "CTR (%)", placeholder: "Ej: 1.5" },
  { key: "cpc", label: "CPC (USD)", placeholder: "Ej: 0.80" },
  { key: "cpp", label: "Costo por compra (USD)", placeholder: "Ej: 25" },
  { key: "roas", label: "ROAS", placeholder: "Ej: 2.5" },
  { key: "compras", label: "Compras", placeholder: "Ej: 3" },
  { key: "visitasTienda", label: "Visitas a tienda", placeholder: "Ej: 180" },
  { key: "agregadosCarrito", label: "Agregados al carrito", placeholder: "Ej: 40" },
  { key: "inicioPago", label: "Inicio de pago", placeholder: "Ej: 15" },
];

export default function Home() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [resultado, setResultado] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAnalizar = async () => {
    setCargando(true);
    setResultado("");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResultado(data.resultado);
    } catch {
      setResultado("Error al analizar. Intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", padding: "40px 20px", fontFamily: "sans-serif" }}>
      <style>{`
        .md-body h2 { color: #FF0164; font-size: 18px; margin-top: 28px; margin-bottom: 12px; border-bottom: 1px solid #222; padding-bottom: 8px; }
        .md-body h3 { color: #FF8C00; font-size: 15px; margin-top: 20px; margin-bottom: 8px; }
        .md-body p { color: #ddd; font-size: 15px; line-height: 1.8; margin-bottom: 12px; }
        .md-body strong { color: #fff; }
        .md-body ul { padding-left: 20px; margin-bottom: 12px; }
        .md-body li { color: #ddd; font-size: 15px; line-height: 1.8; margin-bottom: 6px; }
        .md-body table { width: 100%; border-collapse: collapse; margin: 16px 0; }
        .md-body th { background: #1e1e1e; color: #FF0164; padding: 10px 14px; text-align: left; font-size: 13px; border: 1px solid #333; }
        .md-body td { padding: 10px 14px; color: #ddd; font-size: 14px; border: 1px solid #222; vertical-align: top; }
        .md-body tr:nth-child(even) td { background: #111; }
      `}</style>

      <div style={{ maxWidth: "760px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <img src="/logo.png" alt="WA Digital" style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }} />
            <span style={{ color: "#888", fontSize: "13px" }}>Funnel Day by WA Digital</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: "bold", margin: "0 0 8px 0" }}>Optimizador de Campañas Meta Ads</h1>
          <p style={{ color: "#888", fontSize: "15px", margin: 0 }}>Ingresa las métricas del Ads Manager y recibe un diagnóstico completo con plan de acción priorizado.</p>
        </div>

        {/* Formulario */}
        <div style={{ background: "#141414", borderRadius: "16px", padding: "32px", marginBottom: "24px", border: "1px solid #222" }}>
          <h2 style={{ color: "#FF0164", fontSize: "16px", fontWeight: "bold", marginTop: 0, marginBottom: "24px" }}>📋 Datos de la campaña</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {camposMetricas.map((campo) => (
              <div key={campo.key}>
                <label style={{ color: "#aaa", fontSize: "12px", display: "block", marginBottom: "6px" }}>{campo.label}</label>
                <input
                  type="text"
                  placeholder={campo.placeholder}
                  value={form[campo.key] || ""}
                  onChange={(e) => handleChange(campo.key, e.target.value)}
                  style={{ width: "100%", background: "#1e1e1e", border: "1px solid #333", borderRadius: "8px", padding: "10px 12px", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleAnalizar}
            disabled={cargando}
            style={{ marginTop: "28px", width: "100%", background: cargando ? "#555" : "#FF0164", color: "#fff", border: "none", borderRadius: "10px", padding: "14px", fontSize: "16px", fontWeight: "bold", cursor: cargando ? "not-allowed" : "pointer" }}
          >
            {cargando ? "Analizando campaña..." : "🔍 Analizar campaña"}
          </button>
        </div>

        {/* Resultado */}
        {resultado && (
          <div style={{ background: "#141414", borderRadius: "16px", padding: "32px", border: "1px solid #222" }}>
            <h2 style={{ color: "#FF0164", fontSize: "16px", fontWeight: "bold", marginTop: 0, marginBottom: "20px" }}>📊 Diagnóstico y Plan de Optimización</h2>
            <div className="md-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{resultado}</ReactMarkdown>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}