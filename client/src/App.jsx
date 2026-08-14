import React from 'react';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { FormalVsFun } from './sections/FormalVsFun';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Contact } from './sections/Contact';
import { Footer } from './components/layout/Footer';
import { useScrollSpy } from './hooks/useScrollSpy';

export function App() {
  const sectionIds = ['hero', 'about', 'versatility', 'experience', 'skills', 'contact'];
  const activeSection = useScrollSpy(sectionIds, 200);

  return (
    <div className="relative min-h-screen bg-offwhite text-ink-900 selection:bg-burgundy-700 selection:text-white">
      {/* Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Editorial Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections Storyline */}
      <main>
        {/* 01 — Hero / Stage Entrance */}
        <Hero />

        {/* 02 — About / The Backstage Story & Pillars */}
        <About />

        {/* 03 — Formal to Fun / Stage Versatility Showcase */}
        <FormalVsFun />

        {/* 04 — Signature Events / On The Record & E-Cell Leadership */}
        <Experience />

        {/* 05 — Stage Toolkit & Capabilities Cloud */}
        <Skills />

        {/* 06 — Contact & Direct Booking Brief Generator */}
        <Contact />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}

export default App;
