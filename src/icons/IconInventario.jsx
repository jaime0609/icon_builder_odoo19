import { ODOO_COLORS } from '../tokens.js';

export function IconInventario() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Capa 1 — Caja trasera */}
      <rect
        x="18" y="28" width="44" height="34" rx="6"
        fill={ODOO_COLORS.orange}
        opacity="0.70"
      />
      {/* Capa 2 — Caja frontal */}
      <rect
        x="14" y="22" width="44" height="34" rx="6"
        fill={ODOO_COLORS.orange}
        opacity="0.95"
      />
      {/* Detalle — Línea de apertura */}
      <line
        x1="24" y1="39" x2="48" y2="39"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.45"
      />
      <line
        x1="36" y1="33" x2="36" y2="45"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
