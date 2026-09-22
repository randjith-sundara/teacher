import React, { useState } from 'react';
import TheoryTab from './TheoryTab';
import ExerciseTab from './ExerciseTab';
import ExamTab from './ExamTab';
import {
  ArrowLeft,
  BookOpen,
  Dumbbell,
  Award,
  Sparkles,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export default function CourseView({
  course,
  onBackToHome,
  onOpenTutorWithContext,
}) {
  const [activeTab, setActiveTab] = useState('theory'); // 'theory' | 'exercises' | 'exam'
  const [activeModuleId, setActiveModuleId] = useState(course.modules[0]?.id);

  const activeModule = course.modules.find((m) => m.id === activeModuleId) || course.modules[0];
  const activeModuleIndex = course.modules.findIndex((m) => m.id === activeModuleId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Barre supérieure : Retour & Contexte */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tous les cours</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                {course.code}
              </span>
              <h1 className="text-lg font-bold text-slate-900">{course.title}</h1>
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            onOpenTutorWithContext(
              `Cours : ${course.title} (${course.code}). Module : ${activeModule?.title}.`
            )
          }
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100/80 transition-colors text-xs font-bold cursor-pointer shrink-0 self-start sm:self-auto shadow-2xs"
        >
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Poser une question au Prof</span>
        </button>
      </div>

      {/* Les 3 modes d'apprentissage : Comprendre, Pratiquer, Valider */}
      <div className="flex items-center justify-center">
        <div className="inline-flex bg-slate-200/80 p-1 rounded-xl gap-1">
          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'theory'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>1. Comprendre</span>
          </button>

          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'exercises'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Dumbbell className="w-4 h-4 text-emerald-600" />
            <span>2. Pratiquer</span>
          </button>

          <button
            onClick={() => setActiveTab('exam')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'exam'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>3. Valider l'Examen</span>
          </button>
        </div>
      </div>

      {/* Sélecteur de chapitres (si pas en mode examen) */}
      {activeTab !== 'exam' && (
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Choisis ton chapitre :
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {course.modules.map((m, idx) => {
              const isSelected = m.id === activeModuleId;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveModuleId(m.id)}
                  className={`text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-indigo-500 text-indigo-950 font-bold shadow-xs ring-2 ring-indigo-100'
                      : 'bg-white/80 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span className="block text-[10px] text-slate-400 font-mono mb-0.5">
                    Chapitre 0{idx + 1}
                  </span>
                  <div className="truncate">{m.title}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="space-y-6">
        {activeTab === 'theory' ? (
          <div className="space-y-6">
            <TheoryTab currentModule={activeModule} />

            {/* Bouton de transition vers la pratique */}
            <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-indigo-950">Prêt à tester tes réflexes ?</h3>
                <p className="text-xs text-indigo-700 mt-1">
                  Passe aux exercices progressifs avec correction immédiate pas-à-pas.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('exercises')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <span>Faire les exercices du chapitre</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : activeTab === 'exercises' ? (
          <ExerciseTab
            courseId={course.id}
            moduleId={activeModuleId}
            exercises={activeModule?.exercises || []}
            onOpenTutorWithContext={onOpenTutorWithContext}
          />
        ) : (
          <ExamTab courseId={course.id} courseTitle={course.title} />
        )}
      </div>
    </div>
  );
}
