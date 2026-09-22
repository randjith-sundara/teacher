import React from 'react';
import MathView from './MathView';
import InteractiveVisualizer from './InteractiveVisualizer';
import { BookOpen, AlertTriangle, CheckCircle2, Bookmark, Lightbulb } from 'lucide-react';

export default function TheoryTab({ currentModule }) {
  if (!currentModule || !currentModule.theory) {
    return <div className="text-slate-500 text-sm">Sélectionnez un chapitre pour afficher le cours.</div>;
  }

  const { theory, viz_type } = currentModule;

  return (
    <div className="space-y-6">
      {/* Synthèse du chapitre */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Notion Clé</span>
        </div>
        <div className="text-slate-800 text-base leading-relaxed font-normal">
          <MathView text={theory.summary} />
        </div>
      </div>

      {/* Laboratoire interactif */}
      {viz_type && <InteractiveVisualizer type={viz_type} />}

      {/* Formules indispensables */}
      {theory.key_formulas && theory.key_formulas.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Bookmark className="w-4 h-4 text-emerald-600" />
            <span>Formules et Propriétés à Retenir</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {theory.key_formulas.map((form, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-colors"
              >
                <span className="text-xs text-slate-500 font-semibold mb-2">{form.name}</span>
                <div className="py-2 text-center text-slate-900 font-serif">
                  <MathView math={form.latex} display={true} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sections détaillées de cours */}
      {theory.sections && theory.sections.length > 0 && (
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>Explications Pas-à-Pas</span>
          </div>

          {theory.sections.map((sec, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
              <h4 className="text-sm font-bold text-slate-900 mb-2">{sec.title}</h4>
              <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                <MathView text={sec.content} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Méthode opératoire */}
      {theory.method && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-bold text-emerald-950 block mb-1">Méthode de résolution</span>
            <span className="text-emerald-900 leading-relaxed text-xs">
              <MathView text={theory.method} />
            </span>
          </div>
        </div>
      )}

      {/* Piège classique */}
      {theory.pitfall && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-bold text-amber-950 block mb-1">Piège fréquent à éviter</span>
            <span className="text-amber-900 leading-relaxed text-xs">
              <MathView text={theory.pitfall} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
