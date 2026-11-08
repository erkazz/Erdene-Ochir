import React from 'react';
import { ExternalLink, Compass, Globe, Sparkles, Code2, ArrowRight, Terminal } from 'lucide-react';
import { projectsData, profileData } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const jsSite = projectsData.find((p) => p.id === 'javascript-site');
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
        {/* Main Featured Case Study: JavaScript Төсөл */}
        {jsSite && (
          <div className="lg:col-span-7 flex flex-col">
            <a
              href={jsSite.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group liquid-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between h-full hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 transition-all cursor-pointer block border-amber-400/40 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-300">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Шинэ нэмэгдсэн гол төсөл
                      </span>
                      <span className="text-xs text-white/50 block font-mono">erdene-ochir-javascript.netlify.app</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-amber-500/20 border border-amber-400/40 group-hover:bg-amber-400 group-hover:text-black transition-all">
                    <span>Сайт нээх</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-3xl sm:text-5xl font-normal text-white group-hover:text-amber-200 transition-colors"
                >
                  {jsSite.title}
                </h3>
                <p className="text-sm sm:text-base text-amber-200/80 font-medium mt-2">
                  {jsSite.subtitle}
                </p>

                <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg leading-relaxed mt-6">
                  {jsSite.description}
                </p>

                {/* Visual Terminal / Code Preview Box */}
                <div className="mt-8 p-5 rounded-2xl bg-black/50 border border-white/10 group-hover:border-amber-400/30 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-white/40 ml-2">
                      erdene-ochir-javascript.netlify.app
                    </span>
                  </div>
                  <div className="text-xs text-white/70 space-y-1.5 font-mono">
                    <p className="text-amber-300">&lt;!-- JavaScript Хичээл 8–11 бодлогууд --&gt;</p>
                    <p className="text-white/80">
                      Амьдарсан хугацаа • Ирээдүйн нас • Тонгорогдсон тоо • Үсгэн дүн • Нууц үг шалгах
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {jsSite.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-md bg-white/5 text-amber-200/80 border border-amber-400/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs text-amber-300 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Шууд үзэх <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          </div>
        )}

        {/* Right Column: Мөрөөдлийн ажил & Анхны сайт */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Мөрөөдлийн ажил */}
          {dreamJob && (
            <a
              href={dreamJob.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group liquid-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-all cursor-pointer block border-sky-400/25"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-300">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-sky-300">Мөрөөдөл & Зорилго</span>
                      <span className="text-xs text-white/50 block">my dreamjob.html</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-white/70 group-hover:text-white">
                    <span>Нээх</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-2xl sm:text-3xl font-normal text-white group-hover:text-sky-200 transition-colors"
                >
                  {dreamJob.title}
                </h3>
                <p className="text-xs text-white/60 font-medium mt-1">
                  {dreamJob.subtitle}
                </p>

                <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed mt-4">
                  {dreamJob.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span className="font-mono text-sky-300 truncate max-w-[200px]">
                  superlative-figolla-438f7b...
                </span>
                <span className="text-white/80 font-medium">Шууд нээх →</span>
              </div>
            </a>
          )}

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
                <span className="font-mono text-purple-300 truncate max-w-[200px]">
                  superlative-figolla-438f7b
                </span>
                <span className="text-white/80 font-medium">Үзэх →</span>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
