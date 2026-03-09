export const ODOO_COLORS = {
  // Fondos
  bgCard:    '#161b27',   // Fondo del card completo
  bgIcon:    '#1a2030',   // Fondo del wrapper del icono
  bgPage:    '#0d1117',   // Fondo de página/app

  // Paleta de iconos (sólidos, sin gradientes)
  teal:      '#00d4b5',
  green:     '#00b89f',
  blue:      '#1cb3e0',
  skyBlue:   '#3498db',
  purple:    '#9b59b6',
  violet:    '#c77dff',
  red:       '#e74c3c',
  coral:     '#ff6b6b',
  orange:    '#e67e22',
  amber:     '#f39c12',
  pink:      '#e91e8c',
  emerald:   '#27ae60',
};

export const ODOO_SIZES = {
  // viewBox siempre 80x80
  viewBox: '0 0 80 80',

  // Tamaños del wrapper
  sm:  { wrapper: 48,  icon: 34, radius: 10 },
  md:  { wrapper: 72,  icon: 52, radius: 16 },  // ← tamaño estándar Odoo
  lg:  { wrapper: 96,  icon: 70, radius: 20 },
  xl:  { wrapper: 120, icon: 88, radius: 24 },
};

export const ODOO_OPACITY = {
  // Reglas de opacidad para formas SVG
  primary:   0.95,   // Forma dominante
  secondary: 0.85,   // Segunda capa
  tertiary:  0.70,   // Tercera capa / fondo
  detail:    0.50,   // Detalles blancos
  subtle:    0.25,   // Detalles muy sutiles
};