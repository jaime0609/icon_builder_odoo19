import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { IconCard, ODOO_COLORS } from './index.js';
import { BuilderApp } from './builder/BuilderApp.jsx';

import { IconSuscripciones } from './icons/IconSuscripciones.jsx';
import { IconCalidad }       from './icons/IconCalidad.jsx';
import { IconPlaneacion }    from './icons/IconPlaneacion.jsx';
import { IconELearning }     from './icons/IconELearning.jsx';
import { IconEventos }       from './icons/IconEventos.jsx';
import { IconMail }          from './icons/IconMail.jsx';
import { IconInventario }    from './icons/IconInventario.jsx';
import { IconFacturacion }   from './icons/IconFacturacion.jsx';
import { IconCompras }       from './icons/IconCompras.jsx';
import { IconVentas }        from './icons/IconVentas.jsx';
import { IconRRHH }          from './icons/IconRRHH.jsx';
import { IconProyecto }      from './icons/IconProyecto.jsx';

const MODULOS = [
  { icon: <IconSuscripciones />, name: 'Suscripciones', tech: 'sale_subscription',  color: ODOO_COLORS.teal },
  { icon: <IconCalidad />,       name: 'Calidad',       tech: 'quality_control',    color: ODOO_COLORS.blue },
  { icon: <IconPlaneacion />,    name: 'Planeación',    tech: 'planning',           color: ODOO_COLORS.purple },
  { icon: <IconELearning />,     name: 'eLearning',     tech: 'website_slides',     color: ODOO_COLORS.violet },
  { icon: <IconEventos />,       name: 'Eventos',       tech: 'event',              color: ODOO_COLORS.coral },
  { icon: <IconMail />,          name: 'Correo',        tech: 'mail',               color: ODOO_COLORS.skyBlue },
  { icon: <IconInventario />,    name: 'Inventario',    tech: 'stock',              color: ODOO_COLORS.orange },
  { icon: <IconFacturacion />,   name: 'Facturación',   tech: 'account',            color: ODOO_COLORS.amber },
  { icon: <IconCompras />,       name: 'Compras',       tech: 'purchase',           color: ODOO_COLORS.emerald },
  { icon: <IconVentas />,        name: 'Ventas',        tech: 'sale',               color: ODOO_COLORS.teal },
  { icon: <IconRRHH />,          name: 'RRHH',          tech: 'hr',                 color: ODOO_COLORS.pink },
  { icon: <IconProyecto />,      name: 'Proyecto',      tech: 'project',            color: ODOO_COLORS.blue },
];

function GalleryGrid() {
  return (
    <div style={{ background: ODOO_COLORS.bgPage, minHeight: '100vh', padding: 32 }}>
      <h1 style={{ color: '#e8eaf0', fontSize: 22, marginBottom: 24, fontWeight: 600 }}>
        Odoo 19 — Icon Gallery
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 12,
      }}>
        {MODULOS.map(m => (
          <IconCard
            key={m.tech}
            icon={m.icon}
            name={m.name}
            techName={m.tech}
            color={m.color}
            active={true}
          />
        ))}
      </div>
    </div>
  );
}

const tabStyle = (active) => ({
  padding: '8px 20px',
  background: active ? '#4fc3f7' : 'transparent',
  color: active ? '#0d1117' : '#8892a4',
  border: 'none',
  borderRadius: '6px 6px 0 0',
  fontSize: 13,
  fontWeight: active ? 700 : 400,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'all 0.15s',
});

function App() {
  const [tab, setTab] = useState('builder');

  if (tab === 'builder') {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#0a0e15', padding: '6px 12px 0', display: 'flex', gap: 4, borderBottom: '1px solid #1e2433' }}>
          <button style={tabStyle(true)} onClick={() => setTab('builder')}>Builder</button>
          <button style={tabStyle(false)} onClick={() => setTab('gallery')}>Galería</button>
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <BuilderApp />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ background: '#0a0e15', padding: '6px 12px 0', display: 'flex', gap: 4, borderBottom: '1px solid #1e2433' }}>
        <button style={tabStyle(false)} onClick={() => setTab('builder')}>Builder</button>
        <button style={tabStyle(true)} onClick={() => setTab('gallery')}>Galería</button>
      </div>
      <GalleryGrid />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
