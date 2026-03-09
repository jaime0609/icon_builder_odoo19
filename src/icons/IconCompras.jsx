import { ODOO_COLORS } from '../tokens.js';

export function IconCompras() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Capa 1 — Bolsa */}
      <rect
        x="18" y="30" width="44" height="36" rx="8"
        fill={ODOO_COLORS.emerald}
        opacity="0.90"
      />
      {/* Capa 2 — Asa de la bolsa */}
      <path
        d="M30 30 V22 C30 16 36 12 40 12 C44 12 50 16 50 22 V30"
        stroke={ODOO_COLORS.green}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      {/* Detalle — Flecha abajo (compra entrante) */}
      <path
        d="M40 40 V54 M34 48 L40 54 L46 48"
        stroke="#fff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
    </svg>
  );
}
