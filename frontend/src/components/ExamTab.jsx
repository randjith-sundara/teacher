import React, { useState, useEffect } from 'react';
import MathView from './MathView';
import {
  GraduationCap,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Send,
  ChevronRight,
  PenLine
} from 'lucide-react';

export default function ExamTab({ courseId, courseTitle, onOpenScratchpad }) {
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchExam() {
      setLoading(true);
      try {
        const res = await fetch(`/api/exam/${courseId}`);
        if (res.ok) {
          const data = await res.json();
          setExamData(data);
          setTimeLeft(data.duration_minutes * 60);
        }
      } catch (e) {
        console.error('Erreur chargement examen:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchExam();
    setExamStarted(false);
    setResult(null);
    setAnswers({});
  }, [courseId]);

  useEffect(() => {
    let timer;
    if (examStarted && !result && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, result, timeLeft]);

  const handleSubmitExam = async () => {
    if (submitting || !examData) return;
    setSubmitting(true);

    const elapsed = examData.duration_minutes * 60 - timeLeft;
    try {
      const res = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_id: courseId,
          duration_seconds: elapsed,
          answers: answers,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      alert('Erreur lors de la validation de votre examen.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <div className="text-center py-12 text-slate-500">Chargement de l'épreuve...</div>;
  }

  if (!examData) {
    return <div className="text-center py-12 text-slate-500">Examen non disponible.</div>;
  }

  // Écran avant démarrage
  if (!examStarted && !result) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 text-center space-y-6 shadow-xs max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
          <GraduationCap className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">{examData.title}</h2>
          <p className="text-slate-500 text-sm">
            Validation des acquis préalables pour l'entrée à l'université
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-left">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
            <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">Durée</span>
            <span className="text-base font-bold text-slate-900 flex items-center gap-1.5 mt-1">
              <Clock className="w-4 h-4 text-indigo-600" />
              {examData.duration_minutes} min
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
            <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">Points</span>
            <span className="text-base font-bold text-slate-900 flex items-center gap-1.5 mt-1">
              <Award className="w-4 h-4 text-amber-600" />
              {examData.total_points} pts
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
            <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">Passage</span>
            <span className="text-base font-bold text-slate-900 flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {examData.passing_grade}%
            </span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl text-left text-xs text-slate-600 space-y-1.5">
          <div className="font-bold text-slate-800">Consignes :</div>
          <div>• Réponses vérifiées par calcul symbolique exact (fractions ou expressions simplifiées).</div>
          <div>• Aucun indice disponible pendant l'épreuve pour tester tes vrais réflexes.</div>
          <div>• Bilan personnalisé complet avec corrections détaillées dès la fin.</div>
        </div>

        <button
          onClick={() => setExamStarted(true)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          <span>Commencer l'épreuve</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Écran de résultat
  if (result) {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4 shadow-xs">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border ${
              result.passed
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-rose-50 text-rose-800 border-rose-300'
            }`}
          >
            {result.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{result.status_label}</span>
          </div>

          <div>
            <span className="text-5xl font-black text-slate-900">{result.percentage}%</span>
            <span className="text-slate-500 text-xs block mt-1 font-semibold">
              Note : {result.score} sur {result.max_score} points
            </span>
          </div>

          <p className="text-slate-700 text-sm max-w-xl mx-auto leading-relaxed">
            {result.diagnostic}
          </p>

          <button
            onClick={() => {
              setResult(null);
              setExamStarted(false);
              setTimeLeft(examData.duration_minutes * 60);
              setAnswers({});
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retenter le test</span>
          </button>
        </div>

        {/* Détail questions */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Revue de tes réponses :
          </h3>

          {result.breakdown.map((q, idx) => (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border space-y-3 bg-white ${
                q.is_correct ? 'border-emerald-300' : 'border-rose-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Question {idx + 1} : {q.title}</span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    q.is_correct ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {q.points} / {q.max_points} pts
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl text-sm text-slate-900 font-serif border border-slate-200">
                <MathView text={q.question_latex} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block mb-1">Ta réponse :</span>
                  <span className={q.is_correct ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                    {q.user_answer || '(Vide)'}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block mb-1">Solution attendue :</span>
                  <span className="text-slate-900 font-bold">{q.expected_solution}</span>
                </div>
              </div>

              {q.explanation && (
                <div className="text-xs text-slate-700 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
                  <span className="font-bold text-indigo-900 mr-2">Explication :</span>
                  <MathView text={q.explanation} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Épreuve en cours
  return (
    <div className="space-y-6">
      {/* Chronomètre sticky */}
      <div className="sticky top-4 z-20 bg-white/95 backdrop-blur border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
        <div>
          <span className="text-xs text-slate-500 block">{examData.title}</span>
          <span className="text-xs font-bold text-slate-900">
            {Object.keys(answers).filter((k) => answers[k]?.trim()).length} sur {examData.questions.length} questions répondues
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenScratchpad && (
            <button
              onClick={onOpenScratchpad}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 font-medium text-xs shadow-xs transition-colors cursor-pointer"
              title="Ouvrir le brouillon manuscrit"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>Brouillon</span>
            </button>
          )}

          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-sm font-bold border ${
              timeLeft < 300
                ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                : 'bg-slate-100 text-slate-800 border-slate-200'
            }`}
          >
            <Clock className="w-4 h-4 text-indigo-600" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-5">
        {examData.questions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">
                Question {idx + 1} : {q.title}
              </span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {q.points} pts
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 text-sm font-serif">
              <MathView text={q.question_latex} />
            </div>

            <div>
              <input
                type="text"
                value={answers[q.id] || ''}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                placeholder={
                  q.input_type === 'vector'
                    ? 'Format vecteur : (x, y, z) ou [x, y]'
                    : 'Ta réponse exacte (ex: 7/12, 4, 3...)'
                }
                className="w-full bg-white border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none rounded-xl px-4 py-2.5 font-mono text-sm text-slate-900 placeholder-slate-400"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Soumission */}
      <div className="pt-2 pb-6">
        <button
          onClick={handleSubmitExam}
          disabled={submitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold py-3.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          {submitting ? (
            <span>Correction en cours...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Terminer et Voir mes Résultats</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
