import React from 'react';

// Gradient defs — rendered once per SVG
export function GradientDefs({ shapes }) {
  const withGradient = shapes.filter(
    (s) => s.visible && s.fillType && s.fillType !== 'solid' && s.gradient?.stops?.length >= 2
  );
  if (withGradient.length === 0) return null;

  return (
    <defs>
      {withGradient.map((shape) => {
        const { id, gradient } = shape;
        const stops = gradient.stops.map((stop, i) => (
          <stop
            key={i}
            offset={`${Math.round(stop.offset * 100)}%`}
            stopColor={stop.color}
            stopOpacity={stop.opacity ?? 1}
          />
        ));

        if (gradient.type === 'radial') {
          return (
            <radialGradient key={id} id={`grad_${id}`} cx="50%" cy="50%" r="50%">
              {stops}
            </radialGradient>
          );
        }

        // Linear — convert angle to x1/y1/x2/y2
        const angle = ((gradient.angle ?? 0) * Math.PI) / 180;
        const x1 = Math.round((50 - 50 * Math.cos(angle + Math.PI / 2)) * 10) / 10;
        const y1 = Math.round((50 - 50 * Math.sin(angle + Math.PI / 2)) * 10) / 10;
        const x2 = Math.round((50 + 50 * Math.cos(angle + Math.PI / 2)) * 10) / 10;
        const y2 = Math.round((50 + 50 * Math.sin(angle + Math.PI / 2)) * 10) / 10;

        return (
          <linearGradient
            key={id}
            id={`grad_${id}`}
            x1={`${x1}%`} y1={`${y1}%`}
            x2={`${x2}%`} y2={`${y2}%`}
          >
            {stops}
          </linearGradient>
        );
      })}
    </defs>
  );
}

export const CanvasShape = React.memo(function CanvasShape({ shape, isSelected }) {
  if (!shape.visible) return null;

  const fillValue = shape.fillType !== 'solid' && shape.gradient?.stops?.length >= 2
    ? `url(#grad_${shape.id})`
    : (shape.fill || 'none');

  const cx = shape.x + shape.width / 2;
  const cy = shape.y + shape.height / 2;

  const strokeProps = shape.strokeEnabled
    ? {
        stroke: shape.stroke || '#ffffff',
        strokeWidth: shape.strokeWidth || 1,
        strokeLinecap: shape.strokeLinecap || 'round',
        strokeLinejoin: shape.strokeLinejoin || 'round',
        strokeDasharray: shape.strokeDasharray || undefined,
      }
    : {};

  // Build transform: rotation + flip around center
  const buildTransform = (cx, cy) => {
    const parts = [];
    if (shape.rotation) parts.push(`rotate(${shape.rotation} ${cx} ${cy})`);
    if (shape.flipX || shape.flipY) {
      parts.push(`translate(${shape.flipX ? cx * 2 : 0},${shape.flipY ? cy * 2 : 0}) scale(${shape.flipX ? -1 : 1},${shape.flipY ? -1 : 1})`);
    }
    return parts.join(' ') || undefined;
  };

  const svgTransform = buildTransform(cx, cy);

  const commonProps = {
    'data-shape-id': shape.id,
    opacity: shape.opacity,
    fill: fillValue,
    ...strokeProps,
    ...(svgTransform ? { transform: svgTransform } : {}),
    style: { cursor: shape.locked ? 'not-allowed' : 'move' },
  };

  let element;

  switch (shape.type) {
    case 'rect':
      element = (
        <rect
          x={shape.x} y={shape.y}
          width={shape.width} height={shape.height}
          rx={shape.rx || 0}
          {...commonProps}
        />
      );
      break;

    case 'circle': {
      const r = Math.min(shape.width, shape.height) / 2;
      element = <circle cx={cx} cy={cy} r={r} {...commonProps} />;
      break;
    }

    case 'ellipse':
      element = (
        <ellipse
          cx={cx} cy={cy}
          rx={shape.width / 2} ry={shape.height / 2}
          {...commonProps}
        />
      );
      break;

    case 'triangle':
    case 'polygon':
      element = <polygon points={shape.points} {...commonProps} />;
      break;

    case 'path':
      element = <path d={shape.d} {...commonProps} />;
      break;

    case 'line': {
      const x2 = shape.x + shape.width;
      const y2 = shape.y + shape.height;
      const lineCx = (shape.x + x2) / 2;
      const lineCy = (shape.y + y2) / 2;
      element = (
        <line
          x1={shape.x} y1={shape.y}
          x2={x2} y2={y2}
          stroke={shape.stroke || '#985184'}
          strokeWidth={shape.strokeWidth || 2}
          strokeLinecap={shape.strokeLinecap || 'round'}
          strokeDasharray={shape.strokeDasharray || undefined}
          data-shape-id={shape.id}
          opacity={shape.opacity}
          style={{ cursor: shape.locked ? 'not-allowed' : 'move' }}
          transform={buildTransform(lineCx, lineCy)}
        />
      );
      break;
    }

    case 'icon': {
      const src = shape.sourceViewBox || 16;
      const sx = shape.width / src;
      const sy = shape.height / src;
      element = (
        <g
          data-shape-id={shape.id}
          opacity={shape.opacity}
          style={{ cursor: shape.locked ? 'not-allowed' : 'move' }}
          transform={svgTransform}
        >
          <g transform={`translate(${shape.x},${shape.y}) scale(${sx},${sy})`}>
            {(shape.paths || []).map((d, i) => (
              <path key={i} d={d} fill={fillValue} fillRule={shape.fillRule || undefined} />
            ))}
          </g>
          <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height}
            fill="transparent" data-shape-id={shape.id} />
        </g>
      );
      break;
    }

    default:
      return null;
  }

  return (
    <g>
      {element}
      {isSelected && (
        <rect
          x={shape.x - 0.5} y={shape.y - 0.5}
          width={shape.width + 1} height={shape.height + 1}
          fill="none"
          stroke="#4fc3f7"
          strokeWidth="0.3"
          strokeDasharray="1 0.5"
          pointerEvents="none"
          transform={svgTransform}
        />
      )}
    </g>
  );
});
