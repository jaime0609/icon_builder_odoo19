// Builder constants

export const CANVAS_SIZE = 50;
export const CANVAS_VIEWBOX = '0 0 50 50';
export const DEFAULT_ZOOM = 16;
export const MIN_ZOOM = 4;
export const MAX_ZOOM = 32;
export const DEFAULT_GRID_SIZE = 1;
export const MIN_SHAPE_SIZE = 2;
export const MAX_HISTORY = 50;
export const PNG_EXPORT_SIZE = 128;

// Official Odoo 18/19 color palette (from real module SVGs)
export const ODOO_PALETTE = [
  { name: 'Purple',     hex: '#985184' },
  { name: 'Gold',       hex: '#FBB945' },
  { name: 'Teal',       hex: '#1AD3BB' },
  { name: 'Dark Teal',  hex: '#005E7A' },
  { name: 'Orange',     hex: '#F86126' },
  { name: 'Pink',       hex: '#FC868B' },
  { name: 'Burgundy',   hex: '#962B48' },
  { name: 'Bright Blue',hex: '#2EBCFA' },
  { name: 'Blue',       hex: '#088BF5' },
  { name: 'Deep Blue',  hex: '#144496' },
  { name: 'Dark Green', hex: '#1A6F66' },
  { name: 'White',      hex: '#ffffff' },
  { name: 'Black',      hex: '#000000' },
];

export const SHAPE_TYPES = ['rect', 'circle', 'ellipse', 'triangle', 'polygon', 'path', 'line'];

export const TOOLS = {
  SELECT:   'select',
  RECT:     'rect',
  CIRCLE:   'circle',
  ELLIPSE:  'ellipse',
  TRIANGLE: 'triangle',
  LINE:     'line',
  PEN:      'pen',
};

export const STROKE_DASH_PRESETS = [
  { label: 'Sólido',   value: '' },
  { label: 'Guiones',  value: '4 2' },
  { label: 'Puntos',   value: '1 2' },
  { label: 'Largo',    value: '8 3' },
  { label: 'Mix',      value: '6 2 1 2' },
];
