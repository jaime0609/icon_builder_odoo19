import { MIN_SHAPE_SIZE } from './constants.js';

export function screenToSVG(svgElement, screenX, screenY) {
  const ctm = svgElement.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  const inverse = ctm.inverse();
  const point = svgElement.createSVGPoint();
  point.x = screenX;
  point.y = screenY;
  const svgPoint = point.matrixTransform(inverse);
  return { x: svgPoint.x, y: svgPoint.y };
}

export function snapToGrid(value, gridSize, enabled) {
  if (!enabled) return value;
  return Math.round(value / gridSize) * gridSize;
}

export function getShapeCenter(shape) {
  return {
    cx: shape.x + shape.width / 2,
    cy: shape.y + shape.height / 2,
  };
}

export function applyResize(origBounds, handle, dx, dy) {
  let { x, y, width, height } = origBounds;

  switch (handle) {
    case 'se': width += dx; height += dy; break;
    case 'nw': x += dx; y += dy; width -= dx; height -= dy; break;
    case 'ne': y += dy; width += dx; height -= dy; break;
    case 'sw': x += dx; width -= dx; height += dy; break;
    case 'e':  width += dx; break;
    case 'w':  x += dx; width -= dx; break;
    case 'n':  y += dy; height -= dy; break;
    case 's':  height += dy; break;
  }

  if (width < MIN_SHAPE_SIZE) {
    if (handle.includes('w')) x -= (MIN_SHAPE_SIZE - width);
    width = MIN_SHAPE_SIZE;
  }
  if (height < MIN_SHAPE_SIZE) {
    if (handle.includes('n')) y -= (MIN_SHAPE_SIZE - height);
    height = MIN_SHAPE_SIZE;
  }

  return { x, y, width, height };
}

export function calculateRotation(centerX, centerY, mouseX, mouseY) {
  return Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI) + 90;
}

export function updateTrianglePoints(x, y, width, height) {
  return `${x + width / 2},${y} ${x + width},${y + height} ${x},${y + height}`;
}
