import React from 'react';
import { ExternalLink, Compass, Globe, Sparkles, Code, CheckCircle, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const dreamJob = projectsData.find((p) => p.id === 'dream-job');
  const mainSite = projectsData.find((p) => p.id === 'main-website');

  return (
    <section id="projects" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-semibold">
          Миний бүтээлүүд & Бодит ажлууд
        </span>
        <h2
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-4xl sm:text-6xl font-normal text-white tracking-tight mt-2"
        >
          Миний хийсэн төслүүд
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg mt-4 leading-relaxed">
          Суралцах хугацаандаа бие даан хийж, Netlify дээр шууд байршуулсан бодит ажлуудтай танилцана уу. Карт бүр шинэ цонхонд нээгдэнэ.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Main Featured Case Study: Мөрөөдлийн ажил */}
        {dreamJob && (
          <div className="lg:col-span-7 flex flex-col">
            <a
              href={dreamJob.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group liquid-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between h-full hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-500/10 transition-all cursor-pointer block border-sky-400/30"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-400/20 text-sky-300">
                      <Compass className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                        Онцлох гол төсөл
                      </span>
                      <span className="text-xs text-white/50 block">Netlify Live Page</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-sky-500/20 border border-sky-400/40 group-hover:bg-sky-500 group-hover:text-black transition-all">
                    <span>Хуудас нээх</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-3xl sm:text-5xl font-normal text-white group-hover:text-sky-200 transition-colors"
                >
                  {dreamJob.title}
                </h3>
                <p className="text-sm sm:text-base text-sky-200/70 font-medium mt-2">
                  {dreamJob.subtitle}
                </p>

                <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg leading-relaxed mt-6">
                  {dreamJob.description}
                </p>

                {/* Visual Preview Banner */}
                <div className="mt-8 p-5 rounded-2xl bg-black/40 border border-white/10 group-hover:border-white/20 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    <span className="text-xs font-mono text-white/40 ml-2">
                      superlative-figolla-438f7b.netlify.app/my dreamjob.html
                    </span>
                  </div>
                  <div className="text-xs text-white/70 space-y-1.5 font-mono">
                    <p className="text-sky-300">&lt;!-- Мөрөөдлийн мэргэжил, төлөвлөлт --&gt;</p>
                    <p className="text-white/80">Ирээдүйд хийх ажил, шинэ ур чадварууд, зорилгын тайлбар хуудас</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {dreamJob.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-md bg-white/5 text-white/80 border border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs text-sky-300 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Шууд үзэх <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          </div>
        )}

        {/* Second Project & Interactive Mini-Game Teaser */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Main Website Card */}
          {mainSite && (
            <a
              href={mainSite.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group liquid-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-all cursor-pointer block border-white/15"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-purple-300">Netlify Үндсэн Сайт</span>
                      <span className="text-xs text-white/50 block">Анхны хуудас</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-white/70 group-hover:text-white">
                    <span>Үзэх</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-2xl sm:text-3xl font-normal text-white group-hover:text-purple-200 transition-colors"
                >
                  {mainSite.title}
                </h3>
                <p className="text-xs text-white/60 font-medium mt-1">
                  {mainSite.subtitle}
                </p>

                <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed mt-4">
                  {mainSite.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span className="font-mono text-purple-300">superlative-figolla-438f7b</span>
                <span className="flex items-center gap-1 text-emerald-300">
                  <CheckCircle className="w-3.5 h-3.5" /> Идэвхтэй
                </span>
              </div>
            </a>
          )}

          {/* Interactive Challenge Banner */}
          <div className="liquid-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between border-amber-500/30">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                    Интерактив хэсэг
                  </span>
                  <span className="text-xs text-white/50 block">Тоглоом тоглох</span>
                </div>
              </div>

              <h4
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-2xl font-normal text-white"
              >
                CS2 Рефлекс сорилт бэлэн!
              </h4>

              <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed mt-2">
                Таны хариу үйлдэл хэр хурдан бэ? Манай хуудас дээр шууд байрлах CS2 рефлекс хэмжигчээр хурдаа шалгаарай.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <a
                href="#game"
                className="w-full liquid-glass rounded-xl py-3 px-4 text-xs font-semibold text-white flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <span>Тоглоомын лаборатори руу очих</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
