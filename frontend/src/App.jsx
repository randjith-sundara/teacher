import React, { useState, useEffect } from 'react';
import TheoryTab from './components/TheoryTab';
import ExerciseTab from './components/ExerciseTab';
import ExamTab from './components/ExamTab';
import TutorDrawer from './components/TutorDrawer';
import ReleasesModal from './components/ReleasesModal';
import {
  GraduationCap,
  BookOpen,
  Dumbbell,
  Award,
  Sparkles,
  Layers,
  FileText,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [courses, setCourses] = useState([]);
  const [activeCourseId, setActiveCourseId] = useState('mat0150');
  const [courseDetails, setCourseDetails] = useState(null);
  const [activeModuleId, setActiveModuleId] = useState('m1-limites');
  const [activeTab, setActiveTab] = useState('theory'); // 'theory' | 'exercises' | 'exam'
  const [loading, setLoading] = useState(true);

  // Gestion du tuteur IA
  const [tutorOpen, setTutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState('');

  // Gestion des notes de version
  const [releasesOpen, setReleasesOpen] = useState(false);

  // Chargement des cours
  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((data) => {
        setCourses(data);
        if (data.length > 0 && !activeCourseId) {
          setActiveCourseId(data[0].id);
        }
      })
      .catch((err) => console.error('Erreur chargement cours:', err));
  }, []);

  // Chargement du cours sélectionné
  useEffect(() => {
    if (!activeCourseId) return;
    setLoading(true);
    fetch(`/api/courses/${activeCourseId}`)
      .then((r) => r.json())
      .then((data) => {
        setCourseDetails(data);
        if (data.modules && data.modules.length > 0) {
          // Vérifier si le module actif appartient au nouveau cours
          const hasModule = data.modules.some((m) => m.id === activeModuleId);
          if (!hasModule) {
            setActiveModuleId(data.modules[0].id);
          }
        }
      })
      .catch((err) => console.error('Erreur chargement détails cours:', err))
      .finally(() => setLoading(false));
  }, [activeCourseId]);

  const activeModule = courseDetails?.modules?.find((m) => m.id === activeModuleId);

  const handleOpenTutorWithContext = (ctx) => {
    setTutorContext(ctx);
    setTutorOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Barre de navigation supérieure */}
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">Teacher</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-950 text-indigo-400 border border-indigo-800/80 px-2 py-0.5 rounded">
                  Université
                </span>
              </div>
              <span className="text-xs text-slate-400 block -mt-0.5">
                Mise à niveau mathématique préalable
              </span>
            </div>
          </div>

          {/* Sélecteur de cours */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            {courses.map((c) => {
              const isSelected = c.id === activeCourseId;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCourseId(c.id);
                    if (activeTab === 'exam') setActiveTab('theory');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="font-mono">{c.code}</span>
                  <span className="hidden sm:inline ml-1 font-normal opacity-90">— {c.title}</span>
                </button>
              );
            })}
          </div>

          {/* Boutons d'action : Professeur IA & Releases */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenTutorWithContext(`Cours actif : ${courseDetails?.title}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-lg text-xs font-medium transition-colors shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Professeur IA</span>
            </button>

            <button
              onClick={() => setReleasesOpen(true)}
              title="Notes de version"
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar des modules */}
        <aside className="w-full md:w-64 shrink-0 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Modules du Cours</span>
            </div>

            <div className="space-y-1.5">
              {courseDetails?.modules?.map((m, idx) => {
                const isSelected = m.id === activeModuleId;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setActiveModuleId(m.id);
                      if (activeTab === 'exam') setActiveTab('theory');
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-75 shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="truncate">{m.title}</div>
                      <div className={`text-[10px] truncate ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {m.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bouton Examen Universitaire */}
          <button
            onClick={() => setActiveTab('exam')}
            className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
              activeTab === 'exam'
                ? 'bg-gradient-to-r from-indigo-900 to-slate-900 border-indigo-500 shadow-md text-white'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold block text-white">Examen Blanc</span>
                <span className="text-[10px] text-slate-400 block">Simulation d'épreuve</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </aside>

        {/* Espace central de travail */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* Onglets : Théorie vs Entraînement vs Examen */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('theory')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'theory'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Théorie & Synthèse</span>
              </button>

              <button
                onClick={() => setActiveTab('exercises')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'exercises'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Dumbbell className="w-4 h-4" />
                <span>Entraînement Pratique</span>
              </button>

              <button
                onClick={() => setActiveTab('exam')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'exam'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Examen Blanc</span>
              </button>
            </div>

            {courseDetails && (
              <span className="text-xs text-slate-400 hidden sm:inline">
                {courseDetails.code} : {courseDetails.title}
              </span>
            )}
          </div>

          {/* Vues conditionnelles */}
          {loading ? (
            <div className="text-center py-20 text-slate-500">Chargement du contenu...</div>
          ) : activeTab === 'theory' ? (
            <TheoryTab currentModule={activeModule} />
          ) : activeTab === 'exercises' ? (
            <ExerciseTab
              courseId={activeCourseId}
              moduleId={activeModuleId}
              exercises={activeModule?.exercises || []}
              onOpenTutorWithContext={handleOpenTutorWithContext}
            />
          ) : (
            <ExamTab courseId={activeCourseId} courseTitle={courseDetails?.title} />
          )}
        </main>
      </div>

      {/* Tiroir Tuteur IA contextuel */}
      <TutorDrawer
        isOpen={tutorOpen}
        onClose={() => setTutorOpen(false)}
        context={tutorContext}
        courseTitle={courseDetails?.title}
      />

      {/* Modal Notes de Version */}
      <ReleasesModal isOpen={releasesOpen} onClose={() => setReleasesOpen(false)} />
    </div>
  );
}
