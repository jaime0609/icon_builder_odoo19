import { ODOO_COLORS } from '../tokens.js';

export function IconProyecto() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Capa 1 — Tablero Kanban */}
      <rect
        x="12" y="14" width="56" height="52" rx="8"
        fill={ODOO_COLORS.blue}
        opacity="0.90"
      />
      {/* Capa 2 — Columnas */}
      <rect x="20" y="24" width="14" height="20" rx="3" fill="#fff" opacity="0.40" />
      <rect x="38" y="24" width="14" height="14" rx="3" fill="#fff" opacity="0.30" />
      <rect x="56" y="24" width="6" height="10" rx="3" fill="#fff" opacity="0.20" />
      {/* Detalle — Check en primera columna */}
      <path
        d="M23 33 L26 36 L31 30"
        stroke={ODOO_COLORS.blue}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.90"
      />
    </svg>
  );
}
