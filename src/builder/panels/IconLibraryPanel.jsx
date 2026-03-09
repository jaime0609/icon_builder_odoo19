import React, { useState, useMemo } from 'react';
import { BOOTSTRAP_ICONS, ODOO_SHAPES, ICON_CATEGORIES } from '../iconLibrary.js';

const ITEM_SIZE = 34;

const itemStyle = {
  width: ITEM_SIZE,
  height: ITEM_SIZE,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1a2030',
  border: '1px solid #2a3142',
  borderRadius: 6,
  cursor: 'pointer',
  gap: 2,
  transition: 'border-color 0.1s, background 0.1s',
};

function IconThumb({ icon, onAdd, previewColor }) {
  return (
    <div
      title={icon.name}
      onClick={onAdd}
      style={itemStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#4fc3f7';
        e.currentTarget.style.background = '#1e2840';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2a3142';
        e.currentTarget.style.background = '#1a2030';
      }}
    >
      <svg viewBox="0 0 16 16" width={20} height={20}>
        {icon.paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill={previewColor || '#c0c6d0'}
            fillRule={icon.fillRule || undefined}
          />
        ))}
      </svg>
    </div>
  );
}

function OdooShapeThumb({ shape, onAdd }) {
  return (
    <div
      title={shape.name}
      onClick={onAdd}
      style={{ ...itemStyle, width: 'auto', padding: '4px 6px', gap: 3, flexDirection: 'column', height: 'auto' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#4fc3f7';
        e.currentTarget.style.background = '#1e2840';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2a3142';
        e.currentTarget.style.background = '#1a2030';
      }}
    >
      <svg viewBox="0 0 50 50" width={28} height={28}>
        {shape.paths.map((d, i) => (
          <path key={i} d={d} fill={shape.color} />
        ))}
      </svg>
      <span style={{ color: '#8892a4', fontSize: 8, textAlign: 'center', lineHeight: 1.2, maxWidth: 50 }}>
        {shape.name.replace(/^[^-]+ - /, '')}
      </span>
    </div>
  );
}

export function IconLibraryPanel({ onAddIcon, onAddOdooShape }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [tab, setTab] = useState('bootstrap'); // 'bootstrap' | 'odoo'

  const filteredBootstrap = useMemo(() => {
    const q = search.toLowerCase();
    return BOOTSTRAP_ICONS.filter((icon) => {
      const matchCat = category === 'all' || icon.category === category;
      const matchSearch = !q || icon.name.includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const filteredOdoo = useMemo(() => {
    const q = search.toLowerCase();
    return ODOO_SHAPES.filter((s) => !q || s.name.toLowerCase().includes(q));
  }, [search]);

  // Bootstrap categories (exclude 'odoo' from filter when on bootstrap tab)
  const bsCategories = ICON_CATEGORIES.filter((c) => c.id !== 'odoo');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Tab: Bootstrap / Piezas Odoo */}
      <div style={{ display: 'flex', borderBottom: '1px solid #1e2433' }}>
        {['bootstrap', 'odoo'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: '6px 4px',
              background: tab === t ? '#1e2840' : 'transparent',
              color: tab === t ? '#4fc3f7' : '#8892a4',
              border: 'none',
              borderBottom: tab === t ? '2px solid #4fc3f7' : '2px solid transparent',
              fontSize: 11,
              fontWeight: tab === t ? 600 : 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {t === 'bootstrap' ? 'Bootstrap' : 'Piezas Odoo'}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ padding: '6px 8px' }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            background: '#1a2030',
            border: '1px solid #2a3142',
            borderRadius: 4,
            color: '#e8eaf0',
            padding: '4px 8px',
            fontSize: 11,
            outline: 'none',
          }}
        />
      </div>

      {/* Category filter (Bootstrap only) */}
      {tab === 'bootstrap' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, padding: '0 8px 6px' }}>
          {bsCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                padding: '2px 6px',
                background: category === cat.id ? '#4fc3f7' : '#1a2030',
                color: category === cat.id ? '#0d1117' : '#8892a4',
                border: '1px solid',
                borderColor: category === cat.id ? '#4fc3f7' : '#2a3142',
                borderRadius: 10,
                fontSize: 9,
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 8px 8px' }}>
        {tab === 'bootstrap' ? (
          <>
            <div style={{ color: '#8892a4', fontSize: 9, marginBottom: 6 }}>
              {filteredBootstrap.length} iconos · click para agregar
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {filteredBootstrap.map((icon) => (
                <IconThumb
                  key={icon.name}
                  icon={icon}
                  previewColor="#c0c6d0"
                  onAdd={() => onAddIcon(icon)}
                />
              ))}
              {filteredBootstrap.length === 0 && (
                <div style={{ color: '#555d6e', fontSize: 11, padding: 8 }}>
                  Sin resultados
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div style={{ color: '#8892a4', fontSize: 9, marginBottom: 6 }}>
              Piezas de módulos Odoo reales · click para agregar
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {filteredOdoo.map((shape) => (
                <OdooShapeThumb
                  key={shape.name}
                  shape={shape}
                  onAdd={() => onAddOdooShape(shape)}
                />
              ))}
              {filteredOdoo.length === 0 && (
                <div style={{ color: '#555d6e', fontSize: 11, padding: 8 }}>
                  Sin resultados
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
