import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data/portfolioData';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="relative z-10 flex row justify-between items-center px-6 sm:px-8 py-5 max-w-7xl mx-auto backdrop-blur-md bg-black/10 border-b border-white/5 transition-all">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="group flex items-baseline gap-1 focus:outline-none"
        >
          <span
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-2xl sm:text-3xl tracking-tight text-white hover:text-white/90 transition-colors"
          >
            {profileData.name}
          </span>
          <sup className="text-xs text-white/60">®</sup>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('home')}
            className="text-sm text-white hover:text-white/80 transition-colors cursor-pointer"
          >
            Нүүр
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-sm text-[hsl(var(--muted-foreground))] hover:text-white transition-colors cursor-pointer"
          >
            Миний бүтээлүүд
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm text-[hsl(var(--muted-foreground))] hover:text-white transition-colors cursor-pointer"
          >
            Миний тухай
          </button>
          <button
            onClick={() => scrollToSection('hobbies')}
            className="text-sm text-[hsl(var(--muted-foreground))] hover:text-white transition-colors cursor-pointer"
          >
            Хобби & Сонирхол
          </button>
          <a
            href={profileData.netlifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[hsl(var(--muted-foreground))] hover:text-white transition-colors inline-flex items-center gap-1"
          >
            Үндсэн сайт
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* CTA Button */}
        <div className="hidden sm:block">
          <button
            onClick={() => scrollToSection('projects')}
            className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 cursor-pointer shadow-sm"
          >
            Бүтээлүүд үзэх
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white focus:outline-none"
            aria-label="Цэс нээх"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#00172c]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4">
          <button
            onClick={() => scrollToSection('home')}
            className="block w-full text-left py-2 text-white font-medium text-base"
          >
            Нүүр
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="block w-full text-left py-2 text-[hsl(var(--muted-foreground))] hover:text-white text-base"
          >
            Миний бүтээлүүд
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left py-2 text-[hsl(var(--muted-foreground))] hover:text-white text-base"
          >
            Миний тухай
          </button>
          <button
            onClick={() => scrollToSection('hobbies')}
            className="block w-full text-left py-2 text-[hsl(var(--muted-foreground))] hover:text-white text-base"
          >
            Хобби & Сонирхол
          </button>
          <a
            href={profileData.netlifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block py-2 text-[hsl(var(--muted-foreground))] hover:text-white text-base flex items-center gap-1.5"
          >
            Үндсэн сайт руу очих
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => scrollToSection('projects')}
            className="w-full mt-2 liquid-glass rounded-full py-3 text-sm text-white text-center cursor-pointer"
          >
            Бүтээлүүд үзэх
          </button>
        </div>
      )}
    </header>
  );
};
