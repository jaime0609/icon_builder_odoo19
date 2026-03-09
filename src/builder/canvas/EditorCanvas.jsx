import React, { useRef, useCallback, useState } from 'react';
import { CANVAS_SIZE, CANVAS_VIEWBOX, TOOLS } from '../constants.js';
import { screenToSVG, snapToGrid, applyResize, calculateRotation, getShapeCenter, updateTrianglePoints } from '../geometry.js';
import { createShape } from '../state.js';
import { CanvasShape, GradientDefs } from './CanvasShape.jsx';
import { SelectionHandles } from './SelectionHandles.jsx';
import { GridOverlay } from './GridOverlay.jsx';

export function EditorCanvas({ shapes, appState, appDispatch, onShapesChange, onCommit }) {
  const svgRef = useRef(null);
  const interactionRef = useRef(null);
  const [drawPreview, setDrawPreview] = useState(null);

  const { selectedShapeId, activeTool, interaction, snapToGrid: snap, gridSize, zoom } = appState;
  const selectedShape = shapes.find((s) => s.id === selectedShapeId);
  const canvasPixels = CANVAS_SIZE * zoom;

  const getSVGCoords = useCallback((e) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    return screenToSVG(svgRef.current, e.clientX, e.clientY);
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    if (!svgRef.current) return;

    const coords = getSVGCoords(e);
    const target = e.target;
    const handleType = target.getAttribute('data-handle');
    const shapeId = target.getAttribute('data-shape-id');

    // Resize/rotate handle
    if (handleType && selectedShape && !selectedShape.locked) {
      const inter = {
        type: handleType === 'rotate' ? 'rotating' : 'resizing',
        shapeId: selectedShape.id,
        handle: handleType,
        startX: coords.x,
        startY: coords.y,
        origBounds: { x: selectedShape.x, y: selectedShape.y, width: selectedShape.width, height: selectedShape.height },
        origRotation: selectedShape.rotation,
      };
      interactionRef.current = inter;
      appDispatch({ type: 'START_INTERACTION', interaction: inter });
      e.preventDefault();
      return;
    }

    // Click on shape -> select + start drag
    if (shapeId && activeTool === TOOLS.SELECT) {
      const shape = shapes.find((s) => s.id === shapeId);
      if (shape && !shape.locked) {
        appDispatch({ type: 'SELECT_SHAPE', shapeId });
        const inter = {
          type: 'dragging',
          shapeId,
          startX: coords.x,
          startY: coords.y,
          origX: shape.x,
          origY: shape.y,
        };
        interactionRef.current = inter;
        appDispatch({ type: 'START_INTERACTION', interaction: inter });
      } else if (shape) {
        appDispatch({ type: 'SELECT_SHAPE', shapeId });
      }
      e.preventDefault();
      return;
    }

    // Drawing new shape (including pen)
    if (activeTool !== TOOLS.SELECT) {
      const sx = activeTool === TOOLS.PEN ? coords.x : snapToGrid(coords.x, gridSize, snap);
      const sy = activeTool === TOOLS.PEN ? coords.y : snapToGrid(coords.y, gridSize, snap);
      const inter = {
        type: 'drawing',
        shapeType: activeTool,
        startX: sx,
        startY: sy,
        // For pen: accumulate points
        points: activeTool === TOOLS.PEN ? [{ x: sx, y: sy }] : undefined,
      };
      interactionRef.current = inter;
      appDispatch({ type: 'START_INTERACTION', interaction: inter });
      if (activeTool === TOOLS.PEN) {
        setDrawPreview({ type: TOOLS.PEN, points: [{ x: sx, y: sy }] });
      } else {
        setDrawPreview({ x: sx, y: sy, width: 0, height: 0, type: activeTool });
      }
      e.preventDefault();
      return;
    }

    appDispatch({ type: 'SELECT_SHAPE', shapeId: null });
  }, [shapes, selectedShape, activeTool, snap, gridSize, getSVGCoords, appDispatch]);

  const handleMouseMove = useCallback((e) => {
    const inter = interactionRef.current;
    if (!inter) return;
    const coords = getSVGCoords(e);

    if (inter.type === 'dragging') {
      const dx = coords.x - inter.startX;
      const dy = coords.y - inter.startY;
      const newX = snapToGrid(inter.origX + dx, gridSize, snap);
      const newY = snapToGrid(inter.origY + dy, gridSize, snap);
      onShapesChange(shapes.map((s) => {
        if (s.id !== inter.shapeId) return s;
        const ns = { ...s, x: newX, y: newY };
        if (s.type === 'triangle') ns.points = updateTrianglePoints(newX, newY, s.width, s.height);
        return ns;
      }));
    }

    if (inter.type === 'resizing') {
      const dx = coords.x - inter.startX;
      const dy = coords.y - inter.startY;
      const newBounds = applyResize(inter.origBounds, inter.handle, dx, dy);
      onShapesChange(shapes.map((s) => {
        if (s.id !== inter.shapeId) return s;
        const ns = { ...s, ...newBounds };
        if (s.type === 'triangle') ns.points = updateTrianglePoints(newBounds.x, newBounds.y, newBounds.width, newBounds.height);
        return ns;
      }));
    }

    if (inter.type === 'rotating') {
      const shape = shapes.find((s) => s.id === inter.shapeId);
      if (!shape) return;
      const { cx, cy } = getShapeCenter(shape);
      const startAngle = calculateRotation(cx, cy, inter.startX, inter.startY);
      const currentAngle = calculateRotation(cx, cy, coords.x, coords.y);
      let newRotation = inter.origRotation + (currentAngle - startAngle);
      if (e.shiftKey) newRotation = Math.round(newRotation / 15) * 15;
      onShapesChange(shapes.map((s) =>
        s.id === inter.shapeId ? { ...s, rotation: newRotation } : s
      ));
    }

    if (inter.type === 'drawing') {
      // Pen tool: accumulate points
      if (inter.shapeType === TOOLS.PEN) {
        const lastPt = inter.points[inter.points.length - 1];
        if (Math.abs(coords.x - lastPt.x) > 0.2 || Math.abs(coords.y - lastPt.y) > 0.2) {
          const newPoints = [...inter.points, { x: coords.x, y: coords.y }];
          interactionRef.current = { ...inter, points: newPoints };
          setDrawPreview({ type: TOOLS.PEN, points: newPoints });
        }
        return;
      }

      // Other shape tools
      const ex = snapToGrid(coords.x, gridSize, snap);
      const ey = snapToGrid(coords.y, gridSize, snap);
      setDrawPreview({
        x: Math.min(inter.startX, ex),
        y: Math.min(inter.startY, ey),
        width: Math.abs(ex - inter.startX),
        height: Math.abs(ey - inter.startY),
        type: inter.shapeType,
        startX: inter.startX,
        startY: inter.startY,
        endX: ex,
        endY: ey,
      });
    }
  }, [shapes, snap, gridSize, getSVGCoords, onShapesChange]);

  const handleMouseUp = useCallback((e) => {
    const inter = interactionRef.current;
    if (!inter) return;
    setDrawPreview(null);

    if (inter.type === 'drawing') {
      const coords = getSVGCoords(e);

      // Pen tool: commit accumulated path
      if (inter.shapeType === TOOLS.PEN) {
        const pts = inter.points || [];
        if (pts.length >= 2) {
          const d = pts
            .map((p, i) => `${i === 0 ? 'M' : 'L'} ${Math.round(p.x * 10) / 10} ${Math.round(p.y * 10) / 10}`)
            .join(' ');
          const xs = pts.map((p) => p.x);
          const ys = pts.map((p) => p.y);
          const bx = Math.min(...xs);
          const by = Math.min(...ys);
          const bw = Math.max(...xs) - bx;
          const bh = Math.max(...ys) - by;
          const newShape = createShape('path', { d, x: bx, y: by, width: Math.max(bw, 0.1), height: Math.max(bh, 0.1) });
          const newShapes = [...shapes, newShape];
          onShapesChange(newShapes);
          onCommit(newShapes);
          appDispatch({ type: 'SELECT_SHAPE', shapeId: newShape.id });
          appDispatch({ type: 'SET_TOOL', tool: TOOLS.SELECT });
        }
        interactionRef.current = null;
        appDispatch({ type: 'END_INTERACTION' });
        return;
      }

      const endX = snapToGrid(coords.x, gridSize, snap);
      const endY = snapToGrid(coords.y, gridSize, snap);

      let newShape;
      if (inter.shapeType === TOOLS.LINE) {
        const dx = endX - inter.startX;
        const dy = endY - inter.startY;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
          interactionRef.current = null;
          appDispatch({ type: 'END_INTERACTION' });
          return;
        }
        newShape = createShape('line', {
          x: inter.startX, y: inter.startY,
          width: dx, height: dy,
        });
      } else {
        const x = Math.min(inter.startX, endX);
        const y = Math.min(inter.startY, endY);
        const width = Math.max(Math.abs(endX - inter.startX), 4);
        const height = Math.max(Math.abs(endY - inter.startY), 4);
        newShape = createShape(inter.shapeType, { x, y, width, height });
      }

      const newShapes = [...shapes, newShape];
      onShapesChange(newShapes);
      onCommit(newShapes);
      appDispatch({ type: 'SELECT_SHAPE', shapeId: newShape.id });
      appDispatch({ type: 'SET_TOOL', tool: TOOLS.SELECT });
    } else {
      onCommit(shapes);
    }

    interactionRef.current = null;
    appDispatch({ type: 'END_INTERACTION' });
  }, [shapes, snap, gridSize, getSVGCoords, onShapesChange, onCommit, appDispatch]);

  // Live preview while drawing
  let previewEl = null;
  if (drawPreview) {
    const { type, x, y, width, height, startX, startY, endX, endY, points } = drawPreview;
    const previewStyle = { fill: 'none', stroke: '#4fc3f7', strokeWidth: '0.3', strokeDasharray: '1 0.5', pointerEvents: 'none', opacity: 0.8 };
    if (type === TOOLS.PEN && points && points.length >= 2) {
      const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
      previewEl = <path d={d} {...previewStyle} />;
    } else if (type === TOOLS.LINE) {
      previewEl = <line x1={startX} y1={startY} x2={endX ?? startX} y2={endY ?? startY} {...previewStyle} />;
    } else if (type === TOOLS.CIRCLE || type === TOOLS.ELLIPSE) {
      previewEl = <ellipse cx={x + width / 2} cy={y + height / 2} rx={width / 2} ry={height / 2} {...previewStyle} />;
    } else if (type === TOOLS.TRIANGLE) {
      previewEl = <polygon points={`${x + width / 2},${y} ${x + width},${y + height} ${x},${y + height}`} {...previewStyle} />;
    } else if (type !== TOOLS.PEN) {
      previewEl = <rect x={x} y={y} width={width} height={height} {...previewStyle} />;
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: 16, overflow: 'auto' }}>
      <svg
        ref={svgRef}
        viewBox={CANVAS_VIEWBOX}
        width={canvasPixels}
        height={canvasPixels}
        style={{
          background: '#1e2433',
          borderRadius: 8,
          border: '1px solid #2a3142',
          cursor: activeTool === TOOLS.PEN ? 'crosshair' : activeTool !== TOOLS.SELECT ? 'crosshair' : 'default',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <GradientDefs shapes={shapes} />
        <GridOverlay gridSize={gridSize} visible={appState.snapToGrid} />

        {shapes.map((shape) => (
          <CanvasShape key={shape.id} shape={shape} isSelected={shape.id === selectedShapeId} />
        ))}

        {selectedShape && !interaction && <SelectionHandles shape={selectedShape} />}
        {previewEl}
      </svg>
    </div>
  );
}
