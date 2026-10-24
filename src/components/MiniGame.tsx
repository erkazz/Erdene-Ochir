import React, { useState, useEffect, useRef } from 'react';
import { Target, Zap, RotateCcw, Award, Flame, Play } from 'lucide-react';

export const MiniGame: React.FC = () => {
  const [gameState, setGameState] = useState<'idle' | 'waiting' | 'ready' | 'result' | 'early'>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [targetPos, setTargetPos] = useState({ top: 50, left: 50 });

  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = () => {
    setGameState('waiting');
    setReactionTime(null);

    // Random delay between 1.5s and 4.5s
    const delay = Math.floor(Math.random() * 3000) + 1500;

    timerRef.current = setTimeout(() => {
      // Pick random position inside play area
      const randomTop = Math.floor(Math.random() * 60) + 20;
      const randomLeft = Math.floor(Math.random() * 70) + 15;
      setTargetPos({ top: randomTop, left: randomLeft });

      startTimeRef.current = performance.now();
      setGameState('ready');
    }, delay);
  };

  const handleAreaClick = () => {
    if (gameState === 'waiting') {
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState('early');
    }
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gameState === 'ready') {
      const now = performance.now();
      const elapsed = Math.round(now - startTimeRef.current);
      setReactionTime(elapsed);
      setAttempts((prev) => prev + 1);

      if (bestTime === null || elapsed < bestTime) {
        setBestTime(elapsed);
      }
      setGameState('result');
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const getRankFeedback = (ms: number) => {
    if (ms < 200) {
      return {
        title: 'Цахим спортын мэргэжлийн хурд!',
        desc: 'Гайхалтай! CS2 тэмцээний мэргэжлийн тоглогчийн түвшний рефлекс байна.',
        color: 'text-amber-300',
        badge: 'CS2 PRO RANK ⚡',
      };
    }
    if (ms < 250) {
      return {
        title: 'Маш хурдан рефлекс!',
        desc: 'Таны хариу үйлдэл маш сайн, дундаж хүнийхээс хамаагүй өндөр байна.',
        color: 'text-emerald-300',
        badge: 'AIM MASTER 🎯',
      };
    }
    if (ms < 320) {
      return {
        title: 'Сайн үзүүлэлт!',
        desc: 'Тогтмол тоглож, сагс шидэж рефлексээ улам сайжруулах боломжтой.',
        color: 'text-sky-300',
        badge: 'SHARPSHOOTER 🏀',
      };
    }
    return {
      title: 'Дахин туршаад үзээрэй!',
      desc: 'Тайван байж, ногоон бай гарч ирэх агшинд хамгийн хурднаараа дараарай.',
      color: 'text-white/80',
      badge: 'TRAINEE 🎮',
    };
  };

  return (
    <section id="game" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-semibold">
          Шууд тоглох интерактив лаборатори
        </span>
        <h2
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-4xl sm:text-6xl font-normal text-white tracking-tight mt-2"
        >
          CS2 Рефлекс & Хариу үйлдлийн сорилт
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg mt-4 leading-relaxed">
          Миний дуртай тоглоом болох CS2-ийн тактик, рефлексийг туршиж үзээрэй. Дэлгэц дээр ногоон бай гарч ирэхэд хамгийн хурднаараа товшиж хурдаа хэмжээрэй!
        </p>
      </div>

      <div className="liquid-card rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto relative overflow-hidden">
        {/* Top Controls / Score Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-white/50 block font-medium">Шилдэг амжилт</span>
              <span className="text-lg font-bold text-amber-300">
                {bestTime ? `${bestTime} ms` : 'Одоогоор байхгүй'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-white/60">
            <span>Оролдлого: <strong className="text-white font-mono">{attempts}</strong></span>
            {bestTime && (
              <span className="inline-flex items-center gap-1 text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <Award className="w-3.5 h-3.5" />
                Шилдэг: {bestTime}ms
              </span>
            )}
          </div>
        </div>

        {/* Interactive Game Arena */}
        <div
          onClick={handleAreaClick}
          className={`relative h-80 sm:h-96 rounded-2xl flex flex-col items-center justify-center text-center p-6 transition-all duration-300 select-none ${
            gameState === 'idle'
              ? 'bg-black/30 border border-white/10'
              : gameState === 'waiting'
              ? 'bg-rose-950/20 border border-rose-500/30 cursor-wait'
              : gameState === 'ready'
              ? 'bg-emerald-950/30 border border-emerald-500/50 cursor-crosshair'
              : gameState === 'early'
              ? 'bg-amber-950/30 border border-amber-500/40'
              : 'bg-black/40 border border-white/15'
          }`}
        >
          {/* State: Idle */}
          {gameState === 'idle' && (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-sky-300 shadow-inner">
                <Target className="w-8 h-8" />
              </div>
              <h3
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-3xl text-white font-normal"
              >
                Рефлексээ хэмжихэд бэлэн үү?
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-md mx-auto">
                "Эхлэх" дарсны дараа дэлгэц улаанаас ногоон болж бай гарч ирэх хүртэл хүлээнэ. Ногоон болох агшинд бай дээр аль болох хурдан дараарай!
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startTest();
                }}
                className="liquid-glass rounded-full px-8 py-3.5 text-sm font-semibold text-white inline-flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg mt-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Сорилтыг эхлүүлэх</span>
              </button>
            </div>
          )}

          {/* State: Waiting (Red warning, do not click yet) */}
          {gameState === 'waiting' && (
            <div className="space-y-3 pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/50 flex items-center justify-center mx-auto text-rose-300 animate-pulse">
                <Zap className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-rose-300">
                Хүлээнэ үү... Ногоон бай гарч иртэл бүү дараарай!
              </h4>
              <p className="text-xs text-rose-200/70">
                Анхаарлаа дэлгэцэнд төвлөрүүлнэ үү...
              </p>
            </div>
          )}

          {/* State: Ready (Target appeared!) */}
          {gameState === 'ready' && (
            <button
              onClick={handleTargetClick}
              style={{
                top: `${targetPos.top}%`,
                left: `${targetPos.left}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_40px_rgba(16,185,129,0.8)] border-2 border-white animate-ping-once transition-transform active:scale-90 cursor-pointer"
              aria-label="Бай дээр дарах"
            >
              <Target className="w-10 h-10 stroke-[2.5]" />
            </button>
          )}

          {/* State: Too Early */}
          {gameState === 'early' && (
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-300">
                <RotateCcw className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-bold text-amber-300">Хэтэрхий эрт дарлаа!</h4>
              <p className="text-sm text-white/70">
                Ногоон бай харагдахаас өмнө дарсан тул тооцогдохгүй.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startTest();
                }}
                className="liquid-glass rounded-full px-6 py-2.5 text-xs text-white hover:scale-105 transition-all cursor-pointer"
              >
                Дахин турших
              </button>
            </div>
          )}

          {/* State: Result */}
          {gameState === 'result' && reactionTime !== null && (
            <div className="space-y-4">
              <div className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/10 text-sky-200 border border-white/20">
                {getRankFeedback(reactionTime).badge}
              </div>

              <div className="text-5xl sm:text-6xl font-black text-white tracking-tight font-mono">
                {reactionTime} <span className="text-2xl font-normal text-white/60">ms</span>
              </div>

              <div>
                <h4 className={`text-xl font-bold ${getRankFeedback(reactionTime).color}`}>
                  {getRankFeedback(reactionTime).title}
                </h4>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1 max-w-sm mx-auto">
                  {getRankFeedback(reactionTime).desc}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startTest();
                  }}
                  className="liquid-glass rounded-full px-8 py-3 text-sm font-semibold text-white inline-flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Дахин тоглох</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Legend */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-amber-300 font-bold block">&lt; 200 ms</span>
            <span className="text-white/60">Мэргэжлийн кибер спорт</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-emerald-300 font-bold block">200 - 250 ms</span>
            <span className="text-white/60">Шилдэг рефлекс</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-sky-300 font-bold block">250 - 320 ms</span>
            <span className="text-white/60">Хэвийн хариу үйлдэл</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-rose-300 font-bold block">&gt; 320 ms</span>
            <span className="text-white/60">Дадлага хийх шаардлагатай</span>
          </div>
        </div>
      </div>
    </section>
  );
};
