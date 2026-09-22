import React, { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import CourseView from './components/CourseView';
import TutorDrawer from './components/TutorDrawer';
import ReleasesModal from './components/ReleasesModal';
import {
  GraduationCap,
  Sparkles,
  FileText
} from 'lucide-react';

export default function App() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null); // null = page d'accueil avec choix de cours
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tuteur IA
  const [tutorOpen, setTutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState('');

  // Release notes
  const [releasesOpen, setReleasesOpen] = useState(false);

  // Chargement de la liste des cours
  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error('Erreur chargement cours:', err))
      .finally(() => setLoading(false));
  }, []);

  // Chargement des détails du cours sélectionné
  useEffect(() => {
    if (!selectedCourseId) {
      setSelectedCourse(null);
      return;
    }
    fetch(`/api/courses/${selectedCourseId}`)
      .then((r) => r.json())
      .then((data) => setSelectedCourse(data))
      .catch((err) => console.error('Erreur détails cours:', err));
  }, [selectedCourseId]);

  const handleOpenTutorWithContext = (ctx) => {
    setTutorContext(ctx);
    setTutorOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Barre de navigation sobre et claire */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setSelectedCourseId(null)}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-slate-900">
                  Teacher
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.2 rounded">
                  Uni
                </span>
              </div>
            </div>
          </button>

          {/* Actions rapides */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenTutorWithContext(selectedCourse ? `Cours : ${selectedCourse.title}` : '')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Professeur IA</span>
            </button>

            <button
              onClick={() => setReleasesOpen(true)}
              title="Notes de version"
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Contenu : Accueil OU Cours Unique */}
      <main className="flex-1">
        {loading ? (
          <div className="text-center py-24 text-slate-400 text-sm">
            Chargement de l'espace d'apprentissage...
          </div>
        ) : !selectedCourseId || !selectedCourse ? (
          <HomeScreen
            courses={courses}
            onSelectCourse={(id) => setSelectedCourseId(id)}
            onOpenReleases={() => setReleasesOpen(true)}
          />
        ) : (
          <CourseView
            course={selectedCourse}
            onBackToHome={() => setSelectedCourseId(null)}
            onOpenTutorWithContext={handleOpenTutorWithContext}
          />
        )}
      </main>

      {/* Tiroir Professeur IA */}
      <TutorDrawer
        isOpen={tutorOpen}
        onClose={() => setTutorOpen(false)}
        context={tutorContext}
        courseTitle={selectedCourse?.title}
      />

      {/* Modal Notes de Version */}
      <ReleasesModal isOpen={releasesOpen} onClose={() => setReleasesOpen(false)} />
    </div>
  );
}
