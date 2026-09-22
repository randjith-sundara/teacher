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
  Minimize2,
  GripHorizontal
} from 'lucide-react';

export default function Scratchpad({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Position et dimensions de la note flottante
  const [position, setPosition] = useState(() => {
    try {
      const saved = localStorage.getItem('teacher_scratchpad_pos');
      if (saved) {
        const p = JSON.parse(saved);
        if (typeof p.x === 'number' && typeof p.y === 'number') {
          return {
            x: Math.min(Math.max(10, p.x), window.innerWidth - 100),
            y: Math.min(Math.max(10, p.y), window.innerHeight - 100),
          };
        }
      }
    } catch {}
    const defaultW = Math.min(480, window.innerWidth - 32);
    return {
      x: Math.max(16, window.innerWidth - defaultW - 24),
      y: 76,
    };
  });

  const [size, setSize] = useState(() => {
    try {
      const saved = localStorage.getItem('teacher_scratchpad_size');
      if (saved) {
        const s = JSON.parse(saved);
        if (typeof s.width === 'number' && typeof s.height === 'number') {
          return {
            width: Math.min(Math.max(320, s.width), window.innerWidth - 20),
            height: Math.min(Math.max(260, s.height), window.innerHeight - 80),
          };
        }
      }
    } catch {}
    return {
      width: Math.min(480, window.innerWidth - 32),
      height: Math.min(540, window.innerHeight - 110),
    };
  });

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

  // Sauvegarde persistante en mémoire & localStorage
  const savedCanvasDataRef = useRef(null);

  // Chargement initial du tracé sauvegardé
  useEffect(() => {
    try {
      const savedDrawing = localStorage.getItem('teacher_scratchpad_drawing');
      if (savedDrawing) {
        savedCanvasDataRef.current = savedDrawing;
      }
    } catch {}
  }, []);

  // Gestion du déplacement (Draggable)
  const isDraggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const handleHeaderPointerDown = (e) => {
    // Si l'utilisateur clique sur un bouton d'outil, on ne déclenche pas le drag
    if (e.target.closest('button')) return;
    if (isFullscreen) return;

    e.preventDefault();
    isDraggingRef.current = true;
    dragOffsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handleHeaderPointerMove = (e) => {
    if (!isDraggingRef.current || isFullscreen) return;
    e.preventDefault();
    const newX = Math.max(8, Math.min(window.innerWidth - 80, e.clientX - dragOffsetRef.current.x));
    const newY = Math.max(8, Math.min(window.innerHeight - 60, e.clientY - dragOffsetRef.current.y));
    const newPos = { x: newX, y: newY };
    setPosition(newPos);
  };

  const handleHeaderPointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    try {
      localStorage.setItem('teacher_scratchpad_pos', JSON.stringify(position));
    } catch {}
  };

  // Gestion du redimensionnement (Resize corner)
  const isResizingRef = useRef(false);
  const resizeStartRef = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const handleResizePointerDown = (e) => {
    if (isFullscreen) return;
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      w: size.width,
      h: size.height,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handleResizePointerMove = (e) => {
    if (!isResizingRef.current || isFullscreen) return;
    e.preventDefault();
    const deltaX = e.clientX - resizeStartRef.current.x;
    const deltaY = e.clientY - resizeStartRef.current.y;
    const newW = Math.max(320, Math.min(window.innerWidth - position.x - 16, resizeStartRef.current.w + deltaX));
    const newH = Math.max(260, Math.min(window.innerHeight - position.y - 16, resizeStartRef.current.h + deltaY));
    const newSize = { width: newW, height: newH };
    setSize(newSize);
  };

  const handleResizePointerUp = (e) => {
    if (!isResizingRef.current) return;
    isResizingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    try {
      localStorage.setItem('teacher_scratchpad_size', JSON.stringify(size));
    } catch {}
    resizeCanvas();
  };

  // Initialisation et redimensionnement net (haute résolution Retina iPad)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w <= 0 || h <= 0) return;

    // Récupérer le tracé sauvegardé
    let currentDrawing = savedCanvasDataRef.current;
    if (canvas.width > 0 && canvas.height > 0) {
      currentDrawing = canvas.toDataURL();
    }
    if (!currentDrawing) {
      try {
        currentDrawing = localStorage.getItem('teacher_scratchpad_drawing');
      } catch {}
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
      const timer = setTimeout(() => {
        resizeCanvas();
        if (history.length === 0) {
          const saved = savedCanvasDataRef.current;
          if (saved) {
            setHistory([saved]);
            setHistoryIndex(0);
          } else if (canvasRef.current) {
            const initial = canvasRef.current.toDataURL();
            setHistory([initial]);
            setHistoryIndex(0);
          }
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

    // Persistance permanente dans le localStorage
    try {
      localStorage.setItem('teacher_scratchpad_drawing', dataUrl);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

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
      try {
        localStorage.setItem('teacher_scratchpad_drawing', dataUrl);
      } catch {}
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
    savedCanvasDataRef.current = null;
    try {
      localStorage.removeItem('teacher_scratchpad_drawing');
    } catch {}
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
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {}

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
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.45)';
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
    <div
      className={`fixed z-40 bg-white rounded-2xl shadow-2xl border-2 border-slate-300/80 flex flex-col overflow-hidden transition-[box-shadow,border-color] duration-150 ${
        isFullscreen ? 'inset-0 w-full h-full rounded-none border-none z-50' : ''
      }`}
      style={
        isFullscreen
          ? { left: 0, top: 0, width: '100vw', height: '100vh' }
          : {
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: `${size.width}px`,
              height: `${size.height}px`,
            }
      }
    >
      {/* Barre d'en-tête déplaçable (Drag handle) */}
      <div
        onPointerDown={handleHeaderPointerDown}
        onPointerMove={handleHeaderPointerMove}
        onPointerUp={handleHeaderPointerUp}
        className={`flex items-center justify-between gap-2 px-3 py-2 border-b border-slate-200 bg-slate-100/90 select-none ${
          isFullscreen ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
        }`}
        style={{ touchAction: 'none' }}
        title={isFullscreen ? '' : 'Attrape et glisse pour déplacer la note'}
      >
        <div className="flex items-center gap-1.5 text-slate-700">
          {!isFullscreen && (
            <GripHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
          )}
          <span className="text-xs font-bold font-mono tracking-tight">
            Note de Brouillon
          </span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            (sauvegardé)
          </span>
        </div>

        {/* Contrôles de fenêtre (Plein écran & Fermer) */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setIsFullscreen(!isFullscreen);
              setTimeout(resizeCanvas, 60);
            }}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 transition-colors cursor-pointer"
            title={isFullscreen ? 'Fenêtre flottante' : 'Agrandir en plein écran'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Fermer la note (les calculs restent sauvegardés)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Barre d'outils de dessin */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 px-3 py-1.5 border-b border-slate-100 bg-slate-50/70 text-xs">
        <div className="flex items-center gap-1">
          {/* Stylet */}
          <button
            onClick={() => setTool('pen')}
            className={`p-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              tool === 'pen'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
            title="Stylet d'écriture"
          >
            <Pen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Plume</span>
          </button>

          {/* Surligneur */}
          <button
            onClick={() => setTool('highlighter')}
            className={`p-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              tool === 'highlighter'
                ? 'bg-amber-400 text-amber-950 shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
            title="Surligneur doux"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block border border-amber-600/30"></span>
            <span className="hidden sm:inline">Surligneur</span>
          </button>

          {/* Gomme */}
          <button
            onClick={() => setTool('eraser')}
            className={`p-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              tool === 'eraser'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
            title="Gomme"
          >
            <Eraser className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gomme</span>
          </button>

          {/* Palette (pour stylo) */}
          {tool === 'pen' && (
            <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-lg border border-slate-200 ml-0.5">
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
                  className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                    color === c.val ? 'scale-125 ring-2 ring-indigo-500 ring-offset-1' : 'hover:scale-110'
                  }`}
                  title={c.label}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Quadrillage */}
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer border ${
              showGrid
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Afficher/Masquer le quadrillage de cahier"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          {/* Undo */}
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-1.5 rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 disabled:opacity-30 transition-colors cursor-pointer"
            title="Annuler"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>

          {/* Redo */}
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 disabled:opacity-30 transition-colors cursor-pointer"
            title="Rétablir"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>

          {/* Effacer */}
          <button
            onClick={handleClearAll}
            className="p-1.5 rounded-lg bg-white text-rose-600 border border-slate-200 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Vider la page"
          >
            <Trash2 className="w-3.5 h-3.5" />
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

      {/* Poignée de redimensionnement en bas à droite (uniquement si pas plein écran) */}
      {!isFullscreen && (
        <div
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize flex items-end justify-end p-1 select-none z-10"
          title="Redimensionner la note"
          style={{ touchAction: 'none' }}
        >
          <div className="w-2.5 h-2.5 border-r-2 border-b-2 border-slate-400/80 rounded-br-xs" />
        </div>
      )}
    </div>
  );
}
