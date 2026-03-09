import React from 'react';
import { CANVAS_VIEWBOX } from '../constants.js';
import { OdooIcon } from '../../components/OdooIcon.jsx';
import { CanvasShape } from '../canvas/CanvasShape.jsx';

export function PreviewPanel({ shapes }) {
  const dominantColor = shapes.length > 0 ? shapes[0].fill : '#985184';

  return (
    <div style={{ padding: 12 }}>
      <div style={{ color: '#8892a4', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, fontWeight: 600 }}>
        Preview
      </div>

      {/* Actual size 50x50 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div>
          <div style={{ color: '#555d6e', fontSize: 9, marginBottom: 3 }}>50x50</div>
          <div style={{ background: '#1e2433', borderRadius: 4, padding: 4, display: 'inline-block' }}>
            <svg viewBox={CANVAS_VIEWBOX} width={50} height={50}>
              {shapes.map((s) => <CanvasShape key={s.id} shape={s} isSelected={false} />)}
            </svg>
          </div>
        </div>
        <div>
          <div style={{ color: '#555d6e', fontSize: 9, marginBottom: 3 }}>128x128</div>
          <div style={{ background: '#1e2433', borderRadius: 4, padding: 4, display: 'inline-block' }}>
            <svg viewBox={CANVAS_VIEWBOX} width={80} height={80}>
              {shapes.map((s) => <CanvasShape key={s.id} shape={s} isSelected={false} />)}
            </svg>
          </div>
        </div>
      </div>

      {/* Odoo context preview */}
      <div style={{ color: '#555d6e', fontSize: 9, marginBottom: 3 }}>Contexto Odoo</div>
      <div style={{
        background: '#0d1117',
        borderRadius: 8,
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}>
        <OdooIcon color={dominantColor} size="md">
          <svg viewBox={CANVAS_VIEWBOX} width="100%" height="100%">
            {shapes.map((s) => <CanvasShape key={s.id} shape={s} isSelected={false} />)}
          </svg>
        </OdooIcon>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#e8eaf0', fontSize: 12, fontWeight: 600 }}>Mi Módulo</div>
          <div style={{ color: dominantColor, fontSize: 10, fontFamily: 'monospace', marginTop: 2, opacity: 0.85 }}>
            my_module
          </div>
        </div>
      </div>
    </div>
  );
}
