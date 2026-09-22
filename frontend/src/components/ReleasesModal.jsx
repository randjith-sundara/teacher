import React, { useState, useEffect } from 'react';
import { X, Tag, Calendar } from 'lucide-react';

export default function ReleasesModal({ isOpen, onClose }) {
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/releases')
        .then((res) => res.json())
        .then((data) => setReleases(data))
        .catch((err) => console.error('Erreur chargement releases:', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div>
            <h3 className="text-sm font-bold text-slate-100">Notes de Version & Changelog</h3>
            <span className="text-xs text-slate-400">Historique des améliorations de la plateforme Teacher</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {releases.map((rel, idx) => (
            <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  v{rel.version} — {rel.tag}
                </span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {rel.date}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-200">{rel.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{rel.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
