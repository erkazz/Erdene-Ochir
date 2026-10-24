import React from 'react';
import { Gamepad, Trophy, Activity, Flame } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export const HobbiesSection: React.FC = () => {
  return (
    <section id="hobbies" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto z-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-[hsl(var(--muted-foreground))] font-semibold">
          Чөлөөт цаг & Сонирхол
        </span>
        <h2
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-4xl sm:text-6xl font-normal text-white tracking-tight mt-2"
        >
          Хобби & Дуртай зүйлс
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg mt-4 leading-relaxed">
          Код бичихээс гадна спорт, цахим тоглоомоор хичээллэж эрч хүчээ сэлбэдэг.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basketball / Hobby Card */}
        <div className="liquid-card rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-orange-300 font-semibold">
                    Идэвхтэй амьдрал
                  </span>
                  <h3
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                    className="text-3xl text-white font-normal"
                  >
                    Хобби: Сагс тоглох
                  </h3>
                </div>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-200 border border-orange-500/20">
                Спорт
              </span>
            </div>

            <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed mb-6">
              Сагсан бөмбөг бол багийн ажиллагаа, хурд, оновчтой шийдвэр гаргалтыг хөгжүүлдэг миний хамгийн дуртай спорт. Чөлөөт цагаараа талбай дээр найзуудтайгаа тоглож эрч хүч авдаг.
            </p>

            {/* Basketball image presentation */}
            <div className="rounded-2xl overflow-hidden border border-white/10 relative h-48 bg-black/40">
              <img
                src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop"
                alt="Basketball court and ball"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00172c] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-xs text-white/90">
                <span className="font-medium">Багаар ажиллах & Эрүүл чийрэг бие</span>
                <Trophy className="w-4 h-4 text-orange-400" />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <span>Төрөл: Багийн спорт</span>
            <span className="text-orange-300 font-medium">Шидэлт, хурд, тактик</span>
          </div>
        </div>

        {/* CS2 / Game Card */}
        <div className="liquid-card rounded-3xl p-8 flex flex-col justify-between group overflow-hidden relative">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Gamepad className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                    Цахим спорт
                  </span>
                  <h3
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                    className="text-3xl text-white font-normal"
                  >
                    Дуртай тоглоом: CS2
                  </h3>
                </div>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-200 border border-amber-500/20">
                Esports
              </span>
            </div>

            <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base leading-relaxed mb-6">
              Counter-Strike 2 (CS2) бол сэтгэн бодох чадвар, тактик төлөвлөлт болон маш нарийн рефлекс шаарддаг цахим тоглоом. Тоглоомоос стратегийн сэтгэлгээг суралцдаг.
            </p>

            {/* CS2 style game presentation */}
            <div className="rounded-2xl overflow-hidden border border-white/10 relative h-48 bg-black/40">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
                alt="Gaming setup and esports"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00172c] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-xs text-white/90">
                <span className="font-medium">Стратеги & Тактик төлөвлөлт</span>
                <Flame className="w-4 h-4 text-amber-400" />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <span>Төрөл: Тактикийн мэргэн бууч</span>
            <span className="text-amber-300 font-medium">Хариу үйлдэл & Төлөвлөлт</span>
          </div>
        </div>
      </div>
    </section>
  );
};
