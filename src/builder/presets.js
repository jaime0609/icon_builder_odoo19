// Presets based on real Odoo 18/19 module icons, adapted to 50x50 viewBox
// Each preset is a set of shapes that can be loaded into the builder

export const PRESETS = [
  {
    name: 'Sale',
    shapes: [
      { type: 'path', x: 2, y: 13, width: 4, height: 25, fill: '#985184', opacity: 1, d: 'M4 25a4 4 0 0 1 4-4h7v25H4V25Z' },
      { type: 'path', x: 26, y: 4, width: 20, height: 42, fill: '#FBB945', opacity: 1, d: 'M26 8c0-2.21 1.876-4 4.19-4H46v38c0 2.21-1.876 4-4.19 4H26V8Z' },
      { type: 'path', x: 15, y: 13, width: 20, height: 33, fill: '#FC868B', opacity: 1, d: 'M15 17.067C15 14.821 16.876 13 19.19 13H35v28.933C35 44.179 33.124 46 30.81 46H15V17.067Z' },
      { type: 'path', x: 26, y: 13, width: 9, height: 33, fill: '#F86126', opacity: 1, d: 'M26 46h4.81c2.314 0 4.19-1.821 4.19-4.067V13h-9v33Z' },
      { type: 'path', x: 15, y: 21, width: 9, height: 25, fill: '#962B48', opacity: 1, d: 'M15 46l4.995-.002A4.005 4.005 0 0 0 24 41.995V21h-9v25Z' },
    ],
  },
  {
    name: 'Stock',
    shapes: [
      { type: 'path', x: 7, y: 4, width: 18, height: 38, fill: '#FBB945', opacity: 1, d: 'M25 4l6.857 4L15.5 19v16l.5 5.75-9-5.25v-21L25 4Z' },
      { type: 'path', x: 12, y: 7, width: 18, height: 35, fill: '#F86126', opacity: 1, d: 'M18.087 41.967l-6.138-3.58V17.5L30.046 6.943l6.283 3.665L22.001 23.5l-3.915 18.467Z' },
      { type: 'path', x: 18, y: 11, width: 25, height: 35, fill: '#985184', opacity: 1, d: 'M36.328 10.61L43 14.5v21L25 46l-6.914-4.032V21.25l18.242-10.642Z' },
    ],
  },
  {
    name: 'Account',
    shapes: [
      { type: 'path', x: 4, y: 4, width: 34, height: 42, fill: '#2EBCFA', opacity: 1, d: 'M38 46H12c-4.418 0-8-3.498-8-7.814V4h30c2.21 0 4 1.75 4 3.907V46Z' },
      { type: 'path', x: 12, y: 38, width: 34, height: 8, fill: '#144496', opacity: 1, d: 'M12 46h26a7.999 7.999 0 0 0 8-8H20a8 8 0 0 1-8 8Z' },
      { type: 'path', x: 4, y: 4, width: 34, height: 24, fill: '#088BF5', opacity: 1, d: 'M38 8C23.408 8 10.687 16.014 4 27.88V4h30a4 4 0 0 1 4 4Z' },
    ],
  },
  {
    name: 'CRM',
    shapes: [
      { type: 'path', x: 10, y: 9, width: 36, height: 22, fill: '#985184', opacity: 1, d: 'M45.873 9c3.52.041 5.504 4.474 3.013 6.964l-8.424 8.419L36.5 27 25 9h20.873ZM10.946 25.79a3.972 3.972 0 0 0 0 5.618l8.433 8.43a3.977 3.977 0 0 0 5.623 0L23.5 36 15 27l-4.055-1.212Z' },
      { type: 'path', x: 1, y: 9, width: 39, height: 31, fill: '#1AD3BB', opacity: 1, d: 'M1.114 15.964C-1.377 13.474.608 9.041 4.128 9H25l15.461 15.383a3.972 3.972 0 0 1 0 5.62l-9.84 9.833a3.977 3.977 0 0 1-5.621 0L1.114 15.964Z' },
      { type: 'path', x: 11, y: 9, width: 14, height: 31, fill: '#005E7A', opacity: 1, d: 'M25 39.837a3.972 3.972 0 0 0 0-5.62l-8.434-8.428a3.977 3.977 0 0 0-5.623 0L25 39.837Zm-7.38-23.531L25 9l9.136 9.062a5.966 5.966 0 0 0-8.433 0l-3.163 3.16a3.48 3.48 0 0 1-4.92 0 3.475 3.475 0 0 1 0-4.916Z' },
    ],
  },
  {
    name: 'HR',
    shapes: [
      { type: 'path', x: 16, y: 8, width: 18, height: 18, fill: '#985184', opacity: 1, d: 'M34 17a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
      { type: 'circle', x: 4, y: 20, width: 8, height: 8, fill: '#FBB945', opacity: 1, points: '', d: '' },
      { type: 'circle', x: 38, y: 20, width: 8, height: 8, fill: '#1AD3BB', opacity: 1, points: '', d: '' },
      { type: 'path', x: 0, y: 30, width: 25, height: 12, fill: '#FBB945', opacity: 1, d: 'M25 30H4a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h21V30Z' },
      { type: 'path', x: 25, y: 30, width: 25, height: 12, fill: '#1AD3BB', opacity: 1, d: 'M46 30H25v12h21a4 4 0 0 0 4-4v-4a4 4 0 0 0-4-4Z' },
      { type: 'path', x: 12, y: 30, width: 26, height: 12, fill: '#985184', opacity: 1, d: 'M12 30h14c6.627 0 12 5.373 12 12H24c-6.627 0-12-5.373-12-12Z' },
    ],
  },
  {
    name: 'Project',
    shapes: [
      { type: 'path', x: 5, y: 19, width: 26, height: 26, fill: '#985184', opacity: 1, d: 'M30.842 34.612l-8.105 10.387L5.452 31.37a3.862 3.862 0 0 1-.616-5.417l5.748-7.243 20.258 15.903Z' },
      { type: 'path', x: 12, y: 27, width: 19, height: 18, fill: '#005E7A', opacity: 1, d: 'M22.623 44.909l-10.455-8.335 8.128-10.242 10.547 8.28L22.738 45l-.115-.091Z' },
      { type: 'path', x: 20, y: 5, width: 26, height: 40, fill: '#1AD3BB', opacity: 1, d: 'M22.593 44.886l.144.114 22.447-28.767a3.862 3.862 0 0 0-.636-5.393L37.223 5 20.296 26.332l10.547 8.28-8.105 10.387-.144-.113Z' },
    ],
  },
  {
    name: 'Purchase',
    shapes: [
      { type: 'path', x: 0, y: 8, width: 50, height: 34, fill: '#985184', opacity: 1, d: 'M0 12h50v26a4 4 0 0 1-4 4H0V12Z' },
      { type: 'path', x: 0, y: 8, width: 50, height: 13, fill: '#1AD3BB', opacity: 1, d: 'M4 21a4 4 0 0 1-4-4v-5a4 4 0 0 1 4-4h46v9a4 4 0 0 1-4 4H4Z' },
      { type: 'path', x: 0, y: 16, width: 50, height: 8, fill: '#005E7A', opacity: 1, d: 'M0 16h50v4a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-4Z' },
    ],
  },
  {
    name: 'Inventario',
    shapes: [
      { type: 'rect', x: 11, y: 18, width: 28, height: 21, rx: 4, fill: '#F86126', opacity: 0.70, rotation: 0 },
      { type: 'rect', x: 9, y: 14, width: 28, height: 21, rx: 4, fill: '#F86126', opacity: 0.95, rotation: 0 },
    ],
  },
  {
    name: 'Factura',
    shapes: [
      { type: 'rect', x: 13, y: 6, width: 25, height: 35, rx: 4, fill: '#FBB945', opacity: 0.90, rotation: 0 },
      { type: 'path', x: 30, y: 6, width: 8, height: 8, fill: '#F86126', opacity: 0.85, d: 'M30 6L38 14L30 14Z' },
    ],
  },
];
