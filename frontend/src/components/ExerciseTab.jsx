import React, { useState, useEffect, useRef } from 'react';
import MathView from './MathView';
import {
  Check,
  X,
  HelpCircle,
  Eye,
  ChevronRight,
  Sparkles,
  PenLine,
  CheckCircle2,
  Award
} from 'lucide-react';

export default function ExerciseTab({
  courseId,
  courseTitle = '',
  moduleId,
  exercises = [],
  courseProgress = {},
  nextModule,
  nextCourse,
  onGoToNextModule,
  onGoToNextCourse,
  onGoToExam,
  onExerciseCompleted,
  onOpenTutorWithContext,
  onOpenScratchpad
}) {
  const [activeExIndex, setActiveExIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [verifications, setVerifications] = useState({});
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [revealedHints, setRevealedHints] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const inputRef = useRef(null);

  // Réinitialiser l'index à 0 lors du changement de chapitre
  useEffect(() => {
    setActiveExIndex(0);
  }, [moduleId]);

  // Pré-remplir automatiquement les réponses depuis le cache / BDD si l'utilisateur ne l'a pas déjà fait
  useEffect(() => {
    setAnswers((prev) => {
      let changed = false;
      const next = { ...prev };
      exercises.forEach((ex) => {
        if (next[ex.id] === undefined && courseProgress[ex.id]?.user_answer !== undefined) {
          next[ex.id] = courseProgress[ex.id].user_answer;
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [exercises, courseProgress]);

  if (!exercises || exercises.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-xs">
        Aucun exercice disponible pour ce chapitre.
      </div>
    );
  }

  const currentEx = exercises[activeExIndex];
  const exId = currentEx.id;
  const currentAnswer = answers[exId] !== undefined ? answers[exId] : '';
  const currentVerif = verifications[exId];
  const hintsRevealedCount = revealedHints[exId] || 0;
  const isSolutionRevealed = !!revealedSolutions[exId];

  // Vérification effective : soit la vérification en cours, soit l'état validé en base/cache
  const effectiveVerif =
    currentVerif ||
    (courseProgress[exId]?.is_correct
      ? { correct: true, message: 'Exercice validé avec succès.' }
      : null);

  const hasNextEx = activeExIndex < exercises.length - 1;
  const isModuleFullyCompleted =
    exercises.length > 0 &&
    exercises.every(
      (ex) => verifications[ex.id]?.correct || courseProgress[ex.id]?.is_correct
    );

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

      // Si l'exercice est réussi, sauvegarder dans la base et le cache
      if (data.correct && onExerciseCompleted) {
        onExerciseCompleted(exId, currentAnswer);
      }
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

  const insertSymbol = (sym, e) => {
    // Empêche le bouton de voler le focus de l'input et de fermer le clavier virtuel sur iPad
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const input = inputRef.current;
    const currentVal = answers[exId] || '';

    let start = currentVal.length;
    let end = currentVal.length;

    if (input) {
      start = input.selectionStart ?? currentVal.length;
      end = input.selectionEnd ?? currentVal.length;
    }

    const nextVal = currentVal.slice(0, start) + sym + currentVal.slice(end);
    setAnswers((prev) => ({
      ...prev,
      [exId]: nextVal,
    }));

    if (input) {
      // Maintient le focus et le curseur immédiatement après le symbole inséré
      requestAnimationFrame(() => {
        input.focus();
        input.setSelectionRange(start + sym.length, start + sym.length);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Barre de sélection d'exercices */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {exercises.map((ex, idx) => {
          const v = verifications[ex.id];
          const isDone = (v && v.correct) || (courseProgress[ex.id]?.is_correct);
          const isFailed = v && !v.correct;
          return (
            <button
              key={ex.id}
              onClick={() => setActiveExIndex(idx)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeExIndex === idx
                  ? 'bg-slate-900 text-white shadow-xs'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100/70'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>Exercice {idx + 1}</span>
              {isDone && (
                <Check
                  className={`w-3.5 h-3.5 ${
                    activeExIndex === idx ? 'text-emerald-400' : 'text-emerald-600'
                  }`}
                />
              )}
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
            <span className="text-xs font-mono text-slate-400">
              {activeExIndex + 1}/{exercises.length}
            </span>
            <h2 className="text-base font-bold text-slate-900">{currentEx.title}</h2>
          </div>

          {onOpenScratchpad && (
            <button
              onClick={onOpenScratchpad}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Ouvrir le brouillon pour écrire à la main"
            >
              <PenLine className="w-3.5 h-3.5 text-indigo-600" />
              <span>Brouillon</span>
            </button>
          )}
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

          {/* Raccourcis symboles tactiles pour iPad (garde le clavier ouvert) */}
          <div className="flex flex-wrap gap-2 pb-1">
            {['sqrt(', '^2', '^', 'pi', 'e', '/', '*', '+', '-', '(', ')', ', '].map((sym) => (
              <button
                key={sym}
                type="button"
                onMouseDown={(e) => insertSymbol(sym, e)}
                onTouchStart={(e) => insertSymbol(sym, e)}
                onClick={(e) => {
                  e.preventDefault();
                  insertSymbol(sym, e);
                }}
                className="min-h-[40px] px-3.5 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-mono text-sm font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer shadow-2xs select-none"
              >
                {sym}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              ref={inputRef}
              type="text"
              value={currentAnswer}
              onChange={(e) => setAnswers({ ...answers, [exId]: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              placeholder={
                currentEx.input_type === 'vector'
                  ? 'Ex: (3, -2, 5) ou [-1, 2]'
                  : 'Tape ta formule ou fraction (ex: 11/12, x^2 + 10x + 25...)'
              }
              className="flex-1 bg-white border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none rounded-xl px-4 py-3 font-mono text-base text-slate-900 placeholder-slate-400 transition-all shadow-2xs"
            />

            <button
              onClick={handleVerify}
              disabled={loadingVerify || !currentAnswer.trim()}
              className="bg-slate-900 hover:bg-slate-800 active:scale-98 disabled:opacity-40 text-white font-bold px-7 py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer shadow-xs min-h-[44px]"
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

        {/* Résultat SymPy ou état validé */}
        {effectiveVerif && (
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
              effectiveVerif.correct
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {effectiveVerif.correct ? (
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <X className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="text-sm">
                <span className="font-bold block">
                  {effectiveVerif.correct ? 'Bravo ! Réponse exacte.' : 'Ce n\'est pas tout à fait ça.'}
                </span>
                <span className="text-xs text-slate-700">
                  {effectiveVerif.details || effectiveVerif.message}
                </span>
              </div>
            </div>

            {effectiveVerif.correct && hasNextEx && (
              <button
                onClick={() => setActiveExIndex((prev) => prev + 1)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <span>Exercice suivant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
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

      {/* Proposition de transition après complétion du chapitre ou du cours */}
      {isModuleFullyCompleted && (
        <div className="bg-white border-2 border-emerald-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">
                {nextModule
                  ? 'Chapitre validé avec succès !'
                  : 'Félicitations ! Tous les exercices de ce cours sont terminés !'}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {nextModule
                  ? `Passe au chapitre suivant : « ${nextModule.title} »`
                  : 'Valide tes compétences à l\'examen blanc ou continue directement avec le cours universitaire suivant.'}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {nextModule ? (
              <button
                onClick={onGoToNextModule}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <span>Chapitre suivant ({nextModule.title})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                {onGoToExam && (
                  <button
                    onClick={onGoToExam}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Passer l'Examen Blanc</span>
                  </button>
                )}

                {nextCourse && onGoToNextCourse && (
                  <button
                    onClick={onGoToNextCourse}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <span>Cours suivant : {nextCourse.code}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
