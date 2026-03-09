import { ODOO_COLORS } from '../tokens.js';

export function IconMail() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Capa 1 — Sobre */}
      <rect
        x="12" y="22" width="56" height="36" rx="8"
        fill={ODOO_COLORS.skyBlue}
        opacity="0.90"
      />
      {/* Capa 2 — Solapa del sobre */}
      <path
        d="M12 26 L40 44 L68 26"
        stroke={ODOO_COLORS.blue}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      {/* Detalle — Línea inferior */}
      <path
        d="M18 54 L30 44 M62 54 L50 44"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.30"
      />
    </svg>
  );
}
