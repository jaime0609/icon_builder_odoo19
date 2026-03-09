import { ODOO_COLORS } from '../tokens.js';

export function IconFacturacion() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Capa 1 — Documento */}
      <rect
        x="20" y="10" width="40" height="56" rx="6"
        fill={ODOO_COLORS.amber}
        opacity="0.90"
      />
      {/* Capa 2 — Pestaña doblada */}
      <path
        d="M48 10 L60 22 L48 22 Z"
        fill={ODOO_COLORS.orange}
        opacity="0.85"
      />
      {/* Detalle — Signo $ */}
      <text
        x="40" y="48"
        textAnchor="middle"
        fontSize="22"
        fontWeight="bold"
        fill="#fff"
        opacity="0.50"
      >
        $
      </text>
    </svg>
  );
}
