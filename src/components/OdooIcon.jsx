import { ODOO_COLORS, ODOO_SIZES } from '../tokens.js';

/**
 * OdooIcon — Wrapper con fondo #1a2030, border-radius y drop-shadow de color.
 *
 * Props:
 *   children   → El SVG del icono
 *   color      → Color dominante del icono (para el drop-shadow)
 *   size       → 'sm' | 'md' | 'lg' | 'xl'  (default: 'md')
 *   style      → Estilos adicionales para el wrapper externo
 */
export function OdooIcon({ children, color, size = 'md', style = {} }) {
  const { wrapper, icon, radius } = ODOO_SIZES[size];

  return (
    <div
      style={{
        width: wrapper,
        height: wrapper,
        borderRadius: radius,
        background: ODOO_COLORS.bgIcon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        filter: color ? `drop-shadow(0 4px 12px ${color}44)` : undefined,
        ...style,
      }}
    >
      <div style={{ width: icon, height: icon }}>
        {children}
      </div>
    </div>
  );
}