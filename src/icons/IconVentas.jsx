import { ODOO_COLORS } from '../tokens.js';

export function IconVentas() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Capa 1 — Gráfica fondo */}
      <rect
        x="14" y="16" width="52" height="48" rx="8"
        fill={ODOO_COLORS.teal}
        opacity="0.25"
      />
      {/* Capa 2 — Línea de tendencia ascendente */}
      <path
        d="M20 56 L34 42 L46 48 L62 26"
        stroke={ODOO_COLORS.teal}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
      {/* Detalle — Flecha arriba */}
      <path
        d="M56 26 L62 26 L62 32"
        stroke={ODOO_COLORS.green}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}
