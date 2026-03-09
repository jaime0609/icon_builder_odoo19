import React from 'react';

const HANDLE_SIZE = 1.2;
const HANDLES = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

function getHandlePosition(handle, x, y, w, h) {
  const hs = HANDLE_SIZE / 2;
  switch (handle) {
    case 'nw': return { hx: x - hs, hy: y - hs };
    case 'n':  return { hx: x + w / 2 - hs, hy: y - hs };
    case 'ne': return { hx: x + w - hs, hy: y - hs };
    case 'e':  return { hx: x + w - hs, hy: y + h / 2 - hs };
    case 'se': return { hx: x + w - hs, hy: y + h - hs };
    case 's':  return { hx: x + w / 2 - hs, hy: y + h - hs };
    case 'sw': return { hx: x - hs, hy: y + h - hs };
    case 'w':  return { hx: x - hs, hy: y + h / 2 - hs };
    default: return { hx: 0, hy: 0 };
  }
}

const CURSOR_MAP = {
  nw: 'nwse-resize', n: 'ns-resize', ne: 'nesw-resize', e: 'ew-resize',
  se: 'nwse-resize', s: 'ns-resize', sw: 'nesw-resize', w: 'ew-resize',
  rotate: 'crosshair',
};

export function SelectionHandles({ shape }) {
  if (!shape) return null;

  const { x, y, width: w, height: h } = shape;

  return (
    <g
      pointerEvents="all"
      style={{
        transformOrigin: `${x + w / 2}px ${y + h / 2}px`,
        transform: shape.rotation ? `rotate(${shape.rotation}deg)` : undefined,
      }}
    >
      {HANDLES.map((handle) => {
        const { hx, hy } = getHandlePosition(handle, x, y, w, h);
        return (
          <rect
            key={handle}
            data-handle={handle}
            x={hx}
            y={hy}
            width={HANDLE_SIZE}
            height={HANDLE_SIZE}
            fill="#fff"
            stroke="#4fc3f7"
            strokeWidth="0.2"
            style={{ cursor: CURSOR_MAP[handle] }}
          />
        );
      })}
      {/* Rotation handle */}
      <line
        x1={x + w / 2}
        y1={y}
        x2={x + w / 2}
        y2={y - 4}
        stroke="#4fc3f7"
        strokeWidth="0.2"
        pointerEvents="none"
      />
      <circle
        data-handle="rotate"
        cx={x + w / 2}
        cy={y - 4.5}
        r={0.8}
        fill="#fff"
        stroke="#4fc3f7"
        strokeWidth="0.2"
        style={{ cursor: 'crosshair' }}
      />
    </g>
  );
}
