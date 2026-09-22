import React from 'react';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Compass,
  TrendingUp,
  Cpu,
  BarChart2,
  FileText
} from 'lucide-react';

export default function HomeScreen({ courses, onSelectCourse, onOpenReleases }) {
  const getCourseStyle = (id) => {
    switch (id) {
      case 'fond0100':
        return {
          border: 'border-amber-200 hover:border-amber-400',
          bg: 'bg-white hover:bg-amber-50/40',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
          iconBg: 'bg-amber-500 text-white',
          tag: 'Recommandé pour repartir de zéro',
          icon: Compass,
        };
      case 'mat0130':
        return {
          border: 'border-emerald-200 hover:border-emerald-400',
          bg: 'bg-white hover:bg-emerald-50/40',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          iconBg: 'bg-emerald-600 text-white',
          tag: 'Préalable Universitaire',
          icon: Cpu,
        };
      case 'mat0150':
        return {
          border: 'border-indigo-200 hover:border-indigo-400',
          bg: 'bg-white hover:bg-indigo-50/40',
          badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          iconBg: 'bg-indigo-600 text-white',
          tag: 'Préalable Universitaire',
          icon: TrendingUp,
        };
      case 'mat0250':
        return {
          border: 'border-violet-200 hover:border-violet-400',
          bg: 'bg-white hover:bg-violet-50/40',
          badgeBg: 'bg-violet-100 text-violet-800 border-violet-200',
          iconBg: 'bg-violet-600 text-white',
          tag: 'Préalable Universitaire',
          icon: BarChart2,
        };
      default:
        return {
          border: 'border-slate-200 hover:border-slate-400',
          bg: 'bg-white hover:bg-slate-50',
          badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
          iconBg: 'bg-slate-700 text-white',
          tag: 'Matière',
          icon: BookOpen,
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 space-y-10">
      {/* En-tête d'accueil chaleureux */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-200/80">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Mise à Niveau Mathématique Universitaire</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Quel cours souhaites-tu travailler ?
        </h1>

        <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed">
          Choisis ton parcours ci-dessous. Tu avanceras pas-à-pas, à ton propre rythme, avec un professeur IA disponible à tout moment.
        </p>
      </div>

      {/* Cartes de sélection des cours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map((course) => {
          const style = getCourseStyle(course.id);
          const IconComponent = style.icon;

          return (
            <button
              key={course.id}
              onClick={() => onSelectCourse(course.id)}
              className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between group cursor-pointer ${style.bg} ${style.border}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs ${style.iconBg}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${style.badgeBg}`}>
                    {style.tag}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-500 font-mono tracking-wider">
                    {course.code}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-0.5 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h2>
                  <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{course.modules?.length || 4} chapitres progressifs</span>
                <span className="flex items-center gap-1 text-slate-900 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Commencer</span>
                  <ArrowRight className="w-4 h-4 text-indigo-600" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pied de page sobre */}
      <div className="text-center pt-8 border-t border-slate-200/80 flex items-center justify-center gap-6 text-xs text-slate-500">
        <button
          onClick={onOpenReleases}
          className="flex items-center gap-1.5 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Notes de Version (Changelog)</span>
        </button>
      </div>
    </div>
  );
}
