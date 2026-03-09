import React, { useState } from 'react';
import { ColorPicker } from './ColorPicker.jsx';
import { OpacitySlider } from './OpacitySlider.jsx';
import { STROKE_DASH_PRESETS, CANVAS_SIZE } from '../constants.js';

const label = { color: '#8892a4', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 };
const inp = {
  width: '100%',
  background: '#1a2030',
  border: '1px solid #2a3142',
  borderRadius: 4,
  color: '#e8eaf0',
  padding: '4px 6px',
  fontSize: 12,
};
const row = { display: 'flex', gap: 6, marginBottom: 6 };
const sec = { marginBottom: 14 };
const divider = { borderTop: '1px solid #1e2433', margin: '10px 0' };

function Num({ lbl, value, onChange, min, max, step = 0.5 }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={label}>{lbl}</div>
      <input
        type="number"
        value={Math.round(value * 100) / 100}
        min={min} max={max} step={step}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        style={inp}
      />
    </div>
  );
}

function SectionHeader({ children, toggle, onToggle }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
      <div style={label}>{children}</div>
      {toggle !== undefined && (
        <button
          onClick={() => onToggle(!toggle)}
          style={{
            background: toggle ? '#4fc3f7' : '#1a2030',
            border: '1px solid',
            borderColor: toggle ? '#4fc3f7' : '#2a3142',
            borderRadius: 10,
            color: toggle ? '#0d1117' : '#8892a4',
            fontSize: 9,
            padding: '1px 6px',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {toggle ? 'ON' : 'OFF'}
        </button>
      )}
    </div>
  );
}

function SmallBtn({ label: lbl, onClick, title, active }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        flex: 1,
        padding: '4px 2px',
        background: active ? '#4fc3f7' : '#1a2030',
        color: active ? '#0d1117' : '#8892a4',
        border: '1px solid #2a3142',
        borderRadius: 4,
        fontSize: 9,
        cursor: 'pointer',
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      }}
    >
      {lbl}
    </button>
  );
}

function GradientEditor({ gradient, onChange }) {
  const update = (key, val) => onChange({ ...gradient, [key]: val });
  const updateStop = (i, key, val) => {
    const stops = gradient.stops.map((s, idx) => idx === i ? { ...s, [key]: val } : s);
    onChange({ ...gradient, stops });
  };
  const addStop = () => {
    const stops = [...gradient.stops, { offset: 0.5, color: '#1AD3BB', opacity: 1 }]
      .sort((a, b) => a.offset - b.offset);
    onChange({ ...gradient, stops });
  };
  const removeStop = (i) => {
    if (gradient.stops.length <= 2) return;
    onChange({ ...gradient, stops: gradient.stops.filter((_, idx) => idx !== i) });
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
        {['linear', 'radial'].map((t) => (
          <SmallBtn key={t} label={t === 'linear' ? 'Lineal' : 'Radial'}
            active={gradient.type === t} onClick={() => update('type', t)} />
        ))}
      </div>

      {gradient.type === 'linear' && (
        <div style={{ marginBottom: 8 }}>
          <div style={label}>Ángulo: {gradient.angle ?? 0}°</div>
          <input
            type="range" min={0} max={360} step={5}
            value={gradient.angle ?? 0}
            onChange={(e) => update('angle', parseInt(e.target.value))}
            style={{ width: '100%', accentColor: '#4fc3f7' }}
          />
        </div>
      )}

      <div style={{ ...label, marginBottom: 6 }}>Paradas de color</div>
      {gradient.stops.map((stop, i) => (
        <div key={i} style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 4 }}>
          <input
            type="color" value={stop.color}
            onChange={(e) => updateStop(i, 'color', e.target.value)}
            style={{ width: 28, height: 24, border: 'none', padding: 0, cursor: 'pointer' }}
          />
          <input
            type="number" min={0} max={100} step={5}
            value={Math.round(stop.offset * 100)}
            onChange={(e) => updateStop(i, 'offset', Math.max(0, Math.min(1, parseInt(e.target.value || 0) / 100)))}
            style={{ ...inp, width: 48, fontSize: 10 }}
          />
          <span style={{ color: '#555d6e', fontSize: 9 }}>%</span>
          <input
            type="range" min={0} max={1} step={0.05}
            value={stop.opacity ?? 1}
            onChange={(e) => updateStop(i, 'opacity', parseFloat(e.target.value))}
            style={{ flex: 1, accentColor: '#4fc3f7' }}
          />
          <button onClick={() => removeStop(i)}
            style={{ background: 'none', border: 'none', color: '#555d6e', cursor: 'pointer', fontSize: 14, padding: '0 2px' }}
          >×</button>
        </div>
      ))}
      <button onClick={addStop}
        style={{ ...inp, cursor: 'pointer', color: '#4fc3f7', fontSize: 10, marginTop: 4 }}>
        + Agregar parada
      </button>
    </div>
  );
}

export function PropertiesPanel({ shape, onUpdate }) {
  const [lockRatio, setLockRatio] = useState(false);

  if (!shape) {
    return (
      <div style={{ padding: 16, color: '#555d6e', fontSize: 12, textAlign: 'center' }}>
        <div style={{ marginBottom: 8 }}>Selecciona una forma</div>
        <div style={{ fontSize: 10, lineHeight: 1.6 }}>
          V = Seleccionar<br />
          R = Rect · C = Círculo<br />
          E = Elipse · T = Triángulo<br />
          L = Línea<br />
          Ctrl+Z/Y = Deshacer/Rehacer<br />
          Ctrl+D = Duplicar · Del = Borrar<br />
          Flechas = Mover (Shift×5)
        </div>
      </div>
    );
  }

  const up = (key, val) => onUpdate(shape.id, { [key]: val });
  const upMulti = (changes) => onUpdate(shape.id, changes);
  const isLine = shape.type === 'line';

  const handleWidthChange = (v) => {
    const w = Math.max(1, v);
    if (lockRatio && !isLine) {
      const ratio = shape.height / shape.width;
      upMulti({ width: w, height: Math.max(1, Math.round(w * ratio * 10) / 10) });
    } else {
      up('width', w);
    }
  };
  const handleHeightChange = (v) => {
    const h = Math.max(1, v);
    if (lockRatio && !isLine) {
      const ratio = shape.width / shape.height;
      upMulti({ height: h, width: Math.max(1, Math.round(h * ratio * 10) / 10) });
    } else {
      up('height', h);
    }
  };

  // Alignment helpers (relative to 50x50 canvas)
  const align = {
    left:    () => up('x', 0),
    right:   () => up('x', CANVAS_SIZE - shape.width),
    top:     () => up('y', 0),
    bottom:  () => up('y', CANVAS_SIZE - shape.height),
    centerH: () => up('x', (CANVAS_SIZE - shape.width) / 2),
    centerV: () => up('y', (CANVAS_SIZE - shape.height) / 2),
  };

  return (
    <div style={{ padding: 12, overflowY: 'auto', fontSize: 12 }}>
      {/* Name */}
      <div style={sec}>
        <div style={label}>Nombre</div>
        <input type="text" value={shape.name} onChange={(e) => up('name', e.target.value)} style={inp} />
      </div>

      {/* Position + Size */}
      <div style={sec}>
        <div style={row}>
          <Num lbl="X" value={shape.x} onChange={(v) => up('x', v)} min={-10} max={60} />
          <Num lbl="Y" value={shape.y} onChange={(v) => up('y', v)} min={-10} max={60} />
        </div>
        <div style={{ ...row, alignItems: 'flex-end' }}>
          <Num lbl={isLine ? 'ΔX' : 'W'} value={shape.width} onChange={handleWidthChange} min={isLine ? -50 : 1} max={60} />
          <Num lbl={isLine ? 'ΔY' : 'H'} value={shape.height} onChange={handleHeightChange} min={isLine ? -50 : 1} max={60} />
          {!isLine && (
            <button
              onClick={() => setLockRatio(!lockRatio)}
              title="Bloquear proporción"
              style={{
                width: 28, height: 28, flexShrink: 0,
                background: lockRatio ? '#4fc3f7' : '#1a2030',
                color: lockRatio ? '#0d1117' : '#555d6e',
                border: '1px solid #2a3142', borderRadius: 4,
                cursor: 'pointer', fontSize: 14, marginBottom: 0,
              }}
            >⛓</button>
          )}
        </div>
      </div>

      {/* Rotation + Flip */}
      <div style={sec}>
        <Num lbl="Rotación (°)" value={shape.rotation} onChange={(v) => up('rotation', v)} min={-360} max={360} step={5} />
        <div style={{ ...row, marginTop: 6 }}>
          <SmallBtn label="↔ Flip H" onClick={() => up('flipX', !shape.flipX)} active={shape.flipX} />
          <SmallBtn label="↕ Flip V" onClick={() => up('flipY', !shape.flipY)} active={shape.flipY} />
        </div>
      </div>

      {/* Alignment */}
      <div style={sec}>
        <div style={label}>Alinear en canvas</div>
        <div style={{ ...row, flexWrap: 'wrap' }}>
          <SmallBtn label="◁ Izq" onClick={align.left} title="Borde izquierdo" />
          <SmallBtn label="▷ Der" onClick={align.right} title="Borde derecho" />
          <SmallBtn label="△ Arr" onClick={align.top} title="Borde superior" />
          <SmallBtn label="▽ Abj" onClick={align.bottom} title="Borde inferior" />
          <SmallBtn label="↔ C" onClick={align.centerH} title="Centrar horizontal" />
          <SmallBtn label="↕ C" onClick={align.centerV} title="Centrar vertical" />
        </div>
      </div>

      {/* Corner Radius (rect only) */}
      {shape.type === 'rect' && (
        <div style={sec}>
          <Num lbl="Radio esquinas" value={shape.rx} onChange={(v) => up('rx', Math.max(0, v))} min={0} max={25} step={1} />
        </div>
      )}

      {/* Path data */}
      {shape.type === 'path' && (
        <div style={sec}>
          <div style={label}>Path d</div>
          <textarea value={shape.d} onChange={(e) => up('d', e.target.value)}
            rows={3} style={{ ...inp, fontFamily: 'monospace', fontSize: 10, resize: 'vertical' }} />
        </div>
      )}

      <div style={divider} />

      {/* Fill — not shown for lines */}
      {!isLine && (
        <div style={sec}>
          <div style={{ ...row, alignItems: 'center', marginBottom: 8 }}>
            {['solid', 'linear', 'radial'].map((ft) => (
              <SmallBtn key={ft}
                label={ft === 'solid' ? 'Sólido' : ft === 'linear' ? 'Lineal' : 'Radial'}
                active={shape.fillType === ft}
                onClick={() => up('fillType', ft)}
              />
            ))}
          </div>

          {shape.fillType === 'solid' ? (
            <ColorPicker value={shape.fill} onChange={(v) => up('fill', v)} />
          ) : (
            <GradientEditor
              gradient={shape.gradient}
              onChange={(g) => up('gradient', g)}
            />
          )}
        </div>
      )}

      {/* Opacity */}
      <div style={sec}>
        <div style={label}>Opacidad</div>
        <OpacitySlider value={shape.opacity} onChange={(v) => up('opacity', v)} />
      </div>

      <div style={divider} />

      {/* Stroke */}
      <div style={sec}>
        <SectionHeader toggle={shape.strokeEnabled} onToggle={(v) => up('strokeEnabled', v)}>
          Contorno (Stroke)
        </SectionHeader>

        {(isLine || shape.strokeEnabled) && (
          <div>
            <div style={label}>Color</div>
            <ColorPicker value={shape.stroke || '#ffffff'} onChange={(v) => up('stroke', v)} />

            <div style={{ ...row, marginTop: 8 }}>
              <Num lbl="Grosor" value={shape.strokeWidth || 1} onChange={(v) => up('strokeWidth', Math.max(0.5, v))}
                min={0.5} max={10} step={0.5} />
            </div>

            <div style={{ marginTop: 6 }}>
              <div style={label}>Extremos</div>
              <div style={row}>
                {['round', 'butt', 'square'].map((lc) => (
                  <SmallBtn key={lc} label={lc} active={(shape.strokeLinecap || 'round') === lc}
                    onClick={() => up('strokeLinecap', lc)} />
                ))}
              </div>
            </div>

            <div style={{ marginTop: 6 }}>
              <div style={label}>Estilo de línea</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {STROKE_DASH_PRESETS.map((preset) => (
                  <SmallBtn key={preset.label} label={preset.label}
                    active={(shape.strokeDasharray || '') === preset.value}
                    onClick={() => up('strokeDasharray', preset.value)} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
