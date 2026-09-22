import React, { useState } from 'react';
import MathView from './MathView';
import {
  Check,
  X,
  HelpCircle,
  Eye,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function ExerciseTab({ courseId, moduleId, exercises = [], onOpenTutorWithContext }) {
  const [activeExIndex, setActiveExIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [verifications, setVerifications] = useState({});
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});

  if (!exercises || exercises.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-xs">
        Aucun exercice disponible pour ce chapitre.
      </div>
    );
  }

  const currentEx = exercises[activeExIndex];
  const exId = currentEx.id;
  const currentAnswer = answers[exId] || '';
  const currentVerif = verifications[exId];
  const hintsRevealedCount = revealedHints[exId] || 0;
  const isSolutionRevealed = !!revealedSolutions[exId];

  const handleVerify = async () => {
    if (!currentAnswer.trim() || loadingVerify) return;
    setLoadingVerify(true);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_input: currentAnswer,
          expected_solution: currentEx.expected_solution,
          course_id: courseId,
          module_id: moduleId,
          exercise_id: exId,
          hints_used: hintsRevealedCount,
        }),
      });
      const data = await res.json();
      setVerifications((prev) => ({
        ...prev,
        [exId]: data,
      }));
    } catch (err) {
      setVerifications((prev) => ({
        ...prev,
        [exId]: { correct: false, message: 'Erreur de connexion avec le moteur de validation.' },
      }));
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleRevealNextHint = () => {
    if (hintsRevealedCount < (currentEx.hints?.length || 0)) {
      setRevealedHints((prev) => ({
        ...prev,
        [exId]: hintsRevealedCount + 1,
      }));
    }
  };

  const handleToggleSolution = () => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [exId]: !prev[exId],
    }));
  };

  const appendSymbol = (sym) => {
    setAnswers((prev) => ({
      ...prev,
      [exId]: (prev[exId] || '') + sym,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Barre de sélection d'exercices */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {exercises.map((ex, idx) => {
          const v = verifications[ex.id];
          const isDone = v && v.correct;
          const isFailed = v && !v.correct;
          return (
            <button
              key={ex.id}
              onClick={() => setActiveExIndex(idx)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeExIndex === idx
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>Exercice {idx + 1}</span>
              {isDone && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              {isFailed && <X className="w-3.5 h-3.5 text-rose-400" />}
            </button>
          );
        })}
      </div>

      {/* Carte de l'exercice actif */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {activeExIndex + 1} sur {exercises.length}
            </span>
            <h2 className="text-base font-bold text-slate-900">{currentEx.title}</h2>
          </div>

          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
              currentEx.difficulty === 1
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : currentEx.difficulty === 2
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            Niveau {currentEx.difficulty}
          </span>
        </div>

        {/* Énoncé avec KaTeX */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-900 text-base leading-relaxed font-serif">
          <MathView text={currentEx.question_latex} />
        </div>

        {/* Saisie de réponse */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Ta réponse :
          </label>

          {/* Raccourcis symboles */}
          <div className="flex flex-wrap gap-1.5 pb-1">
            {['sqrt(', '^2', '^', 'pi', 'e', '/', '*', '+', '-', '(', ')', ', '].map((sym) => (
              <button
                key={sym}
                onClick={() => appendSymbol(sym)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs rounded-lg border border-slate-200 transition-colors cursor-pointer"
              >
                {sym}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={currentAnswer}
              onChange={(e) => setAnswers({ ...answers, [exId]: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              placeholder={
                currentEx.input_type === 'vector'
                  ? 'Ex: (3, -2, 5) ou [-1, 2]'
                  : 'Tape ta formule ou fraction (ex: 11/12, x^2 + 10x + 25...)'
              }
              className="flex-1 bg-white border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none rounded-xl px-4 py-2.5 font-mono text-sm text-slate-900 placeholder-slate-400 transition-all"
            />

            <button
              onClick={handleVerify}
              disabled={loadingVerify || !currentAnswer.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-1.5 transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              {loadingVerify ? (
                <span>Vérification...</span>
              ) : (
                <>
                  <span>Valider</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Résultat SymPy */}
        {currentVerif && (
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
              currentVerif.correct
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            {currentVerif.correct ? (
              <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <X className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div className="text-sm">
              <span className="font-bold block">
                {currentVerif.correct ? 'Bravo ! Réponse exacte.' : 'Ce n\'est pas tout à fait ça.'}
              </span>
              <span className="text-xs text-slate-700">
                {currentVerif.details || currentVerif.message}
              </span>
            </div>
          </div>
        )}

        {/* Boutons d'aide */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {currentEx.hints && currentEx.hints.length > 0 && (
              <button
                onClick={handleRevealNextHint}
                disabled={hintsRevealedCount >= currentEx.hints.length}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-lg transition-colors border border-slate-200 cursor-pointer font-medium"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  {hintsRevealedCount === 0
                    ? 'Besoin d\'un indice ?'
                    : `Indice ${hintsRevealedCount} sur ${currentEx.hints.length}`}
                </span>
              </button>
            )}

            <button
              onClick={handleToggleSolution}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-200 cursor-pointer font-medium"
            >
              <Eye className="w-3.5 h-3.5 text-sky-600" />
              <span>{isSolutionRevealed ? 'Masquer la solution' : 'Voir la solution rédigée'}</span>
            </button>
          </div>

          <button
            onClick={() =>
              onOpenTutorWithContext(
                `Exercice : "${currentEx.title}". Énoncé : ${currentEx.question_latex}. Réponse saisie : "${currentAnswer}".`
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg border border-indigo-200 transition-colors font-semibold cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Demander au Professeur IA</span>
          </button>
        </div>

        {/* Indices débloqués */}
        {hintsRevealedCount > 0 && (
          <div className="space-y-2 pt-2">
            {currentEx.hints.slice(0, hintsRevealedCount).map((hint, hIdx) => (
              <div
                key={hIdx}
                className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-950 flex items-start gap-2.5"
              >
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900 mr-2">Indice {hIdx + 1} :</span>
                  <MathView text={hint} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Solution complète */}
        {isSolutionRevealed && (
          <div className="bg-sky-50 border border-sky-200 p-4 rounded-xl text-xs space-y-2">
            <span className="font-bold text-sky-950 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-sky-600" />
              <span>Explication et Démonstration complète :</span>
            </span>
            <div className="text-slate-900 text-sm font-serif pt-1">
              <MathView math={currentEx.full_solution_latex} display={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
