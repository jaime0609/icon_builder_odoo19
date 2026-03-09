import { ODOO_COLORS } from '../tokens.js';
import { OdooIcon } from './OdooIcon.jsx';

/**
 * IconCard — Card estilo Odoo 19 con icono + nombre + nombre técnico.
 *
 * Props:
 *   icon       → Componente SVG del icono
 *   name       → "Suscripciones"
 *   techName   → "sale_subscription"
 *   color      → Color dominante (afecta el borde activo y drop-shadow)
 *   active     → boolean — si el módulo está activado
 *   onClick    → función callback
 */
export function IconCard({
  icon,
  name,
  techName,
  color = ODOO_COLORS.teal,
  active = false,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: ODOO_COLORS.bgCard,
        border: active
          ? `2px solid ${color}55`
          : '2px solid transparent',
        borderRadius: 14,
        padding: '20px 16px',
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        transition: 'all 0.18s ease',
        boxShadow: active ? `0 0 24px ${color}22` : 'none',
        userSelect: 'none',
      }}
    >
      <OdooIcon color={color} size="md">
        {icon}
      </OdooIcon>

      <div style={{ textAlign: 'center' }}>
        <div style={{
          color: '#e8eaf0',
          fontSize: 13,
          fontWeight: 600,
          lineHeight: 1.3,
        }}>
          {name}
        </div>
        <div style={{
          color: color,
          fontSize: 11,
          fontFamily: 'monospace',
          marginTop: 3,
          opacity: 0.85,
        }}>
          {techName}
        </div>
      </div>
    </div>
  );
}