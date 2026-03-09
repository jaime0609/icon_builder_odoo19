import React from 'react';
import { TOOLS, MIN_ZOOM, MAX_ZOOM } from '../constants.js';

const btnBase = {
  padding: '6px 10px',
  border: '1px solid #2a3142',
  borderRadius: 6,
  fontSize: 12,
  cursor: 'pointer',
  fontFamily: 'inherit',
  transition: 'all 0.12s',
};

function ToolBtn({ label, active, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        ...btnBase,
        background: active ? '#4fc3f7' : '#1a2030',
        color: active ? '#0d1117' : '#c0c6d0',
        borderColor: active ? '#4fc3f7' : '#2a3142',
        fontWeight: active ? 700 : 400,
      }}
    >
      {label}
    </button>
  );
}

function ActionBtn({ label, onClick, disabled, title, accent }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        ...btnBase,
        background: accent ? '#4fc3f7' : '#1a2030',
        color: accent ? '#0d1117' : disabled ? '#444' : '#c0c6d0',
        borderColor: accent ? '#4fc3f7' : '#2a3142',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: accent ? 700 : 400,
      }}
    >
      {label}
    </button>
  );
}

const sep = { width: 1, height: 24, background: '#2a3142', margin: '0 4px' };
const lbl = { color: '#555d6e', fontSize: 10, marginRight: 4 };

export function ToolBar({
  activeTool,
  onSetTool,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onDelete,
  onDuplicate,
  onExportSVG,
  onExportPNG,
  onClear,
  selectedShapeId,
  zoom,
  onZoomIn,
  onZoomOut,
  gridSize,
  onSetGridSize,
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 12px',
      background: '#131820',
      borderBottom: '1px solid #1e2433',
      flexWrap: 'wrap',
    }}>
      {/* Shape tools */}
      <div style={{ display: 'flex', gap: 4 }}>
        <ToolBtn label="Select" active={activeTool === TOOLS.SELECT} onClick={() => onSetTool(TOOLS.SELECT)} title="Seleccionar (V)" />
        <ToolBtn label="Rect" active={activeTool === TOOLS.RECT} onClick={() => onSetTool(TOOLS.RECT)} title="Rectángulo (R)" />
        <ToolBtn label="Circle" active={activeTool === TOOLS.CIRCLE} onClick={() => onSetTool(TOOLS.CIRCLE)} title="Círculo (C)" />
        <ToolBtn label="Ellipse" active={activeTool === TOOLS.ELLIPSE} onClick={() => onSetTool(TOOLS.ELLIPSE)} title="Elipse (E)" />
        <ToolBtn label="Triangle" active={activeTool === TOOLS.TRIANGLE} onClick={() => onSetTool(TOOLS.TRIANGLE)} title="Triángulo (T)" />
        <ToolBtn label="Line" active={activeTool === TOOLS.LINE} onClick={() => onSetTool(TOOLS.LINE)} title="Línea (L)" />
        <ToolBtn label="Pen" active={activeTool === TOOLS.PEN} onClick={() => onSetTool(TOOLS.PEN)} title="Dibujo libre (P)" />
      </div>

      <div style={sep} />

      {/* History */}
      <div style={{ display: 'flex', gap: 4 }}>
        <ActionBtn label="Undo" onClick={onUndo} disabled={!canUndo} title="Ctrl+Z" />
        <ActionBtn label="Redo" onClick={onRedo} disabled={!canRedo} title="Ctrl+Y" />
      </div>

      <div style={sep} />

      {/* Shape actions */}
      <div style={{ display: 'flex', gap: 4 }}>
        <ActionBtn label="Duplicar" onClick={onDuplicate} disabled={!selectedShapeId} title="Ctrl+D" />
        <ActionBtn label="Eliminar" onClick={onDelete} disabled={!selectedShapeId} title="Delete" />
        <ActionBtn label="Limpiar" onClick={onClear} title="Borrar todo" />
      </div>

      <div style={sep} />

      {/* Zoom */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={lbl}>Zoom</span>
        <button onClick={onZoomOut} disabled={zoom <= MIN_ZOOM}
          style={{ ...btnBase, padding: '4px 8px', background: '#1a2030', color: zoom <= MIN_ZOOM ? '#444' : '#c0c6d0', cursor: zoom <= MIN_ZOOM ? 'not-allowed' : 'pointer' }}>−</button>
        <span style={{ color: '#8892a4', fontSize: 11, minWidth: 36, textAlign: 'center' }}>{zoom * 50 * 2}px</span>
        <button onClick={onZoomIn} disabled={zoom >= MAX_ZOOM}
          style={{ ...btnBase, padding: '4px 8px', background: '#1a2030', color: zoom >= MAX_ZOOM ? '#444' : '#c0c6d0', cursor: zoom >= MAX_ZOOM ? 'not-allowed' : 'pointer' }}>+</button>
      </div>

      <div style={sep} />

      {/* Grid size */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={lbl}>Grid</span>
        {[0.5, 1, 2, 5].map((g) => (
          <button key={g} onClick={() => onSetGridSize(g)}
            style={{ ...btnBase, padding: '4px 7px', fontSize: 10,
              background: gridSize === g ? '#4fc3f7' : '#1a2030',
              color: gridSize === g ? '#0d1117' : '#8892a4',
              borderColor: gridSize === g ? '#4fc3f7' : '#2a3142' }}>
            {g}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* Export */}
      <div style={{ display: 'flex', gap: 4 }}>
        <ActionBtn label="SVG" onClick={onExportSVG} accent title="Descargar SVG (50x50)" />
        <ActionBtn label="PNG" onClick={onExportPNG} accent title="Descargar PNG (128x128)" />
      </div>
    </div>
  );
}
