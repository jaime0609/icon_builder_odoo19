import { PNG_EXPORT_SIZE } from './constants.js';

// Build SVG gradient defs string
function buildGradientDefs(shapes) {
  const withGrad = shapes.filter(
    (s) => s.visible && s.fillType !== 'solid' && s.gradient?.stops?.length >= 2
  );
  if (withGrad.length === 0) return '';

  const defs = withGrad.map((shape) => {
    const { id, gradient } = shape;
    const stops = gradient.stops
      .map((s) => `<stop offset="${Math.round(s.offset * 100)}%" stop-color="${s.color}" stop-opacity="${s.opacity ?? 1}"/>`)
      .join('');

    if (gradient.type === 'radial') {
      return `<radialGradient id="grad_${id}" cx="50%" cy="50%" r="50%">${stops}</radialGradient>`;
    }

    const angle = ((gradient.angle ?? 0) * Math.PI) / 180;
    const x1 = Math.round((50 - 50 * Math.cos(angle + Math.PI / 2)) * 10) / 10;
    const y1 = Math.round((50 - 50 * Math.sin(angle + Math.PI / 2)) * 10) / 10;
    const x2 = Math.round((50 + 50 * Math.cos(angle + Math.PI / 2)) * 10) / 10;
    const y2 = Math.round((50 + 50 * Math.sin(angle + Math.PI / 2)) * 10) / 10;
    return `<linearGradient id="grad_${id}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">${stops}</linearGradient>`;
  });

  return `<defs>${defs.join('')}</defs>`;
}

function shapeToSVGElement(shape) {
  if (!shape.visible) return '';

  const cx = shape.x + shape.width / 2;
  const cy = shape.y + shape.height / 2;

  const fillValue = shape.fillType !== 'solid' && shape.gradient?.stops?.length >= 2
    ? `url(#grad_${shape.id})`
    : (shape.fill || 'none');

  const fill = ` fill="${fillValue}"`;
  const opacity = shape.opacity !== 1 ? ` opacity="${shape.opacity}"` : '';

  const strokeAttrs = shape.strokeEnabled
    ? ` stroke="${shape.stroke || '#fff'}" stroke-width="${shape.strokeWidth || 1}"` +
      ` stroke-linecap="${shape.strokeLinecap || 'round'}" stroke-linejoin="${shape.strokeLinejoin || 'round'}"` +
      (shape.strokeDasharray ? ` stroke-dasharray="${shape.strokeDasharray}"` : '')
    : '';

  // Build transform
  const parts = [];
  if (shape.rotation) parts.push(`rotate(${shape.rotation} ${cx} ${cy})`);
  if (shape.flipX || shape.flipY) {
    parts.push(`translate(${shape.flipX ? cx * 2 : 0} ${shape.flipY ? cy * 2 : 0}) scale(${shape.flipX ? -1 : 1} ${shape.flipY ? -1 : 1})`);
  }
  const transform = parts.length ? ` transform="${parts.join(' ')}"` : '';

  switch (shape.type) {
    case 'rect':
      return `<rect x="${shape.x}" y="${shape.y}" width="${shape.width}" height="${shape.height}"${shape.rx ? ` rx="${shape.rx}"` : ''}${fill}${strokeAttrs}${opacity}${transform}/>`;

    case 'circle': {
      const r = Math.min(shape.width, shape.height) / 2;
      return `<circle cx="${cx}" cy="${cy}" r="${r}"${fill}${strokeAttrs}${opacity}${transform}/>`;
    }

    case 'ellipse':
      return `<ellipse cx="${cx}" cy="${cy}" rx="${shape.width / 2}" ry="${shape.height / 2}"${fill}${strokeAttrs}${opacity}${transform}/>`;

    case 'triangle':
    case 'polygon':
      return `<polygon points="${shape.points}"${fill}${strokeAttrs}${opacity}${transform}/>`;

    case 'path':
      return `<path d="${shape.d}"${fill}${strokeAttrs}${opacity}${transform}/>`;

    case 'line': {
      const x2 = shape.x + shape.width;
      const y2 = shape.y + shape.height;
      const lineCx = (shape.x + x2) / 2;
      const lineCy = (shape.y + y2) / 2;
      const lineParts = [];
      if (shape.rotation) lineParts.push(`rotate(${shape.rotation} ${lineCx} ${lineCy})`);
      const lineTransform = lineParts.length ? ` transform="${lineParts.join(' ')}"` : '';
      return `<line x1="${shape.x}" y1="${shape.y}" x2="${x2}" y2="${y2}" stroke="${shape.stroke || '#985184'}" stroke-width="${shape.strokeWidth || 2}" stroke-linecap="${shape.strokeLinecap || 'round'}"${shape.strokeDasharray ? ` stroke-dasharray="${shape.strokeDasharray}"` : ''}${opacity}${lineTransform}/>`;
    }

    case 'icon': {
      const src = shape.sourceViewBox || 16;
      const sx = shape.width / src;
      const sy = shape.height / src;
      const rotTransform = shape.rotation ? ` rotate(${shape.rotation} ${cx} ${cy})` : '';
      const pathsStr = (shape.paths || [])
        .map((d) => `<path d="${d}"${fill}${shape.fillRule ? ` fill-rule="${shape.fillRule}"` : ''}/>`)
        .join('');
      return `<g transform="translate(${shape.x},${shape.y}) scale(${sx},${sy})${rotTransform}"${opacity}>${pathsStr}</g>`;
    }

    default:
      return '';
  }
}

export function shapesToSVGString(shapes) {
  const defs = buildGradientDefs(shapes);
  const elements = shapes
    .filter((s) => s.visible)
    .map(shapeToSVGElement)
    .filter(Boolean)
    .join('\n  ');

  return `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">\n  ${defs}${defs ? '\n  ' : ''}${elements}\n</svg>`;
}

export function downloadSVG(shapes, filename = 'icon.svg') {
  const blob = new Blob([shapesToSVGString(shapes)], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadPNG(shapes, size = PNG_EXPORT_SIZE, filename = 'icon.png') {
  const svgString = shapesToSVGString(shapes);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    canvas.getContext('2d').drawImage(img, 0, 0, size, size);
    canvas.toBlob((blob) => {
      const pngUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(pngUrl);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };
  img.src = url;
}
