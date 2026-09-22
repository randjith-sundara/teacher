import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Pen,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  X,
  Grid,
  Maximize2,
  Minimize2
} from 'lucide-react';

export default function Scratchpad({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Outils
  const [tool, setTool] = useState('pen'); // 'pen' | 'highlighter' | 'eraser'
  const [color, setColor] = useState('#0f172a'); // Noir ardoise
  const [strokeWidth, setStrokeWidth] = useState(2.5);
  const [showGrid, setShowGrid] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Historique Undo / Redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // État de dessin
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0, pressure: 1 });

  // Sauvegarde persistante du tracé en base64 pour ne pas perdre ses calculs
  const savedCanvasDataRef = useRef(null);

  // Initialisation et redimensionnement net (haute résolution Retina iPad)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Sauvegarde avant resize
    let currentDrawing = null;
    if (canvas.width > 0 && canvas.height > 0) {
      currentDrawing = canvas.toDataURL();
    } else if (savedCanvasDataRef.current) {
      currentDrawing = savedCanvasDataRef.current;
    }

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Restaure le dessin
    if (currentDrawing) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, w, h);
      };
      img.src = currentDrawing;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Laisser le temps au modal de s'animer / s'afficher
      const timer = setTimeout(() => {
        resizeCanvas();
        if (history.length === 0 && canvasRef.current) {
          const initial = canvasRef.current.toDataURL();
          setHistory([initial]);
          setHistoryIndex(0);
        }
      }, 50);

      window.addEventListener('resize', resizeCanvas);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [isOpen, resizeCanvas]);

  const saveHistoryState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    savedCanvasDataRef.current = dataUrl;

    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1);
      return [...trimmed, dataUrl];
    });
    setHistoryIndex((prev) => prev + 1);
  };

  // Annuler (Undo)
  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const newIdx = historyIndex - 1;
    setHistoryIndex(newIdx);
    restoreState(history[newIdx]);
  };

  // Rétablir (Redo)
  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    const newIdx = historyIndex + 1;
    setHistoryIndex(newIdx);
    restoreState(history[newIdx]);
  };

  const restoreState = (dataUrl) => {
    const canvas = canvasRef.current;
    if (!canvas || !dataUrl) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      savedCanvasDataRef.current = dataUrl;
    };
    img.src = dataUrl;
  };

  // Effacer tout
  const handleClearAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    saveHistoryState();
  };

  // Coordonnées relatives
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, pressure: 1 };
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pressure = e.pressure !== undefined && e.pressure > 0 ? e.pressure : 1;
    return { x, y, pressure };
  };

  const handlePointerDown = (e) => {
    // Empêche tout geste natif du navigateur
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    isDrawingRef.current = true;
    const pt = getCanvasCoords(e);
    lastPointRef.current = pt;

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(pt.x, pt.y);

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 24;
    } else if (tool === 'highlighter') {
      ctx.globalCompositeOperation = 'multiply';
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.45)'; // Jaune doux surligneur
      ctx.lineWidth = 16;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth * (0.6 + pt.pressure * 0.8);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const pt = getCanvasCoords(e);
    const last = lastPointRef.current;

    // Courbe lisse quadratique entre le point précédent et le point médian
    const midX = (last.x + pt.x) / 2;
    const midY = (last.y + pt.y) / 2;

    if (tool === 'pen') {
      ctx.lineWidth = strokeWidth * (0.6 + pt.pressure * 0.8);
    }

    ctx.quadraticCurveTo(last.x, last.y, midX, midY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(midX, midY);

    lastPointRef.current = pt;
  };

  const handlePointerUp = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (canvas && e.pointerId) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
    }
    saveHistoryState();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-200 ${
          isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-4xl h-[88vh]'
        }`}
      >
        {/* Barre d'outils supérieure */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
              Brouillon Mathématique
            </span>
            <span className="hidden sm:inline text-[11px] text-slate-400">
              (Apple Pencil & tactile pris en charge)
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Stylo */}
            <button
              onClick={() => setTool('pen')}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                tool === 'pen'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
              title="Stylet d'écriture"
            >
              <Pen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Stylet</span>
            </button>

            {/* Surligneur */}
            <button
              onClick={() => setTool('highlighter')}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                tool === 'highlighter'
                  ? 'bg-amber-400 text-amber-950 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
              title="Surligneur"
            >
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block border border-amber-600/30"></span>
              <span className="hidden sm:inline">Surligneur</span>
            </button>

            {/* Gomme */}
            <button
              onClick={() => setTool('eraser')}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                tool === 'eraser'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
              title="Gomme"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gomme</span>
            </button>

            {/* Séparateur */}
            <div className="h-5 w-px bg-slate-300 mx-0.5" />

            {/* Palette de couleurs (pour stylo) */}
            {tool === 'pen' && (
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                {[
                  { val: '#0f172a', label: 'Noir' },
                  { val: '#1d4ed8', label: 'Bleu' },
                  { val: '#be123c', label: 'Rouge' },
                  { val: '#047857', label: 'Vert' }
                ].map((c) => (
                  <button
                    key={c.val}
                    onClick={() => setColor(c.val)}
                    style={{ backgroundColor: c.val }}
                    className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                      color === c.val ? 'scale-120 ring-2 ring-indigo-500 ring-offset-1' : 'hover:scale-110'
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            )}

            {/* Bascule Quadrillage */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer border ${
                showGrid
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title="Afficher/Masquer le quadrillage"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>

            {/* Undo */}
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 disabled:opacity-30 transition-colors cursor-pointer"
              title="Annuler"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>

            {/* Redo */}
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 disabled:opacity-30 transition-colors cursor-pointer"
              title="Rétablir"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>

            {/* Effacer tout */}
            <button
              onClick={handleClearAll}
              className="p-2 rounded-xl bg-white text-rose-600 border border-slate-200 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Effacer la page entière"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* Plein écran */}
            <button
              onClick={() => {
                setIsFullscreen(!isFullscreen);
                setTimeout(resizeCanvas, 60);
              }}
              className="p-2 rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
              title={isFullscreen ? 'Réduire' : 'Plein écran'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Fermer */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors cursor-pointer"
              title="Fermer le brouillon"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Zone de dessin avec quadrillage optionnel façon cahier */}
        <div
          ref={containerRef}
          className="relative flex-1 bg-white overflow-hidden select-none cursor-crosshair"
          style={{
            touchAction: 'none',
            backgroundImage: showGrid
              ? 'linear-gradient(to right, rgba(203, 213, 225, 0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(203, 213, 225, 0.45) 1px, transparent 1px)'
              : 'none',
            backgroundSize: '24px 24px'
          }}
        >
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="absolute inset-0 block w-full h-full"
            style={{ touchAction: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}
