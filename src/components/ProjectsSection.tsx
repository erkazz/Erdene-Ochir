import React from 'react';
import { ExternalLink, Sparkles, FolderGit2, Gamepad2, Tv, Compass } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types/portfolio';

export const ProjectsSection: React.FC = () => {
  // Get icon for project category
  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'dream-job':
        return <Compass className="w-5 h-5 text-sky-400" />;
      case 'my-youtube':
        return <Tv className="w-5 h-5 text-rose-400" />;
      case 'game-project':
        return <Gamepad2 className="w-5 h-5 text-emerald-400" />;
      case 'malaa-hashaandaa':
        return <FolderGit2 className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section id="projects" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-semibold">
          Миний туршилтууд ба ажлууд
        </span>
        <h2
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-4xl sm:text-6xl font-normal text-white tracking-tight mt-2"
        >
          Миний бүтээлүүд
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg mt-4 leading-relaxed">
          Суралцах хугацаандаа бүтээсэн төслүүдтэй танилцана уу. Карт бүр дээр дарж тухайн төслийн вэб хуудсыг шинэ цонхонд үзэх боломжтой.
        </p>
      </div>

      {/* Projects Grid (Mapped from array) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projectsData.map((project: Project, index: number) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group liquid-card rounded-2xl p-7 sm:p-8 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/10 cursor-pointer block text-left"
          >
            <div>
              {/* Top row: badge + link icon */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                    {getProjectIcon(project.id)}
                  </div>
                  <div>
                    <span className="text-xs font-medium text-white/50 block">Төсөл 0{index + 1}</span>
                    <span className="text-xs font-semibold text-sky-300 tracking-wide">{project.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/80 bg-white/5 border border-white/10 group-hover:text-white group-hover:bg-white/15 transition-all">
                  <span>Нээх</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-2xl sm:text-3xl text-white font-normal group-hover:text-sky-200 transition-colors"
              >
                {project.title}
              </h3>
              <p className="text-sm text-white/60 font-medium mt-1">
                {project.subtitle}
              </p>

              {/* Description */}
              <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed mt-4">
                {project.description}
              </p>
            </div>

            {/* Bottom metadata */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-white/70 border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <span className="text-xs text-white/40 font-mono truncate max-w-[200px]">
                {project.url.replace('https://', '')}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
