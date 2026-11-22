import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Code2,
  Sparkles,
  Play,
  CheckCircle2,
  ArrowUpRight,
  Terminal,
  RefreshCw,
  Calculator,
  Calendar,
  ArrowRightLeft,
  GraduationCap,
  X,
} from 'lucide-react';
import { profileData } from '../data/portfolioData';

type ProblemId = 'amidarsan' | 'ireedui' | 'tongorog' | 'dun';

interface Problem {
  id: ProblemId;
  lesson: string;
  kind: string;
  title: string;
  description: string;
  codeSnippet: string;
}

interface JavaScriptSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const problems: Problem[] = [
  {
    id: 'amidarsan',
    lesson: 'Хичээл 8',
    kind: 'Code Battle',
    title: 'Амьдарсан хугацаа',
    description: 'Насаар амьдарсан өдөр, цаг, минутыг нарийвчлан тооцоолно.',
    codeSnippet: `function bodolt(nas) {
  const odor = nas * 365;
  const tsag = odor * 24;
  const minut = tsag * 60;
  return { odor, tsag, minut };
}`,
  },
  {
    id: 'ireedui',
    lesson: 'Хичээл 8',
    kind: 'Дасгал 3',
    title: 'Ирээдүйн нас',
    description: 'Төрсөн он болон ирээдүйн оноор тухайн үеийн насыг олно.',
    codeSnippet: `function bodolt(torsonOn, irehOn) {
  const ireeduid = irehOn - torsonOn;
  return \`Та \${irehOn} онд \${ireeduid} настай байна.\`;
}`,
  },
  {
    id: 'tongorog',
    lesson: 'Хичээл 8',
    kind: 'Code Battle',
    title: 'Тонгорогдсон тоо',
    description: 'Оруулсан 4 оронтой тооны цифрүүдийн дарааллыг урвуулна.',
    codeSnippet: `function bodolt(too) {
  const urvuu = String(too).split('').reverse().join('');
  return Number(urvuu);
}`,
  },
  {
    id: 'dun',
    lesson: 'Хичээл 9',
    kind: 'Дасгал 5',
    title: 'Үсгэн дүн',
    description: '0–100 оноонд тохирох Монгол стандарт үсгэн дүнг гаргана.',
    codeSnippet: `function bodolt(onoo) {
  if (onoo >= 90) return 'A (Онц)';
  if (onoo >= 80) return 'B (Сайн)';
  if (onoo >= 70) return 'C (Дунд)';
  if (onoo >= 60) return 'D (Хангалттай)';
  return 'F (Хангалтгүй)';
}`,
  },
];

export const JavaScriptSection: React.FC<JavaScriptSectionProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<ProblemId>('amidarsan');

  // Problem 1: Amidarsan hugatsaa state
  const [nasInput, setNasInput] = useState<number>(14);
  const [nasResult, setNasResult] = useState<{ odor: number; tsag: number; minut: number } | null>({
    odor: 14 * 365,
    tsag: 14 * 365 * 24,
    minut: 14 * 365 * 24 * 60,
  });

  // Problem 2: Ireeduin nas state
  const [torsonOn, setTorsonOn] = useState<number>(2012);
  const [irehOn, setIrehOn] = useState<number>(2030);
  const [ireeduiResult, setIreeduiResult] = useState<number | null>(18);

  // Problem 3: Tongorog too state
  const [tooInput, setTooInput] = useState<string>('2026');
  const [tongorogResult, setTongorogResult] = useState<string | null>('6202');

  // Problem 4: Dun state
  const [onooInput, setOnooInput] = useState<number>(95);
  const [dunResult, setDunResult] = useState<string | null>('A (Онц)');

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeProblem = problems.find((p) => p.id === activeTab)!;

  const handleCalculateNas = () => {
    if (nasInput >= 0) {
      const odor = nasInput * 365;
      const tsag = odor * 24;
      const minut = tsag * 60;
      setNasResult({ odor, tsag, minut });
    }
  };

  const handleCalculateIreedui = () => {
    if (irehOn >= torsonOn) {
      setIreeduiResult(irehOn - torsonOn);
    }
  };

  const handleCalculateTongorog = () => {
    if (tooInput) {
      setTongorogResult(tooInput.split('').reverse().join(''));
    }
  };

  const handleCalculateDun = () => {
    if (onooInput >= 90) setDunResult('A (Онц — 90–100)');
    else if (onooInput >= 80) setDunResult('B (Сайн — 80–89)');
    else if (onooInput >= 70) setDunResult('C (Дунд — 70–79)');
    else if (onooInput >= 60) setDunResult('D (Хангалттай — 60–69)');
    else setDunResult('F (Хангалтгүй — 0–59)');
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#001222]/85 backdrop-blur-xl overflow-y-auto px-4 sm:px-6 py-8 sm:py-12 flex items-start sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="liquid-card rounded-3xl p-6 sm:p-10 w-full max-w-5xl border border-amber-400/30 shadow-2xl relative my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-2xl sm:text-3xl text-white font-normal block leading-none"
              >
                JavaScript бодлогууд
              </span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                Хичээл 8–11 · Интерактив кодын дасгал
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={profileData.javascriptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full text-xs font-semibold text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Сайт дээр үзэх</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/40 text-white/70 hover:text-white transition-colors cursor-pointer"
              aria-label="Хаах"
              title="Тоглоом хэсэг рүү буцах"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top Tab Bar: Selection of exercises */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pb-6 border-b border-white/10">
          <span className="text-xs font-mono uppercase tracking-wider text-white/40 mr-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-300" />
            Бодлого сонгох:
          </span>

          {problems.map((prob) => {
            const isActive = activeTab === prob.id;
            return (
              <button
                key={prob.id}
                onClick={() => setActiveTab(prob.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 shadow-md'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <span>{prob.title}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-white/60 font-mono">
                  {prob.lesson}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Body: Left is Interactive Runner, Right is Code & Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
          {/* Interactive Calculator Box */}
          <div className="lg:col-span-7 rounded-2xl bg-black/40 border border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-mono text-amber-300 font-semibold">
                    {activeProblem.lesson} · {activeProblem.kind}
                  </span>
                  <h3
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                    className="text-3xl text-white font-normal mt-1"
                  >
                    {activeProblem.title}
                  </h3>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {activeTab === 'amidarsan' && <Calendar className="w-5 h-5" />}
                  {activeTab === 'ireedui' && <Calculator className="w-5 h-5" />}
                  {activeTab === 'tongorog' && <ArrowRightLeft className="w-5 h-5" />}
                  {activeTab === 'dun' && <GraduationCap className="w-5 h-5" />}
                </div>
              </div>

              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed">
                {activeProblem.description}
              </p>

              {/* Form Input depending on activeTab */}
              {activeTab === 'amidarsan' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5">
                      Насаа оруулна уу (жишээ: 14):
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        min="0"
                        value={nasInput}
                        onChange={(e) => setNasInput(Number(e.target.value))}
                        className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-400 w-full"
                        placeholder="Жишээ: 14"
                      />
                      <button
                        onClick={handleCalculateNas}
                        className="liquid-glass rounded-xl px-5 py-2.5 text-xs font-semibold text-white whitespace-nowrap hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Тооцоолох</span>
                      </button>
                    </div>
                  </div>

                  {nasResult && (
                    <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-400/20 grid grid-cols-3 gap-3 text-center">
                      <div>
                        <span className="text-[11px] text-white/60 block font-mono">Амьдарсан өдөр</span>
                        <span className="text-lg font-bold text-amber-300 font-mono">
                          {nasResult.odor.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-white/60 block font-mono">Амьдарсан цаг</span>
                        <span className="text-lg font-bold text-sky-300 font-mono">
                          {nasResult.tsag.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-white/60 block font-mono">Амьдарсан минут</span>
                        <span className="text-lg font-bold text-emerald-300 font-mono">
                          {nasResult.minut.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'ireedui' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1.5">Төрсөн он:</label>
                      <input
                        type="number"
                        value={torsonOn}
                        onChange={(e) => setTorsonOn(Number(e.target.value))}
                        className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-400 w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-white/70 mb-1.5">Тооцох он:</label>
                      <input
                        type="number"
                        value={irehOn}
                        onChange={(e) => setIrehOn(Number(e.target.value))}
                        className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-400 w-full"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleCalculateIreedui}
                    className="liquid-glass rounded-xl px-5 py-2.5 text-xs font-semibold text-white hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Насыг олох</span>
                  </button>

                  {ireeduiResult !== null && (
                    <div className="mt-4 p-4 rounded-xl bg-sky-500/10 border border-sky-400/20 text-center">
                      <span className="text-xs text-sky-200 block mb-1">
                        Та <strong>{irehOn}</strong> онд:
                      </span>
                      <span className="text-3xl font-bold text-white font-mono">{ireeduiResult} настай</span>
                      <span className="text-xs text-white/50 block mt-1">болсон байх болно.</span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'tongorog' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5">
                      4 оронтой тоо оруулна уу (жишээ: 1234):
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        maxLength={6}
                        value={tooInput}
                        onChange={(e) => setTooInput(e.target.value)}
                        className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-400 w-full"
                      />
                      <button
                        onClick={handleCalculateTongorog}
                        className="liquid-glass rounded-xl px-5 py-2.5 text-xs font-semibold text-white hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Урвуулах</span>
                      </button>
                    </div>
                  </div>

                  {tongorogResult !== null && (
                    <div className="mt-4 p-4 rounded-xl bg-purple-500/10 border border-purple-400/20 text-center">
                      <span className="text-xs text-purple-200 block mb-1">Тонгорогдсон тоо:</span>
                      <span className="text-4xl font-bold text-white font-mono tracking-widest">
                        {tongorogResult}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'dun' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-white/70 mb-1.5">
                      Оноо оруулна уу (0–100):
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={onooInput}
                        onChange={(e) => setOnooInput(Number(e.target.value))}
                        className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-amber-400 w-full"
                      />
                      <button
                        onClick={handleCalculateDun}
                        className="liquid-glass rounded-xl px-5 py-2.5 text-xs font-semibold text-white hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Дүн шалгах</span>
                      </button>
                    </div>
                  </div>

                  {dunResult !== null && (
                    <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-center">
                      <span className="text-xs text-emerald-200 block mb-1">Үсгэн дүнгийн үнэлгээ:</span>
                      <span className="text-3xl font-bold text-emerald-300 font-mono">{dunResult}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                JavaScript логик шууд ажиллаж байна
              </span>
              <span className="font-mono text-white/40">ECMAScript 2026</span>
            </div>
          </div>

          {/* Right Column: Code Snippet & Website Feature */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Code Box */}
            <div className="rounded-2xl bg-[#031326] border border-white/15 p-5 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] text-white/50 ml-1">app.js · {activeProblem.title}</span>
                </div>
                <Code2 className="w-4 h-4 text-amber-300 opacity-80" />
              </div>

              <pre className="text-amber-100/90 overflow-x-auto leading-relaxed py-2">
                <code>{activeProblem.codeSnippet}</code>
              </pre>
            </div>

            {/* Netlify Site Info Box */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-amber-500/10 via-sky-500/5 to-transparent border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold block mb-1">
                  Бие даасан веб систем
                </span>
                <h4
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-2xl text-white font-normal mb-2"
                >
                  Кодын дасгал (Хичээл 8–11)
                </h4>
                <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed mb-4">
                  Энэ сайт дээр хичээл тус бүрийн 10 гаруй бодлого, нууц үг шалгах, математик тооцоолол болон Code Battle дасгалууд бүрэн системээрээ ажиллаж байна.
                </p>
              </div>

              <a
                href={profileData.javascriptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full liquid-glass rounded-xl py-3 px-4 text-xs font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/15 transition-all cursor-pointer group"
              >
                <span>Бүх бодлогуудыг сайтан дээр үзэх</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
