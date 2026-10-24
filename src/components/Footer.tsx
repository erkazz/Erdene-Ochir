import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 z-20 bg-[#00172c]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-baseline gap-1">
              <span
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-3xl text-white font-normal tracking-tight"
              >
                {profileData.name}
              </span>
              <sup className="text-xs text-white/60">®</sup>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2 max-w-md">
              14 настай суралцагч Эрдэнэ-Очирын портфолио сайт. Код, дизайн болон ирээдүйн хүсэл мөрөөдөл.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href={profileData.netlifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white inline-flex items-center gap-2 hover:scale-[1.03] transition-transform cursor-pointer"
            >
              <span>Үндсэн Netlify хуудас</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Хуудасны эхэнд очих"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[hsl(var(--muted-foreground))]">
          <p>© {new Date().getFullYear()} Эрдэнэ-Очир. Бүх эрх хамгаалагдсан.</p>
          <p className="text-center sm:text-right">
            Загвар: Кинематик видео, шилэн эффект (Liquid Glass) & Инструмент Сериф фонт
          </p>
        </div>
      </div>
    </footer>
  );
};
