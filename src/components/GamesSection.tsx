import React, { useState } from 'react';
import {
  Gamepad2,
  Play,
  Trophy,
  Terminal,
  Code2,
  ExternalLink,
  Sparkles,
  Clock,
  CheckCircle2,
  Swords,
} from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { JavaScriptSection } from './JavaScriptSection';
import { AnimeGuessSection, AnimeModalView } from './AnimeGuessSection';
import streetFighterImg from '../assets/images/street_fighter_game_1795233998704.jpg';

export const GamesSection: React.FC = () => {
  const [jsModalOpen, setJsModalOpen] = useState(false);
  const [animeModalOpen, setAnimeModalOpen] = useState(false);
  const [animeInitialView, setAnimeInitialView] = useState<AnimeModalView>('game');

  const openAnimeModal = (view: AnimeModalView) => {
    setAnimeInitialView(view);
    setAnimeModalOpen(true);
  };

  return (
    <section id="games" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-20 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-sky-300 bg-sky-500/10 border border-sky-400/30 mb-4">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Интерактив бүтээлүүд</span>
        </div>

        <h2
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-4xl sm:text-6xl font-normal text-white tracking-tight"
        >
          Тоглоом
        </h2>

        <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg mt-4 leading-relaxed">
          Миний бүтээсэн кодын дасгал болон мини-тоглоомууд. Аль нэгийг нь сонгон «Тоглох» товчийг дарж шууд ороорой.
        </p>
      </div>

      {/* Unified 3-Card Grid: JS бодлогууд, Anime Guess & Street Fighter */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
        {/* Card 1: JS бодлогууд */}
        <article
          id="javascript"
          className="liquid-card rounded-3xl p-8 sm:p-10 border border-amber-400/25 shadow-2xl flex flex-col justify-between scroll-mt-28 group hover:border-amber-400/45 transition-all"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-300">
                <Terminal className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-amber-200 bg-amber-500/10 border border-amber-400/25 px-3 py-1 rounded-full">
                Хичээл 8–11 · JS
              </span>
            </div>

            <h3
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-3xl sm:text-4xl font-normal text-white tracking-tight"
            >
              JS бодлогууд
            </h3>

            <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base mt-3 leading-relaxed">
              Нас тооцоолох, тоо урвуулах, үсгэн дүн гаргах зэрэг JavaScript кодын сонирхолтой бодлогуудыг шууд ажиллуулж шалгаарай.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-white/80">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>4 интерактив бодлого & Code Battle дасгал</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Бодлого бүрийн JavaScript эх кодтой</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Бие даасан erdene-ochir-javascript сайт</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setJsModalOpen(true)}
              className="liquid-glass rounded-full px-8 py-3.5 text-sm sm:text-base font-semibold text-white inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer border border-amber-400/40 shadow-lg"
            >
              <Play className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>Тоглох</span>
            </button>

            <a
              href={profileData.javascriptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass rounded-full px-6 py-3.5 text-sm font-semibold text-amber-200 inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all border border-amber-400/25"
            >
              <span>Сайт үзэх</span>
              <ExternalLink className="w-4 h-4 text-amber-300" />
            </a>
          </div>
        </article>

        {/* Card 2: Anime Guess */}
        <article
          id="anime-guess"
          className="liquid-card rounded-3xl p-8 sm:p-10 border border-sky-400/25 shadow-2xl flex flex-col justify-between scroll-mt-28 group hover:border-sky-400/45 transition-all"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-sky-500/15 border border-sky-400/30 text-sky-300">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-sky-200 bg-sky-500/10 border border-sky-400/25 px-3 py-1 rounded-full">
                3 горим · ТОП 10
              </span>
            </div>

            <h3
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-3xl sm:text-4xl font-normal text-white tracking-tight"
            >
              Anime Guess
            </h3>

            <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base mt-3 leading-relaxed">
              Эможи, бүдэг зураг болон баатрын төрхөөр анимэ таах хөгжилтэй сорилт. Өрсөлдөөнд орж ТОП 10 онооны самбарт нэрээ мөнхлөөрэй!
            </p>

            <ul className="mt-6 space-y-2.5 text-sm text-white/80">
              <li className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-sky-300 shrink-0" />
                <span>3 горим: Emoji · Anime (Blur 3s) · Баатар</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-sky-300 shrink-0" />
                <span>Асуулт бүрт 15 секунд · 3 амь · +10 оноо</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Trophy className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Firebase Firestore ТОП 10 Leaderboard</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => openAnimeModal('game')}
              className="liquid-glass rounded-full px-8 py-3.5 text-sm sm:text-base font-semibold text-white inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer border border-sky-400/40 shadow-lg"
            >
              <Play className="w-4 h-4 fill-sky-300 text-sky-300" />
              <span>Тоглох</span>
            </button>

            <button
              onClick={() => openAnimeModal('leaderboard')}
              className="liquid-glass rounded-full px-6 py-3.5 text-sm font-semibold text-amber-200 inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer border border-amber-400/30"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Leaderboard</span>
            </button>
          </div>
        </article>

        {/* Card 3: Street Fighter */}
        <article
          id="street-fighter"
          className="liquid-card rounded-3xl p-8 sm:p-10 border border-rose-400/25 shadow-2xl flex flex-col justify-between scroll-mt-28 group hover:border-rose-400/45 transition-all"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-400/30 text-rose-300">
                <Swords className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-rose-200 bg-rose-500/10 border border-rose-400/25 px-3 py-1 rounded-full">
                2D Arcade · Fighter
              </span>
            </div>

            <h3
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-3xl sm:text-4xl font-normal text-white tracking-tight"
            >
              Street Fighter
            </h3>

            <div className="mt-5 rounded-2xl overflow-hidden border border-white/10 bg-black/40 aspect-video relative">
              <img
                src={streetFighterImg}
                alt="Street Fighter тоглоомын зураг"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://my-fighter-game-ten.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass rounded-full px-8 py-3.5 text-sm sm:text-base font-semibold text-white inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all border border-rose-400/40 shadow-lg"
              >
                <Play className="w-4 h-4 fill-rose-300 text-rose-300" />
                <span>Тоглох</span>
                <ExternalLink className="w-3.5 h-3.5 text-rose-200/80" />
              </a>
            </div>

            <p className="mt-4 text-xs text-white/50">
              Sprites: AI (Gemini) + миний дизайн
            </p>
          </div>
        </article>
      </div>

      {/* Dedicated Modals */}
      <JavaScriptSection isOpen={jsModalOpen} onClose={() => setJsModalOpen(false)} />
      <AnimeGuessSection
        isOpen={animeModalOpen}
        initialView={animeInitialView}
        onClose={() => setAnimeModalOpen(false)}
      />
    </section>
  );
};
