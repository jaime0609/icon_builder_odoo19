# Odoo 19 Icon System — Guía de implementación React

> Crea un paquete de iconos reutilizable en el mismo estilo visual de Odoo 19,
> listo para usar en cualquier proyecto React/Vite.

---

## 1. Estructura del paquete

Todo vive en **una sola carpeta**. No necesitas monorepo ni workspaces.

```
odoo19-icons/
├── src/
│   ├── icons/              ← Un archivo .jsx por icono
│   │   ├── IconSuscripciones.jsx
│   │   ├── IconCalidad.jsx
│   │   ├── IconPlaneacion.jsx
│   │   └── ...
│   ├── components/
│   │   ├── OdooIcon.jsx    ← Wrapper con fondo oscuro + drop-shadow
│   │   └── IconCard.jsx    ← Card completa (icono + nombre + tech name)
│   ├── tokens.js           ← Colores, tamaños, radios del sistema
│   └── index.js            ← Re-exporta todo
├── package.json
├── vite.config.js          ← (si usas Vite para desarrollar/previsualizar)
└── README.md
```

---

## 2. Inicializar el proyecto

```bash
# Crear carpeta
mkdir odoo19-icons && cd odoo19-icons

# Inicializar package.json
npm init -y

# Instalar dependencias de desarrollo
npm install --save-dev vite @vitejs/plugin-react

# React como peer dependency (no bundlear React)
npm install --save-peer react react-dom
```

`package.json` mínimo:

```json
{
  "name": "odoo19-icons",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0"
  },
  "peerDependencies": {
    "react": ">=17"
  }
}
```

---

## 3. Design tokens — `src/tokens.js`

Define aquí **todos los valores del sistema** para que sean consistentes.

```js
// src/tokens.js

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
```

---

## 4. Componente base — `src/components/OdooIcon.jsx`

Este es el **wrapper universal** que aplica el fondo oscuro y el drop-shadow.
Todos los iconos se renderizan dentro de él.

```jsx
// src/components/OdooIcon.jsx
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
```

---

## 5. Componente de card — `src/components/IconCard.jsx`

Replica el card completo de la pantalla de apps de Odoo 19.

```jsx
// src/components/IconCard.jsx
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
```

---

## 6. Crear un icono — patrón estándar

Cada icono es un **archivo .jsx que exporta solo el SVG** (sin wrapper).
El wrapper lo pone `OdooIcon`. Así el SVG es reutilizable en cualquier tamaño.

```jsx
// src/icons/IconSuscripciones.jsx
import { ODOO_COLORS } from '../tokens.js';

/**
 * Reglas del sistema:
 * ✓ viewBox="0 0 80 80"
 * ✓ fill="none" en el SVG raíz
 * ✓ 2–3 formas geométricas superpuestas
 * ✓ Colores sólidos (sin gradientes)
 * ✓ opacity entre 0.70 y 0.95
 * ✓ Detalles blancos con opacity 0.25–0.60
 * ✓ strokeLinecap="round" para trazos
 */
export function IconSuscripciones() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Capa 1 — anillo exterior, opacity alta */}
      <circle
        cx="40" cy="40" r="28"
        stroke={ODOO_COLORS.teal}
        strokeWidth="9"
        strokeDasharray="60 20"
        strokeLinecap="round"
        opacity="0.95"
      />
      {/* Capa 2 — anillo interior, opacity media */}
      <circle
        cx="40" cy="40" r="14"
        stroke={ODOO_COLORS.green}
        strokeWidth="6"
        strokeDasharray="28 14"
        strokeLinecap="round"
        opacity="0.70"
      />
      {/* Detalle — flechas de renovación */}
      <path
        d="M52 28 L58 34 L52 40"
        stroke={ODOO_COLORS.teal}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

### Template en blanco para nuevos iconos

```jsx
// src/icons/IconNuevo.jsx
import { ODOO_COLORS } from '../tokens.js';

export function IconNuevo() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── CAPA 1: Forma principal (opacity 0.90–0.95) ────────────── */}
      {/* rect / circle / polygon / path */}

      {/* ── CAPA 2: Forma secundaria (opacity 0.80–0.88) ──────────── */}
      {/* Misma familia de formas, desplazada o rotada */}

      {/* ── CAPA 3: Detalle o acento (opacity 0.60–0.75) ──────────── */}
      {/* Elemento pequeño o brillo blanco */}

    </svg>
  );
}
```

---

## 7. Punto de entrada — `src/index.js`

```js
// src/index.js — Re-exporta todo el sistema

// Tokens
export * from './tokens.js';

// Componentes
export { OdooIcon }  from './components/OdooIcon.jsx';
export { IconCard }  from './components/IconCard.jsx';

// Iconos
export { IconSuscripciones } from './icons/IconSuscripciones.jsx';
export { IconCalidad }       from './icons/IconCalidad.jsx';
export { IconPlaneacion }    from './icons/IconPlaneacion.jsx';
export { IconELearning }     from './icons/IconELearning.jsx';
export { IconEventos }       from './icons/IconEventos.jsx';
export { IconMail }          from './icons/IconMail.jsx';
// ... agrega aquí cada nuevo icono
```

---

## 8. Usar el sistema en cualquier proyecto

### Importación directa (misma carpeta o monorepo)

```jsx
import { OdooIcon, IconCard, IconSuscripciones, ODOO_COLORS } from './odoo19-icons/src/index.js';

// Solo el SVG con wrapper
<OdooIcon color={ODOO_COLORS.teal} size="lg">
  <IconSuscripciones />
</OdooIcon>

// Card completa
<IconCard
  icon={<IconSuscripciones />}
  name="Suscripciones"
  techName="sale_subscription"
  color={ODOO_COLORS.teal}
  active={true}
  onClick={() => console.log('clicked')}
/>
```

### Grid de cards (ejemplo completo)

```jsx
import { IconCard, IconSuscripciones, IconCalidad, ODOO_COLORS } from './odoo19-icons/src/index.js';

const MODULOS = [
  { icon: <IconSuscripciones />, name: 'Suscripciones', tech: 'sale_subscription', color: ODOO_COLORS.teal   },
  { icon: <IconCalidad />,       name: 'Calidad',       tech: 'quality_control',   color: ODOO_COLORS.blue   },
  // ...
];

export function AppGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
      gap: 12,
      background: '#0d1117',
      padding: 24,
    }}>
      {MODULOS.map(m => (
        <IconCard key={m.tech} {...m} />
      ))}
    </div>
  );
}
```

---

## 9. Componentes opcionales a agregar

| Componente | Archivo | Para qué sirve |
|---|---|---|
| `IconGrid` | `components/IconGrid.jsx` | Grid responsivo con todos los iconos |
| `IconSearch` | `components/IconSearch.jsx` | Búsqueda/filtro de iconos en tiempo real |
| `IconPicker` | `components/IconPicker.jsx` | Selector modal para formularios Odoo |
| `IconBadge` | `components/IconBadge.jsx` | Icono pequeño con contador de notificación |
| `AppCard` | `components/AppCard.jsx` | Card con botones "Activar" / "Más información" |

---

## 10. Reglas de diseño — resumen rápido

```
viewBox       →  siempre 0 0 80 80
fondo card    →  #161b27
fondo wrapper →  #1a2030  +  border-radius: 16px
drop-shadow   →  0 4px 12px {color}44
opacidades    →  0.95 / 0.85 / 0.70  (nunca 1.0 en capas superpuestas)
detalles ✦    →  blanco (#fff) con opacity 0.25–0.60
colores       →  sólidos vibrantes, SIN gradientes
trazos        →  strokeLinecap="round" + strokeLinejoin="round"
capas         →  2 a 3 formas por icono (no más)
```

---

## 11. Árbol final de archivos

```
odoo19-icons/
├── src/
│   ├── tokens.js
│   ├── index.js
│   ├── components/
│   │   ├── OdooIcon.jsx     ← wrapper universal
│   │   ├── IconCard.jsx     ← card completa
│   │   ├── IconGrid.jsx     ← (opcional)
│   │   └── IconPicker.jsx   ← (opcional)
│   └── icons/
│       ├── IconSuscripciones.jsx
│       ├── IconCalidad.jsx
│       ├── IconPlaneacion.jsx
│       ├── IconELearning.jsx
│       ├── IconEventos.jsx
│       ├── IconMail.jsx
│       ├── IconInventario.jsx
│       ├── IconFacturacion.jsx
│       ├── IconCompras.jsx
│       ├── IconVentas.jsx
│       ├── IconRRHH.jsx
│       └── IconProyecto.jsx
├── package.json
├── vite.config.js
└── README.md
```

---

> **Tip de desarrollo:** Para previsualizar los iconos mientras los creas,
> crea un `src/main.jsx` que importe tu `AppGrid` y corre `npm run dev`.
> No necesitas publicar el paquete en npm para usarlo — con la importación
> por ruta relativa es suficiente para proyectos internos como los de EYESA.
```
