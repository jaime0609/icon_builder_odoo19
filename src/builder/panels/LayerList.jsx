import React from 'react';

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '5px 8px',
  borderRadius: 4,
  cursor: 'pointer',
  fontSize: 11,
  transition: 'background 0.1s',
};

export function LayerList({ shapes, selectedShapeId, onSelect, onToggleVisible, onMoveUp, onMoveDown }) {
  // Show shapes in reverse order (top layer first)
  const reversed = [...shapes].reverse();

  return (
    <div>
      <div style={{ color: '#8892a4', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, padding: '8px 8px 4px', fontWeight: 600 }}>
        Capas ({shapes.length})
      </div>
      <div style={{ maxHeight: 200, overflowY: 'auto' }}>
        {reversed.map((shape, i) => {
          const isSelected = shape.id === selectedShapeId;
          const realIndex = shapes.length - 1 - i;
          return (
            <div
              key={shape.id}
              onClick={() => onSelect(shape.id)}
              style={{
                ...rowStyle,
                background: isSelected ? '#1e2e44' : 'transparent',
                color: shape.visible ? '#c0c6d0' : '#555',
              }}
            >
              {/* Visibility toggle */}
              <span
                onClick={(e) => { e.stopPropagation(); onToggleVisible(shape.id); }}
                style={{ cursor: 'pointer', fontSize: 13, opacity: shape.visible ? 1 : 0.4 }}
                title={shape.visible ? 'Ocultar' : 'Mostrar'}
              >
                {shape.visible ? '◉' : '◎'}
              </span>

              {/* Color dot */}
              <span style={{
                width: 10, height: 10, borderRadius: 2,
                background: shape.fill,
                border: shape.fill === '#ffffff' ? '1px solid #555' : 'none',
                flexShrink: 0,
              }} />

              {/* Name */}
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {shape.name}
              </span>

              {/* Z-order buttons */}
              <span
                onClick={(e) => { e.stopPropagation(); onMoveUp(realIndex); }}
                style={{ cursor: 'pointer', fontSize: 10, opacity: 0.5, padding: '0 2px' }}
                title="Subir"
              >▲</span>
              <span
                onClick={(e) => { e.stopPropagation(); onMoveDown(realIndex); }}
                style={{ cursor: 'pointer', fontSize: 10, opacity: 0.5, padding: '0 2px' }}
                title="Bajar"
              >▼</span>
            </div>
          );
        })}
      </div>
      {shapes.length === 0 && (
        <div style={{ padding: 12, color: '#555d6e', fontSize: 11, textAlign: 'center' }}>
          Sin formas
        </div>
      )}
    </div>
  );
}
