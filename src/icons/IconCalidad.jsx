import { ODOO_COLORS } from '../tokens.js';

export function IconCalidad() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Capa 1 — Escudo */}
      <path
        d="M40 12 L58 22 V42 C58 54 40 66 40 66 C40 66 22 54 22 42 V22 Z"
        fill={ODOO_COLORS.blue}
        opacity="0.90"
      />
      {/* Capa 2 — Escudo interior */}
      <path
        d="M40 20 L52 27 V40 C52 49 40 58 40 58 C40 58 28 49 28 40 V27 Z"
        fill={ODOO_COLORS.skyBlue}
        opacity="0.70"
      />
      {/* Detalle — Check */}
      <path
        d="M33 40 L38 45 L48 34"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.50"
      />
    </svg>
  );
}
