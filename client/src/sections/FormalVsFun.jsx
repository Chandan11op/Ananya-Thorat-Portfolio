import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Sparkles, Mic, Award, Music, Flame, Check, ArrowRight } from 'lucide-react';
import { DoodleUnderline, DoodleSparkle, DoodleStar } from '../components/common/Doodles';
import { PaperTape } from '../components/common/PaperTape';
import { StampBadge } from '../components/common/StampBadge';
import { playCardHover } from '../utils/soundEffects';

export const FormalVsFun = () => {
  const [activeMode, setActiveMode] = useState('both'); // 'formal', 'energetic', 'both'

  const formalAspects = {
    title: "FORMAL & CORPORATE",
    subtitle: "Dignity, Protocol & Precision",
    tagline: "When your event demands executive authority and seamless timing.",
    badge: "EXECUTIVE SUITE",
    accentBg: "bg-burgundy-900 text-offwhite",
    borderColor: "border-burgundy-700",
    quote: "A steady voice that respects protocol, elevates speakers, and guides audiences through complex agendas.",
    events: [
      "Unicorn 26 Entrepreneurship Summit",
      "Business Pitch & Startup Jury Arenas",
      "Institutional Ceremonies & Convocations",
      "Keynote Speaker & Fireside Moderation"
    ],
    attributes: [
      { label: "Vocal Tone", value: "Polished, poised, clear projection" },
      { label: "Audience Dynamic", value: "Respectful, focused, engaged" },
      { label: "Coordination", value: "Strict schedule discipline & speaker cues" },
      { label: "Crisis Response", value: "Graceful bridging & protocol poise" }
    ]
  };

  const energeticAspects = {
    title: "ENERGETIC & CULTURAL",
    subtitle: "High Voltage, Hype & Spontaneous Wit",
    tagline: "When your crowd wants unforgettable entertainment and live interaction.",
    badge: "FESTIVAL SPOTLIGHT",
    accentBg: "bg-brandPink-100 text-ink-900",
    borderColor: "border-brandPink-400",
    quote: "Electrifying the crowd, igniting runway applause, and keeping the adrenaline surging.",
    events: [
      "Fashion Shows & Designer Runways",
      "Inter-Collegiate Dance Battles",
      "College Annual Day Celebrations",
      "Talent Competitions & Award Shows"
    ],
    attributes: [
      { label: "Vocal Tone", value: "High-octane, dynamic hype, melodic banter" },
      { label: "Audience Dynamic", value: "Interactive call-and-response, cheering games" },
      { label: "Coordination", value: "Music syncing, runway pacing, instant improvisations" },
      { label: "Crisis Response", value: "Witty crowd banter & spontaneous humor" }
    ]
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
    playCardHover();
  };

  return (
    <section id="versatility" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy-700/10 border border-burgundy-700/20 text-burgundy-800 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>03 — STAGE VERSATILITY</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-ink-900 tracking-tight">
            ONE VOICE. <span className="text-burgundy-700 italic font-serif">MANY STAGES.</span>
          </h2>

          <div className="flex justify-center">
            <DoodleUnderline className="w-48 sm:w-60 h-4 text-brandPink-300" />
          </div>

          <p className="font-handwritten text-xl sm:text-2xl text-ink-700 max-w-xl mx-auto">
            "Seamlessly oscillating between corporate boardroom summits and roaring festival amphitheatres."
          </p>

          {/* Interactive Mode Filter Buttons */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              onClick={() => handleModeChange('both')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeMode === 'both'
                  ? 'bg-ink-900 text-white shadow-md'
                  : 'bg-white text-ink-700 border border-ink-900/10 hover:bg-brandPink-50'
              }`}
            >
              Side-By-Side Comparison
            </button>
            <button
              onClick={() => handleModeChange('formal')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeMode === 'formal'
                  ? 'bg-burgundy-700 text-white shadow-burgundy-glow'
                  : 'bg-white text-burgundy-700 border border-burgundy-700/20 hover:bg-burgundy-50'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Formal Mode</span>
            </button>
            <button
              onClick={() => handleModeChange('energetic')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeMode === 'energetic'
                  ? 'bg-brandPink-400 text-burgundy-950 shadow-pink-glow'
                  : 'bg-white text-burgundy-900 border border-brandPink-300 hover:bg-brandPink-50'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-burgundy-600" />
              <span>Energetic Mode</span>
            </button>
          </div>
        </div>

        {/* Dual Worlds Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* WORLD 1: FORMAL (Burgundy & Deep Palette) */}
          <AnimatePresence mode="popLayout">
            {(activeMode === 'both' || activeMode === 'formal') && (
              <motion.div
                key="formal-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className={`relative rounded-3xl p-8 bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-950 text-offwhite shadow-paper-lift border-2 border-burgundy-700 flex flex-col justify-between ${
                  activeMode === 'formal' ? 'lg:col-span-2 max-w-4xl mx-auto w-full' : ''
                }`}
              >
                {/* Washi tape decoration */}
                <div className="absolute -top-3.5 left-10">
                  <PaperTape variant="washi" rotate="-2deg" width="w-24" height="h-6" />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-brandPink-200">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brandPink-300 block">
                          Executive Stature
                        </span>
                        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                          {formalAspects.title}
                        </h3>
                      </div>
                    </div>

                    <StampBadge text="PROTOCOL" variant="pink" rotate="4deg" className="hidden sm:inline-flex" />
                  </div>

                  <p className="font-serif italic text-base sm:text-lg text-brandPink-100/90 leading-relaxed mb-6">
                    "{formalAspects.quote}"
                  </p>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {formalAspects.attributes.map((attr, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brandPink-300 block">
                          {attr.label}
                        </span>
                        <span className="text-xs text-white/90 font-medium mt-0.5 block">
                          {attr.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Representative Events */}
                  <div className="space-y-2 pt-4 border-t border-white/15">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brandPink-300 block">
                      Signature Formats:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {formalAspects.events.map((ev, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-white/90">
                          <Check className="w-3.5 h-3.5 text-brandPink-300 shrink-0" />
                          <span>{ev}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 flex items-center justify-between border-t border-white/10">
                  <span className="text-xs font-handwritten text-lg text-brandPink-200">
                    Trusted for high-stakes business summits
                  </span>
                  <a
                    href="#experience"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-brandPink-200 transition-colors"
                  >
                    <span>View Corporate Fests</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WORLD 2: ENERGETIC (Pink & Vibrant Rose Palette) */}
          <AnimatePresence mode="popLayout">
            {(activeMode === 'both' || activeMode === 'energetic') && (
              <motion.div
                key="energetic-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className={`relative rounded-3xl p-8 bg-gradient-to-br from-brandPink-100 via-[#FCECEE] to-brandPink-200 text-ink-900 shadow-paper-lift border-2 border-brandPink-300 flex flex-col justify-between ${
                  activeMode === 'energetic' ? 'lg:col-span-2 max-w-4xl mx-auto w-full' : ''
                }`}
              >
                {/* Washi tape decoration */}
                <div className="absolute -top-3.5 right-10">
                  <PaperTape variant="burgundy" rotate="3deg" width="w-24" height="h-6" />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-burgundy-700 text-white flex items-center justify-center shadow-burgundy-glow">
                        <Flame className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-burgundy-700 block">
                          Stage Voltage
                        </span>
                        <h3 className="font-display font-bold text-2xl sm:text-3xl text-burgundy-950">
                          {energeticAspects.title}
                        </h3>
                      </div>
                    </div>

                    <StampBadge text="HIGH HYPE" variant="burgundy" rotate="-4deg" className="hidden sm:inline-flex" />
                  </div>

                  <p className="font-serif italic text-base sm:text-lg text-burgundy-900 leading-relaxed mb-6">
                    "{energeticAspects.quote}"
                  </p>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {energeticAspects.attributes.map((attr, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/80 border border-brandPink-300/80 shadow-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-burgundy-700 block">
                          {attr.label}
                        </span>
                        <span className="text-xs text-ink-900 font-medium mt-0.5 block">
                          {attr.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Representative Events */}
                  <div className="space-y-2 pt-4 border-t border-burgundy-900/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-burgundy-700 block">
                      Signature Formats:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {energeticAspects.events.map((ev, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-ink-900 font-medium">
                          <Check className="w-3.5 h-3.5 text-burgundy-700 shrink-0" />
                          <span>{ev}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 flex items-center justify-between border-t border-burgundy-900/10">
                  <span className="text-xs font-handwritten text-lg text-burgundy-800">
                    Energizing crowds across college amphitheatres
                  </span>
                  <a
                    href="#experience"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-burgundy-900 hover:text-burgundy-700 transition-colors"
                  >
                    <span>View Cultural Shows</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
