import React, { useState, useRef, useEffect } from 'react';
import MathView from './MathView';
import { Sliders, RotateCcw } from 'lucide-react';

export default function InteractiveVisualizer({ type }) {
  // Mode Vecteurs
  const [ux, setUx] = useState(4);
  const [uy, setUy] = useState(2);
  const [vx, setVx] = useState(3);
  const [vy, setVy] = useState(1);

  // Mode Dérivée / Tangente
  const [tanX, setTanX] = useState(1.0);

  // Mode Intégrale / Riemann
  const [riemannN, setRiemannN] = useState(6);

  // Mode Loi Normale
  const [normZ, setNormZ] = useState(1.0);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (type === 'vector2d' || type === 'vector3d' || type === 'planes') {
      // Repère cartésien centré
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

      // Flèche helper
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

      // Vecteur v (bleu)
      const vEndX = cx + vx * scale;
      const vEndY = cy - vy * scale;
      drawArrow(cx, cy, vEndX, vEndY, '#38bdf8', 3);

      // Vecteur u (émeraude)
      const uEndX = cx + ux * scale;
      const uEndY = cy - uy * scale;
      drawArrow(cx, cy, uEndX, uEndY, '#34d399', 3);

      // Calcul de la projection orthogonale
      const dot = ux * vx + uy * vy;
      const normVSq = vx * vx + vy * vy;
      if (normVSq > 0) {
        const factor = dot / normVSq;
        const px = factor * vx;
        const py = factor * vy;
        const pEndX = cx + px * scale;
        const pEndY = cy - py * scale;

        // Ligne pointillée de u à proj
        ctx.strokeStyle = '#94a3b8';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(uEndX, uEndY);
        ctx.lineTo(pEndX, pEndY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Vecteur projection (ambre)
        drawArrow(cx, cy, pEndX, pEndY, '#fbbf24', 3);
      }
    } else if (type === 'tangent' || type === 'limit' || type === 'derivatives' || type === 'optimization') {
      // Graphique f(x) = x^3 - 3x / 2 ou f(x) = x^2 - 2x
      const cx = width / 2;
      const cy = height / 2 + 30;
      const scaleX = 70;
      const scaleY = 35;

      // Axes
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();

      // Fonction f(x) = 0.5 * x^3 - 2 * x
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

      // Tangente en tanX
      const x0 = tanX;
      const y0 = f(x0);
      const m = fPrime(x0);

      // Droite tangente : y - y0 = m * (x - x0)
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

      // Point de contact (x0, y0)
      const ptX = cx + x0 * scaleX;
      const ptY = cy - y0 * scaleY;
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(ptX, ptY, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'riemann' || type === 'primitive' || type === 'techniques') {
      // Somme de Riemann sous f(x) = 0.3 * x^2 + 0.5
      const originX = 60;
      const originY = height - 50;
      const scaleX = 80;
      const scaleY = 35;

      const f = (x) => 0.25 * x * x + 0.5;
      const a = 0.5;
      const b = 3.5;
      const dx = (b - a) / riemannN;

      // Axes
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(originX - 20, originY);
      ctx.lineTo(width - 20, originY);
      ctx.moveTo(originX, 20);
      ctx.lineTo(originX, originY + 20);
      ctx.stroke();

      // Rectangles de Riemann
      ctx.fillStyle = 'rgba(99, 102, 241, 0.35)';
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 1;

      for (let i = 0; i < riemannN; i++) {
        const xi = a + i * dx;
        const rectH = f(xi + dx / 2); // point milieu
        const rx = originX + xi * scaleX;
        const rw = dx * scaleX;
        const ry = originY - rectH * scaleY;
        const rh = rectH * scaleY;

        ctx.fillRect(rx, ry, rw, rh);
        ctx.strokeRect(rx, ry, rw, rh);
      }

      // Courbe réelle
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
      // Distribution normale N(0, 1)
      const cx = width / 2;
      const cy = height - 40;
      const scaleX = 55;
      const scaleY = 160;

      // Courbe en cloche
      const phi = (x) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);

      // Aire colorée P(X <= normZ)
      ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
      ctx.beginPath();
      ctx.moveTo(cx - 3.5 * scaleX, cy);
      for (let x = -3.5; x <= normZ; x += 0.05) {
        ctx.lineTo(cx + x * scaleX, cy - phi(x) * scaleY);
      }
      ctx.lineTo(cx + normZ * scaleX, cy);
      ctx.closePath();
      ctx.fill();

      // Tracé courbe
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

      // Ligne verticale au seuil Z
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx + normZ * scaleX, cy);
      ctx.lineTo(cx + normZ * scaleX, cy - phi(normZ) * scaleY);
      ctx.stroke();
    }
  }, [type, ux, uy, vx, vy, tanX, riemannN, normZ]);

  // Valeurs calculées en temps réel
  const dotProduct = ux * vx + uy * vy;
  const normU = Math.hypot(ux, uy).toFixed(2);
  const normV = Math.hypot(vx, vy).toFixed(2);
  const cosTheta = (dotProduct / (normU * normV || 1)).toFixed(3);
  const angleDeg = (Math.acos(Math.max(-1, Math.min(1, cosTheta))) * 180 / Math.PI).toFixed(1);

  const mSlope = (1.5 * Math.pow(tanX, 2) - 2).toFixed(2);
  const fVal = (0.5 * Math.pow(tanX, 3) - 2 * tanX).toFixed(2);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <span>Laboratoire Interactif & Visualisation</span>
        </div>
        <span className="text-xs text-slate-400">Modifiez les curseurs en temps réel</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Canevas */}
        <div className="md:col-span-2 flex items-center justify-center bg-slate-950/70 rounded-lg p-2 border border-slate-800/60 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={480}
            height={260}
            className="w-full max-w-[480px] h-auto block"
          />
        </div>

        {/* Panneau de contrôle */}
        <div className="flex flex-col justify-between text-xs space-y-3 bg-slate-950/40 p-3 rounded-lg border border-slate-800/40">
          {type === 'vector2d' || type === 'vector3d' || type === 'planes' ? (
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
                <div className="flex justify-between">
                  <span className="text-slate-400">Angle θ :</span>
                  <span>{angleDeg}°</span>
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
                  <span>Point d'évaluation x₀ : {tanX.toFixed(2)}</span>
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
                  <span className="text-slate-400">f(x₀) :</span>
                  <span className="text-slate-200">{fVal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pente f'(x₀) :</span>
                  <span className={`font-bold ${Math.abs(Number(mSlope)) < 0.1 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {mSlope} {Math.abs(Number(mSlope)) < 0.1 && '(Extremum !)'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 italic pt-1">
                  La tangente rouge montre le taux de variation instantané en ce point.
                </div>
              </div>
            </div>
          ) : type === 'riemann' || type === 'primitive' || type === 'techniques' ? (
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

              <div className="pt-2 border-t border-slate-800 space-y-1.5 font-mono text-slate-300">
                <div className="text-[11px] text-slate-400">
                  Quand N → ∞, la somme des rectangles converge exactement vers l'intégrale définie ∫ f(x)dx.
                </div>
                <div className="flex justify-between text-emerald-400 font-semibold pt-1">
                  <span>Précision :</span>
                  <span>{riemannN > 15 ? 'Excellente' : 'Approximation'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="flex justify-between text-emerald-400 font-medium mb-1">
                  <span>Seuil standard Z : {normZ.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.1"
                  value={normZ}
                  onChange={(e) => setNormZ(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1.5 font-mono text-slate-300">
                <div className="text-[11px] text-slate-400">
                  L'aire verte sous la courbe correspond à la probabilité cumulée P(X ≤ Z).
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
