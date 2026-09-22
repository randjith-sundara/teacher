import React, { useState, useEffect } from 'react';
import TheoryTab from './TheoryTab';
import ExerciseTab from './ExerciseTab';
import ExamTab from './ExamTab';
import Scratchpad from './Scratchpad';
import {
  ArrowLeft,
  BookOpen,
  Dumbbell,
  Award,
  MessageSquare,
  ChevronRight,
  PenLine
} from 'lucide-react';

export default function CourseView({
  course,
  onBackToHome,
  onOpenTutorWithContext,
}) {
  const [activeTab, setActiveTab] = useState('theory'); // 'theory' | 'exercises' | 'exam'
  const [activeModuleId, setActiveModuleId] = useState(course.modules[0]?.id);
  const [scratchpadOpen, setScratchpadOpen] = useState(false);

  // État de progression des exercices (initialisé depuis le cache local)
  const [courseProgress, setCourseProgress] = useState(() => {
    try {
      const cached = localStorage.getItem(`teacher_progress_${course.id}`);
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  });

  // Synchronisation en arrière-plan avec la base de données SQLite
  useEffect(() => {
    let isMounted = true;
    async function fetchDbProgress() {
      try {
        const res = await fetch(`/api/courses/${course.id}/progress`);
        if (res.ok) {
          const dbProgress = await res.json();
          if (isMounted) {
            setCourseProgress((prev) => {
              const merged = { ...prev, ...dbProgress };
              try {
                localStorage.setItem(`teacher_progress_${course.id}`, JSON.stringify(merged));
              } catch (e) {
                console.warn('Erreur sauvegarde localStorage:', e);
              }
              return merged;
            });
          }
        }
      } catch (err) {
        console.error('Erreur chargement progression SQLite:', err);
      }
    }
    fetchDbProgress();
    return () => {
      isMounted = false;
    };
  }, [course.id]);

  const handleExerciseCompleted = (exId, userAnswer) => {
    setCourseProgress((prev) => {
      const updated = {
        ...prev,
        [exId]: {
          is_correct: true,
          user_answer: userAnswer,
          completed_at: new Date().toISOString(),
        },
      };
      try {
        localStorage.setItem(`teacher_progress_${course.id}`, JSON.stringify(updated));
      } catch (e) {
        console.warn('Erreur sauvegarde localStorage:', e);
      }
      return updated;
    });
  };

  const activeModule = course.modules.find((m) => m.id === activeModuleId) || course.modules[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Barre supérieure */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tous les cours</span>
          </button>

          <div>
            <span className="text-xs font-mono text-slate-500 mr-2">{course.code}</span>
            <h1 className="text-base font-bold text-slate-900 inline">{course.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setScratchpadOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-semibold transition-colors cursor-pointer"
            title="Ouvrir le brouillon pour calculs manuscrits"
          >
            <PenLine className="w-3.5 h-3.5 text-indigo-600" />
            <span>Brouillon</span>
          </button>

          <button
            onClick={() =>
              onOpenTutorWithContext(
                `Cours : ${course.title} (${course.code}). Module : ${activeModule?.title}.`
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Aide Professeur</span>
          </button>
        </div>
      </div>

      {/* Modes : Comprendre, Pratiquer, Valider */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('theory')}
          className={`pb-3 text-sm font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === 'theory'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Comprendre</span>
        </button>

        <button
          onClick={() => setActiveTab('exercises')}
          className={`pb-3 text-sm font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === 'exercises'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>2. Pratiquer</span>
        </button>

        <button
          onClick={() => setActiveTab('exam')}
          className={`pb-3 text-sm font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
            activeTab === 'exam'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>3. Examen Blanc</span>
        </button>
      </div>

      {/* Sélection du chapitre */}
      {activeTab !== 'exam' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {course.modules.map((m, idx) => {
            const isSelected = m.id === activeModuleId;
            const totalEx = m.exercises?.length || 0;
            const solvedCount = (m.exercises || []).filter((ex) => courseProgress[ex.id]?.is_correct).length;
            const isModuleComplete = totalEx > 0 && solvedCount === totalEx;

            return (
              <button
                key={m.id}
                onClick={() => setActiveModuleId(m.id)}
                className={`text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`block text-[10px] font-mono ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                    0{idx + 1}
                  </span>
                  {totalEx > 0 && solvedCount > 0 && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        isModuleComplete
                          ? isSelected
                            ? 'bg-emerald-900/60 text-emerald-300'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : isSelected
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {solvedCount}/{totalEx}
                    </span>
                  )}
                </div>
                <div className="truncate">{m.title}</div>
              </button>
            );
          })}
        </div>
      )}

      {/* Contenu de l'onglet actif */}
      <div className="pt-2">
        {activeTab === 'theory' ? (
          <div className="space-y-6">
            <TheoryTab currentModule={activeModule} />

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setActiveTab('exercises')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Passer aux exercices du chapitre</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : activeTab === 'exercises' ? (
          <ExerciseTab
            courseId={course.id}
            moduleId={activeModuleId}
            exercises={activeModule?.exercises || []}
            courseProgress={courseProgress}
            onExerciseCompleted={handleExerciseCompleted}
            onOpenTutorWithContext={onOpenTutorWithContext}
            onOpenScratchpad={() => setScratchpadOpen(true)}
          />
        ) : (
          <ExamTab
            courseId={course.id}
            courseTitle={course.title}
            onOpenScratchpad={() => setScratchpadOpen(true)}
          />
        )}
      </div>

      {/* Modal Brouillon (Plein écran / Volet pour iPad & Apple Pencil) */}
      <Scratchpad
        isOpen={scratchpadOpen}
        onClose={() => setScratchpadOpen(false)}
      />
    </div>
  );
}
