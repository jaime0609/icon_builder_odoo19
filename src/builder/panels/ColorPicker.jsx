import React from 'react';
import { ODOO_PALETTE } from '../constants.js';

export function ColorPicker({ value, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {ODOO_PALETTE.map((c) => (
        <div
          key={c.hex}
          onClick={() => onChange(c.hex)}
          title={c.name}
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            background: c.hex,
            border: value === c.hex ? '2px solid #4fc3f7' : '2px solid transparent',
            cursor: 'pointer',
            boxShadow: c.hex === '#ffffff' ? 'inset 0 0 0 1px #333' : undefined,
          }}
        />
      ))}
      <div style={{ width: '100%', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: 28, height: 24, border: 'none', padding: 0, background: 'none', cursor: 'pointer' }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            background: '#1a2030',
            border: '1px solid #2a3142',
            borderRadius: 4,
            color: '#e8eaf0',
            padding: '3px 6px',
            fontSize: 11,
            fontFamily: 'monospace',
          }}
        />
      </div>
    </div>
  );
}
