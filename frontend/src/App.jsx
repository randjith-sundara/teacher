import React, { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import CourseView from './components/CourseView';
import TutorDrawer from './components/TutorDrawer';
import ReleasesModal from './components/ReleasesModal';
import {
  GraduationCap,
  MessageSquare,
  FileText
} from 'lucide-react';

export default function App() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tuteur IA
  const [tutorOpen, setTutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState('');

  // Release notes
  const [releasesOpen, setReleasesOpen] = useState(false);

  useEffect(() => {
    fetch('/api/courses')
      .then((r) => r.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error('Erreur chargement cours:', err))
      .finally(() => setLoading(false));
  }, []);

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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-slate-200">
      {/* Barre de navigation sobre et utile */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setSelectedCourseId(null)}
            className="flex items-center gap-2.5 text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <GraduationCap className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-slate-900 tracking-tight">
              Teacher
            </span>
          </button>

          {/* Action : Tuteur IA */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenTutorWithContext(selectedCourse ? `Cours : ${selectedCourse.title}` : '')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Aide Professeur</span>
            </button>

            <button
              onClick={() => setReleasesOpen(true)}
              title="Notes de version"
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Vue principale */}
      <main className="flex-1">
        {loading ? (
          <div className="text-center py-24 text-slate-400 text-sm">
            Chargement...
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

      {/* Tiroir Tuteur IA */}
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
