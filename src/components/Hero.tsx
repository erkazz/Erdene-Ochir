import React from 'react';
import { ArrowDown } from 'lucide-react';
import { profileData } from '../data/portfolioData';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Fullscreen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={profileData.videoUrl} type="video/mp4" />
        Таны хөтөч видео дэмждэггүй байна.
      </video>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40 py-[90px] max-w-7xl mx-auto w-full">
        {/* Subtle pill badge */}
        <div className="animate-fade-rise mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase text-white/90 bg-white/10 backdrop-blur-md border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            14 настай залуу вэб суралцагч
          </span>
        </div>

        {/* H1 Heading */}
        <h1
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-white animate-fade-rise"
        >
          Зорилго{' '}
          <em className="not-italic text-[hsl(var(--muted-foreground))]">мөрөөдөл</em>{' '}
          дүрэлзэж,{' '}
          <em className="not-italic text-[hsl(var(--muted-foreground))]">чин сэтгэлээр бүтээнэ.</em>
        </h1>

        {/* Subtext */}
        <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
          Сайн байна уу, намайг <span className="text-white font-medium">{profileData.name}</span> гэдэг.
          Би 14 настай бөгөөд код, хиймэл оюун ухаан суралцан өөрийн бүтээлч санаагаа бодит вэб, тоглоом болгон хөгжүүлж байна.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-rise-delay-2 mt-12 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onExploreClick}
            className="liquid-glass rounded-full px-14 py-5 text-base text-white hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 cursor-pointer shadow-lg inline-flex items-center gap-3 font-medium"
          >
            <span>Бүтээлүүдтэй танилцах</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
