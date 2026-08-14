import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Users, MapPin, ArrowUpRight, CheckCircle2, Star, Filter } from 'lucide-react';
import { experienceData } from '../data/experience';
import { TiltCard } from '../components/common/TiltCard';
import { PaperTape } from '../components/common/PaperTape';
import { StampBadge } from '../components/common/StampBadge';
import { DoodleUnderline, DoodleStar, DoodleArrow } from '../components/common/Doodles';
import { EventModal } from '../components/common/EventModal';
import { playCardHover, playMicTap } from '../utils/soundEffects';

export const Experience = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeModalEvent, setActiveModalEvent] = useState(null);

  const categories = [
    { id: 'ALL', label: 'All Stages' },
    { id: 'Corporate & Entrepreneurship', label: 'Corporate & Summits' },
    { id: 'Entertainment & Cultural', label: 'Cultural & Fests' },
    { id: 'Formal Ceremonies', label: 'Ceremonial & Protocol' },
  ];

  const featuredEvent = experienceData.signatureEvents.find(e => e.id === 'unicorn-26');
  const otherEvents = experienceData.signatureEvents.filter(e => e.id !== 'unicorn-26');

  const filteredEvents = selectedCategory === 'ALL'
    ? otherEvents
    : otherEvents.filter(e => e.category === selectedCategory);

  const handleCardClick = (event) => {
    setActiveModalEvent(event);
    playMicTap();
  };

  const handleCategoryFilter = (catId) => {
    setSelectedCategory(catId);
    playCardHover();
  };

  return (
    <section id="experience" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-offwhite-warm overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brandPink-100/80 border border-brandPink-300 text-burgundy-800 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>04 — ON THE RECORD</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-ink-900 tracking-tight">
            SIGNATURE <span className="text-burgundy-700 italic font-serif">EVENTS</span>
          </h2>

          <div className="flex justify-center">
            <DoodleUnderline className="w-44 sm:w-56 h-4 text-brandPink-300" />
          </div>

          <p className="font-handwritten text-xl sm:text-2xl text-ink-700 max-w-xl mx-auto">
            "A visual pass through the auditoriums, summit stages & cultural runways anchored live."
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryFilter(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-burgundy-700 text-white shadow-burgundy-glow'
                    : 'bg-white text-ink-700 border border-ink-900/10 hover:bg-brandPink-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* E-CELL LEADERSHIP HIGHLIGHT BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 relative p-6 sm:p-8 rounded-3xl bg-white border-2 border-burgundy-900/15 shadow-paper overflow-hidden"
        >
          <div className="absolute -top-3 left-12">
            <PaperTape variant="burgundy" rotate="-3deg" width="w-28" height="h-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-burgundy-700 text-white text-[11px] font-bold uppercase tracking-wider">
                  DEPARTMENT LEADERSHIP
                </span>
                <span className="text-xs font-semibold text-burgundy-800">
                  {experienceData.leadership.institution}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-ink-900">
                {experienceData.leadership.role}
              </h3>
              <p className="text-xs sm:text-sm text-ink-700 leading-relaxed font-sans max-w-2xl">
                Led the student anchoring division for K.P.B. Hinduja College E-Cell, orchestrating scripts, managing stage volunteers, and delivering flawless multi-day festival flow.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2 justify-center lg:items-end">
              <StampBadge text="HEAD OF ANCHORING" subtext="E-Cell Hinduja" variant="burgundy" rotate="2deg" />
              <span className="text-xs font-handwritten text-lg text-burgundy-800">
                Coordinated 5+ Major College Summits
              </span>
            </div>
          </div>
        </motion.div>

        {/* FEATURED HERO CARD: UNICORN 26 ENTREPRENEURSHIP FEST */}
        {featuredEvent && (selectedCategory === 'ALL' || selectedCategory === 'Corporate & Entrepreneurship') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <TiltCard intensity={6}>
              <div
                onClick={() => handleCardClick(featuredEvent)}
                className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#FAF3F5] via-white to-[#FDF4F7] border-2 border-burgundy-700/40 shadow-paper-lift cursor-pointer group"
                data-cursor-label="FLAGSHIP"
              >
                {/* Washi Tapes */}
                <div className="absolute -top-3.5 left-10">
                  <PaperTape variant="washi" rotate="-4deg" width="w-28" height="h-6" />
                </div>
                <div className="absolute -top-3.5 right-12">
                  <PaperTape variant="pink" rotate="3deg" width="w-24" height="h-6" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Image / Backstage Pass Mockup */}
                  <div className="lg:col-span-5 relative overflow-hidden rounded-2xl aspect-[4/3] bg-burgundy-950 shadow-md">
                    <img
                      src={featuredEvent.image}
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter saturate-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="font-bold uppercase tracking-wider bg-burgundy-700/90 px-3 py-1 rounded-full text-[10px]">
                        FLAGSHIP EDITION
                      </span>
                      {featuredEvent.attendees && (
                        <span className="font-handwritten text-base text-brandPink-200">
                          {featuredEvent.attendees}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-bold tracking-widest text-burgundy-700">
                        FEATURED SUMMIT • {featuredEvent.category}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-burgundy-700 text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-display font-black text-ink-900 group-hover:text-burgundy-700 transition-colors">
                      {featuredEvent.title}
                    </h3>
                    <p className="text-sm font-handwritten text-xl text-ink-700">
                      {featuredEvent.subtitle}
                    </p>

                    <div className="space-y-2 py-2">
                      {featuredEvent.keyHighlights.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-ink-800">
                          <CheckCircle2 className="w-4 h-4 text-burgundy-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-ink-900/10">
                      {featuredEvent.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-white border border-burgundy-900/10 text-xs font-semibold text-burgundy-900">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        )}

        {/* OTHER EDITORIAL EVENT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <TiltCard intensity={8} className="h-full">
                  <div
                    onClick={() => handleCardClick(event)}
                    className="relative h-full rounded-2xl p-5 bg-white border border-burgundy-900/15 shadow-paper hover:shadow-paper-lift transition-all cursor-pointer group flex flex-col justify-between"
                    data-cursor-label="EXPLORE"
                  >
                    {/* Washi tape header */}
                    <div className="absolute -top-3 right-6">
                      <PaperTape 
                        variant={idx % 2 === 0 ? "pink" : "washi"} 
                        rotate={idx % 2 === 0 ? "2deg" : "-3deg"} 
                        width="w-20" 
                        height="h-5" 
                      />
                    </div>

                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-4 bg-burgundy-900">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter saturate-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[11px]">
                          <span className="font-bold uppercase tracking-wider bg-black/50 backdrop-blur-xs px-2.5 py-0.5 rounded">
                            {event.theme === 'formal' ? 'Formal' : 'Cultural'}
                          </span>
                          {event.attendees && (
                            <span className="font-handwritten text-brandPink-200 text-sm">
                              {event.attendees}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Header Info */}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-burgundy-700 block">
                        {event.category}
                      </span>
                      <h4 className="text-xl font-display font-bold text-ink-900 group-hover:text-burgundy-700 transition-colors mt-1">
                        {event.title}
                      </h4>
                      <p className="text-xs font-handwritten text-base text-ink-700 mt-1 line-clamp-1">
                        {event.subtitle}
                      </p>

                      {/* Responsibilities list snippet */}
                      <ul className="mt-3 space-y-1.5 border-t border-ink-900/10 pt-3">
                        {event.keyHighlights.slice(0, 2).map((hl, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-ink-700 line-clamp-2">
                            <span className="text-burgundy-600 font-bold">•</span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Tap CTA */}
                    <div className="mt-5 pt-3 border-t border-ink-900/10 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-burgundy-700 group-hover:underline">
                        View Event Scope
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-burgundy-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Detail Modal Component */}
      <EventModal
        event={activeModalEvent}
        isOpen={Boolean(activeModalEvent)}
        onClose={() => setActiveModalEvent(null)}
      />
    </section>
  );
};
