/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { HobbiesSection } from './components/HobbiesSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#002442] text-white relative selection:bg-sky-400/20 selection:text-white">
      {/* Navigation */}
      <Navbar onNavigate={scrollToSection} />

      {/* Hero Section with Video Background */}
      <Hero onExploreClick={() => scrollToSection('projects')} />

      {/* Main Content Sections */}
      <main className="relative z-10 space-y-12">
        {/* Projects Section */}
        <ProjectsSection />

        {/* About Section */}
        <AboutSection />

        {/* Hobbies & Games Section */}
        <HobbiesSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
