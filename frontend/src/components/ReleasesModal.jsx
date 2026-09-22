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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Notes de Version & Nouveautés</h3>
            <span className="text-xs text-slate-500">Historique des améliorations de Teacher</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {releases.map((rel, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-indigo-700 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-indigo-600" />
                  v{rel.version} — {rel.tag}
                </span>
                <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                  <Calendar className="w-3.5 h-3.5" />
                  {rel.date}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{rel.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{rel.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
