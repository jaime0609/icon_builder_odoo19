import { ODOO_COLORS } from '../tokens.js';

export function IconEventos() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Capa 1 — Calendario */}
      <rect
        x="16" y="20" width="48" height="44" rx="8"
        fill={ODOO_COLORS.coral}
        opacity="0.90"
      />
      {/* Capa 2 — Barra superior */}
      <rect
        x="16" y="20" width="48" height="14" rx="8"
        fill={ODOO_COLORS.red}
        opacity="0.85"
      />
      {/* Detalle — Estrella de evento */}
      <path
        d="M40 38 L42.5 44 L49 44.5 L44 49 L45.5 55.5 L40 52 L34.5 55.5 L36 49 L31 44.5 L37.5 44 Z"
        fill="#fff"
        opacity="0.50"
      />
    </svg>
  );
}
