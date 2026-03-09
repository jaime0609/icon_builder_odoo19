import { ODOO_COLORS } from '../tokens.js';

export function IconELearning() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Capa 1 — Libro abierto */}
      <path
        d="M12 22 C12 22 26 18 40 24 C54 18 68 22 68 22 V58 C68 58 54 54 40 60 C26 54 12 58 12 58 Z"
        fill={ODOO_COLORS.violet}
        opacity="0.90"
      />
      {/* Capa 2 — Lomo del libro */}
      <line
        x1="40" y1="24" x2="40" y2="60"
        stroke={ODOO_COLORS.purple}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Detalle — Play button */}
      <polygon
        points="34,36 34,48 44,42"
        fill="#fff"
        opacity="0.45"
      />
    </svg>
  );
}
