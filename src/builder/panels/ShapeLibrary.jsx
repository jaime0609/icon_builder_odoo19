import React, { useState } from 'react';
import { IconLibraryPanel } from './IconLibraryPanel.jsx';

const previewSize = 34;
const btnStyle = {
  width: previewSize + 8,
  height: previewSize + 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1a2030',
  border: '1px solid #2a3142',
  borderRadius: 6,
  cursor: 'pointer',
  transition: 'border-color 0.12s',
};

function ShapeButton({ label, children, onClick }) {
  return (
    <div
      onClick={onClick}
      title={`Agregar ${label}`}
      style={btnStyle}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4fc3f7'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = '#2a3142'}
    >
      <svg viewBox="0 0 50 50" width={previewSize} height={previewSize}>
        {children}
      </svg>
    </div>
  );
}

const TABS = [
  { id: 'shapes', label: 'Formas' },
  { id: 'icons', label: 'Iconos' },
  { id: 'presets', label: 'Presets' },
];

function TabBar({ active, onChange }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #1e2433' }}>
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            flex: 1,
            padding: '6px 2px',
            background: active === t.id ? '#1e2840' : 'transparent',
            color: active === t.id ? '#4fc3f7' : '#8892a4',
            border: 'none',
            borderBottom: active === t.id ? '2px solid #4fc3f7' : '2px solid transparent',
            fontSize: 10,
            fontWeight: active === t.id ? 600 : 400,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function ShapeLibrary({ onAddShape, presets, onLoadPreset, onAddIcon, onAddOdooShape }) {
  const [tab, setTab] = useState('shapes');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <TabBar active={tab} onChange={setTab} />

      {tab === 'shapes' && (
        <div style={{ padding: 8, overflowY: 'auto' }}>
          <div style={{ color: '#8892a4', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, fontWeight: 600 }}>
            Formas básicas
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <ShapeButton label="Rectángulo" onClick={() => onAddShape('rect')}>
              <rect x="10" y="14" width="30" height="22" rx="2" fill="#985184" opacity="0.9" />
            </ShapeButton>
            <ShapeButton label="Rect redondeado" onClick={() => onAddShape('rect', { rx: 8 })}>
              <rect x="10" y="14" width="30" height="22" rx="8" fill="#FBB945" opacity="0.9" />
            </ShapeButton>
            <ShapeButton label="Círculo" onClick={() => onAddShape('circle')}>
              <circle cx="25" cy="25" r="13" fill="#1AD3BB" opacity="0.9" />
            </ShapeButton>
            <ShapeButton label="Elipse" onClick={() => onAddShape('ellipse')}>
              <ellipse cx="25" cy="25" rx="16" ry="10" fill="#2EBCFA" opacity="0.9" />
            </ShapeButton>
            <ShapeButton label="Triángulo" onClick={() => onAddShape('triangle')}>
              <polygon points="25,10 40,38 10,38" fill="#F86126" opacity="0.9" />
            </ShapeButton>
          </div>

          <div style={{ color: '#8892a4', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 14, marginBottom: 6, fontWeight: 600 }}>
            Dibujar en canvas
          </div>
          <div style={{ color: '#555d6e', fontSize: 10, lineHeight: 1.5 }}>
            Usa las herramientas de la barra superior (R, C, E, T) y arrastra en el canvas para dibujar formas.
          </div>
        </div>
      )}

      {tab === 'icons' && (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <IconLibraryPanel
            onAddIcon={onAddIcon}
            onAddOdooShape={onAddOdooShape}
          />
        </div>
      )}

      {tab === 'presets' && (
        <div style={{ padding: 8, overflowY: 'auto' }}>
          <div style={{ color: '#8892a4', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, fontWeight: 600 }}>
            Presets Odoo — cargan todo el icono
          </div>
          {presets && presets.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {presets.map((preset) => (
                <div
                  key={preset.name}
                  onClick={() => onLoadPreset(preset)}
                  title={`Cargar ${preset.name}`}
                  style={{
                    ...btnStyle,
                    flexDirection: 'column',
                    width: 'auto',
                    height: 'auto',
                    padding: '6px 8px',
                    gap: 3,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4fc3f7'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#2a3142'}
                >
                  <svg viewBox="0 0 50 50" width={32} height={32}>
                    {preset.shapes.map((s, i) => {
                      if (s.type === 'path') return <path key={i} d={s.d} fill={s.fill} opacity={s.opacity} />;
                      if (s.type === 'rect') return <rect key={i} x={s.x} y={s.y} width={s.width} height={s.height} rx={s.rx || 0} fill={s.fill} opacity={s.opacity} />;
                      if (s.type === 'circle') return <circle key={i} cx={s.x + s.width / 2} cy={s.y + s.height / 2} r={s.width / 2} fill={s.fill} opacity={s.opacity} />;
                      if (s.type === 'polygon') return <polygon key={i} points={s.points} fill={s.fill} opacity={s.opacity} />;
                      return null;
                    })}
                  </svg>
                  <span style={{ color: '#8892a4', fontSize: 9 }}>{preset.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: '#555d6e', fontSize: 11 }}>Sin presets</div>
          )}
        </div>
      )}
    </div>
  );
}
