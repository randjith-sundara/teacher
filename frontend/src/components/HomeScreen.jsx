import React from 'react';
import {
  Compass,
  TrendingUp,
  Cpu,
  BarChart2,
  ArrowRight,
  FileText
} from 'lucide-react';

export default function HomeScreen({ courses, onSelectCourse, onOpenReleases }) {
  const getCourseIcon = (id) => {
    switch (id) {
      case 'fond0100':
        return Compass;
      case 'mat0130':
        return Cpu;
      case 'mat0150':
        return TrendingUp;
      case 'mat0250':
        return BarChart2;
      default:
        return Compass;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 space-y-10">
      {/* En-tête simple sans aucun badge décoratif */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Cours disponibles
        </h1>
        <p className="text-slate-600 text-sm">
          Sélectionne une matière pour accéder aux chapitres et aux entraînements.
        </p>
      </div>

      {/* Cartes sobres et directes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => {
          const Icon = getCourseIcon(course.id);

          return (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className="text-left p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold text-slate-500">
                      {course.code}
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h2>
                  </div>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{course.modules?.length || 4} chapitres</span>
                <span className="flex items-center gap-1 text-slate-900 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Accéder</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer minimal */}
      <div className="pt-6 border-t border-slate-200 text-xs text-slate-400">
        <button
          onClick={onOpenReleases}
          className="hover:text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Notes de version</span>
        </button>
      </div>
    </div>
  );
}
