import React from 'react';
import { CANVAS_SIZE } from '../constants.js';

export function GridOverlay({ gridSize, visible }) {
  if (!visible) return null;

  const lines = [];
  for (let i = gridSize; i < CANVAS_SIZE; i += gridSize) {
    lines.push(
      <line key={`v${i}`} x1={i} y1={0} x2={i} y2={CANVAS_SIZE} stroke="#ffffff" strokeWidth="0.1" opacity="0.15" />,
      <line key={`h${i}`} x1={0} y1={i} x2={CANVAS_SIZE} y2={i} stroke="#ffffff" strokeWidth="0.1" opacity="0.15" />,
    );
  }

  return <g pointerEvents="none">{lines}</g>;
}
