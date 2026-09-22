import React, { useState, useRef, useEffect } from 'react';
import MathView from './MathView';
import { Sliders } from 'lucide-react';

export default function InteractiveVisualizer({ type }) {
  // Mode Droite (FOND-0100)
  const [slopeM, setSlopeM] = useState(2);
  const [interceptB, setInterceptB] = useState(1);

  // Mode Cercle Trigonométrique (FOND-0100)
  const [trigAngleDeg, setTrigAngleDeg] = useState(45);

  // Mode Parabole (FOND-0100)
  const [quadA, setQuadA] = useState(1);
  const [quadC, setQuadC] = useState(-4);

  // Mode Vecteurs (MAT-0130)
  const [ux, setUx] = useState(4);
  const [uy, setUy] = useState(2);
  const [vx, setVx] = useState(3);
  const [vy, setVy] = useState(1);

  // Mode Dérivée / Tangente (MAT-0150)
  const [tanX, setTanX] = useState(1.0);

  // Mode Intégrale / Riemann (MAT-0250)
  const [riemannN, setRiemannN] = useState(6);

  // Mode Loi Normale (MAT-0250)
  const [normZ, setNormZ] = useState(1.0);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Fond blanc propre
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    if (type === 'line' || type === 'fractions') {
      const cx = width / 2;
      const cy = height / 2;
      const scale = 28;

      // Grille claire
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      for (let x = cx % scale; x < width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = cy % scale; y < height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Axes gris soutenu
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      // Droite y = m*x + b
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const xLeft = -8;
      const xRight = 8;
      const yLeft = slopeM * xLeft + interceptB;
      const yRight = slopeM * xRight + interceptB;
      ctx.moveTo(cx + xLeft * scale, cy - yLeft * scale);
      ctx.lineTo(cx + xRight * scale, cy - yRight * scale);
      ctx.stroke();

      // Point ordonnée à l'origine (0, b)
      ctx.fillStyle = '#e11d48';
      ctx.beginPath();
      ctx.arc(cx, cy - interceptB * scale, 5.5, 0, Math.PI * 2);
      ctx.fill();

      // Point en x = 1 (1, m + b)
      const x1 = 1;
      const y1 = slopeM * x1 + interceptB;
      ctx.fillStyle = '#059669';
      ctx.beginPath();
      ctx.arc(cx + x1 * scale, cy - y1 * scale, 5.5, 0, Math.PI * 2);
      ctx.fill();

      // Triangle de pente
      ctx.strokeStyle = '#d97706';
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy - interceptB * scale);
      ctx.lineTo(cx + scale, cy - interceptB * scale);
      ctx.lineTo(cx + scale, cy - y1 * scale);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (type === 'trigcircle') {
      const cx = width / 2;
      const cy = height / 2;
      const radius = 90;

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      const rad = (trigAngleDeg * Math.PI) / 180;
      const cosVal = Math.cos(rad);
      const sinVal = Math.sin(rad);

      const px = cx + cosVal * radius;
      const py = cy - sinVal * radius;

      // Cosinus (cyan)
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, cy);
      ctx.stroke();

      // Sinus (émeraude)
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(px, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Rayon (ambre)
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Point
      ctx.fillStyle = '#e11d48';
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();

      // Arc
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, -rad, rad > 0 ? true : false);
      ctx.stroke();
    } else if (type === 'parabola') {
      const cx = width / 2;
      const cy = height / 2 + 30;
      const scaleX = 40;
      const scaleY = 20;

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px < width; px += 2) {
        const x = (px - cx) / scaleX;
        const y = quadA * x * x + quadC;
        const py = cy - y * scaleY;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Sommet (rouge)
      ctx.fillStyle = '#e11d48';
      ctx.beginPath();
      ctx.arc(cx, cy - quadC * scaleY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Racines / Intersections avec l'axe x (vert)
      if (-quadC / quadA > 0) {
        const rootVal = Math.sqrt(-quadC / quadA);
        ctx.fillStyle = '#059669';
        ctx.beginPath();
        ctx.arc(cx - rootVal * scaleX, cy, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + rootVal * scaleX, cy, 5.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (-quadC / quadA === 0) {
        ctx.fillStyle = '#059669';
        ctx.beginPath();
        ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (type === 'vector2d' || type === 'vector3d' || type === 'planes') {
      const cx = width / 2;
      const cy = height / 2;
      const scale = 32;

      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      for (let x = cx % scale; x < width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = cy % scale; y < height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      const drawArrow = (fromX, fromY, toX, toY, color, width = 2.5) => {
        const headlen = 8;
        const dx = toX - fromX;
        const dy = toY - fromY;
        const angle = Math.atan2(dy, dx);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
      };

      const vEndX = cx + vx * scale;
      const vEndY = cy - vy * scale;
      drawArrow(cx, cy, vEndX, vEndY, '#0284c7', 3);

      const uEndX = cx + ux * scale;
      const uEndY = cy - uy * scale;
      drawArrow(cx, cy, uEndX, uEndY, '#059669', 3);

      const dot = ux * vx + uy * vy;
      const normVSq = vx * vx + vy * vy;
      if (normVSq > 0) {
        const factor = dot / normVSq;
        const px = factor * vx;
        const py = factor * vy;
        const pEndX = cx + px * scale;
        const pEndY = cy - py * scale;

        ctx.strokeStyle = '#64748b';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(uEndX, uEndY);
        ctx.lineTo(pEndX, pEndY);
        ctx.stroke();
        ctx.setLineDash([]);

        drawArrow(cx, cy, pEndX, pEndY, '#d97706', 3);
      }
    } else if (type === 'tangent' || type === 'limit' || type === 'derivatives' || type === 'optimization') {
      const cx = width / 2;
      const cy = height / 2 + 30;
      const scaleX = 70;
      const scaleY = 35;

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      const f = (x) => 0.5 * Math.pow(x, 3) - 2 * x;
      const fPrime = (x) => 1.5 * Math.pow(x, 2) - 2;

      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = 0; px < width; px += 2) {
        const x = (px - cx) / scaleX;
        const y = f(x);
        const py = cy - y * scaleY;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      const x0 = tanX;
      const y0 = f(x0);
      const m = fPrime(x0);

      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const xLeft = -3;
      const xRight = 3;
      const yLeft = y0 + m * (xLeft - x0);
      const yRight = y0 + m * (xRight - x0);

      ctx.moveTo(cx + xLeft * scaleX, cy - yLeft * scaleY);
      ctx.lineTo(cx + xRight * scaleX, cy - yRight * scaleY);
      ctx.stroke();

      const ptX = cx + x0 * scaleX;
      const ptY = cy - y0 * scaleY;
      ctx.fillStyle = '#e11d48';
      ctx.beginPath();
      ctx.arc(ptX, ptY, 6, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const originX = 60;
      const originY = height - 50;
      const scaleX = 80;
      const scaleY = 35;

      const f = (x) => 0.25 * x * x + 0.5;
      const a = 0.5;
      const b = 3.5;
      const dx = (b - a) / riemannN;

      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(originX - 20, originY);
      ctx.lineTo(width - 20, originY);
      ctx.moveTo(originX, 20);
      ctx.lineTo(originX, originY + 20);
      ctx.stroke();

      ctx.fillStyle = 'rgba(79, 70, 229, 0.15)';
      ctx.strokeStyle = '#4f46e5';
      ctx.lineWidth = 1.5;

      for (let i = 0; i < riemannN; i++) {
        const xi = a + i * dx;
        const rectH = f(xi + dx / 2);
        const rx = originX + xi * scaleX;
        const rw = dx * scaleX;
        const ry = originY - rectH * scaleY;
        const rh = rectH * scaleY;

        ctx.fillRect(rx, ry, rw, rh);
        ctx.strokeRect(rx, ry, rw, rh);
      }

      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let px = originX; px < width - 20; px += 2) {
        const x = (px - originX) / scaleX;
        const y = f(x);
        const py = originY - y * scaleY;
        if (px === originX) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  }, [type, slopeM, interceptB, trigAngleDeg, quadA, quadC, ux, uy, vx, vy, tanX, riemannN, normZ]);

  const radVal = ((trigAngleDeg * Math.PI) / 180).toFixed(2);
  const cosDisplay = Math.cos((trigAngleDeg * Math.PI) / 180).toFixed(2);
  const sinDisplay = Math.sin((trigAngleDeg * Math.PI) / 180).toFixed(2);
  const dotProduct = ux * vx + uy * vy;
  const mSlope = (1.5 * Math.pow(tanX, 2) - 2).toFixed(2);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <Sliders className="w-4 h-4 text-indigo-600" />
          <span>Laboratoire Visuel Interactif</span>
        </div>
        <span className="text-xs text-slate-500">Bouge les curseurs pour observer</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 flex items-center justify-center bg-slate-50 rounded-xl p-3 border border-slate-200/80 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={480}
            height={260}
            className="w-full max-w-[480px] h-auto block rounded-lg shadow-2xs"
          />
        </div>

        <div className="flex flex-col justify-between text-xs space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          {type === 'line' || type === 'fractions' ? (
            <div className="space-y-3">
              <div>
                <label className="flex justify-between text-sky-700 font-semibold mb-1">
                  <span>Pente m : {slopeM}</span>
                </label>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.5"
                  value={slopeM}
                  onChange={(e) => setSlopeM(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-rose-700 font-semibold mb-1">
                  <span>Ordonnée à l'origine b : {interceptB}</span>
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="1"
                  value={interceptB}
                  onChange={(e) => setInterceptB(Number(e.target.value))}
                  className="w-full accent-rose-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1 font-mono text-slate-700">
                <div className="font-bold text-indigo-700">
                  y = {slopeM}x {interceptB >= 0 ? `+ ${interceptB}` : `- ${Math.abs(interceptB)}`}
                </div>
                <div className="text-[11px] text-slate-500">
                  {slopeM > 0 ? '↗ Droite croissante' : slopeM < 0 ? '↘ Droite décroissante' : '→ Droite horizontale'}
                </div>
              </div>
            </div>
          ) : type === 'trigcircle' ? (
            <div className="space-y-3">
              <div>
                <label className="flex justify-between text-amber-800 font-semibold mb-1">
                  <span>Angle θ : {trigAngleDeg}° ({radVal} rad)</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={trigAngleDeg}
                  onChange={(e) => setTrigAngleDeg(Number(e.target.value))}
                  className="w-full accent-amber-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1 font-mono text-slate-700">
                <div className="text-sky-700">cos(θ) : <b>{cosDisplay}</b> (horizontal)</div>
                <div className="text-emerald-700">sin(θ) : <b>{sinDisplay}</b> (vertical)</div>
              </div>
            </div>
          ) : type === 'parabola' ? (
            <div className="space-y-3">
              <div>
                <label className="flex justify-between text-amber-800 font-semibold mb-1">
                  <span>Courbure a : {quadA}</span>
                  <span className="text-[11px] font-normal text-slate-500">
                    {quadA > 0 ? '∪ Convexe (haut)' : '∩ Concave (bas)'}
                  </span>
                </label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={quadA}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setQuadA(val === 0 ? 0.5 : val);
                  }}
                  className="w-full accent-amber-600"
                />
              </div>

              <div>
                <label className="flex justify-between text-rose-700 font-semibold mb-1">
                  <span>Hauteur / Sommet c : {quadC}</span>
                </label>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="1"
                  value={quadC}
                  onChange={(e) => setQuadC(Number(e.target.value))}
                  className="w-full accent-rose-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 space-y-1 font-mono text-slate-700">
                <div className="font-bold text-indigo-700">
                  y = {quadA === 1 ? '' : quadA === -1 ? '-' : `${quadA}`}x² {quadC >= 0 ? `+ ${quadC}` : `- ${Math.abs(quadC)}`}
                </div>
                <div className="text-[11px] text-slate-600">
                  Sommet : (0, {quadC})
                </div>
                <div className="text-[11px]">
                  {-quadC / quadA > 0 ? (
                    <span className="text-emerald-700 font-semibold">
                      Racines : x = ±{(Math.sqrt(-quadC / quadA)).toFixed(2)}
                    </span>
                  ) : -quadC / quadA === 0 ? (
                    <span className="text-emerald-700 font-semibold">
                      Racine double : x = 0
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">
                      Aucune racine réelle (Δ &lt; 0)
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : type === 'tangent' || type === 'limit' || type === 'derivatives' || type === 'optimization' ? (
            <div className="space-y-3">
              <div>
                <label className="flex justify-between text-sky-700 font-semibold mb-1">
                  <span>Position x₀ : {tanX.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-2.2"
                  max="2.2"
                  step="0.05"
                  value={tanX}
                  onChange={(e) => setTanX(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 font-mono text-slate-700">
                <span>Pente de la tangente f'(x₀) : </span>
                <b className="text-rose-600">{mSlope}</b>
              </div>
            </div>
          ) : type === 'vector2d' || type === 'vector3d' || type === 'planes' ? (
            <div className="space-y-3">
              <div>
                <label className="text-emerald-700 font-semibold block mb-1">Vecteur u : ({ux}, {uy})</label>
                <div className="flex gap-2">
                  <input type="range" min="-5" max="5" value={ux} onChange={(e) => setUx(Number(e.target.value))} className="w-1/2 accent-emerald-600" />
                  <input type="range" min="-5" max="5" value={uy} onChange={(e) => setUy(Number(e.target.value))} className="w-1/2 accent-emerald-600" />
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 font-mono text-slate-700">
                u · v = <b>{dotProduct}</b> {dotProduct === 0 && '(Orthogonaux !)'}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="text-indigo-700 font-semibold block mb-1">Rectangles N : {riemannN}</label>
              <input type="range" min="2" max="30" value={riemannN} onChange={(e) => setRiemannN(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
