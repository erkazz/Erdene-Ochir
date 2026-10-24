import React, { useState } from 'react';
import { Target, User, Sparkles, ExternalLink, Award, Code2 } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="about" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-semibold">
          Танилцуулга
        </span>
        <h2
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-4xl sm:text-6xl font-normal text-white tracking-tight mt-2"
        >
          Миний тухай & Зорилго
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg mt-4 leading-relaxed">
          Би 14 настай, технологид шимтэн дурлаж буй суралцагч.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Profile Card / Photo Column */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="liquid-card rounded-3xl p-8 flex flex-col items-center text-center h-full justify-between">
            {/* Photo with Fallback */}
            <div className="relative group mb-6">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden liquid-glass p-2 border border-white/20 shadow-2xl">
                {!imageError ? (
                  <img
                    src={profileData.photoUrl}
                    alt={profileData.name}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-sky-900 to-[#00172c] flex flex-col items-center justify-center p-4 text-center">
                    <User className="w-16 h-16 text-sky-300/80 mb-2" />
                    <span
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                      className="text-2xl text-white font-medium"
                    >
                      {profileData.name}
                    </span>
                    <span className="text-xs text-sky-200/60 mt-1">14 настай суралцагч</span>
                  </div>
                )}
              </div>

              {/* Status pill overlay */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-emerald-200 text-xs px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Идэвхтэй суралцаж байна</span>
              </div>
            </div>

            {/* Name & Basic Info */}
            <div className="mt-4">
              <h3
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-3xl sm:text-4xl text-white font-normal"
              >
                {profileData.name}
              </h3>
              <p className="text-sky-300 font-medium text-sm mt-1">
                {profileData.age} настай • Вэб суралцагч
              </p>
              <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed mt-4 max-w-sm mx-auto">
                {profileData.about}
              </p>
            </div>

            {/* Link to Netlify Site */}
            <div className="w-full mt-8 pt-6 border-t border-white/10">
              <a
                href={profileData.netlifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full liquid-glass rounded-xl py-3 px-4 text-sm text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span>Миний үндсэн Netlify сайт</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Goal & Motivation Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Main Goal Card */}
          <div className="liquid-card rounded-3xl p-8 sm:p-10 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-400/20 text-sky-300">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-sky-300 font-semibold">
                    Гол зорилго
                  </span>
                  <h4
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                    className="text-3xl text-white font-normal"
                  >
                    Сургалтанд сурч байгаа зорилго
                  </h4>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 my-6">
                <blockquote
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-2xl sm:text-3xl text-white italic tracking-wide leading-snug"
                >
                  "{profileData.goal}"
                </blockquote>
              </div>

              <p className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed">
                {profileData.goalDetail}
              </p>
            </div>

            {/* Skills & Progress pills */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-xs uppercase tracking-wider text-white/50 font-medium block mb-3">
                Судалж буй чиглэл & ур чадварууд
              </span>
              <div className="flex flex-wrap gap-2.5">
                {profileData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 bg-white/5 border border-white/10 hover:border-sky-400/30 transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5 text-sky-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="liquid-card rounded-2xl p-5">
              <span className="text-xs text-[hsl(var(--muted-foreground))] block mb-1">Нас</span>
              <span
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-4xl text-white font-normal"
              >
                14
              </span>
              <span className="text-xs text-sky-300 block mt-1">шинэ үеийн залуу хөгжүүлэгч</span>
            </div>

            <div className="liquid-card rounded-2xl p-5">
              <span className="text-xs text-[hsl(var(--muted-foreground))] block mb-1">Хийсэн ажлууд</span>
              <span
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-4xl text-white font-normal"
              >
                4+
              </span>
              <span className="text-xs text-sky-300 block mt-1">төсөл, тоглоом, танилцуулга</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
