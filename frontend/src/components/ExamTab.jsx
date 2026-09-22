import React, { useState, useEffect } from 'react';
import MathView from './MathView';
import {
  GraduationCap,
  Clock,
  Award,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Send,
  ChevronRight
} from 'lucide-react';

export default function ExamTab({ courseId, courseTitle }) {
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Charger l'examen
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

  // Timer de l'examen
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
      alert('Erreur lors de la soumission de votre examen.');
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
    return <div className="text-center py-12 text-slate-400">Chargement de l'examen...</div>;
  }

  if (!examData) {
    return <div className="text-center py-12 text-slate-400">Examen non disponible.</div>;
  }

  // Écran d'accueil avant démarrage
  if (!examStarted && !result) {
    return (
      <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-xl">
        <div className="w-16 h-16 bg-indigo-950/80 border border-indigo-700/60 rounded-2xl flex items-center justify-center mx-auto text-indigo-400">
          <GraduationCap className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{examData.title}</h2>
          <p className="text-slate-400 text-sm">
            Validation des acquis préalables pour l'entrée à l'université
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-left">
          <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl">
            <span className="text-xs text-slate-400 block">Durée limite</span>
            <span className="text-base font-bold text-slate-200 flex items-center gap-1.5 mt-1">
              <Clock className="w-4 h-4 text-sky-400" />
              {examData.duration_minutes} min
            </span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl">
            <span className="text-xs text-slate-400 block">Total points</span>
            <span className="text-base font-bold text-slate-200 flex items-center gap-1.5 mt-1">
              <Award className="w-4 h-4 text-amber-400" />
              {examData.total_points} pts
            </span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl">
            <span className="text-xs text-slate-400 block">Seuil de passage</span>
            <span className="text-base font-bold text-slate-200 flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {examData.passing_grade}%
            </span>
          </div>
        </div>

        <div className="bg-slate-950/40 border border-slate-800/50 p-4 rounded-xl text-left text-xs text-slate-300 space-y-1.5">
          <div className="font-semibold text-slate-200">Conditions de passation :</div>
          <div>• Réponses évaluées par calcul symbolique exact (formes factorisées ou développées acceptées).</div>
          <div>• Aucun indice disponible pendant l'épreuve.</div>
          <div>• Bilan analytique et diagnostic immédiat dès la soumission.</div>
        </div>

        <button
          onClick={() => setExamStarted(true)}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-base"
        >
          <span>Commencer l'Épreuve</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // Écran de résultat après soumission
  if (result) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 shadow-xl">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border ${
              result.passed
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700'
                : 'bg-rose-950/60 text-rose-300 border-rose-700'
            }`}
          >
            {result.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400" />
            )}
            <span>{result.status_label}</span>
          </div>

          <div className="flex items-center justify-center gap-4 py-2">
            <div>
              <span className="text-5xl font-extrabold text-white">{result.percentage}%</span>
              <span className="text-slate-400 text-sm block mt-1">
                Note : {result.score} / {result.max_score} points
              </span>
            </div>
          </div>

          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            {result.diagnostic}
          </p>

          <button
            onClick={() => {
              setResult(null);
              setExamStarted(false);
              setTimeLeft(examData.duration_minutes * 60);
              setAnswers({});
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retenter l'épreuve</span>
          </button>
        </div>

        {/* Détail question par question */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-200">Revue détaillée des questions :</h3>
          {result.breakdown.map((q, idx) => (
            <div
              key={q.id}
              className={`p-5 rounded-xl border space-y-3 ${
                q.is_correct
                  ? 'bg-slate-900/80 border-emerald-900/60'
                  : 'bg-slate-900/80 border-rose-900/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">Question {idx + 1}</span>
                  <span className="text-sm font-semibold text-slate-200">{q.title}</span>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded ${
                    q.is_correct ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                  }`}
                >
                  {q.points} / {q.max_points} pts
                </span>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-lg text-sm text-slate-200 font-serif">
                <MathView text={q.question_latex} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400 block mb-1">Votre réponse :</span>
                  <span className={q.is_correct ? 'text-emerald-300 font-bold' : 'text-rose-300'}>
                    {q.user_answer || '(Aucune réponse)'}
                  </span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                  <span className="text-slate-400 block mb-1">Solution attendue :</span>
                  <span className="text-slate-200 font-bold">{q.expected_solution}</span>
                </div>
              </div>

              {q.explanation && (
                <div className="text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
                  <span className="font-semibold text-indigo-400 mr-2">Explication :</span>
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
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Barre d'état chronomètre */}
      <div className="sticky top-4 z-20 bg-slate-900/95 backdrop-blur border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-xl">
        <div>
          <span className="text-xs text-slate-400 block">{examData.title}</span>
          <span className="text-sm font-semibold text-slate-100">
            {Object.keys(answers).filter((k) => answers[k]?.trim()).length} / {examData.questions.length} questions répondues
          </span>
        </div>

        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-base font-bold border ${
            timeLeft < 300
              ? 'bg-rose-950/80 text-rose-300 border-rose-700 animate-pulse'
              : 'bg-slate-800 text-slate-200 border-slate-700'
          }`}
        >
          <Clock className="w-4 h-4 text-sky-400" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Liste des questions */}
      <div className="space-y-6">
        {examData.questions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                  Q{idx + 1}
                </span>
                <span className="text-sm font-semibold text-slate-200">{q.title}</span>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                {q.points} points
              </span>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/70 p-4 rounded-xl text-slate-200 text-sm font-serif">
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
                    : 'Réponse exacte (ex: 5, -3/4, exp(1)-1...)'
                }
                className="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:outline-none rounded-lg px-4 py-2.5 font-mono text-sm text-slate-100 placeholder-slate-600"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bouton de soumission finale */}
      <div className="pt-4 pb-8">
        <button
          onClick={handleSubmitExam}
          disabled={submitting}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-base"
        >
          {submitting ? (
            <span>Correction par le moteur formel en cours...</span>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Terminer et Soumettre l'Épreuve</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
