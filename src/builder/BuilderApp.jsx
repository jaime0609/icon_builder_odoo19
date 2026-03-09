import React, { useReducer, useCallback, useEffect, useState, useRef } from 'react';
import { appReducer, initialAppState, createShape } from './state.js';
import { useHistory } from './history.js';
import { TOOLS } from './constants.js';
import { updateTrianglePoints } from './geometry.js';
import { downloadSVG, downloadPNG } from './exportUtils.js';
import { PRESETS } from './presets.js';
import { EditorCanvas } from './canvas/EditorCanvas.jsx';
import { ToolBar } from './panels/ToolBar.jsx';
import { ShapeLibrary } from './panels/ShapeLibrary.jsx';
import { LayerList } from './panels/LayerList.jsx';
import { PropertiesPanel } from './panels/PropertiesPanel.jsx';
import { PreviewPanel } from './preview/PreviewPanel.jsx';

const panelStyle = {
  background: '#131820',
  borderRight: '1px solid #1e2433',
  overflowY: 'auto',
};

export function BuilderApp() {
  const { shapes: committedShapes, commit, undo, redo, reset, canUndo, canRedo } = useHistory([]);
  const [appState, appDispatch] = useReducer(appReducer, initialAppState);

  // liveShapes: during drag/resize these differ from committedShapes
  const [liveShapes, setLiveShapes] = useState(null);
  const shapes = liveShapes || committedShapes;

  const selectedShape = shapes.find((s) => s.id === appState.selectedShapeId) || null;

  // During drag: update liveShapes (no history)
  const handleShapesChange = useCallback((newShapes) => {
    setLiveShapes(newShapes);
  }, []);

  // On mouseUp: commit to history and clear live override
  const handleCommit = useCallback((newShapes) => {
    commit(newShapes);
    setLiveShapes(null);
  }, [commit]);

  // Add a shape from the library
  const handleAddShape = useCallback((type, overrides = {}) => {
    const shape = createShape(type, overrides);
    if (type === 'triangle') {
      shape.points = updateTrianglePoints(shape.x, shape.y, shape.width, shape.height);
    }
    const newShapes = [...shapes, shape];
    commit(newShapes);
    setLiveShapes(null);
    appDispatch({ type: 'SELECT_SHAPE', shapeId: shape.id });
    appDispatch({ type: 'SET_TOOL', tool: TOOLS.SELECT });
  }, [shapes, commit, appDispatch]);

  // Add a Bootstrap icon as 'icon' shape
  const handleAddIcon = useCallback((icon) => {
    const shape = {
      ...createShape('icon'),
      type: 'icon',
      paths: icon.paths,
      fillRule: icon.fillRule || undefined,
      sourceViewBox: 16,
      fill: '#985184',
      width: 20,
      height: 20,
      name: icon.name,
    };
    const newShapes = [...shapes, shape];
    commit(newShapes);
    setLiveShapes(null);
    appDispatch({ type: 'SELECT_SHAPE', shapeId: shape.id });
    appDispatch({ type: 'SET_TOOL', tool: TOOLS.SELECT });
  }, [shapes, commit, appDispatch]);

  // Add an individual Odoo shape piece
  const handleAddOdooShape = useCallback((odooShape) => {
    const shape = {
      ...createShape('icon'),
      type: 'icon',
      paths: odooShape.paths,
      sourceViewBox: 50,
      fill: odooShape.color || '#985184',
      width: 30,
      height: 30,
      name: odooShape.name,
    };
    const newShapes = [...shapes, shape];
    commit(newShapes);
    setLiveShapes(null);
    appDispatch({ type: 'SELECT_SHAPE', shapeId: shape.id });
    appDispatch({ type: 'SET_TOOL', tool: TOOLS.SELECT });
  }, [shapes, commit, appDispatch]);

  // Load preset
  const handleLoadPreset = useCallback((preset) => {
    const newShapes = preset.shapes.map((s, i) => ({
      ...createShape(s.type || 'path'),
      ...s,
      id: `preset_${i}_${Date.now().toString(36)}`,
      name: s.name || `${preset.name} ${i + 1}`,
      visible: true,
      locked: false,
      rotation: s.rotation || 0,
      rx: s.rx || 0,
      width: s.width || 20,
      height: s.height || 20,
    }));
    commit(newShapes);
    setLiveShapes(null);
    appDispatch({ type: 'SELECT_SHAPE', shapeId: null });
  }, [commit, appDispatch]);

  // Update a single shape property (from PropertiesPanel)
  const handleUpdateShape = useCallback((shapeId, changes) => {
    const newShapes = shapes.map((s) => (s.id === shapeId ? { ...s, ...changes } : s));
    commit(newShapes);
    setLiveShapes(null);
  }, [shapes, commit]);

  // Toggle visibility
  const handleToggleVisible = useCallback((shapeId) => {
    const newShapes = shapes.map((s) =>
      s.id === shapeId ? { ...s, visible: !s.visible } : s
    );
    commit(newShapes);
    setLiveShapes(null);
  }, [shapes, commit]);

  // Delete selected
  const handleDelete = useCallback(() => {
    if (!appState.selectedShapeId) return;
    const newShapes = shapes.filter((s) => s.id !== appState.selectedShapeId);
    commit(newShapes);
    setLiveShapes(null);
    appDispatch({ type: 'SELECT_SHAPE', shapeId: null });
  }, [shapes, appState.selectedShapeId, commit, appDispatch]);

  // Duplicate selected
  const handleDuplicate = useCallback(() => {
    const shape = shapes.find((s) => s.id === appState.selectedShapeId);
    if (!shape) return;
    const dup = { ...shape, id: createShape('rect').id, name: shape.name + ' copy', x: shape.x + 2, y: shape.y + 2 };
    if (dup.type === 'triangle') {
      dup.points = updateTrianglePoints(dup.x, dup.y, dup.width, dup.height);
    }
    const newShapes = [...shapes, dup];
    commit(newShapes);
    setLiveShapes(null);
    appDispatch({ type: 'SELECT_SHAPE', shapeId: dup.id });
  }, [shapes, appState.selectedShapeId, commit, appDispatch]);

  // Clear canvas
  const handleClear = useCallback(() => {
    commit([]);
    setLiveShapes(null);
    appDispatch({ type: 'SELECT_SHAPE', shapeId: null });
  }, [commit, appDispatch]);

  // Move layer up/down
  const handleMoveUp = useCallback((index) => {
    if (index >= shapes.length - 1) return;
    const arr = [...shapes];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    commit(arr);
    setLiveShapes(null);
  }, [shapes, commit]);

  const handleMoveDown = useCallback((index) => {
    if (index <= 0) return;
    const arr = [...shapes];
    [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
    commit(arr);
    setLiveShapes(null);
  }, [shapes, commit]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        if (e.key === 'Escape') document.activeElement.blur();
        return;
      }

      if (e.ctrlKey && e.key === 'z') { e.preventDefault(); undo(); setLiveShapes(null); }
      if (e.ctrlKey && e.key === 'y') { e.preventDefault(); redo(); setLiveShapes(null); }
      if (e.ctrlKey && e.key === 'd') { e.preventDefault(); handleDuplicate(); }
      if (e.key === 'Delete' || e.key === 'Backspace') { handleDelete(); }
      if (e.key === 'Escape') {
        appDispatch({ type: 'SET_TOOL', tool: TOOLS.SELECT });
        appDispatch({ type: 'SELECT_SHAPE', shapeId: null });
      }
      // Tool shortcuts
      if (!e.ctrlKey && !e.altKey) {
        if (e.key === 'v') appDispatch({ type: 'SET_TOOL', tool: TOOLS.SELECT });
        if (e.key === 'r') appDispatch({ type: 'SET_TOOL', tool: TOOLS.RECT });
        if (e.key === 'c') appDispatch({ type: 'SET_TOOL', tool: TOOLS.CIRCLE });
        if (e.key === 'e') appDispatch({ type: 'SET_TOOL', tool: TOOLS.ELLIPSE });
        if (e.key === 't') appDispatch({ type: 'SET_TOOL', tool: TOOLS.TRIANGLE });
        if (e.key === 'l') appDispatch({ type: 'SET_TOOL', tool: TOOLS.LINE });
        if (e.key === 'p') appDispatch({ type: 'SET_TOOL', tool: TOOLS.PEN });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo, handleDelete, handleDuplicate, appDispatch]);

  // Arrow keys for nudge (needs fresh shapes ref)
  const shapesRef = useRef(shapes);
  shapesRef.current = shapes;
  const selectedIdRef = useRef(appState.selectedShapeId);
  selectedIdRef.current = appState.selectedShapeId;

  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      if (!selectedIdRef.current) return;

      e.preventDefault();
      const step = e.shiftKey ? 5 : 1;
      const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
      const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;
      const newShapes = shapesRef.current.map((s) => {
        if (s.id !== selectedIdRef.current) return s;
        const ns = { ...s, x: s.x + dx, y: s.y + dy };
        if (s.type === 'triangle') ns.points = updateTrianglePoints(ns.x, ns.y, ns.width, ns.height);
        return ns;
      });
      commit(newShapes);
      setLiveShapes(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [commit]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0d1117' }}>
      <ToolBar
        activeTool={appState.activeTool}
        onSetTool={(tool) => appDispatch({ type: 'SET_TOOL', tool })}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={() => { undo(); setLiveShapes(null); }}
        onRedo={() => { redo(); setLiveShapes(null); }}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onExportSVG={() => downloadSVG(shapes, appState.iconName + '.svg')}
        onExportPNG={() => downloadPNG(shapes, 128, appState.iconName + '.png')}
        onClear={handleClear}
        selectedShapeId={appState.selectedShapeId}
        zoom={appState.zoom}
        onZoomIn={() => appDispatch({ type: 'SET_ZOOM', zoom: appState.zoom + 2 })}
        onZoomOut={() => appDispatch({ type: 'SET_ZOOM', zoom: appState.zoom - 2 })}
        gridSize={appState.gridSize}
        onSetGridSize={(size) => appDispatch({ type: 'SET_GRID_SIZE', size })}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left panel */}
        <div style={{ ...panelStyle, width: 200, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Shape library — takes most of the height */}
          <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <ShapeLibrary
              onAddShape={handleAddShape}
              presets={PRESETS}
              onLoadPreset={handleLoadPreset}
              onAddIcon={handleAddIcon}
              onAddOdooShape={handleAddOdooShape}
            />
          </div>
          {/* Layer list — fixed height at bottom */}
          <div style={{ borderTop: '1px solid #1e2433', height: 180, overflow: 'auto', flexShrink: 0 }}>
            <LayerList
              shapes={shapes}
              selectedShapeId={appState.selectedShapeId}
              onSelect={(id) => appDispatch({ type: 'SELECT_SHAPE', shapeId: id })}
              onToggleVisible={handleToggleVisible}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
            />
          </div>
        </div>

        {/* Canvas */}
        <EditorCanvas
          shapes={shapes}
          appState={appState}
          appDispatch={appDispatch}
          onShapesChange={handleShapesChange}
          onCommit={handleCommit}
        />

        {/* Right panel */}
        <div style={{ ...panelStyle, width: 240, borderRight: 'none', borderLeft: '1px solid #1e2433', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <PropertiesPanel
              shape={selectedShape}
              onUpdate={handleUpdateShape}
            />
          </div>
          <div style={{ borderTop: '1px solid #1e2433', flexShrink: 0 }}>
            <PreviewPanel shapes={shapes} />
          </div>
        </div>
      </div>
    </div>
  );
}
