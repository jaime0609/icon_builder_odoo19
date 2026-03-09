import { ODOO_COLORS } from '../tokens.js';

export function IconRRHH() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Capa 1 — Persona principal */}
      <circle cx="40" cy="28" r="10" fill={ODOO_COLORS.pink} opacity="0.95" />
      <path
        d="M24 58 C24 46 32 40 40 40 C48 40 56 46 56 58"
        fill={ODOO_COLORS.pink}
        opacity="0.85"
      />
      {/* Capa 2 — Persona secundaria (atrás derecha) */}
      <circle cx="58" cy="30" r="7" fill={ODOO_COLORS.coral} opacity="0.55" />
      <path
        d="M48 56 C48 48 52 44 58 44 C64 44 68 48 68 56"
        fill={ODOO_COLORS.coral}
        opacity="0.45"
      />
    </svg>
  );
}
