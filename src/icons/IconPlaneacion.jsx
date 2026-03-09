import { ODOO_COLORS } from '../tokens.js';

export function IconPlaneacion() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Capa 1 — Calendario fondo */}
      <rect
        x="14" y="18" width="52" height="46" rx="8"
        fill={ODOO_COLORS.purple}
        opacity="0.90"
      />
      {/* Capa 2 — Barra superior */}
      <rect
        x="14" y="18" width="52" height="14" rx="8"
        fill={ODOO_COLORS.violet}
        opacity="0.85"
      />
      {/* Detalle — Barras de Gantt */}
      <rect x="22" y="40" width="20" height="4" rx="2" fill="#fff" opacity="0.50" />
      <rect x="22" y="50" width="28" height="4" rx="2" fill="#fff" opacity="0.35" />
    </svg>
  );
}
