import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Sparkles, ArrowUpRight } from 'lucide-react';
import { profileData } from '../../data/profile';
import { toggleSound, isSoundEnabled, playMicTap } from '../../utils/soundEffects';

export const Navbar = ({ activeSection = 'hero' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero', id: 'hero' },
    { name: 'ABOUT', href: '#about', id: 'about' },
    { name: 'VERSATILITY', href: '#versatility', id: 'versatility' },
    { name: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { name: 'SKILLS', href: '#skills', id: 'skills' },
    { name: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleSoundToggle = () => {
    const state = toggleSound();
    setSoundActive(state);
    if (state) playMicTap();
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    playMicTap();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
            ? 'py-3 bg-offwhite/90 backdrop-blur-md shadow-sm border-b border-burgundy-900/10'
            : 'py-5 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Editorial Brand Wordmark */}
          <a
            href="#hero"
            onClick={handleLinkClick}
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <span className="w-8 h-8 rounded-full bg-burgundy-700 text-offwhite flex items-center justify-center font-display font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              AT
            </span>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base sm:text-lg tracking-wider text-ink-900 leading-tight uppercase group-hover:text-burgundy-700 transition-colors">
                {profileData.name}
              </span>
              <span className="text-[10px] tracking-widest text-burgundy-700 font-semibold uppercase -mt-0.5">
                Event Anchor • MC
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`text-xs uppercase tracking-widest font-semibold transition-all relative py-1 ${isActive
                      ? 'text-burgundy-700 font-bold'
                      : 'text-ink-700 hover:text-burgundy-600'
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-burgundy-700 rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action buttons on right */}
          <div className="flex items-center gap-3">
            {/* Sound Effects Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundActive ? "Mute interactive audio effects" : "Enable interactive audio effects"}
              className="w-9 h-9 rounded-full border border-burgundy-900/15 bg-white/70 text-ink-700 hover:text-burgundy-700 hover:border-burgundy-700 transition-all flex items-center justify-center shadow-sm"
              aria-label="Toggle interaction audio"
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-burgundy-700" />
              ) : (
                <VolumeX className="w-4 h-4 opacity-50" />
              )}
            </button>

            {/* Book Anchor CTA */}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-burgundy-700 hover:bg-burgundy-800 text-offwhite text-xs font-bold uppercase tracking-widest shadow-burgundy-glow transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-brandPink-200" />
              <span>Book Anchor</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-burgundy-900/20 bg-white/80 text-ink-900 flex items-center justify-center focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-20 pb-8 px-6 bg-offwhite/98 backdrop-blur-lg flex flex-col justify-between lg:hidden border-b border-burgundy-900/10 shadow-2xl"
          >
            <div className="space-y-4 pt-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-burgundy-700 block mb-2">
                Navigation Journal
              </span>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="block py-2.5 text-xl font-display font-bold text-ink-900 hover:text-burgundy-700 transition-colors border-b border-ink-900/5 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-burgundy-600" />
                </motion.a>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-ink-900/10">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-burgundy-700 text-white font-bold text-sm uppercase tracking-wider shadow-md"
              >
                <Sparkles className="w-4 h-4 text-brandPink-200" />
                Inquire & Book Anchor
              </a>
              <p className="text-center font-handwritten text-lg text-ink-muted">
                "See you on stage."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
