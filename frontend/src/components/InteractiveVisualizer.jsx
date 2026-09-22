import React, { useState, useRef, useEffect } from 'react';
import MathView from './MathView';
import { Sliders, RotateCcw } from 'lucide-react';

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

    ctx.clearRect(0, 0, width, height);

    if (type === 'line' || type === 'fractions') {
      // Visualisation de la droite y = mx + b
      const cx = width / 2;
      const cy = height / 2;
      const scale = 28;

      // Grille
      ctx.strokeStyle = '#1e293b';
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

      // Axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      // Droite y = m*x + b
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const xLeft = -8;
      const xRight = 8;
      const yLeft = slopeM * xLeft + interceptB;
      const yRight = slopeM * xRight + interceptB;
      ctx.moveTo(cx + xLeft * scale, cy - yLeft * scale);
      ctx.lineTo(cx + xRight * scale, cy - yRight * scale);
      ctx.stroke();

      // Point ordonnée à l'origine (0, b)
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(cx, cy - interceptB * scale, 5, 0, Math.PI * 2);
      ctx.fill();

      // Point en x = 1 (1, m + b) pour visualiser la pente
      const x1 = 1;
      const y1 = slopeM * x1 + interceptB;
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(cx + x1 * scale, cy - y1 * scale, 5, 0, Math.PI * 2);
      ctx.fill();

      // Triangle de pente
      ctx.strokeStyle = '#fbbf24';
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy - interceptB * scale);
      ctx.lineTo(cx + scale, cy - interceptB * scale);
      ctx.lineTo(cx + scale, cy - y1 * scale);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (type === 'trigcircle') {
      // Cercle trigonométrique unitaire
      const cx = width / 2;
      const cy = height / 2;
      const radius = 90;

      // Axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      // Cercle de rayon 1
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

      // Projection Cosinus (horizontal en cyan)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, cy);
      ctx.stroke();

      // Projection Sinus (vertical en émeraude)
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(px, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Rayon vers le point (ambre)
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Point sur le cercle
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();

      // Arc d'angle
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, -rad, rad > 0 ? true : false);
      ctx.stroke();
    } else if (type === 'parabola') {
      // Parabole y = ax^2 + c
      const cx = width / 2;
      const cy = height / 2 + 30;
      const scaleX = 40;
      const scaleY = 20;

      // Axes
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      // Tracé y = a*x^2 + c
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let px = 0; px < width; px += 2) {
        const x = (px - cx) / scaleX;
        const y = quadA * x * x + quadC;
        const py = cy - y * scaleY;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Sommet (0, c)
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(cx, cy - quadC * scaleY, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'vector2d' || type === 'vector3d' || type === 'planes') {
      const cx = width / 2;
      const cy = height / 2;
      const scale = 32;

      // Grille
      ctx.strokeStyle = '#1e293b';
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

      // Axes
      ctx.strokeStyle = '#475569';
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
      drawArrow(cx, cy, vEndX, vEndY, '#38bdf8', 3);

      const uEndX = cx + ux * scale;
      const uEndY = cy - uy * scale;
      drawArrow(cx, cy, uEndX, uEndY, '#34d399', 3);

      const dot = ux * vx + uy * vy;
      const normVSq = vx * vx + vy * vy;
      if (normVSq > 0) {
        const factor = dot / normVSq;
        const px = factor * vx;
        const py = factor * vy;
        const pEndX = cx + px * scale;
        const pEndY = cy - py * scale;

        ctx.strokeStyle = '#94a3b8';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(uEndX, uEndY);
        ctx.lineTo(pEndX, pEndY);
        ctx.stroke();
        ctx.setLineDash([]);

        drawArrow(cx, cy, pEndX, pEndY, '#fbbf24', 3);
      }
    } else if (type === 'tangent' || type === 'limit' || type === 'derivatives' || type === 'optimization') {
      const cx = width / 2;
      const cy = height / 2 + 30;
      const scaleX = 70;
      const scaleY = 35;

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      const f = (x) => 0.5 * Math.pow(x, 3) - 2 * x;
      const fPrime = (x) => 1.5 * Math.pow(x, 2) - 2;

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
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

      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
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
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(ptX, ptY, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'riemann' || type === 'primitive' || type === 'techniques') {
      const originX = 60;
      const originY = height - 50;
      const scaleX = 80;
      const scaleY = 35;

      const f = (x) => 0.25 * x * x + 0.5;
      const a = 0.5;
      const b = 3.5;
      const dx = (b - a) / riemannN;

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(originX - 20, originY);
      ctx.lineTo(width - 20, originY);
      ctx.moveTo(originX, 20);
      ctx.lineTo(originX, originY + 20);
      ctx.stroke();

      ctx.fillStyle = 'rgba(99, 102, 241, 0.35)';
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 1;

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

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let px = originX; px < width - 20; px += 2) {
        const x = (px - originX) / scaleX;
        const y = f(x);
        const py = originY - y * scaleY;
        if (px === originX) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    } else {
      const cx = width / 2;
      const cy = height - 40;
      const scaleX = 55;
      const scaleY = 160;

      const phi = (x) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);

      ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
      ctx.beginPath();
      ctx.moveTo(cx - 3.5 * scaleX, cy);
      for (let x = -3.5; x <= normZ; x += 0.05) {
        ctx.lineTo(cx + x * scaleX, cy - phi(x) * scaleY);
      }
      ctx.lineTo(cx + normZ * scaleX, cy);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = -3.5; x <= 3.5; x += 0.05) {
        const px = cx + x * scaleX;
        const py = cy - phi(x) * scaleY;
        if (x === -3.5) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx + normZ * scaleX, cy);
      ctx.lineTo(cx + normZ * scaleX, cy - phi(normZ) * scaleY);
      ctx.stroke();
    }
  }, [type, slopeM, interceptB, trigAngleDeg, quadA, quadC, ux, uy, vx, vy, tanX, riemannN, normZ]);

  const radVal = ((trigAngleDeg * Math.PI) / 180).toFixed(2);
  const cosDisplay = Math.cos((trigAngleDeg * Math.PI) / 180).toFixed(2);
  const sinDisplay = Math.sin((trigAngleDeg * Math.PI) / 180).toFixed(2);

  const dotProduct = ux * vx + uy * vy;
  const mSlope = (1.5 * Math.pow(tanX, 2) - 2).toFixed(2);
  const fVal = (0.5 * Math.pow(tanX, 3) - 2 * tanX).toFixed(2);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Sliders className="w-4 h-4 text-amber-400" />
          <span>Laboratoire Visuel & Expérimentation</span>
        </div>
        <span className="text-xs text-slate-400">Ajustez les paramètres en direct</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 flex items-center justify-center bg-slate-950/70 rounded-lg p-2 border border-slate-800/60 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={480}
            height={260}
            className="w-full max-w-[480px] h-auto block"
          />
        </div>

        <div className="flex flex-col justify-between text-xs space-y-3 bg-slate-950/40 p-3 rounded-lg border border-slate-800/40">
          {type === 'line' || type === 'fractions' ? (
            <div className="space-y-3">
              <div>
                <label className="flex justify-between text-sky-400 font-medium mb-1">
                  <span>Pente m : {slopeM}</span>
                </label>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.5"
                  value={slopeM}
                  onChange={(e) => setSlopeM(Number(e.target.value))}
                  className="w-full accent-sky-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-rose-400 font-medium mb-1">
                  <span>Ordonnée à l'origine b : {interceptB}</span>
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="1"
                  value={interceptB}
                  onChange={(e) => setInterceptB(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1.5 font-mono text-slate-300">
                <div className="flex justify-between text-indigo-300 font-bold">
                  <span>Équation :</span>
                  <span>y = {slopeM}x {interceptB >= 0 ? `+ ${interceptB}` : `- ${Math.abs(interceptB)}`}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {slopeM > 0 ? '↗ Droite croissante (monte)' : slopeM < 0 ? '↘ Droite décroissante (descend)' : '→ Droite horizontale (constante)'}
                </div>
                <div className="text-[10px] text-amber-300">
                  Le point rouge est (0, b), le vert est (1, m+b).
                </div>
              </div>
            </div>
          ) : type === 'trigcircle' ? (
            <div className="space-y-3">
              <div>
                <label className="flex justify-between text-amber-400 font-medium mb-1">
                  <span>Angle θ : {trigAngleDeg}° ({radVal} rad)</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={trigAngleDeg}
                  onChange={(e) => setTrigAngleDeg(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1.5 font-mono text-slate-300">
                <div className="flex justify-between text-sky-400">
                  <span>cos(θ) [horizontal] :</span>
                  <span className="font-bold">{cosDisplay}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>sin(θ) [vertical] :</span>
                  <span className="font-bold">{sinDisplay}</span>
                </div>
                <div className="text-[10px] text-slate-400 pt-1">
                  Sur le cercle unité, tout angle θ donne un point de coordonnées (cos θ, sin θ).
                </div>
              </div>
            </div>
          ) : type === 'parabola' ? (
            <div className="space-y-3">
              <div>
                <label className="flex justify-between text-amber-400 font-medium mb-1">
                  <span>Courbure a : {quadA}</span>
                </label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.5"
                  value={quadA}
                  onChange={(e) => setQuadA(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-rose-400 font-medium mb-1">
                  <span>Hauteur c : {quadC}</span>
                </label>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="1"
                  value={quadC}
                  onChange={(e) => setQuadC(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 font-mono">
                <div>y = {quadA}x² {quadC >= 0 ? `+ ${quadC}` : `- ${Math.abs(quadC)}`}</div>
                <div className="text-slate-400 text-[10px] mt-1">
                  {quadA > 0 ? 'U Parabole vers le haut (minimum)' : quadA < 0 ? '∩ Parabole vers le bas (maximum)' : 'Droite'}
                </div>
              </div>
            </div>
          ) : type === 'vector2d' || type === 'vector3d' || type === 'planes' ? (
            <div className="space-y-3">
              <div>
                <label className="flex justify-between text-emerald-400 font-medium mb-1">
                  <span>Vecteur u : ({ux}, {uy})</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={ux}
                    onChange={(e) => setUx(Number(e.target.value))}
                    className="w-1/2 accent-emerald-500"
                  />
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={uy}
                    onChange={(e) => setUy(Number(e.target.value))}
                    className="w-1/2 accent-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="flex justify-between text-sky-400 font-medium mb-1">
                  <span>Vecteur v : ({vx}, {vy})</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={vx}
                    onChange={(e) => setVx(Number(e.target.value))}
                    className="w-1/2 accent-sky-500"
                  />
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={vy}
                    onChange={(e) => setVy(Number(e.target.value))}
                    className="w-1/2 accent-sky-500"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1.5 font-mono text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">u · v :</span>
                  <span className={`font-bold ${dotProduct === 0 ? 'text-amber-400' : 'text-slate-200'}`}>
                    {dotProduct} {dotProduct === 0 && '(Orthogonaux !)'}
                  </span>
                </div>
                <div className="flex justify-between text-amber-300 text-[11px]">
                  <span>Vecteur jaune :</span>
                  <span>Projection proj_v(u)</span>
                </div>
              </div>
            </div>
          ) : type === 'tangent' || type === 'limit' || type === 'derivatives' || type === 'optimization' ? (
            <div className="space-y-3">
              <div>
                <label className="flex justify-between text-sky-400 font-medium mb-1">
                  <span>Point x₀ : {tanX.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-2.2"
                  max="2.2"
                  step="0.05"
                  value={tanX}
                  onChange={(e) => setTanX(Number(e.target.value))}
                  className="w-full accent-sky-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1.5 font-mono text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pente f'(x₀) :</span>
                  <span className={`font-bold ${Math.abs(Number(mSlope)) < 0.1 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {mSlope}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="flex justify-between text-indigo-400 font-medium mb-1">
                  <span>Rectangles N : {riemannN}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={riemannN}
                  onChange={(e) => setRiemannN(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
