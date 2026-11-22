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
  Medal,
  Crown,
  Save,
  Calendar,
  Shield,
  Trash2,
  LogOut,
  Play,
  X,
  Gamepad2,
} from 'lucide-react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import animeData from '../data/data.json';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';

type GameMode = 'emoji' | 'anime' | 'character';
type GameScreen = 'menu' | 'playing' | 'finished';
export type AnimeModalView = 'game' | 'leaderboard';

interface AnimeGuessSectionProps {
  isOpen: boolean;
  initialView?: AnimeModalView;
  onClose: () => void;
}

interface AnimeQuestion {
  emoji?: string;
  image: string;
  answer: string;
  options: string[];
}

interface ScoreRecord {
  id: string;
  name: string;
  score: number;
  mode: GameMode;
  createdAt: Timestamp | null;
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

function formatScoreDate(ts: Timestamp | null): string {
  if (!ts || typeof ts.toDate !== 'function') return 'Саяхан';
  const date = ts.toDate();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${y}.${m}.${d} ${hh}:${mm}`;
}

export const AnimeGuessSection: React.FC<AnimeGuessSectionProps> = ({
  isOpen,
  initialView = 'game',
  onClose,
}) => {
  const [modalView, setModalView] = useState<AnimeModalView>(initialView);

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

  // Score saving state (on finished screen)
  const [playerName, setPlayerName] = useState('');
  const [isSavingScore, setIsSavingScore] = useState(false);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [lastSavedId, setLastSavedId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Live Leaderboard state
  const [leaderboardTab, setLeaderboardTab] = useState<GameMode>('emoji');
  const [allScores, setAllScores] = useState<ScoreRecord[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [adminMessage, setAdminMessage] = useState<string | null>(null);

  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isAdminUser =
    currentUser?.email === 'erkaz0316@gmail.com' && currentUser?.emailVerified === true;

  const clearAdvanceTimer = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    clearAdvanceTimer();
    setModalView(initialView);
    if (initialView === 'game') {
      setScreen('menu');
      setAnswerStatus('idle');
    }
  }, [isOpen, initialView]);

  const closeGameModal = useCallback(() => {
    clearAdvanceTimer();
    setScreen('menu');
    setAnswerStatus('idle');
    onClose();
  }, [onClose]);

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

    return shuffleArray(animeData.questions).map((item) => ({
      ...item,
      options: shuffleArray(item.options),
    }));
  }, []);

  const startGame = (selectedMode: GameMode) => {
    clearAdvanceTimer();
    const prepared = prepareQuestions(selectedMode);
    setMode(selectedMode);
    setLeaderboardTab(selectedMode);
    setQuestions(prepared);
    setCurrentIndex(0);
    setScore(0);
    setLives(INITIAL_LIVES);
    setCorrectCount(0);
    setTimeLeft(QUESTION_TIME);
    setSelectedOption(null);
    setAnswerStatus('idle');
    setImageReady(selectedMode === 'emoji');
    setScoreSaved(false);
    setLastSavedId(null);
    setSaveError(null);
    setModalView('game');
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

  // Skip broken/unloaded images automatically without penalty
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

  // Lock body scroll and handle Escape key while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeGameModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, closeGameModal]);

  // Countdown timer effect
  useEffect(() => {
    if (!isOpen || modalView !== 'game' || screen !== 'playing' || answerStatus !== 'idle' || !currentQuestion) {
      return;
    }

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
  }, [isOpen, modalView, screen, answerStatus, timeLeft, currentQuestion, mode, imageReady, lives, moveToNextStep]);

  useEffect(() => {
    return () => clearAdvanceTimer();
  }, []);

  // Live Firestore Leaderboard listener (active when game modal is open)
  useEffect(() => {
    if (!isOpen) return;

    let active = true;
    let unsubscribePrimary: (() => void) | null = null;
    let unsubscribeFallback: (() => void) | null = null;

    setLeaderboardLoading(true);
    setLeaderboardError(null);

    const scoresRef = collection(db, 'scores');
    const primaryQuery = query(scoresRef, orderBy('score', 'desc'), limit(300));

    const mapSnapshotDocs = (docs: { id: string; data: () => Record<string, unknown> }[]): ScoreRecord[] =>
      docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          name: typeof data.name === 'string' ? data.name : 'Тоглогч',
          score: typeof data.score === 'number' ? data.score : 0,
          mode:
            data.mode === 'anime' || data.mode === 'character'
              ? data.mode
              : 'emoji',
          createdAt: (data.createdAt as Timestamp) ?? null,
        };
      });

    unsubscribePrimary = onSnapshot(
      primaryQuery,
      (snapshot) => {
        if (!active) return;
        setAllScores(mapSnapshotDocs(snapshot.docs));
        setLeaderboardLoading(false);
      },
      (error) => {
        if (!active) return;
        const message = error instanceof Error ? error.message : String(error);

        if (message.includes('index') || message.includes('failed-precondition')) {
          const fallbackQuery = query(scoresRef, limit(300));
          unsubscribeFallback = onSnapshot(
            fallbackQuery,
            (snap) => {
              if (!active) return;
              const rows = mapSnapshotDocs(snap.docs).sort((a, b) => b.score - a.score);
              setAllScores(rows);
              setLeaderboardLoading(false);
            },
            (fallbackErr) => {
              if (!active) return;
              setLeaderboardLoading(false);
              setLeaderboardError('Онооны самбарыг ачааллахад алдаа гарлаа.');
              try {
                handleFirestoreError(fallbackErr, OperationType.LIST, 'scores');
              } catch {
                // Logged by handleFirestoreError
              }
            }
          );
          return;
        }

        setLeaderboardLoading(false);
        if (message.includes('Quota exceeded')) {
          setLeaderboardError('Өдрийн үнэгүй уншилтын хязгаар хэтэрлээ. Маргааш дахин оролдоно уу.');
        } else {
          setLeaderboardError('Онооны самбарыг ачааллахад алдаа гарлаа.');
        }
        try {
          handleFirestoreError(error, OperationType.LIST, 'scores');
        } catch {
          // Handled via UI state
        }
      }
    );

    return () => {
      active = false;
      if (unsubscribePrimary) unsubscribePrimary();
      if (unsubscribeFallback) unsubscribeFallback();
    };
  }, [isOpen]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && user.email !== 'erkaz0316@gmail.com') {
        setAdminMessage('Зөвхөн админ эрхтэй хаягаар устгах боломжтой.');
      } else {
        setAdminMessage(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAdminSignIn = async () => {
    setAdminMessage(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch {
      setAdminMessage('Нэвтрэх цонх хаагдлаа эсвэл алдаа гарлаа.');
    }
  };

  const handleAdminSignOut = async () => {
    setAdminMessage(null);
    await signOut(auth);
  };

  const handleDeleteScore = async (scoreId: string) => {
    if (!isAdminUser || deletingId) return;
    setDeletingId(scoreId);
    setAdminMessage(null);
    try {
      await deleteDoc(doc(db, 'scores', scoreId));
    } catch (error) {
      setAdminMessage('Бичлэгийг устгахад алдаа гарлаа.');
      try {
        handleFirestoreError(error, OperationType.DELETE, `scores/${scoreId}`);
      } catch {
        // Logged by handleFirestoreError
      }
    } finally {
      setDeletingId(null);
    }
  };

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

  const handleSaveScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSavingScore || scoreSaved) return;

    const trimmedName = playerName.trim().slice(0, 40);
    if (!trimmedName) {
      setSaveError('Тоглогчийн нэрээ оруулна уу.');
      return;
    }

    setIsSavingScore(true);
    setSaveError(null);

    try {
      const docRef = await addDoc(collection(db, 'scores'), {
        name: trimmedName,
        score,
        mode,
        createdAt: serverTimestamp(),
      });
      setScoreSaved(true);
      setLastSavedId(docRef.id);
      setLeaderboardTab(mode);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes('Quota exceeded')) {
        setSaveError('Өдрийн үнэгүй хязгаар дууссан тул түр хадгалах боломжгүй байна.');
      } else {
        setSaveError('Оноо хадгалах үед алдаа гарлаа. Дахин оролдоно уу.');
      }
      try {
        handleFirestoreError(error, OperationType.CREATE, 'scores');
      } catch {
        // Logged by handleFirestoreError
      }
    } finally {
      setIsSavingScore(false);
    }
  };

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
    emoji: 'Emoji',
    anime: 'Anime',
    character: 'Баатар',
  };

  const filteredTop10 = allScores
    .filter((entry) => entry.mode === leaderboardTab)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#001222]/85 backdrop-blur-xl overflow-y-auto px-4 sm:px-6 py-8 sm:py-12 flex items-start sm:items-center justify-center"
      onClick={() => {
        if (modalView !== 'game' || screen !== 'playing') {
          closeGameModal();
        }
      }}
    >
          <div
            className="liquid-card rounded-3xl p-6 sm:p-10 w-full max-w-4xl border border-sky-400/30 shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-2xl sm:text-3xl text-white font-normal"
                >
                  Anime Guess
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalView('game')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 border ${
                    modalView === 'game'
                      ? 'bg-sky-500/20 text-white border-sky-400/50'
                      : 'bg-white/5 text-white/60 hover:text-white border-white/10'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Тоглоом</span>
                </button>

                <button
                  onClick={() => {
                    clearAdvanceTimer();
                    setModalView('leaderboard');
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 border ${
                    modalView === 'leaderboard'
                      ? 'bg-amber-500/20 text-amber-200 border-amber-400/50'
                      : 'bg-white/5 text-white/60 hover:text-white border-white/10'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  <span>Leaderboard</span>
                </button>

                <button
                  onClick={closeGameModal}
                  className="ml-1 p-2 rounded-full bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/40 text-white/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Хаах"
                  title="Портфолио руу буцах"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* GAME VIEW */}
            {modalView === 'game' && (
              <>
                {/* MENU SCREEN */}
                {screen === 'menu' && (
                  <div className="py-2 text-center">
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
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
                      <div
                        className={`h-full transition-all duration-1000 ease-linear rounded-full ${
                          timeLeft <= 5 ? 'bg-rose-400' : 'bg-gradient-to-r from-sky-400 to-amber-300'
                        }`}
                        style={{ width: `${(timeLeft / QUESTION_TIME) * 100}%` }}
                      />
                    </div>

                    <div className="text-center mb-4">
                      <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                        {modeLabel[mode]} горим
                      </span>
                    </div>

                    {/* Visual Prompt Area */}
                    <div className="rounded-2xl bg-black/35 border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-center min-h-[210px] sm:min-h-[250px] mb-6 relative overflow-hidden">
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

                          <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
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
                  <div className="py-4 text-center space-y-6">
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
                        {modeLabel[mode]} горим • Зөв хариулсан: <strong className="text-white">{correctCount}</strong>
                      </p>
                    </div>

                    {/* Stats Pills */}
                    <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
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

                    {/* Save Score to Firestore Form */}
                    <div className="max-w-md mx-auto rounded-2xl bg-black/35 border border-white/15 p-5 text-left">
                      {!scoreSaved ? (
                        <form onSubmit={handleSaveScore} className="space-y-3">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-sky-300">
                            Оноогоо Leaderboard-т хадгалах
                          </label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">
                            Тоглогчийн нэрээ бичээд хадгална уу ({modeLabel[mode]} · {score} оноо):
                          </p>

                          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                            <input
                              type="text"
                              maxLength={40}
                              value={playerName}
                              onChange={(e) => setPlayerName(e.target.value)}
                              placeholder="Таны нэр (жишээ: Эрдэнэ-Очир)"
                              className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-sky-400"
                              disabled={isSavingScore}
                            />
                            <button
                              type="submit"
                              disabled={isSavingScore}
                              className="liquid-glass rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold text-white inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-emerald-400/30 disabled:opacity-50"
                            >
                              {isSavingScore ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>Хадгалж байна...</span>
                                </>
                              ) : (
                                <>
                                  <Save className="w-4 h-4 text-emerald-300" />
                                  <span>Хадгалах</span>
                                </>
                              )}
                            </button>
                          </div>

                          {saveError && (
                            <p className="text-xs text-rose-300 mt-1">{saveError}</p>
                          )}
                        </form>
                      ) : (
                        <div className="flex flex-wrap items-center justify-between gap-3 text-emerald-200">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                            <span>Амжилттай хадгалагдлаа!</span>
                          </div>
                          <button
                            onClick={() => {
                              setLeaderboardTab(mode);
                              setModalView('leaderboard');
                            }}
                            className="px-4 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-xs font-semibold text-emerald-100 cursor-pointer transition-colors"
                          >
                            Leaderboard харах →
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => startGame(mode)}
                        className="liquid-glass rounded-full px-7 py-3 text-sm font-semibold text-white inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer border-sky-400/40"
                      >
                        <RotateCcw className="w-4 h-4 text-sky-300" />
                        <span>Дахин тоглох</span>
                      </button>

                      <button
                        onClick={() => setScreen('menu')}
                        className="liquid-glass rounded-full px-7 py-3 text-sm font-semibold text-white/90 inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <SlidersHorizontal className="w-4 h-4 text-amber-300" />
                        <span>Горим солих</span>
                      </button>

                      <button
                        onClick={() => {
                          setLeaderboardTab(mode);
                          setModalView('leaderboard');
                        }}
                        className="liquid-glass rounded-full px-7 py-3 text-sm font-semibold text-amber-200 inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer border-amber-400/30"
                      >
                        <Trophy className="w-4 h-4 text-amber-300" />
                        <span>Leaderboard</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* LEADERBOARD VIEW */}
            {modalView === 'leaderboard' && (
              <div className="py-2">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <h3
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                      className="text-3xl text-white font-normal"
                    >
                      Шилдэг 10 тоглогч (Leaderboard)
                    </h3>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      Firestore-оос оноогоор их → бага эрэмбэлэгдсэн (ТОП 10)
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono text-white/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      Нийт бичлэг: {allScores.filter((s) => s.mode === leaderboardTab).length}
                    </span>

                    {!currentUser ? (
                      <button
                        onClick={handleAdminSignIn}
                        className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/60 hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Админ эрхээр нэвтэрч бичлэг устгах"
                      >
                        <Shield className="w-3.5 h-3.5 text-sky-300" />
                        <span>Admin</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleAdminSignOut}
                        className={`px-3 py-1.5 rounded-full border text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                          isAdminUser
                            ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/25'
                            : 'bg-rose-500/15 border-rose-400/40 text-rose-200 hover:bg-rose-500/25'
                        }`}
                        title="Гарах"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        <span>{isAdminUser ? 'Admin' : 'Эрхгүй'}</span>
                        <LogOut className="w-3 h-3 opacity-80" />
                      </button>
                    )}
                  </div>
                </div>

                {adminMessage && (
                  <div className="mb-4 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200">
                    {adminMessage}
                  </div>
                )}

                {/* Mode Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2.5 mb-6">
                  {(['emoji', 'anime', 'character'] as GameMode[]).map((tabMode) => {
                    const isActive = leaderboardTab === tabMode;
                    const modeCount = allScores.filter((s) => s.mode === tabMode).length;
                    return (
                      <button
                        key={tabMode}
                        onClick={() => setLeaderboardTab(tabMode)}
                        className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer inline-flex items-center gap-2 border ${
                          isActive
                            ? 'bg-sky-500/20 text-white border-sky-400/50 shadow-md'
                            : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border-white/10'
                        }`}
                      >
                        {tabMode === 'emoji' && <Smile className="w-4 h-4 text-amber-300" />}
                        {tabMode === 'anime' && <ImageIcon className="w-4 h-4 text-sky-300" />}
                        {tabMode === 'character' && <UserCheck className="w-4 h-4 text-emerald-300" />}
                        <span>{modeLabel[tabMode]}</span>
                        <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-black/30 text-white/70">
                          {modeCount}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Leaderboard List */}
                {leaderboardLoading ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-3 text-white/60">
                    <Loader2 className="w-8 h-8 text-sky-300 animate-spin" />
                    <span className="text-sm">Онооны самбар ачааллаж байна...</span>
                  </div>
                ) : leaderboardError ? (
                  <div className="py-10 text-center rounded-2xl bg-rose-500/10 border border-rose-400/30 p-6">
                    <p className="text-sm text-rose-200">{leaderboardError}</p>
                  </div>
                ) : filteredTop10.length === 0 ? (
                  <div className="py-12 text-center rounded-2xl bg-black/30 border border-white/10 p-6 space-y-4">
                    <Trophy className="w-10 h-10 text-white/25 mx-auto" />
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      <strong>{modeLabel[leaderboardTab]}</strong> горимд одоогоор оноо хадгалагдаагүй байна. Тоглоод хамгийн анхны оноог бичүүлээрэй!
                    </p>
                    <button
                      onClick={() => startGame(leaderboardTab)}
                      className="liquid-glass rounded-full px-6 py-2.5 text-xs font-semibold text-white hover:scale-105 transition-transform cursor-pointer"
                    >
                      {modeLabel[leaderboardTab]} горимоор тоглох →
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredTop10.map((entry, idx) => {
                      const rank = idx + 1;
                      const isFirst = rank === 1;
                      const isSecond = rank === 2;
                      const isThird = rank === 3;
                      const isJustSaved = lastSavedId === entry.id;

                      let rowClass =
                        'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]';
                      let rankBadgeClass =
                        'bg-white/10 text-white/70 border-white/10';
                      let scoreClass = 'text-sky-200';

                      if (isFirst) {
                        rowClass =
                          'bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent border-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.12)]';
                        rankBadgeClass =
                          'bg-amber-400 text-black border-amber-200 font-black';
                        scoreClass = 'text-amber-300';
                      } else if (isSecond) {
                        rowClass =
                          'bg-gradient-to-r from-slate-300/15 via-slate-300/5 to-transparent border-slate-300/40';
                        rankBadgeClass =
                          'bg-slate-200 text-slate-900 border-white font-black';
                        scoreClass = 'text-slate-200';
                      } else if (isThird) {
                        rowClass =
                          'bg-gradient-to-r from-orange-500/15 via-orange-400/5 to-transparent border-orange-400/40';
                        rankBadgeClass =
                          'bg-orange-400 text-black border-orange-200 font-black';
                        scoreClass = 'text-orange-300';
                      }

                      return (
                        <div
                          key={entry.id}
                          className={`rounded-2xl px-4 sm:px-6 py-3.5 border flex items-center justify-between gap-4 transition-all ${rowClass} ${
                            isJustSaved ? 'ring-2 ring-emerald-400/70' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div
                              className={`w-9 h-9 rounded-xl border flex items-center justify-center text-sm font-mono shrink-0 ${rankBadgeClass}`}
                            >
                              {isFirst ? (
                                <Crown className="w-4 h-4" />
                              ) : isSecond || isThird ? (
                                <Medal className="w-4 h-4" />
                              ) : (
                                rank
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`font-semibold truncate ${
                                    rank <= 3 ? 'text-white text-base' : 'text-white/90 text-sm'
                                  }`}
                                >
                                  {entry.name}
                                </span>
                                {isFirst && (
                                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30">
                                    #1 Аварга
                                  </span>
                                )}
                                {isSecond && (
                                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-300/20 text-slate-200 border border-slate-300/30">
                                    #2 Дэд байр
                                  </span>
                                )}
                                {isThird && (
                                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-orange-400/20 text-orange-200 border border-orange-400/30">
                                    #3 Гутгаар
                                  </span>
                                )}
                                {isJustSaved && (
                                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                                    Таны оноо
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5 text-[11px] text-white/45 mt-0.5">
                                <Calendar className="w-3 h-3" />
                                <span>{formatScoreDate(entry.createdAt)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right">
                              <span className={`text-lg sm:text-xl font-bold font-mono ${scoreClass}`}>
                                {entry.score}
                              </span>
                              <span className="text-xs text-white/50 ml-1">оноо</span>
                            </div>

                            {isAdminUser && (
                              <button
                                onClick={() => handleDeleteScore(entry.id)}
                                disabled={deletingId === entry.id}
                                className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/30 border border-rose-400/30 text-rose-300 hover:text-rose-100 transition-colors cursor-pointer disabled:opacity-50"
                                title="Бичлэгийг устгах"
                                aria-label={`${entry.name} бичлэгийг устгах`}
                              >
                                {deletingId === entry.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
        </div>
    </div>
  );
};
