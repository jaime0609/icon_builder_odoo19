import React from 'react';

export function OpacitySlider({ value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ flex: 1, accentColor: '#4fc3f7' }}
      />
      <span style={{ color: '#8892a4', fontSize: 11, fontFamily: 'monospace', minWidth: 32, textAlign: 'right' }}>
        {value.toFixed(2)}
      </span>
    </div>
  );
}
