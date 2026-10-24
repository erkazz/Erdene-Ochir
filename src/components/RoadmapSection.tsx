import React from 'react';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { learningRoadmap } from '../data/portfolioData';

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-semibold">
          Ахиц дэвшил & Ирээдүйн зорилго
        </span>
        <h2
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-4xl sm:text-6xl font-normal text-white tracking-tight mt-2"
        >
          Суралцах замын зураг
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg mt-4 leading-relaxed">
          14 настайдаа бие даан код бичиж эхэлснээс хойших миний туулж буй үе шатууд болон хүрэхээр тэмүүлж буй зорилгууд.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {learningRoadmap.map((item, index) => {
          const isDone = item.status === 'completed';
          const isCurrent = item.status === 'current';

          return (
            <div
              key={item.stage}
              className={`liquid-card rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-1 ${
                isCurrent ? 'border-sky-400/40 shadow-xl shadow-sky-500/10' : ''
              }`}
            >
              <div>
                {/* Stage Tag */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
                    {item.year}
                  </span>

                  {isDone && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Амжилттай
                    </span>
                  )}
                  {isCurrent && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-sky-300 font-medium bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 animate-pulse">
                      <Clock className="w-3.5 h-3.5" />
                      Одоо суралцаж буй
                    </span>
                  )}
                  {!isDone && !isCurrent && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-purple-300 font-medium bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                      <Sparkles className="w-3.5 h-3.5" />
                      Ирээдүйн зорилго
                    </span>
                  )}
                </div>

                <span className="text-xs uppercase tracking-wider text-sky-300 font-semibold block mb-1">
                  {item.stage}
                </span>

                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-2xl sm:text-3xl font-normal text-white mb-3"
                >
                  {item.title}
                </h3>

                <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Skills */}
              <div className="pt-6 border-t border-white/10">
                <span className="text-xs text-white/40 block mb-2 font-medium">Гол чадварууд:</span>
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-white/80 border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
