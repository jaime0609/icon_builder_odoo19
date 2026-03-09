import { TOOLS, DEFAULT_ZOOM, DEFAULT_GRID_SIZE } from './constants.js';

let shapeCounter = 0;
export function generateId() {
  return 'shape_' + (++shapeCounter) + '_' + Date.now().toString(36);
}

export function createShape(type, overrides = {}) {
  const base = {
    id: generateId(),
    type,
    x: 15,
    y: 15,
    width: 20,
    height: 20,
    // Fill
    fill: '#985184',
    fillType: 'solid',       // 'solid' | 'linear' | 'radial'
    gradient: {
      type: 'linear',
      angle: 45,
      stops: [
        { offset: 0,   color: '#985184', opacity: 1 },
        { offset: 1,   color: '#1AD3BB', opacity: 1 },
      ],
    },
    opacity: 0.95,
    // Stroke
    strokeEnabled: false,
    stroke: '#ffffff',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeDasharray: '',
    // Transform
    rotation: 0,
    flipX: false,
    flipY: false,
    // Shape-specific
    rx: 0,
    d: '',
    points: '',
    name: type.charAt(0).toUpperCase() + type.slice(1),
    visible: true,
    locked: false,
  };

  if (type === 'triangle') {
    const x = overrides.x ?? base.x;
    const y = overrides.y ?? base.y;
    const w = overrides.width ?? base.width;
    const h = overrides.height ?? base.height;
    base.points = `${x + w / 2},${y} ${x + w},${y + h} ${x},${y + h}`;
  }

  if (type === 'line') {
    // For lines, stroke is enabled by default, no fill
    base.fill = 'none';
    base.fillType = 'solid';
    base.strokeEnabled = true;
    base.stroke = '#985184';
    base.strokeWidth = 3;
    base.width = 20;
    base.height = 0;
  }

  return { ...base, ...overrides };
}

export const initialAppState = {
  selectedShapeId: null,
  activeTool: TOOLS.SELECT,
  interaction: null,
  snapToGrid: true,
  gridSize: DEFAULT_GRID_SIZE,
  zoom: DEFAULT_ZOOM,
  iconName: 'icon',
};

export function appReducer(state, action) {
  switch (action.type) {
    case 'SELECT_SHAPE':
      return { ...state, selectedShapeId: action.shapeId };
    case 'SET_TOOL':
      return { ...state, activeTool: action.tool, selectedShapeId: null };
    case 'START_INTERACTION':
      return { ...state, interaction: action.interaction };
    case 'END_INTERACTION':
      return { ...state, interaction: null };
    case 'SET_SNAP':
      return { ...state, snapToGrid: action.enabled };
    case 'SET_ZOOM':
      return { ...state, zoom: action.zoom };
    case 'SET_GRID_SIZE':
      return { ...state, gridSize: action.size };
    case 'SET_ICON_NAME':
      return { ...state, iconName: action.name };
    default:
      return state;
  }
}
