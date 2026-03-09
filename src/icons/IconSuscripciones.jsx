import { ODOO_COLORS } from '../tokens.js';

/**
 * Reglas del sistema:
 * ✓ viewBox="0 0 80 80"
 * ✓ fill="none" en el SVG raíz
 * ✓ 2–3 formas geométricas superpuestas
 * ✓ Colores sólidos (sin gradientes)
 * ✓ opacity entre 0.70 y 0.95
 * ✓ Detalles blancos con opacity 0.25–0.60
 * ✓ strokeLinecap="round" para trazos
 */
export function IconSuscripciones() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Capa 1 — anillo exterior, opacity alta */}
      <circle
        cx="40" cy="40" r="28"
        stroke={ODOO_COLORS.teal}
        strokeWidth="9"
        strokeDasharray="60 20"
        strokeLinecap="round"
        opacity="0.95"
      />
      {/* Capa 2 — anillo interior, opacity media */}
      <circle
        cx="40" cy="40" r="14"
        stroke={ODOO_COLORS.green}
        strokeWidth="6"
        strokeDasharray="28 14"
        strokeLinecap="round"
        opacity="0.70"
      />
      {/* Detalle — flechas de renovación */}
      <path
        d="M52 28 L58 34 L52 40"
        stroke={ODOO_COLORS.teal}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}