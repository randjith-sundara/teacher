import React from 'react';
import MathView from './MathView';
import InteractiveVisualizer from './InteractiveVisualizer';
import { BookOpen, AlertTriangle, CheckCircle2, Bookmark, Lightbulb } from 'lucide-react';

export default function TheoryTab({ currentModule }) {
  if (!currentModule || !currentModule.theory) {
    return <div className="text-slate-400 text-sm">Sélectionnez un module pour afficher la théorie.</div>;
  }

  const { theory, viz_type } = currentModule;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Résumé exécutif du module */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Synthèse Conceptuelle</span>
        </div>
        <p className="text-slate-200 text-base leading-relaxed">
          <MathView text={theory.summary} />
        </p>
      </div>

      {/* Laboratoire interactif */}
      {viz_type && <InteractiveVisualizer type={viz_type} />}

      {/* Formules clés incontournables */}
      {theory.key_formulas && theory.key_formulas.length > 0 && (
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3">
            <Bookmark className="w-4 h-4 text-emerald-400" />
            <span>Formules et Théorèmes Essentiels</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {theory.key_formulas.map((form, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <span className="text-xs text-slate-400 font-medium mb-2">{form.name}</span>
                <div className="py-2 text-center text-slate-100 font-serif">
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
          <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Développement et Démonstrations</span>
          </h3>
          {theory.sections.map((sec, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5">
              <h4 className="text-sm font-bold text-slate-100 mb-2">{sec.title}</h4>
              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                <MathView text={sec.content} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Méthode pas-à-pas */}
      {theory.method && (
        <div className="bg-emerald-950/20 border border-emerald-800/50 rounded-xl p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-semibold text-emerald-300 block mb-1">Méthode opératoire</span>
            <span className="text-emerald-100/90 leading-relaxed">
              <MathView text={theory.method} />
            </span>
          </div>
        </div>
      )}

      {/* Piège classique à éviter */}
      {theory.pitfall && (
        <div className="bg-amber-950/20 border border-amber-800/50 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-semibold text-amber-300 block mb-1">Piège classique à l'examen</span>
            <span className="text-amber-100/90 leading-relaxed">
              <MathView text={theory.pitfall} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
