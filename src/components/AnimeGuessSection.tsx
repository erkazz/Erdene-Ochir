import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Heart,
  Clock,
  Trophy,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  CheckCircle2,
  XCircle,
  Smile,
  Image as ImageIcon,
  UserCheck,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import animeData from '../data/data.json';

type GameMode = 'emoji' | 'anime' | 'character';
type GameScreen = 'menu' | 'playing' | 'finished';

interface AnimeQuestion {
  emoji?: string;
  image: string;
  answer: string;
  options: string[];
}

const QUESTION_TIME = 15;
const INITIAL_LIVES = 3;
const POINTS_PER_CORRECT = 10;

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const AnimeGuessSection: React.FC = () => {
  const [screen, setScreen] = useState<GameScreen>('menu');
  const [mode, setMode] = useState<GameMode>('emoji');
  const [questions, setQuestions] = useState<AnimeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answerStatus, setAnswerStatus] = useState<'idle' | 'correct' | 'wrong' | 'timeout'>('idle');
  const [imageReady, setImageReady] = useState(true);

  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAdvanceTimer = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  };

  const prepareQuestions = useCallback((selectedMode: GameMode): AnimeQuestion[] => {
    if (selectedMode === 'character') {
      return shuffleArray(animeData.characters).map((item) => ({
        ...item,
        options: shuffleArray(item.options),
      }));
    }

    if (selectedMode === 'anime') {
      const validImageQuestions = animeData.questions.filter(
        (q) => typeof q.image === 'string' && q.image.trim().length > 0
      );
      return shuffleArray(validImageQuestions).map((item) => ({
        ...item,
        options: shuffleArray(item.options),
      }));
    }

    // Emoji mode
    return shuffleArray(animeData.questions).map((item) => ({
      ...item,
      options: shuffleArray(item.options),
    }));
  }, []);

  const startGame = (selectedMode: GameMode) => {
    clearAdvanceTimer();
    const prepared = prepareQuestions(selectedMode);
    setMode(selectedMode);
    setQuestions(prepared);
    setCurrentIndex(0);
    setScore(0);
    setLives(INITIAL_LIVES);
    setCorrectCount(0);
    setTimeLeft(QUESTION_TIME);
    setSelectedOption(null);
    setAnswerStatus('idle');
    setImageReady(selectedMode === 'emoji');
    setScreen('playing');
  };

  const currentQuestion = questions[currentIndex];

  const moveToNextStep = useCallback(
    (updatedLives: number) => {
      clearAdvanceTimer();
      if (updatedLives <= 0 || currentIndex + 1 >= questions.length) {
        setScreen('finished');
        return;
      }
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setTimeLeft(QUESTION_TIME);
      setSelectedOption(null);
      setAnswerStatus('idle');
      setImageReady(mode === 'emoji');
    },
    [currentIndex, questions.length, mode]
  );

  // Skip broken/unloaded images automatically in Anime/Character modes without penalty
  const handleImageError = () => {
    if (screen !== 'playing' || answerStatus !== 'idle') return;
    clearAdvanceTimer();

    const updated = questions.filter((_, idx) => idx !== currentIndex);
    setQuestions(updated);

    if (updated.length === 0 || currentIndex >= updated.length) {
      setScreen('finished');
      return;
    }

    setTimeLeft(QUESTION_TIME);
    setSelectedOption(null);
    setAnswerStatus('idle');
    setImageReady(false);
  };

  // Countdown timer effect
  useEffect(() => {
    if (screen !== 'playing' || answerStatus !== 'idle' || !currentQuestion) {
      return;
    }

    // Wait until image loads in image-based modes before ticking down
    if ((mode === 'anime' || mode === 'character') && !imageReady) {
      return;
    }

    if (timeLeft <= 0) {
      const nextLives = lives - 1;
      setLives(nextLives);
      setAnswerStatus('timeout');
      advanceTimerRef.current = setTimeout(() => {
        moveToNextStep(nextLives);
      }, 1700);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [screen, answerStatus, timeLeft, currentQuestion, mode, imageReady, lives, moveToNextStep]);

  useEffect(() => {
    return () => clearAdvanceTimer();
  }, []);

  const handleOptionSelect = (option: string) => {
    if (answerStatus !== 'idle' || !currentQuestion) return;

    setSelectedOption(option);
    const isCorrect = option === currentQuestion.answer;

    if (isCorrect) {
      setScore((prev) => prev + POINTS_PER_CORRECT);
      setCorrectCount((prev) => prev + 1);
      setAnswerStatus('correct');
      advanceTimerRef.current = setTimeout(() => {
        moveToNextStep(lives);
      }, 1400);
    } else {
      const nextLives = lives - 1;
      setLives(nextLives);
      setAnswerStatus('wrong');
      advanceTimerRef.current = setTimeout(() => {
        moveToNextStep(nextLives);
      }, 1700);
    }
  };

  // Calculate blur pixels for Anime mode (clears every 3 seconds)
  const getBlurPx = (): number => {
    if (mode !== 'anime') return 0;
    if (answerStatus !== 'idle') return 0;
    const elapsed = QUESTION_TIME - timeLeft;
    if (elapsed < 3) return 24;
    if (elapsed < 6) return 16;
    if (elapsed < 9) return 9;
    if (elapsed < 12) return 4;
    return 0;
  };

  const getClarityStep = (): number => {
    const elapsed = QUESTION_TIME - timeLeft;
    return Math.min(5, Math.floor(elapsed / 3) + 1);
  };

  const modeLabel: Record<GameMode, string> = {
    emoji: 'Emoji горим',
    anime: 'Anime зураг горим',
    character: 'Баатар таах горим',
  };

  return (
    <section id="anime-guess" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-sky-300 bg-sky-500/10 border border-sky-400/30 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Интерактив Мини-Тоглоом</span>
        </div>

        <h2
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-4xl sm:text-6xl font-normal text-white tracking-tight"
        >
          Anime Guess
        </h2>

        <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg mt-4 leading-relaxed">
          Эможи, бүдэг зураг болон баатрын төрхөөр анимэ таах хөгжилтэй сорилт. 15 секундэд амжиж зөв хариулаад оноо цуглуулаарай!
        </p>
      </div>

      {/* Main Game Container */}
      <div className="liquid-card rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto border-sky-400/25 shadow-2xl">
        {/* MENU SCREEN */}
        {screen === 'menu' && (
          <div className="py-4 text-center">
            <h3
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-3xl sm:text-4xl text-white font-normal mb-3"
            >
              Ямар горимоор тоглох вэ?
            </h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-8">
              Асуулт бүрт 15 секунд • Нийт 3 амь • Зөв хариулт бүр +10 оноо
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
              {/* Mode 1: Emoji */}
              <button
                onClick={() => startGame('emoji')}
                className="group liquid-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-amber-400/50 transition-all cursor-pointer text-left border border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300">
                      <Smile className="w-6 h-6" />
                    </div>
                    <span className="text-2xl">🍥🦊</span>
                  </div>
                  <h4
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                    className="text-2xl text-white font-normal group-hover:text-amber-200 transition-colors"
                  >
                    Emoji
                  </h4>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 leading-relaxed">
                    Том эможи дүрсүүдийг хараад аль анимэ болохыг 4 сонголтоос таана.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-amber-300">
                  <span>{animeData.questions.length} асуулт</span>
                  <span className="group-hover:translate-x-1 transition-transform">Тоглох →</span>
                </div>
              </button>

              {/* Mode 2: Anime */}
              <button
                onClick={() => startGame('anime')}
                className="group liquid-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-sky-400/50 transition-all cursor-pointer text-left border border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-1 rounded bg-sky-500/10 text-sky-300 border border-sky-400/20">
                      Blur 3s
                    </span>
                  </div>
                  <h4
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                    className="text-2xl text-white font-normal group-hover:text-sky-200 transition-colors"
                  >
                    Anime
                  </h4>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 leading-relaxed">
                    Бүдэг зураг 3 секунд тутам аажмаар тодорно. Хурдан таах тусам гоё!
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-sky-300">
                  <span>Зургаар таах</span>
                  <span className="group-hover:translate-x-1 transition-transform">Тоглох →</span>
                </div>
              </button>

              {/* Mode 3: Character */}
              <button
                onClick={() => startGame('character')}
                className="group liquid-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-emerald-400/50 transition-all cursor-pointer text-left border border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-400/20">
                      Heroes
                    </span>
                  </div>
                  <h4
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                    className="text-2xl text-white font-normal group-hover:text-emerald-200 transition-colors"
                  >
                    Баатар
                  </h4>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 leading-relaxed">
                    Алдартай анимэ баатруудын зургийг хараад нэрийг нь 4 сонголтоос олно.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-300">
                  <span>{animeData.characters.length} баатар</span>
                  <span className="group-hover:translate-x-1 transition-transform">Тоглох →</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* PLAYING SCREEN */}
        {screen === 'playing' && currentQuestion && (
          <div>
            {/* Always-visible HUD: Score, Lives, Timer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 border-b border-white/10">
              {/* Score + Question Counter */}
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-400/25 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span className="text-xs text-white/70">Оноо:</span>
                  <span className="text-base font-bold text-amber-300 font-mono">{score}</span>
                </div>

                <span className="text-xs font-mono text-white/60 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                  {currentIndex + 1} / {questions.length}
                </span>
              </div>

              {/* Lives */}
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-white/60 mr-1">Амь:</span>
                {Array.from({ length: INITIAL_LIVES }).map((_, idx) => {
                  const alive = idx < lives;
                  return (
                    <Heart
                      key={idx}
                      className={`w-4 h-4 transition-all duration-300 ${
                        alive
                          ? 'text-rose-400 fill-rose-400 drop-shadow-[0_0_6px_rgba(251,113,133,0.6)]'
                          : 'text-white/15 fill-transparent scale-90'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Timer + Switch Mode */}
              <div className="flex items-center gap-3">
                <div
                  className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-mono transition-colors ${
                    timeLeft <= 5 && answerStatus === 'idle'
                      ? 'bg-rose-500/20 border-rose-400/50 text-rose-300 animate-pulse'
                      : 'bg-sky-500/10 border-sky-400/25 text-sky-200'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span className="text-base font-bold">{timeLeft}с</span>
                </div>

                <button
                  onClick={() => {
                    clearAdvanceTimer();
                    setScreen('menu');
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Горим солих"
                  aria-label="Горим солих"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Countdown Progress Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-8">
              <div
                className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                  timeLeft <= 5 ? 'bg-rose-400' : 'bg-gradient-to-r from-sky-400 to-amber-300'
                }`}
                style={{ width: `${(timeLeft / QUESTION_TIME) * 100}%` }}
              />
            </div>

            {/* Mode Badge */}
            <div className="text-center mb-4">
              <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                {modeLabel[mode]}
              </span>
            </div>

            {/* Visual Prompt Area */}
            <div className="rounded-2xl bg-black/35 border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[260px] mb-8 relative overflow-hidden">
              {mode === 'emoji' && (
                <div className="text-center space-y-4">
                  <div className="text-5xl sm:text-7xl tracking-[0.2em] select-none py-3">
                    {currentQuestion.emoji}
                  </div>
                  <p className="text-xs text-white/50">
                    Дээрх эможи ямар анимэг илэрхийлж байна вэ?
                  </p>
                </div>
              )}

              {(mode === 'anime' || mode === 'character') && (
                <div className="relative flex flex-col items-center justify-center w-full">
                  {!imageReady && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
                      <Loader2 className="w-8 h-8 text-sky-300 animate-spin" />
                      <span className="text-xs text-white/60">Зураг ачаалж байна...</span>
                    </div>
                  )}

                  <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
                    <img
                      key={currentQuestion.image}
                      src={currentQuestion.image}
                      alt={answerStatus !== 'idle' ? currentQuestion.answer : 'Таах зураг'}
                      onLoad={() => setImageReady(true)}
                      onError={handleImageError}
                      style={{
                        filter: `blur(${getBlurPx()}px)`,
                        transition: 'filter 0.6s ease',
                      }}
                      className={`w-full h-full ${
                        mode === 'character' ? 'object-contain p-2' : 'object-cover'
                      } ${imageReady ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </div>

                  {mode === 'anime' && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                      <span>Тодролт:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((step) => (
                          <span
                            key={step}
                            className={`w-4 h-1.5 rounded-full transition-colors ${
                              step <= getClarityStep() || answerStatus !== 'idle'
                                ? 'bg-sky-400'
                                : 'bg-white/15'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white/40">(3 сек тутам тодорно)</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option;
                const isCorrectAnswer = option === currentQuestion.answer;
                const hasEndedTurn = answerStatus !== 'idle';

                let buttonStyle =
                  'bg-white/5 border-white/15 text-white hover:bg-white/10 hover:border-sky-400/40 hover:-translate-y-0.5 cursor-pointer';

                if (hasEndedTurn) {
                  if (isCorrectAnswer) {
                    buttonStyle =
                      'bg-emerald-500/25 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-default';
                  } else if (isSelected && !isCorrectAnswer) {
                    buttonStyle =
                      'bg-rose-500/25 border-rose-400 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.2)] cursor-default';
                  } else {
                    buttonStyle = 'bg-white/[0.02] border-white/5 text-white/35 cursor-default';
                  }
                }

                return (
                  <button
                    key={option}
                    disabled={hasEndedTurn}
                    onClick={() => handleOptionSelect(option)}
                    className={`rounded-2xl px-5 py-4 border text-left font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-between gap-3 ${buttonStyle}`}
                  >
                    <span>{option}</span>
                    {hasEndedTurn && isCorrectAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                    )}
                    {hasEndedTurn && isSelected && !isCorrectAnswer && (
                      <XCircle className="w-5 h-5 text-rose-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback Bar */}
            {answerStatus !== 'idle' && (
              <div
                className={`mt-6 p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
                  answerStatus === 'correct'
                    ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200'
                    : 'bg-rose-500/15 border-rose-400/40 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2.5 text-sm font-medium">
                  {answerStatus === 'correct' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                      <span>Зөв байна! +10 оноо нэмэгдлээ.</span>
                    </>
                  ) : answerStatus === 'timeout' ? (
                    <>
                      <Clock className="w-5 h-5 text-rose-300 shrink-0" />
                      <span>
                        Хугацаа дууслаа! Зөв хариу: <strong className="text-white">{currentQuestion.answer}</strong>
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-300 shrink-0" />
                      <span>
                        Буруу байна! Зөв хариу: <strong className="text-white">{currentQuestion.answer}</strong>
                      </span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => moveToNextStep(lives)}
                  className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Дараагийнх</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* FINISHED SCREEN */}
        {screen === 'finished' && (
          <div className="py-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-300 shadow-lg">
              <Trophy className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-sky-300 font-semibold block mb-2">
                {lives <= 0 ? 'Амь дууслаа' : 'Баяр хүргэе! Сорилт дууслаа'}
              </span>
              <h3
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-4xl sm:text-5xl text-white font-normal"
              >
                Таны нийт оноо: {score}
              </h3>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">
                {modeLabel[mode]} • Зөв хариулсан: <strong className="text-white">{correctCount}</strong>
              </p>
            </div>

            {/* Stats Pills */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-white/50 block">Нийт оноо</span>
                <span className="text-2xl font-bold text-amber-300 font-mono">{score}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-white/50 block">Зөв хариулт</span>
                <span className="text-2xl font-bold text-emerald-300 font-mono">{correctCount}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-white/50 block">Үлдсэн амь</span>
                <span className="text-2xl font-bold text-rose-300 font-mono">{lives}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => startGame(mode)}
                className="liquid-glass rounded-full px-8 py-3.5 text-sm font-semibold text-white inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer border-sky-400/40"
              >
                <RotateCcw className="w-4 h-4 text-sky-300" />
                <span>Дахин тоглох</span>
              </button>

              <button
                onClick={() => setScreen('menu')}
                className="liquid-glass rounded-full px-8 py-3.5 text-sm font-semibold text-white/90 inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-amber-300" />
                <span>Горим солих</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
