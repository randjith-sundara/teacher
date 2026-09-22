import React, { useState } from 'react';
import MathView from './MathView';
import {
  Check,
  X,
  HelpCircle,
  Eye,
  Send,
  MessageSquare,
  Sparkles,
  ChevronRight,
  RotateCcw
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
      <div className="text-center py-12 text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800">
        Aucun exercice disponible pour ce module pour le moment.
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
        [exId]: { correct: false, message: 'Erreur réseau lors de la vérification.' },
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Barre de navigation des exercices */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-thin">
        {exercises.map((ex, idx) => {
          const v = verifications[ex.id];
          const isDone = v && v.correct;
          const isFailed = v && !v.correct;
          return (
            <button
              key={ex.id}
              onClick={() => setActiveExIndex(idx)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all shrink-0 ${
                activeExIndex === idx
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>Ex {idx + 1}</span>
              {isDone && <Check className="w-3.5 h-3.5 text-emerald-300" />}
              {isFailed && <X className="w-3.5 h-3.5 text-rose-300" />}
            </button>
          );
        })}
      </div>

      {/* Carte d'exercice */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        {/* En-tête exercice */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/40">
              Exercice {activeExIndex + 1} / {exercises.length}
            </span>
            <h3 className="text-base font-semibold text-slate-100">{currentEx.title}</h3>
          </div>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              currentEx.difficulty === 1
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                : currentEx.difficulty === 2
                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                : 'bg-rose-950 text-rose-400 border border-rose-800'
            }`}
          >
            Niveau {currentEx.difficulty}
          </span>
        </div>

        {/* Énoncé avec KaTeX */}
        <div className="bg-slate-950/70 border border-slate-800/70 p-5 rounded-xl text-slate-200 text-base leading-relaxed">
          <MathView text={currentEx.question_latex} />
        </div>

        {/* Saisie mathématique */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Votre Réponse Mathématique :
          </label>

          {/* Raccourcis symboles */}
          <div className="flex flex-wrap gap-1.5 pb-1">
            {['sqrt(', '^2', '^', 'pi', 'e', '/', '*', '+', '-', '(', ')', ', '].map((sym) => (
              <button
                key={sym}
                onClick={() => appendSymbol(sym)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded border border-slate-700/60 transition-colors"
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
                  : 'Ex: 2x + 1, sqrt(41)/2, 6*x*cos(3x^2+1)...'
              }
              className="flex-1 bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:outline-none rounded-lg px-4 py-2.5 font-mono text-sm text-slate-100 placeholder-slate-600 transition-colors"
            />
            <button
              onClick={handleVerify}
              disabled={loadingVerify || !currentAnswer.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium px-5 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-colors shrink-0 shadow-sm"
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

        {/* Rétroaction SymPy */}
        {currentVerif && (
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
              currentVerif.correct
                ? 'bg-emerald-950/30 border-emerald-800/80 text-emerald-200'
                : 'bg-rose-950/30 border-rose-800/80 text-rose-200'
            }`}
          >
            {currentVerif.correct ? (
              <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <X className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="text-sm">
              <span className="font-bold block">
                {currentVerif.correct ? 'Excellent ! Réponse exacte.' : 'Pas tout à fait correct.'}
              </span>
              <span className="text-xs opacity-90">
                {currentVerif.details || currentVerif.message}
              </span>
            </div>
          </div>
        )}

        {/* Actions d'aide et indices */}
        <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {currentEx.hints && currentEx.hints.length > 0 && (
              <button
                onClick={handleRevealNextHint}
                disabled={hintsRevealedCount >= currentEx.hints.length}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 rounded-lg transition-colors border border-slate-700/60"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {hintsRevealedCount === 0
                    ? 'Débloquer un indice'
                    : `Indice ${hintsRevealedCount} / ${currentEx.hints.length}`}
                </span>
              </button>
            )}

            <button
              onClick={handleToggleSolution}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700/60"
            >
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>{isSolutionRevealed ? 'Masquer la solution' : 'Solution rédigée'}</span>
            </button>
          </div>

          <button
            onClick={() =>
              onOpenTutorWithContext(
                `Exercice : "${currentEx.title}". Énoncé : ${currentEx.question_latex}. Réponse actuelle : "${currentAnswer}".`
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 rounded-lg border border-indigo-800/60 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Demander au Professeur IA</span>
          </button>
        </div>

        {/* Affichage des indices débloqués */}
        {hintsRevealedCount > 0 && (
          <div className="space-y-2 pt-2">
            {currentEx.hints.slice(0, hintsRevealedCount).map((hint, hIdx) => (
              <div
                key={hIdx}
                className="bg-amber-950/20 border border-amber-800/40 p-3 rounded-lg text-xs text-amber-200/90 flex items-start gap-2"
              >
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300 mr-2">Indice {hIdx + 1} :</span>
                  <MathView text={hint} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Affichage de la solution rédigée */}
        {isSolutionRevealed && (
          <div className="bg-sky-950/20 border border-sky-800/40 p-4 rounded-xl text-xs space-y-2">
            <span className="font-bold text-sky-300 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-sky-400" />
              <span>Démonstration & Solution complète :</span>
            </span>
            <div className="text-slate-200 text-sm font-serif pt-1">
              <MathView math={currentEx.full_solution_latex} display={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
